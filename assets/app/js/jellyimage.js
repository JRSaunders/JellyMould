class JellyImage extends JellyBase {
    constructor(childJQuery, id, boxType, JMC, imageControlOffsetOverride) {

        super({
            boxType: boxType,
            id: id,
            childJQuery: childJQuery,
            JMC: JMC
        });
        this.imageControlOffsetOverride = imageControlOffsetOverride;
        this.initImage = '';
        this.initPosition = false;
        this.initRepeat = false;
        this.initSize = false;
    }

    setInitImage(image) {
        this.initImage = image;
    }

    setInitPosition(position) {
        this.initPosition = position;
    }

    setInitRepeat(repeat) {
        this.initRepeat = repeat;
    }

    setInitSize(size) {
        this.initSize = size;
    }

    imageControlOffset() {

        if (typeof(this.imageControlOffsetOverride) != 'undefined') {
            return this.imageControlOffsetOverride;
        }
        switch (this.boxType) {
            case'text':
            case 'jelly':
                return 193;
                break;
            case 'section':
                return 40;
                break;
        }
    }

    imageInit() {

        var id = this.getId();
        var jq = this.getChildJQuery();
        var self = this;
        jq('#' + JMCassets.div.imageControlInnerId(id)).css(JMCassets.css.imageControlInner(this.imageControlOffset()));
        jq('#' + JMCassets.div.imageControlInnerId(id)).hide();
        jq('#' + JMCassets.div.imageControlOuterId(id) + ' .open-image-button').unbind();
        jq('#' + JMCassets.div.imageControlOuterId(id) + ' .open-image-button').click(function () {
            console.log('image open clicked');
            if (jq('#' + JMCassets.div.imageControlInnerId(id)).is(':visible')) {
                jq('#' + JMCassets.div.imageControlInnerId(id)).hide();
                self.getJMC().destroyImageSelectFunction();
            } else {
                jq('#' + JMCassets.div.imageControlInnerId(id)).show();
                jq('#' + JMCassets.div.functionInnerId(id)).hide();
            }


        });
        self.appendImageControl();
        self.imageControlFunctions();
    }

    imageControlFunctions() {
        var id = this.getId();
        var jq = this.getChildJQuery();
        var self = this;
        jq('#' + JMCassets.div.imageSubmitId(id)).unbind();
        jq('#' + JMCassets.div.imageSubmitId(id)).click(function () {

            self.applyChanges();

        });
        jq('#' + JMCassets.div.backgroundUrlId(id)).unbind();
        jq('#' + JMCassets.div.backgroundUrlId(id)).keyup(function () {

            self.applyChanges();

        });
        jq('#' + JMCassets.div.backgroundSelectRepeatId(id)).unbind();
        jq('#' + JMCassets.div.backgroundSelectRepeatId(id)).change(function () {

            self.applyChanges();

        });
        jq('#' + JMCassets.div.backgroundSelectPositionId(id)).unbind();
        jq('#' + JMCassets.div.backgroundSelectPositionId(id)).change(function () {

            self.applyChanges();

        });
        jq('#' + JMCassets.div.backgroundSelectSizeId(id)).unbind();
        jq('#' + JMCassets.div.backgroundSelectSizeId(id)).change(function () {

            self.applyChanges();

        });
        /**
         * set image select function
         */
        jq('#' + JMCassets.div.backgroundChooseId(id)).unbind();
        jq('#' + JMCassets.div.backgroundChooseId(id)).click(function () {
            self.getJMC().openImageChoose();

            self.getJMC().setImageSelectFunction(function (url) {
                jq('#' + JMCassets.div.backgroundUrlId(id)).val(url);
                self.applyChanges();
                alert('Image Set');
            });

        });
        if (this.getBoxType() == 'section') {
            jq('#' + JMCassets.div.sectionModeSelectId(id)).change(function () {
                var mode = jq(this).val();
                self.getJMC().setMode(id, mode);

            });
        }

    }

    clearImages() {
        var id = this.getId();
        var jq = this.getChildJQuery();
        var css = {'background-image': 'none'};
        this.cssLayoutInner(css);
        this.cssLayoutOuter(css);
    }

    applyChanges() {
        var boxType = this.getBoxType();
        var mode = this.getMode();
        var id = this.getId();
        var jq = this.getChildJQuery();
        var self = this;
        this.clearImages();
        var url = jq('#' + JMCassets.div.backgroundUrlId(id)).val();
      
        if (url == '') {
            if (boxType == 'section' && mode == 'full') {
                self.cssLayoutOuter({
                    'background-image': 'none'
                });
            } else {
                self.cssLayoutInner({
                    'background-image': 'none'
                });
            }

            return;
        }
        var position = jq('#' + JMCassets.div.backgroundSelectPositionId(id)).val();
        var repeat = jq('#' + JMCassets.div.backgroundSelectRepeatId(id)).val();
        var size = jq('#' + JMCassets.div.backgroundSelectSizeId(id)).val();
        var css = {
            'background-image': 'url("' + url + '")',
            'background-size': size,
            'background-position': position,
            'background-repeat': repeat
        };


        if (boxType == 'section' && mode == 'full') {
            self.cssLayoutOuter(css);
        } else {
            self.cssLayoutInner(css);
        }


    }

    setInitValues(currentObject) {
        var mode = currentObject.mode || 'constrain';
        var css;

        switch (mode) {
            case'constrain':
                css = currentObject.inner;
                break;
            case'full':
                css = currentObject.outer;
                break;
            default:
                css = currentObject.inner;
                break;
        }

        var image = css['background-image'] || false;

        var url;
        if (image && image != 'none') {

            url = image.match(/url\(["|']?([^"']*)["|']?\)/)[1];
        }

        this.setInitImage(url);
        var position = css['background-position'] || undefined;
        this.setInitPosition(position);
        var size = css['background-size'] || undefined;
        this.setInitSize(size);
        var repeat = css['background-repeat'] || undefined;
        this.setInitRepeat(repeat);
    }


    appendImageControl() {
        var id = this.getId();
        var jq = this.getChildJQuery();
        var self = this;

        jq('#' + JMCassets.div.imageControlInnerId(id)).html(JMCassets.div.backgroundControl(
            id,
            this.getBoxType(),
            this.getMode(),
            this.initImage,
            this.initPosition,
            this.initRepeat,
            this.initSize
        ));

    }


}
