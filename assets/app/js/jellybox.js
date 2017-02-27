class JellyBox extends JellyBase {
    constructor(childJQuery, id, boxType, mousePos, JMC) {
        mousePos = mousePos || false;
        super({
            boxType: boxType,
            id: id,
            childJQuery: childJQuery,
            JMC: JMC,
            jQuery: JMC.getJQuery()
        });

        if (mousePos) {
            this.cssLayoutOuter(mousePos)
        }

        this.initHref = '';
        this.initFunction = '?';
        this.initExternalScript = '?';
    }

    setInitHref(href) {
        href = href || '';
        this.initHref = href;
    }

    setInitFunction(func) {
        func = func || '?';
        this.initFunction = func;
    }

    setInitExternalScript(script) {
        script = script || '?';
        this.initExternalScript = script;
    }

    zIndexInit(initZIndex) {
        var boxType = this.getBoxType();
        if (boxType == 'text' || boxType == 'jelly' || boxType == 'asset') {

            initZIndex = initZIndex || 0;

            var jq = this.getChildJQuery();
            var id = this.getId();
            var jqOuterElement = jq('#' + this.getOuterId(id));
            var self = this;
            this.cssLayoutOuter({'z-index': initZIndex});
            jqOuterElement.data('zIndex', initZIndex);
            jq('#' + JMCassets.div.boxBackwardsId(id)).unbind();
            jq('#' + JMCassets.div.boxBackwardsId(id)).click(function () {
                var zIndex = jqOuterElement.data('zIndex');
                var newZIndex = zIndex;
                if (zIndex > 0) {
                    newZIndex = zIndex - 10;
                }

                self.cssLayoutOuter({'z-index': newZIndex});
                jqOuterElement.data('zIndex', newZIndex);
            });
            jq('#' + JMCassets.div.boxForwardsId(id)).unbind();
            jq('#' + JMCassets.div.boxForwardsId(id)).click(function () {
                var zIndex = jqOuterElement.data('zIndex');


                var newZIndex = zIndex + 10;

                self.cssLayoutOuter({'z-index': newZIndex});
                jqOuterElement.data('zIndex', newZIndex);
            });
        }

    }

    copyToClipboard() {
        var boxType = this.getBoxType();
        var jq = this.getChildJQuery();
        var id = this.getId();
        var self = this;
        var JML = this.getJML();
        switch (boxType) {
            case 'section':
                var section = JML.getSectionByUniqueId(id);
                if (section == false) {
                    alert('no section to copy!');
                }
                if (JML.setCopyDataObject(section)) {
                    alert('section set to clipboard!');
                }

                break;
            case'jelly':
            case'asset':
            case'text':
                var content = JML.getContentByUniqueId(id);
                if (content == false) {
                    alert('no content to copy!');
                }
                if (JML.setCopyDataObject(content)) {
                    alert('content set to clipboard!');
                }

                break;
                break;
        }
    }

    reorderInit() {
        var boxType = this.getBoxType();
        var win = this.getJMC().getChildWindow();

        if (boxType == 'section') {

            var jq = this.getChildJQuery();
            var id = this.getId();
            var self = this;
            //down
            jq('#' + JMCassets.div.boxBackwardsId(id)).unbind();
            jq('#' + JMCassets.div.boxBackwardsId(id)).click(function () {
                var top = win.scrollY;
                var left = win.scrollX;
                var JML = self.getJML();
                JML.moveSectionByUniqueId(id, 'down');
                setTimeout(function () {
                    jq("html, body").animate({
                        scrollTop: top,
                        scrollLeft: left
                    }, 100);
                }, 100);
            });
            //up
            jq('#' + JMCassets.div.boxForwardsId(id)).unbind();
            jq('#' + JMCassets.div.boxForwardsId(id)).click(function () {
                var top = win.scrollY;
                var left = win.scrollX;
                var JML = self.getJML();
                JML.moveSectionByUniqueId(id, 'up');
                setTimeout(function () {
                    jq("html, body").animate({
                        scrollTop: top,
                        scrollLeft: left
                    }, 100);
                }, 100);
            });

        }

    }

    setInitValues(currentObject) {
        currentObject = currentObject || false;
        if (currentObject == false) {
            return false;
        }

        var href = currentObject.href || false;
        this.setInitHref(href);
        if (typeof(currentObject.clickFunction) == 'object') {
            var func = currentObject.clickFunction.name || false;
            this.setInitFunction(func);
        }

        var extScript = currentObject.externalFunction || false;
        this.setInitExternalScript(extScript);
    }

    functionInit() {

        if (this.getBoxType() != 'text') {
            return false;
        }
        var id = this.getId();
        var jq = this.getChildJQuery();
        var self = this;
        jq('#' + JMCassets.div.functionInnerId(id)).css(JMCassets.css.functionInner());
        jq('#' + JMCassets.div.functionInnerId(id)).hide();
        jq('#' + JMCassets.div.functionOuterId(id) + ' .open-function-button').unbind();
        jq('#' + JMCassets.div.functionOuterId(id) + ' .open-function-button').click(function () {
            console.log('function open clicked');
            if (jq('#' + JMCassets.div.functionInnerId(id)).is(':visible')) {
                jq('#' + JMCassets.div.functionInnerId(id)).hide();

            } else {
                jq('#' + JMCassets.div.functionInnerId(id)).show();
                jq('#' + JMCassets.div.imageControlInnerId(id)).hide();
            }


        });
        self.appendFunctionControl();
        self.functionFunctions();
    }

    appendFunctionControl() {

        if (this.getBoxType() != 'text') {
            return false;
        }
        var id = this.getId();
        var jq = this.getChildJQuery();
        var self = this;
        var JMC = this.getJMC();
        var clickFunctions = JMC.getClickFunctions();
        var childFunctions = JMC.getChildJMFuctions();
        jq('#' + JMCassets.div.functionInnerId(id)).html(JMCassets.div.functionClickControl(
            id,
            clickFunctions,
            childFunctions
        ));
        jq('#' + JMCassets.div.clickControlId(id)).html(this.initFunction);
        jq('#' + JMCassets.div.externalScriptId(id)).html(this.initExternalScript);
        jq('#' + JMCassets.div.hrefId(id)).val(this.initHref);
    }

    functionFunctions() {

        if (this.getBoxType() != 'text') {
            return false;
        }
        var jq = this.getChildJQuery();
        var id = this.getId();
        var JML = this.getLayout();
        var self = this;
        jq('#' + JMCassets.div.clickControlUseId(id)).unbind();
        jq('#' + JMCassets.div.clickControlUseId(id)).click(function () {
            var functionId = jq('#' + JMCassets.div.clickControlSelectId(id)).val();
            var funcObject;
            if (functionId == '') {
                funcObject = false;
            } else {
                funcObject = self.getJMC().getClickFunction(functionId);
            }

            funcObject = funcObject || false;
            if (funcObject) {
                var name = funcObject.name;
                jq('#' + JMCassets.div.clickControlId(id)).html(name);
                JML.editContentSettings(id, {'clickFunction': funcObject});
            } else {
                jq('#' + JMCassets.div.clickControlId(id)).html('?');
                JML.editContentSettings(id, {'clickFunction': false});
            }
        });
        jq('#' + JMCassets.div.clickControlRunId(id)).unbind();
        jq('#' + JMCassets.div.clickControlRunId(id)).click(function () {
            var functionId = jq('#' + JMCassets.div.clickControlSelectId(id)).val();
            var funcObject;
            if (functionId == '') {
                funcObject = false;
            } else {
                funcObject = self.getJMC().getClickFunction(functionId);
            }

            funcObject = funcObject || false;
            if (funcObject) {
                var win = self.getJMC().getChildWindow();
                funcObject.callback(win, jq,'#'+self.getInnerId(id));

            } else {
                alert('There is no function to run!');
            }
        });
        jq('#' + JMCassets.div.externalScriptUseId(id)).unbind();
        jq('#' + JMCassets.div.externalScriptUseId(id)).click(function () {
            var script = jq('#' + JMCassets.div.externalScriptSelectId(id)).val();
            if (script.length) {
                jq('#' + JMCassets.div.externalScriptId(id)).html(script);
                JML.editContentSettings(id, {'externalFunction': script});
            } else {
                jq('#' + JMCassets.div.externalScriptId(id)).html('?');
                JML.editContentSettings(id, {'externalFunction': false});
            }
        });

        var hrefFunc = function (that) {
            var href = that.val();
            if (href != '') {
                JML.editContentSettings(id, {'href': href});
            } else {
                JML.editContentSettings(id, {'href': false});
            }

        };
        jq('#' + JMCassets.div.externalScriptRunId(id)).unbind();
        jq('#' + JMCassets.div.externalScriptRunId(id)).click(function () {
                var ranit = false;
                var script = jq('#' + JMCassets.div.externalScriptSelectId(id)).val();
                if (script.length) {
                    var win = self.getJMC().getChildWindow();
                    var fn = win[script];
                    if (typeof(fn) === 'function') {
                        fn.apply();
                        ranit = true;
                    }
                }
                if (ranit == false) {
                    alert('There is no script to run!');
                }
            }
        )
        ;

        var hrefFunc = function (that) {
            var href = that.val();
            if (href != '') {
                JML.editContentSettings(id, {'href': href});
            } else {
                JML.editContentSettings(id, {'href': false});
            }

        };

        jq('#' + JMCassets.div.hrefId(id)).unbind();

        jq('#' + JMCassets.div.hrefId(id)).keyup(
            function () {
                hrefFunc(jq(this));
            }
        );
        jq('#' + JMCassets.div.hrefId(id)).change(
            function () {
                hrefFunc(jq(this));
            }
        );

    }

    copyInit() {

        var jq = this.getChildJQuery();
        var id = this.getId();
        var self = this;

        jq('#' + JMCassets.div.boxCopyId(id)).unbind();
        jq('#' + JMCassets.div.boxCopyId(id)).click(function () {
            self.copyToClipboard();
        });

    }

    trashInit() {
        var jq = this.getChildJQuery();
        var id = this.getId();
        var jqP = this.getJQuery();
        var self = this;
        jq('#' + JMCassets.div.trashId(id)).unbind();
        jq('#' + JMCassets.div.trashId(id)).click(function () {
            if (self.getBoxType() == 'section') {
                jqP('#' + JMCassets.div.sectionMasterControlId(id) + ' .jelly-section-remove').click();

            } else {
                var t = confirm('Are you sure you want to delete this box?');
                if (t == true) {
                    /**
                     * TODO link up properly remove from APP
                     */
                    self.forceUnlockWorkElement();
                    var boxType = self.getBoxType();
                    switch (boxType) {
                        case'text':
                        case'jelly':
                            jq('#' + JMCassets.div.jellyOuterId(id)).remove();
                            console.log('removed ' + JMCassets.div.jellyId(id));
                            self.getJMC().getLayout().removeContent(id);
                            break;
                        case'asset':
                            jq('#' + JMCassets.div.assetOuterId(id)).remove();
                            console.log('removed ' + JMCassets.div.assetId(id));
                            self.getJMC().getLayout().removeContent(id);
                            break;
                    }


                }
            }
        });
    }


}
