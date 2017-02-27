class JellyLayout {

    constructor(JMC, file) {
        file = file || false;
        this.JMC = JMC;
        this.layout = this.getBlankLayout();

        this.contentIndex = [];
        if (file) {
            this.loadFile(file);
        }
        this.clearCopyDataObject();
        this.layoutFiles = null;
        this.layoutFilenameLoaded = false;
        var self = this;
        window.onbeforeunload = function () {
            self.unlockCurrentFile();
        };

        this.lockBeat = null;
        this.lockBeatDelay = 60000;
    }

    startLockBeat() {
        var self = this;
        this.stopLockBeat();
        this.lockBeat = setTimeout(function () {
            if (self.layoutFilenameLoaded) {
                self.lockFile(self.layoutFilenameLoaded);
            }
        }, this.lockBeatDelay);
    }

    stopLockBeat() {
        clearTimeout(this.lockBeat);
    }

    unlockCurrentFile() {
        if (this.layoutFilenameLoaded && !this.isLoadedFromConfig()) {
            var obj = {};
            obj.filename = this.layoutFilenameLoaded;
            var json = this.jsonEncode(obj);
            this.stopLockBeat();
            this.getJMC().unlockLayoutFunction(json, function (returnedJson) {
                if (returnedJson == false) {
                    console.log('COULD NOT UNLOCK!');
                } else {
                    console.log('unlocked file!');
                }
            })
        }
    }

    getBlankLayout() {
        var layout = {
            'layoutName': null,
            'desktop': {},
            'tablet': {},
            'mobile': {},
            'currentUniqueId': 0,
            'systemWidths': {
                'desktop': JMCassets.css.defaultDesktopWidth,
                'tablet': JMCassets.css.defaultTabletWidth,
                'mobile': JMCassets.css.defaultMobileWidth
            }
        };

        return this.cloneObject(layout);
    }

    setCopyDataObject(data) {
        if (typeof(data) == 'object') {
            this.copyData = this.cloneObject(data);
            return true;
        }
        return false;
    }

    clearCopyDataObject() {
        this.copyData = null;
    }

    getCopyDataObject() {
        var copyData = this.copyData
        if (typeof(copyData) == 'object') {
            if (typeof(copyData.screenType) != 'undefined') {
                copyData.screenType = this.getJMC().getScreenMode();

            }
            return this.copyData;
        }
        return false;
    }

    copyDataTo(copyLocation) {
        copyLocation = copyLocation || false;
        if (copyLocation == false) {
            return false;
        }

        var currentCopyData = this.getCopyDataObject();

        if (currentCopyData == false) {
            return false;
        }
        var copyType;
        if (typeof(currentCopyData.screenType) != 'undefined') {
            copyType = 'section';
            currentCopyData.inner = this.mergeObject(
                currentCopyData.inner,
                JMCassets.css.sectionInner(currentCopyData.screenType, true)
            );
        } else {
            copyType = 'content';
        }

        switch (copyType) {
            case'section':
                this.insertCopySection(currentCopyData, copyLocation);
                break;
            case'content':
                this.insertCopyContent(currentCopyData, copyLocation);
        }


    }

    insertCopyContent(contentObject, copyLocation) {
        contentObject = this.cloneObject(contentObject);
        var self = this;
        var sectionUniqueId = copyLocation.sectionUniqueId;
        if (typeof(sectionUniqueId) == 'undefined') {
            return false;
        }
        contentObject.uniqueId = self.getJMC().getUniqueIdNo();
        this.getSectionByUniqueId(sectionUniqueId, function (currentSection, layout, key) {
            var contents = layout.sections[key].contents;
            var contentsCount = self.getHighestKey(contents);
            var contentId = contentsCount + 1;
            contents[contentId] = contentObject;

            alert('Content Pasted');
        });

        this.displayLayout();
    }

    insertCopySection(sectionObject, copyLocation) {
        sectionObject = this.cloneObject(sectionObject);
        var self = this;
        var screenType = copyLocation.screenType;
        var screenLayout = this.getLayout(screenType);
        var sectionKeys = this.getSectionKeys(screenType);
        this.reNumberSectionKeys(screenType);
        var newKey = sectionKeys.length + 1;

        sectionObject.uniqueId = self.getJMC().getUniqueIdNo();
        if (typeof(sectionObject.contents) != 'undefined') {
            Object.keys(sectionObject.contents).forEach(function (key) {
                var contentObjectUniqueId = self.getJMC().getUniqueIdNo();
                sectionObject.contents[key].uniqueId = contentObjectUniqueId;
            });
        }
        screenLayout.sections[newKey] = sectionObject;
        alert('Section Pasted to ' + screenType);
        this.displayLayout();
    }

    setLayout(layout) {
        this.layout = layout;
    }

    getJMC() {
        return this.JMC;
    }

    jsonEncode(obj) {
        return this.getJMC().jsonEncode(obj);
    }

    jsonDecode(json) {
        return this.getJMC().jsonDecode(json);
    }

    setLayoutName(layoutName, conflictCallback, finalCallback) {
        finalCallback = finalCallback || function () {
            };
        conflictCallback = conflictCallback || function () {

            };
        var self = this;

        if (typeof(this.layout.layoutName) != 'undefined') {
            /**
             * TODO check layout name through ajax call function set in jelly controller
             */
            self.getLayoutFiles(function (JML) {
                var changed = false;
                var currentFiles = self.getLayoutFiles();
                var i;
                var conflict = false;
                for (i = 0; i < currentFiles.length; i++) {
                    if (currentFiles[i] == (layoutName + '.jml')) {
                        conflict = true;
                        break;
                    }
                }
                var convertLayoutName = function (layoutName) {
                    layoutName = layoutName.replace([], '.');

                    console.log(layoutName);

                    return layoutName;
                };
                if (conflict && (self.getlayoutFilenameLoaded() != (convertLayoutName(layoutName) + '.jml'))) {
                    conflictCallback(JML);
                } else {
                    self.layout.layoutName = layoutName;
                }
                if (layoutName == JML.layout.layoutName) {
                    self.getJMC().setDisplayLayoutName(layoutName);
                    changed = true;
                }
                finalCallback(changed, self);
            });

        }

    }

    saveFile(noNameCallback) {
        var loadedFilename = this.getlayoutFilenameLoaded();
        if (loadedFilename != false && loadedFilename.match('\.jmtpl')) {
            alert('you can not save Templates you can only save as!');
            return false;
        }

        noNameCallback = noNameCallback || function () {
                alert('you need to name your file!');
            };
        var self = this;

        var obj = this.layout;
        if (obj.layoutName == null) {
            noNameCallback(self);
            return;
        }
        if (typeof(obj.configUID) != 'undefined') {
            alert('You can not save Layouts being viewed from Page Config!');
            return;
        }
        var json = self.jsonEncode(obj);
        this.stopLockBeat();
        this.getJMC().saveLayoutFunction(json, function (returnedJson) {
            var savedLayout = self.jsonDecode(returnedJson);
            if (typeof(savedLayout.layoutName) != 'undefined') {

                self.layoutFilenameLoaded = savedLayout.layoutName + '.jml';
                self.getJMC().setDisplayLayoutName();
                self.lockFile(loadedFilename);
                alert(savedLayout.layoutName + ' Saved');

            } else {
                var error = self.getJsonError(returnedJson);
                alert('Problem Encountered Saving Layout! - ' + error);
                console.log(savedLayout);
            }
        });
    }

    saveTemplate(name, conflictCallback, finalCallback) {
        name = name || false;
        if (name == false) {
            alert('template needs to be named!');
        }

        var self = this;
        self.getLayoutFiles(function (JML) {
            var changed = false;
            var currentFiles = self.getLayoutFiles();
            var i;
            var conflict = false;
            for (i = 0; i < currentFiles.length; i++) {
                if (currentFiles[i] == (name + '.jmtpl')) {
                    conflict = true;
                    break;
                }
            }
            var convertName = function (name) {
                name = name.replace([], '.');

                console.log(name);

                return name;
            };
            if (conflict && (self.getlayoutFilenameLoaded() != (convertName(name) + '.jmtpl'))) {
                conflictCallback(JML);
            } else {
                var clonedLayout = self.cloneObject(self.layout);
                clonedLayout.layoutName = name;
                if (typeof(clonedLayout.configUID) != 'undefined') {
                    delete(clonedLayout.configUID);
                }
                clonedLayout.layoutName = name;
                var json = self.jsonEncode(clonedLayout);

                self.getJMC().saveTemplateFunction(json, function (returnedJson) {
                    var savedLayout = self.jsonDecode(returnedJson);
                    if (typeof(savedLayout.layoutName) != 'undefined') {
                        alert(savedLayout.layoutName + ' Saved');
                    } else {
                        var error = self.getJsonError(returnedJson);
                        alert('Problem Encountered Saving Layout Template! - ' + error);
                        console.log(savedLayout);
                    }
                });
            }

            finalCallback(changed, self);
        });


    }

    isLoadedFromConfig() {
        if (typeof(this.layout.configUID) != 'undefined') {
            return true;
        }
        return false;
    }

    deleteFile(callback, filename) {
        callback = callback || function () {
            };
        filename = filename || this.getlayoutFilenameLoaded();

        if (this.isLoadedFromConfig()) {
            alert('You can not Delete Page Config Layouts from here!');
            return false;
        }

        if (typeof(filename) == 'undefined' || filename == false || filename == '') {
            alert('No File Loaded to be deleted!');
            callback(false, filename);
            return false;
        }

        var obj = {}
        obj.deleteFilename = filename;
        var json = this.jsonEncode(obj);
        var self = this;
        this.stopLockBeat();
        this.getJMC().deleteLayoutFunction(json, function (returnedJson) {
            var deleted = false;
            if (typeof(returnedJson.deletedFilename) != 'undefined') {
                deleted = true;
            }
            self.setLayout(self.getBlankLayout());
            self.displayLayout();
            self.getJMC().syncUniqueIds();
            self.getJMC().setDisplayLayoutName('untitled');
            callback(deleted, filename);
        });
    }

    loadFile(filename) {
        this.unlockCurrentFile();
        filename = filename || false;
        if (filename == false) {
            alert('No Layout File Given!');
            return;
        }
        var self = this;
        var json = self.jsonEncode({'filename': filename});
        this.getJMC().loadLayoutFunction(json, function (returnedJson) {

            var locked = self.isLocked(self.jsonDecode(returnedJson));
            if (!locked) {
                var freeToLoad = function () {

                    var error = self.getJsonError(returnedJson);
                    if (error) {
                        alert(error);
                    } else {
                        self.setLayout(self.jsonDecode(returnedJson));
                        self.displayLayout();
                        self.layoutFilenameLoaded = filename;
                        self.getJMC().setDisplayLayoutName();
                    }
                }
                self.lockFile(filename, freeToLoad, true);
            } else {
                alert('file is locked by another user!');
            }
        });
    }

    getJsonError(json) {
        return this.getJMC().getJsonError(json);
    }

    lockFile(filename, freeToLoad, notSilent) {
        notSilent = notSilent || false;
        freeToLoad = freeToLoad || function () {

            };
        var obj = {};
        obj.filename = filename;
        obj.session = this.getJMC().getSession();
        var json = this.jsonEncode(obj);

        var self = this;
        this.getJMC().lockLayoutFunction(json, function (returnedJson) {

          
            var error = self.getJsonError(returnedJson);
            if (error) {
                if (notSilent) {
                    alert(error);
                }
            } else {
                freeToLoad();
                self.startLockBeat();
            }
        });
    }

    isLocked(obj) {
        console.log('lock obj', obj);
        if (typeof(obj.locked) === 'object') {

            if (typeof(obj.timeNow) != 'undefined') {
                if (typeof(obj.locked.time) != 'undefined') {
                    var timeNow = parseInt(obj.timeNow);
                    var lockTime = parseInt(obj.locked.time);
                    var diff = timeNow - lockTime;
                    console.log('diff', diff, 'lockBeatDelay', this.lockBeatDelay);
                    if (diff > ((this.lockBeatDelay / 1000) - 10)) {
                        return false;
                    }
                }
            }

            if (typeof(obj.locked.session) != 'undefined') {
                if (obj.locked.session == this.getJMC().getSession()) {
                    return false;
                }
                return true;
            }
        }
        return false;
    }

    getlayoutFilenameLoaded() {
        return this.layoutFilenameLoaded;
    }

    getLayoutFiles(callback) {
        callback = callback || false;
        if (callback || this.layoutFiles == null) {
            var self = this;
            this.getJMC().getLayoutsFunction(function (returnedJson) {
                var layouts = self.jsonDecode(returnedJson);
                if (typeof(layouts.layouts) != 'undefined') {
                    self.setLayoutFiles(layouts.layouts);
                    if (typeof(callback) === 'function') {
                        callback(self);
                    }
                }
            });
        }
        return this.layoutFiles;

    }

    setLayoutFiles(filesArray) {
        this.layoutFiles = filesArray;
    }

    getJMC() {
        return this.JMC;
    }

    getLayout(screenType) {
        screenType = screenType || 'desktop';
        return this.layout[screenType];
    }

    handleUniqueId(uniqueId) {
        var currentId = this.layout.currentUniqueId;
        if (uniqueId > currentId) {
            this.layout.currentUniqueId = uniqueId;
        }

    }

    getCurrentUniqueId() {
        return this.layout.currentUniqueId;
    }

    addSection(screenType, uniqueId) {

        this.handleUniqueId(uniqueId);
        screenType = screenType || 'desktop';

        var screenLayout = this.reNumberSectionKeys(screenType);
        var sections = screenLayout.sections;

        var sectionCount = this.countObjectKeys(sections);
        var sectionId = sectionCount + 1;
        var newSection = {};
        newSection[sectionId] = this.sectionSettings(uniqueId, {screenType: screenType});
        sections = this.mergeObject(sections, newSection);
        screenLayout.sections = sections;

        console.log(this.layout);

    }

    reNumberSectionKeys(screenType) {
        var screenLayout = this.getLayout(screenType);
        var sections = {};
        if (screenLayout !== {} && typeof(screenLayout.sections) == 'object') {
            sections = screenLayout.sections;
        }

        var self = this;
        var i = 0;
        var temp = {};
        var keyMatcher = {};
        Object.keys(sections).forEach(function (key) {
            i++;
            temp[i] = sections[key];
            keyMatcher[key] = i;
        });
        var i;
        Object.keys(keyMatcher).forEach(function (key) {
            var newKey = keyMatcher[key];
            Object.keys(self.contentIndex).forEach(function (contentUId) {
                var check = self.contentIndex[contentUId];
                if (check.screenType == screenType && check.sectionId == key) {
                    check.sectionId = newKey;
                }
            });
        });

        screenLayout.sections = temp;
        return screenLayout;
    }

    addContent(boxType, sectionUniqueId, uniqueId) {
        boxType = boxType || 'text';
        this.handleUniqueId(uniqueId);
        var self = this;
        var section = this.getSectionByUniqueId(sectionUniqueId, function (currentSection, layout, key) {
            var contents = layout.sections[key].contents;
            var screenType = layout.sections[key].screenType;
            var contentsCount = self.getHighestKey(contents);
            var contentId = contentsCount + 1;
            contents[contentId] = self.contentSettings(uniqueId, {boxType: boxType});
            self.contentIndex[uniqueId] = {screenType: screenType, sectionId: key, contentId: contentId};

        });
        if (section == false) {
            alert('No Section Found');
            return false;
        }
        console.log(this.layout);
        console.log(this.contentIndex);
    }

    getContentByUniqueId(id, callback) {
        callback = callback || function () {
            };
        if (typeof(this.contentIndex[id]) == 'object') {
            var index = this.contentIndex[id];
            var currentContent = this.layout[index.screenType].sections[index.sectionId].contents[index.contentId];
            callback(currentContent, id, index.screenType, index.sectionId, index.contentId);
            return this.layout[index.screenType].sections[index.sectionId].contents[index.contentId];
        }
        return false;
    }

    removeContent(id) {
        var self = this;
        this.getContentByUniqueId(id, function (currentContent, id, screenType, sectionId, contentId) {
            delete self.layout[screenType].sections[sectionId].contents[contentId];
            delete self.contentIndex[id];
        });
        console.log(this.layout);

    }

    /**
     *
     * @param id
     * @param appendObject
     * @param mergeAppend
     */
    editContentSettings(id, appendObject, mergeAppend) {
        mergeAppend = mergeAppend || false;
        appendObject = appendObject || {};

        var self = this;
        this.getContentByUniqueId(id, function (currentContent, id, screenType, sectionId, contentId) {

            if (typeof(appendObject.outer) == 'object' && mergeAppend) {
                appendObject.outer = self.mergeObject(currentContent.outer, appendObject.outer);

            }
            if (typeof(appendObject.middle) == 'object' && mergeAppend) {
                appendObject.middle = self.mergeObject(currentContent.middle, appendObject.middle);
            }
            if (typeof(appendObject.inner) == 'object' && mergeAppend) {
                appendObject.inner = self.mergeObject(currentContent.inner, appendObject.inner);

            }
            self.setContent(id, screenType, sectionId, contentId, appendObject, currentContent);

        });

    }

    setContent(id, screenType, sectionId, contentId, appendObject, currentContent) {
        return this.layout[screenType].sections[sectionId].contents[contentId] = this.contentSettings(id, appendObject, currentContent);

    }

    contentSettings(uniqueId, settingsObject, currentContent) {
        settingsObject = settingsObject || {};
        currentContent = currentContent || false;
        var boxType = 'text';
        var inner = {};
        var middle = {};
        var outer = {};
        var text = '';
        var width = '100';
        var height = '100';
        var assetOptions = {};
        var assetName = 'unnamed';
        var showCursor = true;
        var clickFunction = false;
        var externalFunction = false;
        var href = false;
        var callbackFrontEnd = function () {
        };
        var callbackAdmin = function () {
        };
        if (currentContent) {
            Object.keys(currentContent).forEach(function (key) {
                var value = currentContent[key];
                switch (key) {
                    case 'boxType':
                        boxType = value;
                        break;
                    case 'inner':
                        inner = value;
                        break;
                    case 'middle':
                        middle = value;
                        break;
                    case 'outer':
                        outer = value;
                        break;
                    case 'text':
                        text = value;
                        break;
                    case 'assetName':
                        assetName = value;
                        break;
                    case 'showCursor':
                        showCursor = value;
                        break;
                    case 'width':
                        width = value;
                        break;
                    case 'height':
                        height = value;
                        break;
                    case 'assetOptions':
                        assetOptions = value;
                        break;
                    case 'clickFunction':
                        clickFunction = value;
                        break;
                    case 'externalFunction':
                        externalFunction = value;
                        break;
                    case 'href':
                        href = value;
                        break;
                    case 'callbackFrontEnd':
                        callbackFrontEnd = value;
                        break;
                    case 'callbackAdmin':
                        callbackAdmin = value;
                        break;
                }
            });
        }

        Object.keys(settingsObject).forEach(function (key) {
            var value = settingsObject[key];
            switch (key) {
                case 'boxType':
                    boxType = value;
                    break;
                case 'inner':
                    inner = value;
                    break;
                case 'middle':
                    middle = value;
                    break;
                case 'outer':
                    outer = value;
                    break;
                case 'text':
                    text = value;
                    break;
                case 'assetName':
                    assetName = value;
                    break;
                case 'showCursor':
                    showCursor = value;
                    break;
                case 'width':
                    width = value;
                    break;
                case 'height':
                    height = value;
                    break;
                case 'assetOptions':
                    assetOptions = value;
                    break;
                case 'clickFunction':
                    clickFunction = value;
                    break;
                case 'externalFunction':
                    externalFunction = value;
                    break;
                case 'href':
                    href = value;
                    break;
                case 'callbackFrontEnd':
                    callbackFrontEnd = value;
                    break;
                case 'callbackAdmin':
                    callbackAdmin = value;
                    break;
            }
        });

        var contentObject = {};
        switch (boxType) {
            case'jelly':
            case'text':

                if (this.countObjectKeys(middle) == 0) {
                    middle = JMCassets.css.text();
                }
                if (this.countObjectKeys(outer) == 0) {
                    outer = this.mergeObject(JMCassets.css.textOuter(true), JMCassets.css.textBoxInit());
                }

                contentObject = {
                    'inner': inner,
                    'middle': middle,
                    'outer': outer,
                    'text': text,
                    'href': href,
                    'externalFunction': externalFunction,
                    'clickFunction': clickFunction
                };
                break;
            case'asset':
                contentObject = {
                    'assetName': assetName,
                    'width': width,
                    'height': height,
                    'assetOptions': assetOptions,
                    'callbackFrontEnd': callbackFrontEnd,
                    'callbackAdmin': callbackAdmin,
                    'showCursor': showCursor,
                    'outer': outer
                };
                break;
        }


        var returnObject = {
            'uniqueId': uniqueId,
            'boxType': boxType
        };

        return this.mergeObject(returnObject, contentObject);
    }

    sectionSettings(uniqueId, settingsObject, currentSection) {
        settingsObject = settingsObject || {};
        currentSection = currentSection || false;
        var screenType = 'desktop';
        var outer = JMCassets.css.sectionOuter();
        var inner = JMCassets.css.sectionInner();
        var mode = 'full';
        if (typeof(settingsObject.screenType) != 'undefined' && currentSection == false) {
            inner = JMCassets.css.sectionInner(settingsObject.screenType);
        }

        var contents = {};
        if (currentSection) {
            Object.keys(currentSection).forEach(function (key) {
                var value = currentSection[key];
                switch (key) {
                    case 'screenType':
                        screenType = value;
                        break;
                    case 'outer':
                        outer = value;
                        break;
                    case 'inner':
                        inner = value;
                        break;
                    case 'contents':
                        contents = value;
                        break;
                    case 'mode':
                        mode = value;
                        break;

                }
            });
        }

        Object.keys(settingsObject).forEach(function (key) {
            var value = settingsObject[key];
            switch (key) {
                case 'screenType':
                    screenType = value;
                    break;
                case 'outer':
                    outer = value;
                    break;
                case 'inner':
                    inner = value;
                    break;
                case 'contents':
                    contents = value;
                    break;
                case 'mode':
                    mode = value;
                    break;
            }
        });


        return {
            'uniqueId': uniqueId,
            'outer': outer,
            'inner': inner,
            'contents': contents,
            'screenType': screenType,
            'mode': mode
        };
    }

    countObjectKeys(obj) {
        obj = obj || {};
        var i = 0;
        Object.keys(obj).forEach(function (key) {
            i++;
        });
        return i;
    }

    getHighestKey(obj) {
        obj = obj || {};
        var c = 0;
        Object.keys(obj).forEach(function (key) {
            var index = parseInt(key);
            if (index > c) {
                c = index;
            }
        });
        return c;
    }

    /**
     * last argument takes precedence
     * @returns {{}}
     */
    mergeObject() {
        var obj = {},
            i = 0,
            il = arguments.length,
            key;
        for (; i < il; i++) {
            for (key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key)) {
                    obj[key] = arguments[i][key];
                }
            }
        }
        return obj;
    }

    getSectionByUniqueId(id, callback) {
        callback = callback || function () {
            };
        var screenTypes = ['desktop', 'mobile', 'tablet'];
        var i;
        var returnValue = false;
        for (i = 0; i < screenTypes.length; i++) {
            var layout = this.getLayout(screenTypes[i]);
            if (typeof(layout.sections) == 'object') {
                Object.keys(layout.sections).forEach(function (key) {
                    var currentSection = layout.sections[key];
                    if (typeof(currentSection) != 'undefined' && returnValue == false) {
                        if (typeof(currentSection.uniqueId) != 'undefined') {
                            if (currentSection.uniqueId == id) {
                                callback(currentSection, layout, key, screenTypes[i]);
                                if (typeof(layout.sections[key]) != 'undefined') {
                                    returnValue = layout.sections[key];

                                }

                            }
                        }
                    }
                });
            }

        }
        return returnValue;

    }

    getSectionKeys(screenType) {
        var layout = this.getLayout(screenType);
        var sectionKeys = [];
        var i = 0;
        if (typeof(layout.sections) != 'undefined') {
            Object.keys(layout.sections).forEach(function (key) {

                sectionKeys[i] = key;
                i++;
            });
        }
        console.log(sectionKeys);
        return sectionKeys;
    }

    longOperationStart() {
        // var jq = this.getJMC().getChildJQuery();
        // var jqP = this.getJMC().getJQuery();
        // jq("body *").css("cursor", "progress");
        // jqP("body *").css("cursor", "progress");

    }

    longOperationStop() {
        // var jq = this.getJMC().getChildJQuery();
        // var jqP = this.getJMC().getJQuery();
        // jq("body *").css("cursor", "default");
        // jqP("body *").css("cursor", "default");
    }

    moveSectionByUniqueId(id, direction) {
        direction = direction || 'up';
        var self = this;
        console.log(direction);
        this.longOperationStart();
        this.getSectionByUniqueId(id, function (currentSection, originalLayout, key, screenType) {
            var layout = self.cloneObject(originalLayout);
            var sectionKeys = self.getSectionKeys(screenType);
            var nextSection = false;
            var previousSection = false;
            var previousKey = false;
            var nextKey = false;
            var i;
            for (i = 0; i < sectionKeys.length; i++) {
                if (key == sectionKeys[i]) {
                    nextSection = layout.sections[sectionKeys[(i + 1)]] || false;
                    previousSection = layout.sections[sectionKeys[(i - 1)]] || false;
                    if (nextSection) {
                        nextKey = sectionKeys[(i + 1)];
                        var oldNextSection = self.cloneObject(nextSection);
                    }
                    if (previousSection) {
                        previousKey = sectionKeys[(i - 1)];
                        var oldPreviousSection = self.cloneObject(previousSection);
                    }
                    var oldCurrentSection = self.cloneObject(currentSection)
                    switch (direction) {
                        case'up':
                            if (previousKey) {
                                layout.sections[previousKey] = oldCurrentSection;
                                layout.sections[key] = oldPreviousSection;
                            }
                            break;
                        case'down':
                            if (nextKey) {
                                layout.sections[nextKey] = oldCurrentSection;
                                layout.sections[key] = oldNextSection;
                            }
                            break;
                    }
                    break;
                }
            }

            originalLayout.sections = layout.sections;

        });
        this.longOperationStop();
        this.displayLayout();
    }

    cloneObject(obj) {
        var json = this.jsonEncode(obj);
        return this.jsonDecode(json);
    }

    removeSection(id) {
        var self = this;
        this.getSectionByUniqueId(id, function (currentSection, layout, key, screenType) {
            delete layout.sections[key];
            self.reNumberSectionKeys(screenType);
        });

    }

    editSectionSettings(id, appendObject, mergeAppend) {
        mergeAppend = mergeAppend || false;
        appendObject = appendObject || {};

        var self = this;
        this.getSectionByUniqueId(id, function (currentSection, layout, key) {

            if (typeof(appendObject.outer) == 'object' && mergeAppend) {
                appendObject.outer = self.mergeObject(currentSection.outer, appendObject.outer);
            }

            if (typeof(appendObject.inner) == 'object' && mergeAppend) {
                appendObject.inner = self.mergeObject(currentSection.inner, appendObject.inner);
            }
            layout.sections[key] = self.sectionSettings(id, appendObject, currentSection);


        });

    }


    displayLayout() {
        this.longOperationStart();
        var screenTypes = ['desktop', 'mobile', 'tablet'];
        var i;
        var JMC = this.getJMC();
        JMC.clearDisplay();
        var self = this;
        this.contentIndex = [];
        for (i = 0; i < screenTypes.length; i++) {
            var layout = this.getLayout(screenTypes[i]);
            if (typeof(layout.sections) != 'undefined') {
                Object.keys(layout.sections).forEach(function (key) {
                    var sectionId = key;
                    var currentSection = layout.sections[key];
                    JMC.putSection(undefined, currentSection);
                    var contents = currentSection.contents;
                    var putId = currentSection.uniqueId;
                    var inToId = JMCassets.div.sectionInnerId(putId);

                    Object.keys(contents).forEach(function (key) {

                        var currentContent = contents[key];
                        var uniqueId = currentContent.uniqueId;
                        self.contentIndex[uniqueId] = {
                            screenType: screenTypes[i],
                            sectionId: sectionId,
                            contentId: key
                        };
                        switch (currentContent.boxType) {
                            case'text':
                            case 'jelly':
                                JMC.putText(currentContent.text, inToId, putId, currentContent);
                                break;
                            case 'asset':
                                JMC.putAsset(null, inToId, putId, currentContent);
                                break;
                        }
                    });
                });
            }

        }
        this.longOperationStop();
        JMC.setDisplayLayoutName(this.layout.layoutName);
    }


}

