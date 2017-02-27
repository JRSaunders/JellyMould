JMCassets.css = JMCassets.css || {};
/**
 *
 * @type {{defaultDesktopWidth: number, defaultTabletWidth: number, defaultMobileWidth: number, setDefaultWidth: JMCassets.css.setDefaultWidth, isFireFox: JMCassets.css.isFireFox, initImportant: JMCassets.css.initImportant, setHighestZindex: JMCassets.css.setHighestZindex, getHighestZindex: JMCassets.css.getHighestZindex, dragOutline: JMCassets.css.dragOutline, dragOutlineParent: JMCassets.css.dragOutlineParent, sectionMasterControlHighlight: JMCassets.css.sectionMasterControlHighlight, controlTip: JMCassets.css.controlTip, textBoxInit: JMCassets.css.textBoxInit, textControl: JMCassets.css.textControl, assetControl: JMCassets.css.assetControl, text: JMCassets.css.text, textOuter: JMCassets.css.textOuter, textInput: JMCassets.css.textInput, textControlInner: JMCassets.css.textControlInner, assetControlInner: JMCassets.css.assetControlInner, controlColor: JMCassets.css.controlColor, sectionControlInner: JMCassets.css.sectionControlInner, sectionControl: JMCassets.css.sectionControl, sectionOuter: JMCassets.css.sectionOuter, sectionInner: JMCassets.css.sectionInner, sectionMasterControl: JMCassets.css.sectionMasterControl, sectionMasterControlSelect: JMCassets.css.sectionMasterControlSelect, controlPoint: JMCassets.css.controlPoint, imageControlInner: JMCassets.css.imageControlInner, mergeCss: JMCassets.css.mergeCss, rgba: JMCassets.css.rgba, assetOuter: JMCassets.css.assetOuter, assetInner: JMCassets.css.assetInner, assetDragHandle: JMCassets.css.assetDragHandle, assetOptions: JMCassets.css.assetOptions}}
 */
