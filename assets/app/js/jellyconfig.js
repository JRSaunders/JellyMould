class JellyConfig {

    constructor(JMC) {
        if (typeof(JMC) !== 'object') {
            alert('Jelly Config Has not been given Jelly Mould Controller instance!');
            return false;
        }

        this.JMC = JMC;
        this.configFile = null;
        this.config = this.getBlankConfig();
        this.layouts = [];
        this.testData = [];
        if (JMC.configFile !== null) {
            this.setConfigFile(JMC.configFile);
            this.loadConfig()
        }

        this.initControl();

        var self = this;
        window.onbeforeunload = function () {
            self.unlockCurrentFile();
        };

        this.lockBeat = null;
        this.lockBeatDelay = 60000;
        this.saveLock = false;
    }

    startLockBeat() {
        var self = this;
        this.stopLockBeat();
        this.lockBeat = setTimeout(function () {
            if (self.configFile !== null) {
                self.lockFile(self.configFile);
            }
        }, this.lockBeatDelay);
    }

    stopLockBeat() {
        clearTimeout(this.lockBeat);
    }

    unlockCurrentFile() {
        if (this.saveLock) {
            return false;
        }
        if ((typeof(this.configFile) != 'undefined') && (this.configFile !== null) && this.configFile.length > 1) {
            var obj = {};
            obj.filename = this.configFile;
            var json = this.jsonEncode(obj);
            this.stopLockBeat();
            this.getJMC().unlockConfigFunction(json, function (returnedJson) {
                if (returnedJson == false) {
                    console.log('COULD NOT UNLOCK!');
                } else {
                    console.log('unlocked file!');
                }
            });
        }
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
        this.getJMC().lockConfigFunction(json, function (returnedJson) {


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
        console.clear();
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

    initControl() {
        var containerId = this.getJMC().getSectionControlElementId();
        var jqP = this.getJQuery();
        if (jqP('#' + JMconf.div.configAreaId()).length == 0) {
            jqP('#' + containerId).append(JMconf.div.configArea());
        }

        this.initLayoutsControl();
    }

    getConfigName() {
        if (this.config == null) {
            return undefined;
        }

        return this.config.configName;
    }

    getPublishedLayout() {
        if (this.config == null) {
            return null;
        }
        return this.config.publishedLayout;
    }

    initLayoutsControl() {
        var jqP = this.getJQuery();
        var self = this;
        jqP('#' + JMconf.div.configLayoutsContainerId()).html(JMconf.div.layout(
            this.getConfigLayouts(),
            this.getConfigName(),
            this.getConfigFile(),
            this.getPublishedLayout(),
            this.getTestData()
        ));
        jqP('.jm-back-to-layout').unbind();
        jqP('.jm-back-to-layout').click(function () {
            jqP('#' + JMconf.div.configAreaId()).hide();
            jqP('#' + JMCassets.div.masterControlId()).show();
        });
        jqP('#jm-newLayoutConfig').unbind();
        jqP('#jm-newLayoutConfig').click(function () {
            self.insertBlankLayout();
        });
        jqP('.jelly-grab-layout').unbind();
        jqP('.jelly-grab-layout').click(function () {
            var configUID = jqP(this).data('config_uid');
            self.grabLayout(configUID);
        });
        jqP('.jelly-view-layout').unbind();
        jqP('.jelly-view-layout').click(function () {
            var configUID = jqP(this).data('config_uid');
            self.viewLayout(configUID);
            jqP('.jelly-screen-type').hide();
        });
        jqP('.jelly-save-layout').unbind();
        jqP('.jelly-save-layout').click(function () {

            var configUID = jqP(this).data('config_uid');
            self.saveLayout(configUID, function () {
                alert('Layout Saved into page config!');
            });

        });
        jqP('.jelly-delete-layout').unbind();
        jqP('.jelly-delete-layout').click(function () {

            var configUID = jqP(this).data('config_uid');
            var t = confirm('Are you sure you want to delete this Layout from your page Config!');
            if (t) {
                self.deleteLayout(configUID, function () {
                    alert('Layout Deleted from page config!');
                });
            }

        });
        jqP('#jm-saveLayoutConfig').unbind();
        jqP('#jm-saveLayoutConfig').click(function () {
            self.saveConfig(function (configName) {
                alert('Page Config: ' + configName + ' Saved!');
            })
        });
        jqP('#jm-move-back-to-testing').unbind();
        jqP('#jm-move-back-to-testing').click(function () {
            self.moveBackToTesting();
        });
        jqP('#jm-testOptions').css(JMconf.css.testOptions());
        jqP('#jm-test-conditions').unbind();
        jqP('#jm-test-conditions').click(function () {
            if (jqP('#jm-testOptions').is(':visible')) {
                jqP('#jm-testOptions').hide();
            } else {
                self.getTestConditionsMenu();
                jqP('#jm-testOptions').show();
            }
        });

        this.getJMC().initMasterControl(true);
    }

    getTestConditionsMenu() {
        var testOptions = this.config.testOptions;
        var testOptionsHtml = JMconf.div.testOptions(testOptions);
        var jqP = this.getJQuery();
        var self = this;
        jqP('#jm-testOptions').html(testOptionsHtml);
        jqP('#jm-setTestConditions').unbind();
        jqP('#jm-setTestConditions').click(function () {
            self.processTestConditions();
        });
    }

    processTestConditions() {
        var jqP = this.getJQuery();
        var obj = {};
        jqP('.jm-testOptions').each(function () {
            var value = jqP(this).val();
            var key = jqP(this).data('option_key');
            obj[key] = value;
        });
        this.config.testOptions = obj;
        this.saveConfig();
        alert('Test Conditions Set!');
        jqP('#jm-testOptions').hide();

    }

    moveBackToTesting() {
        if (this.saveLock) {
            alert('Config being used by another user!');
            return;
        }
        var filename = this.getConfigFile();
        if (filename == false) {
            alert('No Config File Given!');
            return;
        }
        var self = this;
        var json = self.jsonEncode({'filename': filename});
        this.getJMC().resetTestDataFunction(json, function (returnedJson) {

            if (returnedJson) {

                var layouts = self.getConfigLayouts();
                var index = layouts.length + 1;
                self.getConfigLayouts()[index] = self.config.publishedLayout;
                self.config.publishedLayout = null;
                self.config.testing = true;
                self.saveConfig(function () {
                    self.loadConfig();
                });


            }

        });


    }

    saveLayout(configUID, callback) {

        if (this.saveLock) {
            alert('Layout is Locked By another user!');
            return false;
        }

        callback = callback || function () {
            };
        var layouts = this.getConfigLayouts();
        var JML = this.getJML();
        var saveLayout = JML.layout;
        saveLayout.configUID = configUID;
        var i;

        for (i = 0; i < layouts.length; i++) {
            var layout = layouts[i];
            var uid = layout.configUID;
            if (uid == configUID) {
                this.getConfigLayouts()[i] = saveLayout;
                callback();
            }
        }
        this.saveConfig();
        this.initLayoutsControl();
    }

    deleteLayout(configUID, callback) {
        callback = callback || function () {
            };
        var layouts = this.getConfigLayouts();
        var i;
        for (i = 0; i < layouts.length; i++) {
            var layout = layouts[i];
            var uid = layout.configUID;
            if (uid == configUID) {
                delete this.config.layouts[i];
                callback();
            }
        }

        this.saveConfig();
        this.initLayoutsControl();
    }

    viewLayout(configUID) {
        configUID = configUID || false;
        var layouts = this.getConfigLayouts();
        var JML = this.getJML();
        var viewLayout = JML.getBlankLayout();
        var i;

        for (i = 0; i < layouts.length; i++) {
            var layout = layouts[i];
            var uid = layout.configUID;
            if (uid == configUID) {
                viewLayout = layout;
            }
        }
        if (configUID == false && this.config.publishedLayout != null) {
            viewLayout = this.config.publishedLayout;
        }
        JML.setLayout(viewLayout);
        JML.layoutFilenameLoaded = '<i>From Page Config</i>';
        this.getJMC().setDisplayLayoutName();
        JML.displayLayout();
        var jqP = this.getJQuery();
        jqP('.jelly-save-layout').hide();
        jqP('#jm-save-' + configUID).css({'display': 'inline-block'});

    }

    grabLayout(configUID) {
        var grabedLayout = this.cloneObject(this.getJML().layout);
        grabedLayout.configUID = configUID;
        delete(grabedLayout.locked);
        console.log(grabedLayout);
        var layouts = this.getConfigLayouts();

        var i;

        for (i = 0; i < layouts.length; i++) {
            var layout = layouts[i];
            var uid = layout.configUID;
            if (uid == configUID) {
                this.getConfigLayouts()[i] = grabedLayout;
            }
        }
        this.saveConfig();
        this.initLayoutsControl();
    }

    insertBlankLayout() {
        var blankLayout = this.getJML().getBlankLayout();
        blankLayout.configUID = this.getUID();
        this.getConfigLayouts().push(blankLayout);
        this.initLayoutsControl();
    }

    setConfigFile(filename) {
        this.configFile = filename;
        var configName = filename.replace('\.jmc', '');
        this.config.configName = configName;
    }

    getConfigFile() {
        return this.configFile;
    }

    setConfig(config) {

        if (typeof(config.config) != 'undefined') {
            alert('Config Problem!');
            console.log(config);
        } else {

            this.config = config;
        }
    }

    setTestData(testData) {
        this.testData = testData;

    }

    getTestData() {
        return this.testData;
    }

    loadConfig(filename) {
        filename = filename || this.getConfigFile();
        if (filename == false) {
            alert('No Config File Given!');
            return;
        }
        var self = this;
        var json = self.jsonEncode({'filename': filename});

        this.getJMC().loadConfigFunction(json, function (returnedJson) {
            var returnedData = self.jsonDecode(returnedJson);

            var locked = false;
            if (typeof(returnedData.config) === 'object') {
                locked = self.isLocked(returnedData.config);

            }
            var freeToLoad = function () {
                var error = self.getJsonError(returnedJson);
                if (error) {
                    self.setConfigFile(filename);
                    alert(error);
                } else {

                    if (typeof(returnedData.config) === 'object') {
                        self.setConfig(returnedData.config);
                    }
                    if (typeof(returnedData.testData) != 'undefined') {
                        self.setTestData(returnedData.testData);
                    }
                    self.initLayoutsControl();
                }

            };
            if (!locked) {
                self.lockFile(filename, freeToLoad, true);
                self.unlockSave();
            } else {
                self.setConfigFile(filename);
                try {
                    freeToLoad();
                } catch (e) {
                    alert(e);
                }
                self.lockSave();
                alert('Config is locked by another user!');
            }


        });

        this.fixConfigLayouts();

    }

    lockSave() {
        this.saveLock = true;
    }

    unlockSave() {
        this.saveLock = false;
    }

    getJsonError(json) {
        return this.getJMC().getJsonError(json);
    }

    saveConfig(callback) {

        if (this.saveLock) {
            alert('Config is Locked By another user!');
            return false;
        }

        callback = callback || function () {
            };
        this.fixConfigLayouts();
        var self = this;
        var json = self.jsonEncode(this.config);
        console.log('saved config!');
        console.log(json);

        this.getJMC().saveConfigFunction(json, function (returnedJson) {
            var savedConfig = self.jsonDecode(returnedJson);
            if (typeof(savedConfig.configName) != 'undefined') {

                callback(savedConfig.configName);
            } else {
                alert('Problem Encountered Saving Config! - ' + self.getJsonError(returnedJson));
                console.log(savedConfig);
            }
        });
    }

    getJQuery() {
        return this.getJMC().getJQuery();
    }

    getJMC() {
        return this.JMC;
    }

    getJML() {
        return this.getJMC().getLayout();
    }

    getConfigLayouts() {
        if (this.config == null) {
            return [];
        }
        this.fixConfigLayouts();
        return this.config.layouts;
    }

    getBlankConfig() {

        var config = {
            'configName': null,
            'testing': true,
            'publishedLayout': null,
            'layouts': [],
            'testOptions': {
                'goalClicks': 500,
                'marginClicks': 100,
                'goalConversion': 50,
                'marginConversion': 20
            }

        };
        console.log(config);
        return this.cloneObject(config);
    }


    cloneObject(obj) {
        var json = this.jsonEncode(obj);
        return this.jsonDecode(json);
    }

    jsonEncode(obj) {
        return this.getJMC().jsonEncode(obj);
    }

    jsonDecode(json) {
        return this.getJMC().jsonDecode(json);
    }

    getUID() {
        var d = new Date().getTime();
        if (window.performance && typeof window.performance.now === "function") {
            d += performance.now(); //use high-precision timer if available
        }
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

    fixConfigLayouts() {
        if (this.config == null) {
            return;
        }
        var layouts = this.config.layouts;
        var fixedLayouts = [];
        var i;
        var z = 0;
        console.log('LAYOUTS', typeof(layouts));
        if ((typeof(layouts) == 'array') || (typeof(layouts) == 'object')) {
            for (i = 0; i < layouts.length; i++) {
                var layout = layouts[i];

                if (layout != null && typeof(layout.configUID) != 'undefined') {
                    fixedLayouts[z] = layout;
                    z++;
                }
            }
        }
        this.config.layouts = fixedLayouts;


    }


}
