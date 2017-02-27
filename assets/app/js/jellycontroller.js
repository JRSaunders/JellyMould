class JellyMouldController {

    initOptions(initOptions) {
        this.initOptionsRunCount = this.initOptionsRunCount || 0;
        this.initOptionsRunCount++;
        initOptions = initOptions || {};
        if (this.initOptionsRunCount == 1) {
            this.jQuery = window.jQuery;
            this.newFontsArray = [];

            this.DomElementId = 'jellyMould';
            this.sectionControlElementId = 'jellyMouldSectionControl';
            this.saveLayoutFunction = function () {
                alert('no save layout function set!');
            };
            this.saveTemplateFunction = function () {
                alert('no save template function set!');
            };
            this.loadLayoutFunction = function () {
                alert('no load layout function set!');
            };
            this.lockLayoutFunction = function () {
                alert('no lock layout function set!');
            };
            this.unlockLayoutFunction = function () {
                alert('no unlock layout function set!');
            };
            this.lockConfigFunction = function () {
                alert('no lock layout function set!');
            };
            this.unlockConfigFunction = function () {
                alert('no unlock layout function set!');
            };
            this.getLayoutsFunction = function () {
                alert('no get layout function set!');
            };
            this.deleteLayoutFunction = function () {
                alert('no delete layout function set!');
            };
            this.previewHtmlFunction = function () {
                alert('no HTML preview function!');
            };
            this.loadConfigFunction = function () {
                alert('no load config function set!');
            };
            this.saveConfigFunction = function () {
                alert('no save config function set!');
            };
            this.resetTestDataFunction = function () {
                alert('no reset test data function set!');
            };
            this.url = '/';
            this.runGetCanvas = false;
            this.configFile = null;
        }
        var self = this;
        Object.keys(initOptions).forEach(function (key) {
            var value = initOptions[key];
            switch (key) {
                case 'newFontsArray':
                case'newFonts':
                    self.setNewFontsArray(value);
                    break;
                case 'sectionControlElementId':
                    self.sectionControlElementId = value;
                    break;
                case 'jQuery':
                    self.jQuery = value;
                    break;
                case 'childJQuery':
                    self.childJQuery = value;
                    break;
                case 'previewHtmlFunction':
                case 'previewHtml':
                    self.setPreviewHtmlFunction(value);
                    break;
                case 'saveLayoutFunction':
                case 'saveLayout':
                    self.setSaveLayoutFunction(value);
                    break;
                case 'saveTemplateFunction':
                case 'saveTemplate':
                    self.setSaveTemplateFunction(value);
                    break;
                case 'loadLayoutFunction':
                case 'loadLayout':
                    self.setLoadLayoutFunction(value);
                    break;
                case 'lockLayoutFunction':
                case 'lockLayout':
                    self.setLockLayoutFunction(value);
                    break;
                case 'unlockLayoutFunction':
                case 'unlockLayout':
                    self.setUnlockLayoutFunction(value);
                    break;
                case 'lockConfigFunction':
                case 'lockConfig':
                    self.setLockConfigFunction(value);
                    break;
                case 'unlockConfigFunction':
                case 'unlockConfig':
                    self.setUnlockConfigFunction(value);
                    break;
                case 'getLayoutsFunction':
                case 'getLayouts':
                    self.setGetLayoutsFunction(value);
                    break;
                case 'deleteLayoutFunction':
                case 'deleteLayout':
                    self.setDeleteLayoutFunction(value);
                    break;
                case 'openImageChooseFunction':
                case 'openImageChoose':
                    self.setOpenImageChooseFunction(value);
                    break;
                case 'loadConfigFunction':
                case 'loadConfig':
                    self.setLoadConfigFunction(value);
                    break;
                case 'saveConfigFunction':
                case 'saveConfig':
                    self.setSaveConfigFunction(value);
                    break;
                case 'resetTestDataFunction':
                case 'resetTestData':
                    self.setResetTestDataFunction(value);
                    break;
                case 'url':
                case 'baseUrl':
                    self.url = value;
                    break;
                case 'runGetCanvas':
                case 'canvas':
                    self.runGetCanvas = value;
                    if (value == true && (self.jellyChildReady == false || self.initOptionsRunCount > 1)) {
                        self.getCanvas();
                    }
                    break;
                case 'desktopWidth':
                    self.setDesktopWidth(value);
                    break;
                case 'tabletWidth':
                    Jself.setTabletWidth(value);
                    break;
                case 'mobileWidth':
                    self.setMobileWidth(value);
                    break;
                case 'configFile':
                    self.configFile = value;
                    self.getConfig(true);
                    break;
            }
        });
    }

    setDesktopWidth(width) {
        JMCassets.css.defaultDesktopWidth = width;
    }

    setTabletWidth(width) {
        JMCassets.css.defaultTabletWidth = width;
    }

    setMobileWidth(width) {
        JMCassets.css.defaultMobileWidth = width;
    }

    loadStarterkit() {
        var self = this;
        if (typeof(JMCstarterkit) == 'object') {
            if (typeof(JMCstarterkit.clickFunctions) == 'object') {
                var funcs = JMCstarterkit.clickFunctions;
                Object.keys(funcs).forEach(function (key) {
                    var value = funcs[key];
                    if (typeof(funcs[key]) === 'function') {
                        self.addClickFunction(key, value);
                    }
                });
            }
            if (typeof(JMCstarterkit.assets) == 'object') {
                var assets = JMCstarterkit.assets;
                Object.keys(assets).forEach(function (assetName) {
                    var asset = assets[assetName];
                    if (typeof(asset.callbackFrontEnd) === 'function') {
                        self.addAsset(
                            asset.name,
                            asset.width,
                            asset.height,
                            asset.assetOptions,
                            asset.callbackFrontEnd,
                            asset.callbackAdmin,
                            asset.noCursor
                        );
                    }
                });
            }
        }

    }

    /**
     *
     * @param jQuery
     * @param DomElementId
     * @param url
     * @param sectionControlElementId
     */
    constructor(initOptions) {

        this.initSession();

        this.initOptions(initOptions);


        this.imageSelectFunction = function () {
        };

        this.fontsApplied = false;

        this.uniqueIdNo = 0;
        var jQuery = this.jQuery;
        var $ = jQuery;
        if (typeof(jQuery) !== 'function') {
            alert('You Need JQuery & JQuery UI installed');
            console.log('You Need JQuery & JQuery UI installed');
            return;
        }
        this.jellyChildReady = null;
        this.getCanvas();

        this.workingElement = null;
        this.resetInstances();
        this.assets = [];
        this.clickFunctions = [];
        this.assetById = [];
        this.resetSectionCount();
        this.sectionModes = [];
        this.layout = null;
        this.screenTypeMode = 'desktop';

        this.initMasterControl();
        this.mouseOverContent = false;
        this.copyLocation = false;
        this.loadStarterkit();
        this.typeTimer = [];
        this.config = null;
        this.controlTheme = 'light';

    }

    initSession() {
        var genString = function () {
            var text = "";
            var length = 10;
            var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < length; i++)
                text += charset.charAt(Math.floor(Math.random() * charset.length));

            return text;
        }
        var session = this.getCookie('jm_session');
        if (session == null) {
            session = genString();
        }

        this.setCookie('jm_session', session, 6);
        this.session = session;

    }

    getSession() {
        if (typeof(this.session) == 'undefined') {
            this.initSession();
        }
        return this.session;
    }

    setCookie(cname, cvalue, hours, path) {
        var path = path || '/';
        var d = new Date();
        d.setTime(d.getTime() + (hours * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires + "; path=" + path;
    }

    getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ')
                c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0)
                return c.substring(nameEQ.length, c.length);
        }
        return null;
    }


    getSectionOutlineColor() {

        switch (this.getControlTheme()) {
            case 'light':
                return 'rgba(255,255,255,1)';
                break;
            case 'dark':
                return 'rgba(0,0,0,1)';
                break;
        }

        return 'white';
    }

    getDragOutlineColor(isSectionInner) {
        isSectionInner = isSectionInner || false;
        if (isSectionInner) {
            switch (this.getControlTheme()) {
                case 'light':
                    return 'rgba(255,255,0,1)';
                    break;
                case 'dark':
                    return 'rgba(0,0,0,1)';
                    break;
            }
        } else {
            switch (this.getControlTheme()) {
                case 'light':
                    return 'rgba(255,255,255,0.5)';
                    break;
                case 'dark':
                    return 'rgba(0,0,0,0.5)';
                    break;
            }
        }
        return 'white';
    }

    getCanvasId() {
        return this.getDomElementId();
    }

    getCanvas() {

        if (this.runGetCanvas == false) {
            return false;
        }
        var DomElementId = this.getDomElementId();
        var $ = this.getJQuery();
        var baseUrl = $('#' + DomElementId).data('base_url');
        if (baseUrl === undefined || this.url != '/') {
            baseUrl = this.url;
        }
        this.jellyChildReady = false;
        $('#' + DomElementId).css(JMCassets.css.canvas());

        var previewJson = {
            'getAppend': 'jelly_mould_controller=1',
            'path': baseUrl
        };
        var self = this;
        this.previewHtmlFunction(previewJson, function (returnedHtml) {

            if (typeof (returnedHtml) != 'undefined') {

                self.jellyFrame = document.createElement('iframe');
                self.jellyFrame.width = '100%';
                self.jellyFrame.height = '900';
                self.jellyFrame.src = 'about:blank';
                document.getElementById(DomElementId).appendChild(self.jellyFrame);
                self.jellyFrame.id = 'pre-loader';
                self.jellyFrame.contentWindow.document.open('text/html', 'replace');
                self.jellyFrame.contentWindow.document.write(returnedHtml);
                self.jellyFrame.contentWindow.document.close();
                self.jellyFrame.contentWindow.preloading_from_parent = true;
                self.jellyChild = self.jellyFrame.contentWindow;
                $('#pre-loader').load(function () {

                    self.jellyChildReady = true;
                    $('#' + DomElementId + ' iframe[src="about:blank"]').css({
                        "display": "block",
                        "border": 'none',
                        "margin-left": 'auto',
                        "margin-right": 'auto'
                    });
                    self.childJQuery = self.jellyFrame.contentWindow.jQuery;
                    try {
                        self.childDomElementId = self.jellyChild.JMD.getDomElementId();
                    } catch (e) {
                        console.log(e);
                        alert('There is NO Jelly Mould Script on page to talk to! ');
                    }
                    self.childWindow = self.jellyFrame.contentWindow;
                    self.childDocument = self.jellyChild.document;
                    self.clearDisplay();
                    self.device = new JellyDevice(self.getJQuery(), self.getJellyChild());
                    self.setChildZIndex();
                    /**
                     * stop page from being clicked away
                     */
                    self.childJQuery('body *').unbind('click');
                    self.childJQuery('body *').click(function (e) {

                        e.preventDefault();
                        e.stopPropagation();
                    });
                    /**
                     * important style for control UI
                     */
                    self.childJQuery('head').append(JMCassets.css.initImportant());
                    self.globalCopyPasteFunction();


                    self.jMChildFunctions = [];

                    Object.getOwnPropertyNames(self.childWindow).filter(function (p) {
                        var func = self.childWindow[p];
                        if (typeof func == 'function' && p.match(/_JM_/g)
                        ) {
                            self.jMChildFunctions.push(p);
                        }
                    });
                    console.log(self.jMChildFunctions);
                });

            }

        });


    }

    getChildJMFuctions() {
        return this.jMChildFunctions;
    }

    globalCopyPasteFunction() {

        var childDoc = this.getChildDocument();

        var self = this;

        childDoc.addEventListener('copy', function (e) {
            var win = self.getChildWindow();
            var JML = self.getLayout();
            console.log(self.getCopyLocation());
            var rawCopyString = win.getSelection().toString();
            if (typeof(rawCopyString) != 'undefined' && rawCopyString != '') {
                JML.clearCopyDataObject();
                e.clipboardData.setData('text/plain', rawCopyString);
            } else {
                e.preventDefault();
                e.clipboardData.clearData('text/plain');
                var copyLocation = self.getCopyLocation();
                if (copyLocation == false) {
                    return false;
                }
                /**
                 * copy CONTENT
                 */
                if (copyLocation.sectionUniqueId != null && copyLocation.contentUniqueId != null) {
                    self.jellyBox[copyLocation.contentUniqueId].copyToClipboard();
                }
                /**
                 * copy SECTION
                 */
                if (copyLocation.sectionUniqueId != null && copyLocation.contentUniqueId == null) {
                    self.jellyBox[copyLocation.sectionUniqueId].copyToClipboard();
                }


            }
            console.log(e.clipboardData.getData('text/plain'));
        });

        childDoc.addEventListener('paste', function (e) {
            var win = self.getChildWindow();
            var top = win.scrollY;
            var left = win.scrollX;
            var JML = self.getLayout();
            var jq = self.getChildJQuery();
            console.log(self.getCopyLocation());
            var rawCopyString = e.clipboardData.getData('text/plain');
            if (typeof(rawCopyString) != 'undefined' && rawCopyString != '' && JML.getCopyDataObject() == false) {
                console.log('Normal route', rawCopyString);
            } else {
                console.log('JML copy route');
                e.preventDefault();
                var copyLocation = self.getCopyLocation();
                if (copyLocation == false) {
                    return false;
                }
                JML.copyDataTo(copyLocation);
            }
            setTimeout(function () {
                jq("html, body").animate({
                    scrollTop: top,
                    scrollLeft: left
                }, 100);
            }, 100);

        });

    }

    setCopyLocation(sectionUniqueId, contentUniqueId) {
        sectionUniqueId = sectionUniqueId || null;
        contentUniqueId = contentUniqueId || null;
        this.copyLocation = {
            'screenType': this.getScreenMode(),
            'sectionUniqueId': sectionUniqueId,
            'contentUniqueId': contentUniqueId
        };
    }

    unsetCopyLocation() {
        this.copyLocation = false;
    }

    getCopyLocation() {
        return this.copyLocation;
    }

    getMouseOverContent() {
        return this.mouseOverContent;
    }

    getScreenMode() {
        return this.screenTypeMode;
    }

    resetSectionCount() {
        this.sectionCount = [];
        this.sectionCount['desktop'] = 0;
        this.sectionCount['tablet'] = 0;
        this.sectionCount['mobile'] = 0;
    }

    resetInstances() {
        this.pointer = [];
        this.jellyColor = [];
        this.jellyFont = [];
        this.jellyBox = [];
        this.jellyImage = [];
    }

    setScreenMode(mode, attempts) {
        attempts = attempts || 0;
        var modes = ['desktop', 'tablet', 'mobile'];
        var jq = this.getChildJQuery();
        var jqP = this.getJQuery();
        if (typeof(jq) == 'undefined') {

            if (attempts > 10) {
                alert('unable to set screen mode');
                return;
            }

            var self = this;
            setTimeout(function () {
                attempts++;
                self.setScreenMode(mode, attempts);
            }, 2000);
            return;
        }
        var i;
        for (i = 0; i < modes.length; i++) {
            if (mode == modes[i]) {
                if (this.workingElement != null) {
                    jq(this.workingElement).dblclick();
                    this.workingElement = null;
                }
                this.screenTypeMode = mode;
                this.setCopyLocation();
                jq('.jelly-screen-type').hide();
                jqP('.jelly-screen-type').hide();
                switch (mode) {
                    case 'desktop':
                        jq('#jellyMould-desktop').show();
                        jqP('#jellySectionDesktop').show();
                        this.jellyFrame.width = '100%';
                        break;
                    case 'tablet':
                        jq('#jellyMould-tablet').show();
                        jqP('#jellySectionTablet').show();
                        this.jellyFrame.width = (JMCassets.css.defaultTabletWidth + 150) + 'px';
                        break;
                    case 'mobile':
                        jq('#jellyMould-mobile').show();
                        jqP('#jellySectionMobile').show();
                        this.jellyFrame.width = (JMCassets.css.defaultMobileWidth + 150) + 'px';
                        break;
                }
                return;
            }
        }

    }

    setDisplayLayoutName(name) {
        name = name || this.getLayout().layout.layoutName;
        var jqP = this.getJQuery();
        jqP('#' + JMCassets.div.layoutNameId()).html('<b>' + name + '</b> <small>(' + this.getLayout().getlayoutFilenameLoaded() + ')</small>');
        jqP('#jm-filenamer').val(name);

    }

    loadLayout(file) {
        file = file || false;

        this.layout = new JellyLayout(this, file);

    }

    getLayout() {
        if (this.layout == null) {
            this.loadLayout();
        }

        return this.layout;
    }

    initMasterControl(justControlPosition) {
        justControlPosition = justControlPosition || false;
        var id = this.getSectionControlElementId();
        var canvasId = this.getCanvasId();
        var jqP = this.getJQuery();

        var self = this;

        var elementPos = jqP('#' + id).offset().top;

        var controlPosition = function () {
            var windowPos = window.scrollY;
            if (windowPos > elementPos) {
                jqP('#' + id).css({'position': 'fixed', 'top': '50px', 'z-index': '1000'});
                var masterHeight = (jqP('#' + id).outerHeight() + 50);
                var parentWidth = jqP('#' + canvasId).parent().width();
                var limitHeight = jqP(window).height() - (masterHeight);
                jqP('#' + canvasId).css({
                    'position': 'fixed',
                    'top': masterHeight + 'px',
                    'min-width': parentWidth + 'px',
                    'min-height': limitHeight + 'px'

                });
                if (self.jellyChildReady == true) {
                    self.jellyFrame.height = limitHeight - 10;
                }
            } else {
                jqP('#' + id).css({'position': 'relative', 'top': '0px'});
                jqP('#' + canvasId).css({'position': 'relative', 'top': '0px'});

            }
        };
        if (justControlPosition) {
            controlPosition();
            return true;
        }

        jqP('#' + id).append(JMCassets.div.masterControl());
        var removeActiveScreenLayout = function () {
            jqP('.jelly-screentyper').each(function () {
                jqP(this).removeClass('active');
            });
        };


        jqP(window).scroll(function () {

            controlPosition();
        });


        /**
         * config
         */
        self.getConfig();
        jqP('#open-config-jelly').click(function () {
            jqP('.jelly-screen-type').hide();

            if (jqP('#' + JMconf.div.configAreaId()).is(':visible')) {
                jqP('#' + JMconf.div.configAreaId()).hide();
                jqP('#' + JMCassets.div.masterControlId()).show();
                jqP(this).removeClass('active');
            } else {
                jqP(this).addClass('active');
                jqP('#' + JMconf.div.configAreaId()).show();
                jqP('#' + JMCassets.div.masterControlId()).hide();
                jqP('.jelly-screen-type').hide();
            }
            controlPosition();
        });

        jqP('.showhide-sections-jelly').click(function () {
            if (jqP('.jelly-screen-type').is(':visible')) {
                jqP('.jelly-screen-type').hide();
            } else {
                jqP('.jelly-screentyper.active').click();
            }
            controlPosition();

        });

        jqP('.desktop-jelly, .tablet-jelly, .mobile-jelly').click(function () {
            removeActiveScreenLayout();
            var jq = self.getChildJQuery();
            var screenType = jqP(this).data('screen_type');
            var jqClass = '.' + screenType + '-jelly';
            jqP(jqClass).addClass('active');
            self.setScreenMode(screenType);
            controlPosition();
        });

        jqP('#addSectionJelly').click(function () {
            self.putSection();
            controlPosition();
        });
        jqP('#fileSectionJelly').click(function () {
            self.openImageChoose();
        });

        var openFileNamer = function (template) {
            template = template || false;
            jqP('.jm-file-menu').hide();
            jqP('#jellyNameFile').show();
            jqP('#jm-namer-save').unbind();
            jqP('#jm-namer-save').click(function () {
                var JML = self.getLayout();
                var name = jqP('#jm-filenamer').val();
                var name = name.replace('\.jml', '');
                var name = name.replace('\.jmtpl', '');
                if (template) {
                    self.getLayout().saveTemplate(name, function (JML) {
                        alert('there is a template name conflict!');
                    }, function (JML) {
                        jqP('.jm-file-menu').hide();
                    });

                } else {
                    JML.setLayoutName(name, function (JML) {
                        alert('Please choose another name ' + name + ' already exists!');
                    }, function (changed, JML) {
                        if (changed) {
                            self.getLayout().saveFile();
                            jqP('.jm-file-menu').hide();
                        } else {
                            alert('problem saving your file!');
                        }
                    });
                }
            });
        };

        jqP('#saveSectionJelly').click(function () {

            if (jqP('#jellySaveFile').is(':visible')) {
                jqP('#jellySaveFile').hide();
            } else {
                jqP('.jm-file-menu').hide();
                jqP('#jellySaveFile').show();
                jqP('.jm-savefile').unbind();
                jqP('.jm-savefile').click(function () {
                    self.getLayout().saveFile(function (JML) {
                        alert('you need to name your file!');
                        openFileNamer();
                    });
                    jqP('.jm-file-menu').hide();

                });
                jqP('.jm-saveAsfile').unbind();
                jqP('.jm-saveAsfile').click(function () {
                    openFileNamer();
                });
                jqP('.jm-saveAsTemplatefile').unbind();
                jqP('.jm-saveAsTemplatefile').click(function () {
                    openFileNamer(true);
                });
                jqP('.jm-trashfile').unbind();
                jqP('.jm-trashfile').click(function () {
                    var deleteAsk = confirm('Do you want to permanently delete this layout?');
                    if (deleteAsk) {
                        self.getLayout().deleteFile(function (fileDeleted, filename) {
                            if (fileDeleted) {
                                alert('Your File, ' + filename + ' was Deleted');
                            } else {
                                alert('Your File was unable to be deleted!');
                            }
                        });
                    }
                });
            }


        });
        jqP('#openSectionJelly').click(function () {

            if (jqP('#jellyOpenFile').is(':visible')) {
                jqP('#jellyOpenFile').hide();
            } else {
                self.getLayout().getLayoutFiles(function (JML) {
                    jqP('#jellyOpenFile').html(JMCassets.div.openFileInner(JML.getLayoutFiles()));
                    jqP('.jm-open-file').unbind();
                    jqP('.jm-open-file').click(function () {
                        var filename = jqP(this).data('filename');
                        self.getLayout().loadFile(filename);
                        jqP('#jellyOpenFile').hide();
                    });
                    jqP('.jm-file-menu').hide();
                    jqP('#jellyOpenFile').show();
                });
            }
        });
        jqP('#jellyOpenFile').css(JMCassets.css.fileMenu());
        jqP('#jellyNameFile').css(JMCassets.css.fileMenu());
        jqP('#jellySaveFile').css(JMCassets.css.fileMenu());
        this.setScreenMode('desktop');

        var masterControlId = this.getSectionControlElementId();
        jqP('#' + masterControlId).append(
            JMCassets.div.screenTypeMasterControls()
        );

        this.initControlTheme();
    }

    setControlTheme(theme) {
        if (theme == 'light' || theme == 'dark') {
            this.controlTheme = theme;
            this.setCookie('jm_control_theme', theme, 1000000);
        }
    }

    getControlTheme() {
        var cookieControlTheme = this.getCookie('jm_control_theme');
        if (cookieControlTheme != null) {
            this.controlTheme = cookieControlTheme;
        }
        return this.controlTheme;
    }

    initControlTheme() {
        var darkHtml = '<i class="fa fa-toggle-on" aria-hidden="true"></i>';
        var lightHtml = '<i class="fa fa-toggle-off" aria-hidden="true"></i>';
        var jqP = this.getJQuery();
        var self = this;
        var html;
        var controlTheme = this.getControlTheme();
        switch (controlTheme) {
            case'light':
                html = lightHtml;
                break;
            case 'dark':
                html = darkHtml;
                break;
        }
        jqP('#change-control-theme-jelly').html(html);
        jqP('#change-control-theme-jelly').data('theme', controlTheme);
        jqP('#change-control-theme-jelly').unbind();
        jqP('#change-control-theme-jelly').click(function () {
            var that = jqP(this);
            var currentTheme = self.getControlTheme();
            var theme;
            if (currentTheme == 'light') {
                theme = 'dark';
                that.html(darkHtml);
                alert('Control Theme set to Dark!');
            } else {
                theme = 'light';
                that.html(lightHtml);
                alert('Control Theme set to Light!');
            }
            that.data('theme', theme);
            self.setControlTheme(theme);
        });
    }

    getConfig(reload) {
        reload = reload || false;
        if (this.config == null || reload) {

            this.config = new JellyConfig(this);
        }
        return this.config;
    }

    setChildZIndex() {


        var jq = this.getChildJQuery();
        var getSelector = function (el) {
            var $el = jq(el);

            var id = $el.attr("id");
            if (id) { //"should" only be one of these if theres an ID
                return "#" + id;
            }

            var selector = $el.parents()
                .map(function () {
                    return this.tagName;
                })
                .get().reverse().join(" ");

            if (selector) {
                selector += " " + $el[0].nodeName;
            }

            var classNames = $el.attr("class");
            if (classNames) {
                selector += "." + jq.trim(classNames).replace(/\s/gi, ".");
            }

            var name = $el.attr('name');
            if (name) {
                selector += "[name='" + name + "']";
            }
            if (!name) {
                var index = $el.index();
                if (index) {
                    index = index + 1;
                    selector += ":nth-child(" + index + ")";
                }
            }
            return selector;
        };
        var highestZIndex = 0;

        jq('*').each(function () {
            var zIndex = jq(this).css('z-index');
            if (!isNaN(zIndex)) {

                if (zIndex > highestZIndex) {
                    highestZIndex = zIndex;
                }

            }

        });
        console.log('Original Highest Z-index=' + highestZIndex);
        if (highestZIndex > 167772) {
            highestZIndex = 167772;
            console.log('Adjusted Highest Z-index=' + highestZIndex);
            jq('*').each(function () {
                var zIndex = jq(this).css('z-index');
                if (!isNaN(zIndex)) {

                    if (zIndex > highestZIndex) {
                        console.log('too high z-index!');

                        var cssIdClass = getSelector(this);
                        console.log(cssIdClass);
                        jq('head').append('<style>' + cssIdClass + '{z-index:167772 !important;}</style>');
                    }


                }

            });
        }
        JMCassets.css.setHighestZindex(highestZIndex);


    }

    /**
     *
     * @param newFontsArray
     */
    setNewFontsArray(newFontsArray) {
        this.newFontsArray = newFontsArray;
    }

    applyNewFonts() {
        if (this.fontsApplied == false) {

            JMCassets.div.mergeFonts(this.newFontsArray);
            this.fontsApplied = true;
        }

    }


    getChildDocument() {
        return this.childDocument;
    }

    getChildWindow() {
        return this.childWindow;
    }

    getDevice() {
        return this.device.getDevice();
    }

    getJellyChild() {
        return this.jellyChild;
    }

    clearDisplay() {
        var jq = this.getChildJQuery();
        var jqP = this.getJQuery();
        jq('#' + this.getChildDomElementId()).html(JMCassets.div.screenTypePageDivs());
        jqP('#' + this.getSectionControlElementId() + ' .jelly-screen-type').html('');
        this.setScreenMode(this.screenTypeMode);
        this.resetSectionCount();
        this.resetInstances();

    }

    getChildDomElementId() {
        return this.childDomElementId;
    }


    getJQuery() {
        return this.jQuery;
    }

    getChildJQuery() {
        return this.childJQuery;
    }


    getSectionControlElementId() {

        return this.sectionControlElementId;
    }

    getSectionControlScreenId(screenType) {
        screenType = screenType || this.getScreenMode();
        switch (screenType) {
            case'desktop':
                return 'jellySectionDesktop';
                break;
            case'tablet':
                return 'jellySectionTablet';
                break;
            case'mobile':
                return 'jellySectionMobile';
                break;
        }
        return false;
    }

    getDomElementId() {
        return this.DomElementId;
    }

    isJellyChildReady() {
        if (this.jellyChildReady == true) {
            return true;
        }
        return false;
    }

    /**
     *
     * @param contents
     * @param inToId
     * @param callback
     * @returns {boolean}
     */
    jellyChildPut(contents, inToId, callback) {

        if (this.isJellyChildReady() && typeof(this.jellyChild.JMD.jellyPut) == 'function') {

            this.jellyChild.JMD.jellyPut(contents, inToId, callback);
            console.log('jellyPut on child called!');
            return true;
        }
        console.log('jellyPut on child can not be called!');
        return false;

    }

    syncUniqueIds() {
        var layout = this.getLayout();
        var currentId = layout.getCurrentUniqueId();
        this.uniqueIdNo = currentId;
    }

    getUniqueIdNo() {

        var layout = this.getLayout();
        var currentId = layout.getCurrentUniqueId();

        if (currentId > this.uniqueIdNo) {
            this.uniqueIdNo = currentId;
        }

        this.uniqueIdNo++;
        layout.handleUniqueId(this.uniqueIdNo);
        return this.uniqueIdNo;
    }

    /**
     *
     * @param contents
     * @param inToId
     * @param callback
     * @param attempts
     * @returns {boolean}
     */
    putJelly(contents, inToId, callback, attempts) {

        console.log(this);

        attempts = attempts || 0;
        console.log(attempts);
        if (attempts > 10) {
            alert('JellyMould unable to put page contents');
            return false;
        }
        var jellyChild = this.jellyChildPut(contents, inToId, callback);
        if (jellyChild) {

            return true;
        } else {
            setTimeout(function () {
                attempts++;
                this.putJelly(contents, inToId, callback, attempts);
            }.bind(this), 650);

            return false;
        }
    }

    reNumberSectionControlHeadings() {
        var jqP = this.getJQuery();
        var self = this;
        var devices = ['desktop', 'tablet', 'mobile'];
        var i;
        for (i = 0; i < devices.length; i++) {
            var screenType = devices[i];
            self.sectionCount[screenType] = 0;
            var screenId = self.getSectionControlScreenId(screenType)
            jqP('#' + screenId + ' .jelly-section-control-heading').each(function () {
                self.sectionCount[screenType]++;
                jqP(this).html('Section ' + self.sectionCount[screenType]);
            });
        }
    }

    initSectionFunctions(id, retryCount) {
        retryCount = retryCount || 0;
        var jqP = this.getJQuery();
        var jq = this.getChildJQuery();
        var self = this;
        if (typeof(jq) == 'undefined') {
            if (retryCount > 10) {
                alert('Can not talk to Child Window Jquery!');
                return false;
            }
            retryCount++;
            setTimeout(function () {
                self.initSectionFunctions(id, retryCount);
            }, 500);
            return;
        }


        jqP('.jelly-section-add-text').unbind();
        jqP('.jelly-section-add-text').click(function () {
            var that = jqP(this);
            var inToId = that.data('section_id');
            var putId = that.data('put_id');
            self.putText('...', inToId, putId);
        });
        jqP('.jelly-section-remove').unbind();
        jqP('.jelly-section-remove').click(function () {
            var t = confirm('Are you sure you want to delete this section and all its contents?');
            if (t == true) {
                var that = jqP(this);

                var removeId = that.data('remove_id');
                jq('#' + JMCassets.div.sectionOuterId(removeId)).remove();
                jqP('#' + JMCassets.div.sectionMasterControlId(removeId)).remove();
                self.getLayout().removeSection(removeId);
                setTimeout(function () {
                    self.reNumberSectionControlHeadings();
                }, 1500);

            }
        });
        jqP('.jelly-section-asset-button').unbind();
        jqP('.jelly-section-asset-button').click(function () {

            var that = jqP(this);
            var putId = that.data('put_id');
            var inToId = that.data('section_id');
            var sectionControlId = that.data('section_control_id');
            var assetId = jqP('#' + sectionControlId + ' .jelly-section-asset').val();

            self.putAsset(assetId, inToId, putId);
        });
        jqP('#' + JMCassets.div.sectionMasterControlId(id)).click(function () {
            var offset = 100; //Offset of 20px
            self.highlightSectionMasterControls(id);


            jq('.' + JMCassets.div.sectionOuterClass()).each(function () {
                jq(this).css(JMCassets.css.dragOutline(false));
                jq(this).css(JMCassets.css.dragOutlineParent(false));

            });
            jq('.' + JMCassets.div.sectionInnerClass()).each(function () {
                jq(this).css(JMCassets.css.dragOutline(false));
                jq(this).css(JMCassets.css.dragOutlineParent(false));

            });

            jq('#' + JMCassets.div.sectionInnerId(id)).css(JMCassets.css.dragOutline(
                true, self.getSectionOutlineColor()
            ));
            jq('#' + JMCassets.div.sectionInnerId(id)).css(JMCassets.css.dragOutlineParent(true));
            jq('#' + JMCassets.div.sectionOuterId(id)).css(JMCassets.css.dragOutline(
                true, self.getSectionOutlineColor()
            ));
            jq('#' + JMCassets.div.sectionOuterId(id)).css(JMCassets.css.dragOutlineParent(true));

            jq('html, body').animate({
                scrollTop: jq('#' + JMCassets.div.sectionOuterId(id)).offset().top - offset
            }, 700);

            self.setCopyLocation(id);
        });


    }

    highlightSectionMasterControls(id) {
        var jqP = this.getJQuery();
        this.unHighlightSectionMasterControls();
        jqP('#' + JMCassets.div.sectionMasterControlId(id)).css(JMCassets.css.sectionMasterControlHighlight());
    }

    unHighlightSectionMasterControls() {
        var jqP = this.getJQuery();
        jqP('.jelly-section-control').each(function () {
            jqP(this).css(JMCassets.css.sectionMasterControl());
        });
    }

    /**
     *
     * @param id
     */
    initTextControlPoints(id) {

        this.pointer[id] = new JellyPointer('text', this.getJQuery(), this.getChildJQuery(), this);

        this.pointer[id].initControlPointers(id);

    }

    initSectionControlPoints(id) {
        this.pointer[id] = new JellyPointer('section', this.getJQuery(), this.getChildJQuery(), this);

        this.pointer[id].initControlPointers(id);
    }

    /**
     *
     * @param id
     * @param type
     * @returns {*}
     */
    getColorSpectrum(id, type) {

        if (typeof(this.jellyColor[id]) != 'undefined') {
            return this.jellyColor[id];
        }
        var jq = this.getChildJQuery();
        this.jellyColor[id] = new JellyColor(jq, id, type, this);
        this.jellyColor[id].colorSelectorInit();
    }

    /**
     *
     * @param id
     * @returns {*}
     */
    getTextControl(id, type) {

        if (typeof(this.jellyFont[id]) != 'undefined') {
            return this.jellyFont[id];
        }
        var jq = this.getChildJQuery();
        this.jellyFont[id] = new JellyFont(jq, id, type, this);
        this.jellyFont[id].fontSelectorInit();
        this.jellyFont[id].fontOptionsInit();

    }

    /**
     *
     * @param id
     * @param type
     * @returns {*}
     */
    getBoxControl(id, type, mousePos) {
        type = type || 'text';
        if (typeof(this.jellyBox[id]) != 'undefined') {
            return this.jellyBox[id];
        }
        var jq = this.getChildJQuery();
        this.jellyBox[id] = new JellyBox(jq, id, type, mousePos, this);
        this.jellyBox[id].zIndexInit();
        this.jellyBox[id].reorderInit();
        this.jellyBox[id].trashInit();
        this.jellyBox[id].copyInit();
        this.jellyBox[id].functionInit();
    }

    /**
     *
     * @param id
     * @param type
     * @returns {*}
     */
    getImageControl(id, type) {
        type = type || 'text';
        if (typeof(this.jellyImage[id]) != 'undefined') {
            return this.jellyImage[id];
        }
        var jq = this.getChildJQuery();
        this.jellyImage[id] = new JellyImage(jq, id, type, this);
        this.jellyImage[id].imageInit();

    }

    /**
     *
     * @param elementSelf
     * @returns {boolean}
     */
    unlockWorkingWithElement(elementSelf) {
        if (this.canWorkWithElement(elementSelf)) {
            this.workingElement = null;
            return true;
        }

        return false;
    }

    /**
     *
     * @param elementSelf
     */
    lockWorkingWithElement(elementSelf) {
        this.workingElement = elementSelf;
    }

    /**
     *
     * @param elementSelf
     * @param strict
     * @returns {boolean}
     */
    canWorkWithElement(elementSelf, strict) {

        strict = strict || false;
        if (this.workingElement == elementSelf || (this.workingElement == null && strict == false)) {
            return true;
        }
        return false;
    }


    /**
     *
     * @param id
     * @param left
     * @param top
     */
    receiveJelly(id, left, top) {
        this.getLayout().editContentSettings(id, {
            outer: {
                'position': 'absolute',
                'left': left + 'px',
                'top': top + 'px'
            }
        }, true);
        this.fixControlPosition(id);

    }

    fixControlPosition(id) {
        var JML = this.getLayout();
        var content = JML.getContentByUniqueId(id);
        var jq = this.getChildJQuery();
        var childWindow = this.getChildWindow();
        var maxWidth = jq(childWindow).width();
        var device = this.getDevice();
        if (content && device == 'desktop') {
            var hPos = content.outer.left;
            hPos = hPos.replace('px', '');
            hPos = parseInt(hPos);
            var newLeft = 'auto';
            var newRight = 'auto';
            var movement = -175;
            switch (content.boxType) {
                case'asset':
                    if (jq('#' + JMCassets.div.assetControlId(id)).width() > (maxWidth / 2)) {
                        movement = 0;
                    }
                    break;
                case'text':
                    if (jq('#' + JMCassets.div.textControlId(id)).width() > (maxWidth / 2)) {
                        movement = 0;
                    }
                    break;
            }
            if (hPos > ((maxWidth / 2) - 150)) {
                newLeft = movement + 'px';
                newRight = 'auto';
            }

            if (hPos < 300) {
                newLeft = 'auto';
                newRight = movement + 'px';
            }


            switch (content.boxType) {
                case'asset':
                    jq('#' + JMCassets.div.assetControlId(id)).css({'left': newLeft, 'right': newRight});
                    break;
                case 'text':

                    jq('#' + JMCassets.div.textControlId(id)).css({'left': newLeft, 'right': newRight});
                    break;
            }

        }

    }

    test(test) {
        alert(this.getDevice() + ' ' + test);
    }


    setMode(id, mode, noApply) {
        noApply = noApply || false;
        mode = mode || 'full';
        this.sectionModes[id] = mode;
        this.jellyImage[id].setMode(mode);
        if (noApply == false) {
            this.jellyImage[id].applyChanges();
        }
    }

    getMode(id) {

        return this.sectionModes[id];
    }


    /**
     *
     * @param id
     */
    initSectionControls(id, device) {
        device = device || this.getScreenMode();
        var mode = 'full';
        this.sectionCount[device]++;

        var controlScreenId = this.getSectionControlScreenId(device);
        var jqP = this.getJQuery();
        var sectionHeading = 'Section ' + this.sectionCount[device];
        jqP('#' + controlScreenId).append(JMCassets.div.sectionMasterControl(id, sectionHeading, mode, this.assets));
        jqP('#' + JMCassets.div.sectionMasterControlId(id)).css(JMCassets.css.sectionMasterControl());
        jqP('#' + JMCassets.div.sectionMasterControlId(id) + ' select').css(JMCassets.css.sectionMasterControlSelect());
        this.initSectionFunctions(id);
    }


    useImageUrl(imageUrl) {
        this.currentImageUrl = imageUrl;
        this.callImageSelectFunction();
    }

    setImageSelectFunction(callback) {
        this.imageSelectFunction = callback;
    }

    callImageSelectFunction() {
        return this.imageSelectFunction(this.currentImageUrl);
    }

    setOpenImageChooseFunction(callback) {
        this.openImageChooseFunction = callback;
    }

    destroyImageSelectFunction() {
        this.initImageSelectFunction();
    }

    initImageSelectFunction() {
        this.imageSelectFunction = function () {
            alert('No Box / Section Selected');
        };
    }

    openImageChoose() {
        this.openImageChooseFunction();
    }

    /**
     *
     * @param assetName
     * @param width
     * @param height
     * @param assetOptions
     * @param callbackFrontEnd(id, win, jq, jqId, assetOptions)
     * @param callbackAdmin
     * @returns {*}
     */
    addAsset(assetName, width, height, assetOptions, callbackFrontEnd, callbackAdmin, noCursor) {
        noCursor = noCursor || false;
        if (noCursor == false) {
            var showCursor = true;
        } else {
            var showCursor = false;
        }
        var assetOptions = assetOptions || {};
        var i = this.assets.length;
        callbackFrontEnd = callbackFrontEnd || function () {
                console.log('no frontend asset callback!');
            };
        callbackAdmin = callbackAdmin || function () {
                console.log('no admin asset callback!');
            };
        this.assets[i] = {
            'assetName': assetName,
            'width': width,
            'height': height,
            'callbackFrontEnd': callbackFrontEnd,
            'callbackAdmin': callbackAdmin,
            'assetOptions': assetOptions,
            'showCursor': showCursor
        };

        return this.assets[i];
    }

    jsonEncode(obj) {
        var json = JSON.stringify(obj, function (k, v) {
            //special treatment for function types
            if (typeof v === "function") {
                return v.toString();//we save the function as string
            }
            return v;
        });

        return json;
    }

    jsonDecode(json) {
        var self = this;
        var obj = JSON.parse(json, function (k, v) {
            // there is probably a better way to determ if a value is a function string
            if (typeof v === "string" && v.indexOf("function") !== -1)
                return self.compileFunction(v);
            return v;
        });

        return obj;
    }

    compileFunction(str) {
        //find parameters
        var pstart = str.indexOf('('), pend = str.indexOf(')');
        var params = str.substring(pstart + 1, pend);
        params = params.trim();

        //find function body
        var bstart = str.indexOf('{'), bend = str.lastIndexOf('}');
        var str = str.substring(bstart + 1, bend);

        return Function(params, str);
    }

    sectionInToId(screenMode) {
        screenMode = screenMode || this.getScreenMode();
        switch (screenMode) {
            case'desktop':
                return 'jellyMould-desktop';
                break;
            case'tablet':
                return 'jellyMould-tablet';
                break;
            case'mobile':
                return 'jellyMould-mobile';
                break;
        }
    }


    /**
     *
     * @param inToId
     * @param sectionObject
     */
    putSection(inToId, currentSection) {

        currentSection = currentSection || false;
        if (currentSection) {
            var id = currentSection.uniqueId;
            var device = currentSection.screenType;
        } else {

            var id = this.getUniqueIdNo();
            var device = this.getScreenMode();
        }
        var content = JMCassets.div.section(id, '');
        var self = this;
        /**
         * puts control box on admin parent window
         */

        this.initSectionControls(id, device);

        inToId = inToId || this.sectionInToId(device);
        this.putJelly(content, inToId, function (jq) {

            /**
             * set control
             */
            jq('#' + JMCassets.div.sectionControlId(id)).hide();
            jq('#' + JMCassets.div.sectionControlId(id)).css(JMCassets.css.sectionControl());
            jq('#' + JMCassets.div.sectionControlInnerId(id)).css(JMCassets.css.sectionControlInner());
            /**
             * set Control Point Element
             */
            var jqControlPoints = jq('#' + JMCassets.div.sectionOuterId(id) + ' .' +
                JMCassets.div.controlPointClass('section'));
            jqControlPoints.css(JMCassets.css.controlPoint(null, 'section'));

            /**
             * dash box
             * z-indexing
             */
            jq('#' + JMCassets.div.sectionOuterId(id)).mouseover(function () {

                if (self.workingElement == null) {
                    jq(this).css(JMCassets.css.dragOutline(true, self.getDragOutlineColor(), false));
                    jq(this).css(JMCassets.css.dragOutlineParent(true));
                    jqControlPoints.show();
                    self.highlightSectionMasterControls(id);
                    jq('#' + JMCassets.div.sectionControlId(id)).show();
                }

            }).mouseout(function () {
                if (self.workingElement == null) {
                    jq(this).css(JMCassets.css.dragOutline(false));
                    jq(this).css(JMCassets.css.dragOutlineParent(false));
                    jqControlPoints.hide();
                }
                jq('#' + JMCassets.div.sectionControlId(id)).hide();
            });
            jq('#' + JMCassets.div.sectionInnerId(id)).mouseover(function () {
                if (self.getMouseOverContent() == false) {
                    self.setCopyLocation(id);
                }
                if (self.workingElement == null) {
                    jq(this).css(JMCassets.css.dragOutline(true, self.getDragOutlineColor(true), false));
                    jq(this).css(JMCassets.css.dragOutlineParent(true));
                }
            }).mouseout(function () {
                if (self.getMouseOverContent() == false) {
                    self.setCopyLocation();
                }
                if (self.workingElement == null) {
                    jq(this).css(JMCassets.css.dragOutline(false));
                    jq(this).css(JMCassets.css.dragOutlineParent(false));
                }
            });
            jq('#' + JMCassets.div.sectionInnerId(id)).dblclick(function (e) {

                if (self.getMouseOverContent() == false && self.workingElement == null) {
                    var left = e.offsetX;
                    var top = e.offsetY;
                    self.putText('...', JMCassets.div.sectionInnerId(id), id, undefined, {top: top, left: left});
                    ;
                }
            });
            /**
             * section css
             */
            jq('#' + JMCassets.div.sectionOuterId(id)).css(
                JMCassets.css.sectionOuter()
            );

            jq('#' + JMCassets.div.sectionInnerId(id)).css(
                JMCassets.css.sectionInner(device)
            );

            /**
             * control
             */
            jq('#' + JMCassets.div.sectionControlId(id)).css(
                JMCassets.css.sectionControl()
            );
            /**
             * LAYOUT
             */
            if (currentSection == false) {
                self.getLayout().addSection(device, id);
            }
            self.getImageControl(id, 'section');
            self.getColorSpectrum(id, 'section');
            self.setMode(id, 'full');
            self.getBoxControl(id, 'section');


            /**
             * control points
             */
            self.initSectionControlPoints(id);
            if (currentSection) {
                self.processSectionFromLoad(currentSection);
            }

        });

    }

    processSectionFromLoad(currentSection) {
        var jq = this.getChildJQuery();
        var id = currentSection.uniqueId;
        jq('#' + JMCassets.div.sectionInnerId(id)).css(currentSection.inner);
        jq('#' + JMCassets.div.sectionOuterId(id)).css(currentSection.outer);
        var bgColor = currentSection.outer['background-color'] || undefined;
        var color = currentSection.inner['background-color'] || undefined;
        this.jellyColor[id].colorSelectorInit(color, bgColor);
        this.setMode(id, currentSection.mode, true);
        this.jellyImage[id].setInitValues(currentSection);
        this.jellyImage[id].appendImageControl();
        this.jellyImage[id].imageControlFunctions();
        this.jellyImage[id].applyChanges();

    }

    outlineDash(jq, jQueryId, id, putId, flash, showCursor) {

        showCursor = showCursor || false;
        flash = flash || false;
        jq = jq || this.getChildJQuery();
        var self = this;
        var loop;
        if (flash == true) {
            var i = 0;
            loop = setInterval(function () {

                if (i % 2 == 0) {
                    jq(jQueryId + '.' +
                        JMCassets.div.dragOutlineClass()).css(JMCassets.css.dragOutline(true, self.getDragOutlineColor(), showCursor));
                } else {
                    jq(jQueryId + '.' +
                        JMCassets.div.dragOutlineClass()).css(JMCassets.css.dragOutline(false));
                }
                i++;
            }.bind(i), 1000);
        }
        jq(jQueryId).mouseover(function () {
            self.mouseOverContent = true;
            self.setCopyLocation(putId, id);
            clearInterval(loop);
            if (self.canWorkWithElement(this, true)) {
                var zIndex = jq(this).parent().data('zIndex');

                jq(this).parent().css(JMCassets.css.dragOutlineParent(true, zIndex));

            }
            jq('#' + this.id + '.' +
                JMCassets.div.dragOutlineClass()).css(JMCassets.css.dragOutline(true, self.getDragOutlineColor(), showCursor));
        }).mouseout(function () {
            self.mouseOverContent = false;
            self.setCopyLocation(putId, null);
            if (self.canWorkWithElement(this, true) == false) {
                var zIndex = jq(this).parent().data('zIndex');


                jq(this).parent().css(JMCassets.css.dragOutlineParent(false, zIndex));
            }
            jq('#' + this.id + '.' + JMCassets.div.dragOutlineClass()).css(JMCassets.css.dragOutline(false));
        });


    }

    /**
     *
     * @param text
     * @param inToId
     * @param textObject
     */
    putText(text, inToId, putId, currentContent, mousePos) {
        mousePos = mousePos || false;
        currentContent = currentContent || false;

        this.applyNewFonts();
        if (currentContent) {
            var id = currentContent.uniqueId;
            var flashOnInit = false;
        } else {
            var flashOnInit = true;
            var id = this.getUniqueIdNo();
        }

        var textControl = JMCassets.div.textControl(id, text);
        var contents = JMCassets.div.dragDiv(text, textControl, id, 'text');
        var self = this;

        this.putJelly(contents, inToId, function (jq) {
            /**
             * control
             */
            jq('#' + JMCassets.div.textControlId(id)).hide();
            jq('#' + JMCassets.div.textControlId(id)).css(JMCassets.css.textControl());
            jq('#' + JMCassets.div.textControlInnerId(id)).css(JMCassets.css.textControlInner());
            jq('#' + JMCassets.div.textControlInputId(id)).css(JMCassets.css.textInput());
            jq('#' + JMCassets.div.controlTipId(id)).css(JMCassets.css.controlTip());


            /**
             * jelly box divs
             */
            jq('#' + JMCassets.div.textOuterId(id)).css(JMCassets.css.textOuter());
            jq('#' + JMCassets.div.textId(id)).css(JMCassets.css.text());
            jq('#' + JMCassets.div.textOuterId(id)).css(JMCassets.css.textBoxInit());

            /**
             * control points
             */
            self.initTextControlPoints(id);
            var jqControlPoints = jq('#' + JMCassets.div.textId(id) + ' .' + JMCassets.div.controlPointClass('text'));
            jqControlPoints.css(JMCassets.css.controlPoint());


            /**
             * dash box
             * z-indexing
             */
            self.outlineDash(jq, '#' + JMCassets.div.textId(id), id, putId, flashOnInit, true);

            /**
             * LAYOUT
             */
            if (currentContent == false) {
                self.getLayout().addContent('text', putId, id);
            }
            /**
             * element controls
             */

            self.getColorSpectrum(id, 'text');
            self.getTextControl(id, 'text');
            self.getBoxControl(id, 'text', mousePos);
            self.getImageControl(id, 'text');

            jq('#' + JMCassets.div.textId(id)).dblclick(function () {
                if (jqControlPoints.is(':visible')) {
                    self.unlockWorkingWithElement(this);
                    jqControlPoints.toggle();
                    jq('#' + JMCassets.div.textControlId(id)).toggle();
                } else {
                    if (self.canWorkWithElement(this)) {
                        jqControlPoints.toggle();
                        jq('#' + JMCassets.div.textControlId(id)).toggle();
                        self.lockWorkingWithElement(this);
                        var zIndex = jq(this).parent().data('zIndex');
                        console.log(JMCassets.css.dragOutlineParent(true, zIndex));
                        jq(this).parent().css(JMCassets.css.dragOutlineParent(true, zIndex));
                    } else {
                        alert('Double Click last element worked with to unlock it!');
                    }
                }

                self.destroyImageSelectFunction();
            });

            jq('#' + JMCassets.div.textControlInputId(id)).val(text);
            self.typeTimer[id] = null;
            jq('#' + JMCassets.div.textControlInputId(id)).keyup(function (e) {
                clearTimeout(self.typeTimer[id]);
                var that = jq(this);
                var value = that.val();

                value = value.replace(/(?:\\[rn]|[\r\n]+)+/g, "<br />");

                var changeId = that.data('jelly-change-id');
                self.getLayout().editContentSettings(id, {'text': value});
                jq('#' + changeId).html(value);
                self.typeTimer[id] = setTimeout(function () {
                    that.val(value);
                }, 20000);

            });
            if (currentContent) {
                self.processTextFromLoad(currentContent);
            }

        }.bind({JMCassets, self}));

    }

    processTextFromLoad(currentContent) {
        var jq = this.getChildJQuery();
        var id = currentContent.uniqueId;
        jq('#' + JMCassets.div.textInnerId(id)).css(currentContent.inner);
        jq('#' + JMCassets.div.textId(id)).css(currentContent.middle);
        jq('#' + JMCassets.div.textOuterId(id)).css(currentContent.outer);
        var bgColor = currentContent.inner['background-color'] || undefined;
        var color = currentContent.inner['color'] || undefined;
        var borderColor = currentContent.inner['border-color'] || undefined;
        this.jellyColor[id].colorSelectorInit(color, bgColor, borderColor);
        this.jellyImage[id].setInitValues(currentContent);
        this.jellyImage[id].appendImageControl();
        this.jellyImage[id].imageControlFunctions();
        this.jellyImage[id].applyChanges();
        var zIndex = currentContent.outer['z-index'] || undefined;
        this.jellyBox[id].zIndexInit(zIndex);
        this.jellyFont[id].fontOptionsInit(currentContent.inner);
        var font = currentContent.inner['font-family'] || undefined;
        this.jellyFont[id].fontSelectorInit(font);
        this.jellyBox[id].setInitValues(currentContent);
        this.jellyBox[id].functionInit();

    }

    getAsset(assetId) {
        return this.assets[assetId];
    }

    cloneAsset(assetId, uniqueId) {
        uniqueId = uniqueId || this.getUniqueIdNo();
        var unclonedAsset = this.getAsset(assetId);
        var clonedAsset = this.setAssetById(uniqueId, unclonedAsset);
        return clonedAsset;
    }

    /**
     *
     * @param assetId
     * @param inToId
     */
    putAsset(assetId, inToId, putId, currentContent) {
        currentContent = currentContent || false;
        if (currentContent) {
            var flashOnInit = false;
            var id = currentContent.uniqueId;
        } else {
            var flashOnInit = true;
            var id = this.getUniqueIdNo();
        }

        var self = this;
        if (currentContent) {
            var asset = this.setAssetById(id, currentContent);
        } else {
            var asset = this.cloneAsset(assetId, id);
        }
        var jqId = '#' + JMCassets.div.assetInnerId(id);
        var contents = JMCassets.div.asset(id, asset.assetOptions);

        this.putJelly(contents, inToId, function (jq, win) {
            /**
             * control
             */
            jq('#' + JMCassets.div.assetControlId(id)).hide();
            jq('#' + JMCassets.div.assetControlId(id)).css(JMCassets.css.assetControl());
            jq('#' + JMCassets.div.assetControlInnerId(id)).css(JMCassets.css.assetControlInner());
            jq('#' + JMCassets.div.assetControlInnerId(id) + ' .jelly-assets-options').css(JMCassets.css.assetOptions());
            /**
             * css
             */
            jq('#' + JMCassets.div.assetOuterId(id)).css(JMCassets.css.assetOuter());
            jq('#' + JMCassets.div.assetInnerId(id)).css(JMCassets.css.assetInner(asset.width, asset.height));

            /**
             * frontend callback
             */
            asset.callbackFrontEnd(id, win, jq, jqId, asset.assetOptions);
            self.getBoxControl(id, 'asset');
            /**
             * dash outline
             */
            self.outlineDash(jq, '#' + JMCassets.div.assetId(id), id, putId, flashOnInit, asset.showCursor);
            /**
             * admin callback
             */
            jq('#' + JMCassets.div.assetId(id)).dblclick(function () {
                if (jq('#' + JMCassets.div.assetControlId(id)).is(':visible')) {
                    self.unlockWorkingWithElement(this);

                    jq('#' + JMCassets.div.assetControlId(id)).toggle();


                } else {
                    if (self.canWorkWithElement(this)) {

                        jq('#' + JMCassets.div.assetControlId(id)).toggle();
                        self.lockWorkingWithElement(this);
                        var zIndex = jq(this).parent().data('zIndex');
                        console.log(JMCassets.css.dragOutlineParent(true, zIndex));
                        jq(this).parent().css(JMCassets.css.dragOutlineParent(true, zIndex));
                    } else {
                        alert('Double Click last element worked with to unlock it!');
                    }
                }

            });
            /**
             * LAYOUT
             */
            if (currentContent == false) {
                self.getLayout().addContent('asset', putId, id);
            }
            self.assetOptionsFunctions(id, assetId);

            asset.callbackAdmin(id, self, asset.assetOptions);
            if (currentContent) {
                self.processAssetFromLoad(currentContent);
            }
        });

    }

    processAssetFromLoad(currentContent) {
        var jq = this.getChildJQuery();
        var id = currentContent.uniqueId;
        jq('#' + JMCassets.div.assetOuterId(id)).css(currentContent.outer);
        var zIndex = currentContent.outer['z-index'] || undefined;
        this.jellyBox[id].zIndexInit(zIndex);

    }

    setAssetById(id, asset) {
        var json = this.jsonEncode(asset);
        var clonedAsset = this.jsonDecode(json);
        this.assetById[id] = clonedAsset;
        return this.getAssetById(id);
    }

    getAssetById(id) {
        return this.assetById[id];
    }

    applyAssetOptions(id) {
        var jq = this.getChildJQuery();
        var asset = this.getAssetById(id);
        var assetOptions = asset.assetOptions;
        var jqId = '#' + JMCassets.div.assetInnerId(id);
        var self = this;

        var win = this.getChildWindow();

        var i = 0;
        Object.keys(assetOptions).forEach(function (key) {
            if (typeof(assetOptions[key]) == 'object' && typeof(assetOptions[key].selected) != 'undefined') {
                assetOptions[key].selected = jq('#' + JMCassets.div.assetOptionId(id, i)).val();
            } else if (typeof(assetOptions[key]) == 'object' && typeof(assetOptions[key].image) != 'undefined') {
                assetOptions[key].image = jq('#' + JMCassets.div.assetOptionId(id, i)).val();
            } else if (typeof(assetOptions[key]) == 'object' && typeof(assetOptions[key].color) != 'undefined') {
                assetOptions[key].color = jq('#' + JMCassets.div.assetOptionId(id, i)).val();
            } else {
                assetOptions[key] = jq('#' + JMCassets.div.assetOptionId(id, i)).val();
            }

            i++;
        });
        asset.callbackFrontEnd(id, win, jq, jqId, asset.assetOptions);
        asset.callbackAdmin(id, self, asset.assetOptions);

        this.getLayout().editContentSettings(id, asset);

    }

    assetOptionsFunctions(id) {
        var jq = this.getChildJQuery();
        var asset = this.getAssetById(id);
        var assetOptions = asset.assetOptions;
        var self = this;
        this.getLayout().editContentSettings(id, asset);
        assetOptions = assetOptions || {};
        var myId = id;
        var i = 0;
        Object.keys(assetOptions).forEach(function (key) {
            var jQIdOption = '#' + JMCassets.div.assetOptionId(id, i);
            if (typeof(assetOptions[key]) == 'object' && typeof(assetOptions[key].image) != 'undefined') {

                jq('#' + JMCassets.div.assetChooseImageId(id, i)).click(function () {
                    self.openImageChoose();

                    self.setImageSelectFunction(function (url) {

                        jq(jQIdOption).val(url);
                        self.applyAssetOptions(myId);
                        alert('Image Set ' + url);
                    });
                });

            }

            if (typeof(assetOptions[key]) == 'object' && typeof(assetOptions[key].selected) != 'undefined') {

                jq(jQIdOption).change(function () {

                    self.applyAssetOptions(myId);
                });
            }
            if (typeof(assetOptions[key]) == 'object' && typeof(assetOptions[key].color) != 'undefined') {

                jq(jQIdOption).spectrum({
                    preferredFormat: "rgb",
                    color: assetOptions[key].color,
                    showAlpha: true,
                    showInput: true,
                    change: function (color) {

                        console.log(color);

                        var newColor = JMCassets.css.rgba(color);

                        self.applyAssetOptions(myId);

                    },
                    move: function (color) {
                        self.applyAssetOptions(myId);
                    }

                });

                jq(jQIdOption).change(function () {

                    self.applyAssetOptions(myId);
                });
            }

            jq(jQIdOption).keyup(function () {
                self.applyAssetOptions(myId);
            });

            i++;
        });


        jq('#' + JMCassets.div.assetApplyId(id)).click(function () {

            self.applyAssetOptions(myId);

        });

    }

    addClickFunction(name, callback) {
        var i = this.clickFunctions.length;
        var clickObject = {
            'name': name,
            'callback': callback
        };
        this.clickFunctions[i] = clickObject;
    }

    getJsonError(json) {

        json = this.jsonDecode(json);
        if (typeof(json.error) != 'undefined' && typeof(json.message) == 'string') {
            return json.message;
        }
        return false;
    }

    getClickFunction(functionId) {
        return this.clickFunctions[functionId];
    }

    getClickFunctions() {
        return this.clickFunctions;
    }

    setPreviewHtmlFunction(getFunction) {
        this.previewHtmlFunction = getFunction;
    }

    setSaveLayoutFunction(saveFunction) {
        this.saveLayoutFunction = saveFunction;
    }

    setSaveTemplateFunction(saveFunction) {
        this.saveTemplateFunction = saveFunction;
    }

    setLoadLayoutFunction(loadFunction) {
        this.loadLayoutFunction = loadFunction;
    }

    setLockLayoutFunction(lockFunction) {
        this.lockLayoutFunction = lockFunction;
    }

    setUnlockLayoutFunction(unlockFunction) {
        this.unlockLayoutFunction = unlockFunction;
    }

    setLockConfigFunction(lockFunction) {
        this.lockConfigFunction = lockFunction;
    }

    setUnlockConfigFunction(unlockFunction) {
        this.unlockConfigFunction = unlockFunction;
    }

    setGetLayoutsFunction(getFunction) {
        this.getLayoutsFunction = getFunction;
    }

    setDeleteLayoutFunction(deleteFunction) {
        this.deleteLayoutFunction = deleteFunction;
    }

    setLoadConfigFunction(loadFunction) {
        this.loadConfigFunction = loadFunction;
    }

    setSaveConfigFunction(saveFunction) {
        this.saveConfigFunction = saveFunction;
    }

    setResetTestDataFunction(resetFunction) {
        this.resetTestDataFunction = resetFunction;
    }

}