JMCassets.css = {
    defaultDesktopWidth: 980,
    defaultTabletWidth: 768,
    defaultMobileWidth: 480,
    setDefaultWidth: function (width, screenType) {
        screenType = screenType || 'desktop';
        switch (screenType) {
            case'desktop':
                this.defaultDesktopWidth = width;
                break;
            case'tablet':
                this.defaultTabletWidth = width;
                break;
            case'mobile':
                this.defaultMobileWidth = width;
                break;
        }
    },
    isFireFox: function () {
        return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    },
    fileMenu: function () {
        return {
            'position': 'absolute',
            'left': '210px',
            'background-color': '#FFF',
            'border': 'solid 1px #CCC',
            'min-height': '40px',
            'min-width': '180px',
            'display': 'none',
            'padding-left': '10px',
            'padding-right': '10px',
            'z-index': '1000'
        };
    },
    canvas: function () {
        return {
            'background-color': '#ccc',
            'background-image': 'linear-gradient(white 2px, transparent 2px),' +
            'linear-gradient(90deg, white 2px, transparent 2px),' +
            'linear-gradient(rgba(255, 255, 255, .3) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(255, 255, 255, .3) 1px, transparent 1px)',
            'background-size': '100px 100px, 100px 100px, 20px 20px, 20px 20px',
            'background-position': '-2px -2px, -2px -2px, -1px -1px, -1px -1px',
            'min-height': '300px',
            'min-width': '300px',
            'padding': '6px'

        };
    },
    initImportant: function () {

        return '<style> .jelly-button, select.jelly-select, input.jelly-input{' +
            'line-height: 14px !important; ' +
            'max-height: auto !important;' +
            'font-size:12px !important;' +
            'background-color:#333 !important;' +
            'color:#fff !important;' +
            'padding:3px !important;' +
            'border:none;' +
            'margin:2px;' +
            'text-indent:1px !important; }' +
            '@-moz-document url-prefix(){' +
            'option{padding: 2px;}' +
            '.jelly-button, select.jelly-select, input.jelly-input{' +
            'line-height: 14px !important; ' +
            'max-height: auto !important;' +
            'font-size:12px !important; ' +
            'border-radius:0px !important;' +
            'text-indent:1px !important;' +
            'background-color:#333 !important;' +
            'color:#fff !important;' +
            'padding:3px !important;' +
            '}' +
            '}' +
            'input.jelly-input{' +
            'background-color:#fff !important;' +
            'color:#000 !important;' +
            'border:solid 1px #ccc;' +
            '}' +
            '.sp-picker-container{' +
            'z-index:1000000;' +
            '}' +
            '.sp-container{' +
            'z-index:1000000;' +
            '}' +
            '</style>';
    },
    setHighestZindex: function (zIndex) {
        this.highestZIndex = zIndex;
    },
    getHighestZindex: function () {
        if (typeof(this.highestZIndex) == 'undefined') {
            return 30000;
        }
        return this.highestZIndex + 1;
    },
    /**
     *
     * @param on
     * @param color
     * @param originalZIndex
     * @returns {*}
     */
    dragOutline: function (on, color, showCursor) {
        showCursor = showCursor || false;

        color = color || 'rgba(255,255,255,0.5)';
        on = on || false;
        if (this.isFireFox()) {
            if (on) {
                if (showCursor == true) {
                    return {'box-shadow': '0px 0px 2px 2px ' + color, 'cursor': 'move'};
                } else {
                    return {'box-shadow': '0px 0px 2px 2px ' + color};
                }
            } else {
                return {'box-shadow': 'none'};
            }
        } else {
            if (on) {
                if (showCursor == true) {
                    return {'outline': 'dashed 1px ' + color, 'cursor': 'move'};
                } else {
                    return {'outline': 'dashed 1px ' + color};
                }
            } else {
                return {'outline': 'none'};
            }
        }
    },
    /**
     *
     * @param on
     * @param originalZIndex
     * @returns {*}
     */
    dragOutlineParent: function (on, originalZIndex) {
        originalZIndex = originalZIndex || 0;
        var hZIndex = this.getHighestZindex();
        highLightZindex = parseFloat(originalZIndex) + parseFloat(hZIndex);
        on = on || false;
        if (on) {
            return {'z-index': highLightZindex};
        } else {
            return {'z-index': parseFloat(originalZIndex)};
        }
    },
    sectionMasterControlHighlight: function () {
        return {'border': 'solid 1px #F90'};
    },
    controlTip: function () {
        return {
            'position': 'absolute',
            'min-width': '120px',
            'right': '-140px',
            'padding': '5px',
            'background-color': 'rgba(255,255,255,1)',
            'color': '#000',
            'font-size': '12px',
            'font-family': 'arial',
            'display': 'none',
            'border-radius': '4px',
            'border': 'solid 1px #ccc'
        };
    },
    /**
     *
     * @returns {*}
     */
    textBoxInit: function () {
        return {'display': 'table-caption', 'width': '100px'};
    },
    /**
     *
     * @returns {{position: string, max-height: string, z-index: string}}
     */
    textControl: function (noZindex) {
        noZindex = noZindex || false;

        var zindex = {'z-index': '2000000'};

        returnValue = {
            'position': 'absolute',
            'max-height': '0px',
            'cursor': 'pointer',
            'color': '#000'

        };

        if (noZindex == true) {
            return returnValue;
        } else {
            return this.mergeCss(returnValue, zindex);
        }

    },
    assetControl: function () {
        return this.textControl();
    },
    /**
     *
     * @returns {{min-height: string}}
     */
    text: function () {
        return {
            'min-height': '10px',
            'position': 'relative',
            'user-select': 'none'
        };
    },


    textOuter: function (noZindex) {
        noZindex = noZindex || false;

        var zindex = {'z-index': '2000000'};
        returnValue = {
            'height': '0px',
            'position': 'absolute'

        };
        if (noZindex == true) {
            return returnValue;
        } else {
            return this.mergeCss(returnValue, zindex);
        }
    },
    
    /**
     *
     * @returns {{position: string, top: string, border: string, border-radius: string, background-color: string, color: string}}
     */
    textInput: function () {
        return {
            'position': 'relative',
            'top': '0px',
            'border': 'solid 1px #000',
            'border-radius': '2px',
            'background-color': 'rgba(255,255,255,0.2)',
            'color': '#000',
            'user-select': 'text',
            'border': 'solid 1px #ccc'
        };
    },
    /**
     *
     * @returns {{position: string, top: string}}
     */
    textControlInner: function () {
        return {
            'position': 'relative',
            'top': '5px',
            'min-width': '200px',
            'background-color': '#f2f2f2',
            'border': 'solid 1px #CCC',
            'font-size': '14px',
            'padding': '5px',
            'user-select': 'none'
        };
    },
    assetControlInner: function () {
        return this.mergeCss(this.textControlInner(), {'min-width': '200px'});
    },
    /**
     *
     * @param colorCode
     * @returns {{min-width: string, max-width: string, min-height: string, min-height: string, background-color: (*|string), border: string, border-radius: string, margin-bottom: string}}
     */
    controlColor: function (colorCode) {
        colorCode = colorCode || this.rgba();
        return {
            'min-width': '15px',
            'max-width': '15px',
            'min-height': '15px',
            'min-height': '15px',
            'background-color': colorCode,
            'border': 'solid 1px #000',
            'border-radius': '2px',
            'border': 'solid 1px #ccc',
            'margin-bottom': '3px',
            'margin-right': '2px',
            'display': 'inline-block',
            'user-select': 'none'
        };
    },
    sectionControlInner: function () {
        return {
            'position': 'relative',
            'top': '5px',

            'background-color': '#f2f2f2',
            'border': 'solid 1px #CCC',
            'font-size': '14px',
            'padding': '5px'
        };
    },
    sectionControl: function () {

        return {
            'position': 'absolute',
            'top': '0px',
            'right': '20px',
            'max-height': '0px',
            'z-index': '2000000',
            'color': '#000',
            'user-select': 'none',
            'max-width': '150px'
        };
    },
    /**
     *
     * @param device
     * @param fullWidth
     * @returns {{position: string, background-color: string, min-height: string}}
     */
    sectionOuter: function (device, fullWidth) {
        return {
            'position': 'relative',
            'background-color': 'none',
            'min-height': '100px',
            'min-width': '100%'
        };
    },
    /**
     *
     * @param device
     * @param fullWidth
     * @returns {*}
     */
    sectionInner: function (device, noHeights) {
        noHeights = noHeights || false;
        device = device || 'desktop';

        var initCss = {
            'min-height': '100px',
            'position': 'relative'
        };

        if (noHeights) {
            initCss = {
                'position': 'relative'
            };
        }

        var width = {};
        switch (device) {
            case'mobile':
                width = {
                    'min-width': this.defaultMobileWidth + 'px',
                    'max-width': this.defaultMobileWidth + 'px',
                    'margin-left': 'auto',
                    'margin-right': 'auto'
                };
                break;
            case'tablet':
                width = {
                    'min-width': this.defaultTabletWidth + 'px',
                    'max-width': this.defaultTabletWidth + 'px',
                    'margin-left': 'auto',
                    'margin-right': 'auto'
                };
                break;
            case 'desktop':
            default:

                width = {
                    'min-width': this.defaultDesktopWidth + 'px',
                    'max-width': this.defaultDesktopWidth + 'px',
                    'margin-left': 'auto',
                    'margin-right': 'auto'
                };

                break;
        }

        var css = this.mergeCss(initCss, width);
        return css;
    },

    sectionMasterControl: function () {
        return {
            'display': 'inline-block',
            'max-width': '155px',
            'min-width': '155px',
            'min-height': '75px',
            'background-color': '#f2f2f2',
            'border': 'solid 1px #CCC',
            'font-size': '12px',
            'padding': '5px',
            'cursor': 'alias',
            'user-select': 'none'
        };
    },
    sectionMasterControlSelect: function () {

        return {
            'border-radius': '1px',
            'font-size': '12px',
            'line-height': '12px',
            'padding': '3px',
            'padding-left': '5px',
            'min-height': '14px',
            'box-shadow': 'inset 1px 1px 1px rgba(0,0,0,0.7)',
            'border': 'solid 1px #CCC',
            'margin': '0px',
            'margin-bottom': '0px'
        };
    },
    /**
     *
     * @param position
     * @returns {*}
     */
    controlPoint: function (position, type) {
        type = type || 'text';
        position = position || null;
        var cursor = 'pointer';
        switch (position) {
            case 'left-top':

                if (type == 'text') {
                    cursor = 'se-resize';
                }

                return {
                    'position': 'absolute',
                    'top': '-5px',
                    'left': '-5px',
                    'cursor': cursor

                };
                break;
            case 'left-bottom':
                if (type == 'text') {
                    cursor = 'text';
                }
                return {
                    'position': 'absolute',
                    'bottom': '-5px',
                    'left': '-5px',
                    'cursor': cursor
                };
                break;
            case 'right-bottom':
                if (type == 'text') {
                    cursor = 'se-resize';
                }
                return {
                    'position': 'absolute',
                    'bottom': '-5px',
                    'right': '-5px',
                    'cursor': cursor

                };
                break;
            case JMCassets.div.centerControlPointClass():
                if (type == 'section') {
                    cursor = 'ns-resize';
                }
                return {
                    'position': 'absolute',
                    'z-index': '500000',
                    'bottom': '-7.5px',
                    'left': '0',
                    'border-radius': '0px',
                    'transform': 'rotate(45deg)',
                    'min-width': '15px',
                    'min-height': '15px',
                    'max-width': '15px',
                    'max-height': '15px',
                    'cursor': cursor
                };
                break;
            case 'right-top':
                if (type == 'text') {
                    cursor = 'alias';
                }
                return {
                    'position': 'absolute',
                    'top': '-5px',
                    'right': '-5px',
                    'cursor': cursor
                };
                break;
        }

        return {
            'min-width': '10px',
            'min-height': '10px',
            'max-width': '10px',
            'max-height': '10px',
            'border-radius': '10px',
            'background': '#f90',
            'border': 'solid 1px #FFF',
            'opacity': '0.8',
            'display': 'none'
        };
    },
    imageControlInner: function (imageControlOffset, controlHeightOffset) {
        controlHeightOffset = controlHeightOffset || -6;
        imageControlOffset = imageControlOffset || 200;
        return {
            'position': 'absolute',
            'right': imageControlOffset + 'px',
            'padding': '5px',
            'min-width': '200px',
            'text-align': 'right',
            'top': controlHeightOffset + 'px',
            'border-radius': '4px',
            'border': 'solid 1px #ccc',
            'background-color': 'rgba(255,255,255,1)',
            'font-size': '12px'
        };
    },
    functionInner: function () {
        return this.imageControlInner(210);
    },
    /**
     *
     * @returns {{}}
     */
    mergeCss: function () {
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
    },

    /**
     *
     * @param tinyColorObject
     * @returns {string}
     */
    rgba: function (tinyColorObject) {
        tinyColorObject = tinyColorObject || {_r: 0, _g: 0, _b: 0, _a: 1};
        var red = Math.round(tinyColorObject._r);
        var green = Math.round(tinyColorObject._g);
        var blue = Math.round(tinyColorObject._b);
        var alphaP = Math.round((tinyColorObject._a * 100));
        var alpha = alphaP / 100;
        return 'rgba(' + red + ',' + green + ',' + blue + ',' + alpha + ')';
    },
    assetOuter: function () {
        return {
            'position': 'absolute',
            'max-height': '0px'
        };
    },
    assetInner: function (width, height) {
        return {
            'width': width + 'px',
            'height': height + 'px',
            'position': 'relative'
        };
    },
    assetDragHandle: function () {
        return {
            'min-width': '15px',
            'min-height': '15px',
            'background-color': '#f90',
            'z-index': '1000000',
            'border-radius': '15px',
            'position': 'absolute',
            'top': '10px',
            'left': '10px',
            'cursor': 'move',
            'opacity': '0.7'
        };
    },
    assetOptions: function () {
        return {
            'max-height': '200px',
            'overflow-y': 'scroll'
        };
    }
};
