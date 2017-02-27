class JellyBase {
    constructor(configObject) {
        configObject = configObject || {};
        var self = this;

        Object.keys(configObject).forEach(function (key) {
            var value = configObject[key];
            switch (key) {
                case 'id':
                    self.id = value;
                    break;
                case 'boxType':
                    self.boxType = value;
                    break;
                case 'jQuery':
                    self.jQuery = value;
                    break;
                case 'childJQuery':
                    self.childJQuery = value;
                    break;
                case 'mode':
                    self.mode = value;
                    break;
                case 'jellyMouldController':
                case 'JMC':
                    self.jellyMouldController = value;
                    break;

            }
        });


    }

    cssLayoutInner(cssObject, controlCallback) {
        controlCallback = controlCallback || function () {
            };
        cssObject = cssObject || {};
        var jq = this.getChildJQuery();
        var id = this.getId();
        var boxType = this.getBoxType();
        var jqId = '#' + this.getInnerId(id);

        jq(jqId).css(cssObject);
        switch (boxType) {
            case'section':
                var JML = this.getLayout();
                JML.editSectionSettings(id, {'inner': cssObject}, true);
                break;
            default:
            case'text':
            case'jelly':
            case 'asset':
                var JML = this.getLayout();
                JML.editContentSettings(id, {'inner': cssObject}, true);
                break;
        }

        controlCallback(cssObject);
    }

    cssLayoutOuter(cssObject, controlCallback) {
        controlCallback = controlCallback || function () {
            };
        cssObject = cssObject || {};
        var jq = this.getChildJQuery();
        var id = this.getId();
        var boxType = this.getBoxType();
        var jqId = '#' + this.getOuterId(id);

        jq(jqId).css(cssObject);
        switch (boxType) {
            case'section':
                var JML = this.getLayout();
                JML.editSectionSettings(id, {'outer': cssObject}, true);
                break;
            default:
            case'text':
            case'jelly':
            case 'asset':
                var JML = this.getLayout();
                JML.editContentSettings(id, {'outer': cssObject}, true);
                break;
        }
        controlCallback(cssObject);
    }

    cssLayoutMiddle(cssObject, controlCallback) {
        controlCallback = controlCallback || function () {
            };
        cssObject = cssObject || {};
        var jq = this.getChildJQuery();
        var id = this.getId();
        var boxType = this.getBoxType();
        var jqId = '#' + this.getMiddleId(id);

        jq(jqId).css(cssObject);
        switch (boxType) {
            case'text':
            case'jelly':
            case 'asset':

                var JML = this.getLayout();
                JML.editContentSettings(id, {'middle': cssObject}, true);
                break;
        }
        controlCallback(cssObject);
    }

    getLayout() {
        return this.getJMC().getLayout();
    }

    getJMC() {
        return this.jellyMouldController;
    }
    
    getJML(){
        return this.getJMC().getLayout();
    }
    
    getId() {
        return this.id;
    }

    setBoxType(type) {
        this.boxType = type;
    }

    getBoxType() {
        return this.boxType;
    }

    getInnerId(id) {

        id = id || this.getId();

        switch (this.boxType) {

            case 'section':
                return JMCassets.div.sectionInnerId(id);
                break;
            case 'jelly':
            case 'text':
                return JMCassets.div.jellyInnerId(id);
                break;
            case 'asset':
                return JMCassets.div.assetInnerId(id);
                break;
        }

        alert('Set Box Type!');
    }

    getMiddleId(id) {
        id = id || this.getId();
        switch (this.boxType) {

            case 'section':
                return JMCassets.div.sectionInnerId(id);
                break;
            case 'jelly':
            case 'text':
                return JMCassets.div.jellyId(id);
                break;
            case 'asset':
                return JMCassets.div.assetId(id);
                break;
        }

        alert('Set Box Type!');

    }

    getOuterId(id) {

        id = id || this.getId();

        switch (this.boxType) {

            case 'section':
                return JMCassets.div.sectionOuterId(id);
                break;
            case 'jelly':
            case 'text':
                return JMCassets.div.jellyOuterId(id);
                break;
            case 'asset':
                return JMCassets.div.assetOuterId(id);
                break;
        }

        alert('Set Box Type!');
    }

    getChildJQuery() {

        if (typeof(this.childJQuery) != 'function') {
            alert('Child Jquery Not set Correctly!');
            console.log('Child Jquery Not set Correctly!');
        }

        return this.childJQuery;
    }

    getJQuery() {
        return this.jQuery;
    }

    forceUnlockWorkElement() {
        var JMC = this.getJMC();
        JMC.workingElement = null;
    }

    setMode(mode) {
        this.mode = mode;
        var JML = this.getLayout();
        var id = this.getId();
        JML.editSectionSettings(id, {'mode': mode});
        

    }

    getMode() {

        return this.mode;
    }
    
    cloneObject(obj){
        var json = this.getJMC().jsonEncode(obj);
        return this.getJMC().jsonDecode(json);
    }

    isFireFox() {
        return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    }
}