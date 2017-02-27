class JellyPointer extends JellyBase {

    constructor(boxType, jQuery, childJQuery, jellyMouldController) {
        super();
        this.setBoxType(boxType);
        this.postFix = boxType;
        this.jQuery = jQuery;
        this.childJQuery = childJQuery;
        this.jellyMouldController = jellyMouldController;
        this.controlKeyDown = false;
        this.unlockTimer = null;
    }


    textControlPointers(id, postFix) {

        this.initControlKey();
        var positionArray = JMCassets.div.getPositionArray();
        var jq = this.getChildJQuery();
        var self = this;
        var i;

        for (i = 0; i < 4; i++) {
            var pos = positionArray[i];
            jq('#' + this.getOuterId(id) + ' .' + JMCassets.div.controlPointClass(postFix) + '.' + pos).css(JMCassets.css.controlPoint(pos));

            if (pos == 'right-bottom') {

                jq('#' + this.getOuterId(id) + ' .' + JMCassets.div.controlPointClass(postFix) + '.' + pos).mousedown(function (e) {
                    e.preventDefault();
                    var jQueryElement = jq(this);
                    self.jQueryContainer = jq('body');
                    self.jQueryControlElement = jQueryElement.parent();
                    if (self.isControlKeyPressed()) {
                        self.stretchEvents('shadow');
                    } else {
                        self.stretchEvents('size');
                    }

                });
                jq('#' + this.getOuterId(id) + ' .' + JMCassets.div.controlPointClass(postFix) + '.' + pos).mouseover(function () {
                    self.sizeTip();
                });
            } else if (pos == 'right-top') {
                jq('#' + this.getOuterId(id) + ' .' + JMCassets.div.controlPointClass(postFix) + '.' + pos).mousedown(function (e) {
                    e.preventDefault();
                    var jQueryElement = jq(this);
                    self.jQueryContainer = jq('body');
                    self.jQueryControlElement = jQueryElement.parent();
                    if (self.isControlKeyPressed()) {
                        self.stretchEvents('shadow-blur');
                    } else {
                        self.stretchEvents('radius');
                    }

                });
                jq('#' + this.getOuterId(id) + ' .' + JMCassets.div.controlPointClass(postFix) + '.' + pos).mouseover(function () {
                    self.radiusTip();
                });
            } else if (pos == 'left-bottom') {
                jq('#' + this.getOuterId(id) + ' .' + JMCassets.div.controlPointClass(postFix) + '.' + pos).mousedown(function (e) {
                    e.preventDefault();
                    var jQueryElement = jq(this);
                    self.jQueryContainer = jq('body');
                    self.jQueryControlElement = jQueryElement.parent();
                    if (self.isControlKeyPressed()) {
                        self.stretchEvents('font-shadow');
                    } else {
                        self.stretchEvents('font');
                    }

                });
                jq('#' + this.getOuterId(id) + ' .' + JMCassets.div.controlPointClass(postFix) + '.' + pos).mouseover(function () {
                    self.fontTip();
                });
            } else {
                jq('#' + this.getOuterId(id) + ' .' + JMCassets.div.controlPointClass(postFix) + '.' + pos).mousedown(function (e) {
                    e.preventDefault();

                    var jQueryElement = jq(this);
                    self.jQueryContainer = jq('body');
                    self.jQueryControlElement = jQueryElement.parent();
                    if (self.isControlKeyPressed()) {
                        self.stretchEvents('opacity');
                    } else {
                        self.stretchEvents('padding');
                    }

                });
                jq('#' + this.getOuterId(id) + ' .' + JMCassets.div.controlPointClass(postFix) + '.' + pos).mouseover(function () {

                    if (self.isControlKeyPressed()) {
                        self.opacityTip();
                    } else {
                        self.paddingTip();
                    }

                });
            }

        }
    }

    centraliseControlPoint(id, postFix, noResize) {
        noResize = noResize || false;
        var jq = this.getChildJQuery();
        var self = this;
        var controlPointJQElement = jq('#' + this.getOuterId(id) + ' .' + JMCassets.div.controlPointClass(postFix) + '.' +
            JMCassets.div.centerControlPointClass());
        var outerWidth = jq('#' + this.getOuterId(id)).width();

        var controlPointWidth = controlPointJQElement.width();

        var left = (outerWidth / 2) - (controlPointWidth / 2);
        controlPointJQElement.css({'left': left + 'px'});
        if (noResize == false) {

            jq(this.getJMC().getChildWindow()).resize(function () {
                self.centraliseControlPoint(id, postFix, true);
            });
        }
    }

    sectionControlPointers(id, postFix) {
        this.initControlKey();
        var jq = this.getChildJQuery();
        var self = this;
        var JMC = this.getJMC();

        jq('#' + this.getOuterId(id) + ' .' + JMCassets.div.controlPointClass(postFix) + '.' +
            JMCassets.div.centerControlPointClass()).css(JMCassets.css.controlPoint(JMCassets.div.centerControlPointClass(), 'section'));

        this.centraliseControlPoint(id, postFix);
        jq(window).resize(function () {
            self.centraliseControlPoint(id, postFix);
        });

        jq('#' + this.getOuterId(id) + ' .' + JMCassets.div.controlPointClass(postFix) + '.' +
            JMCassets.div.centerControlPointClass()).mousedown(function (e) {
            e.preventDefault();
            JMC.lockWorkingWithElement(self);
            var jQueryElement = jq(this);
            self.jQueryContainer = jq('body');
            self.jQueryControlElement = jQueryElement.parent();
            if (self.isControlKeyPressed()) {
                self.stretchEvents('shadow-section');
            } else {
                self.stretchEvents('height');
            }
            self.startTimerUnlock();
        });
        jq('#' + this.getOuterId(id) + ' .' + JMCassets.div.controlPointClass(postFix) + '.' +
            JMCassets.div.centerControlPointClass()).dblclick(function (e) {
            e.preventDefault();
            self.forceUnlockWorkElement();
        });


    }

    startTimerUnlock() {
        var self = this;
        if (this.unlockTimer == null) {
            this.unlockTimer = setTimeout(
                function () {
                    self.forceUnlockWorkElement();
                    self.unlockTimer = null;
                }, 1200
            );
        } else {
            clearTimeout(this.unlockTimer);
            this.unlockTimer = null;
        }
    }

    initControlPointers(id, postFix) {
        postFix = postFix || this.postFix;
        this.id = id || this.getId();
        var jq = this.getChildJQuery();

        jq('#' + this.getOuterId(id) + ' .' + JMCassets.div.controlPointClass(postFix)).css(JMCassets.css.controlPoint());
        switch (this.boxType) {
            case 'text':
                this.textControlPointers(id, postFix);
                break;
            case 'section':
                this.sectionControlPointers(id, postFix);
                break;
        }

    }

    getContainer() {
        return this.jQueryContainer;
    }

    getElement() {
        return this.jQueryControlElement;
    }

    getConainterOffset() {
        return this.getContainer().offset();
    }

    getElementOfferset() {
        return this.getElement().offset();
    }

    getMouseEvent() {
        return this.mouseEvent;
    }

    getMouseX() {
        return this.mouseEvent.pageX;
    }

    getMouseY() {
        return this.mouseEvent.pageY;
    }

    initPlacement() {
        this.placementX = null;
        this.placementY = null;
        this.movementX = 0;
        this.movementY = 0;
    }

    recordPlacement() {

        this.placementX = this.getMouseX();
        this.placementY = this.getMouseY();
    }

    recordMovement() {
        if (this.placementX == null || this.placementY == null) {
            this.recordPlacement();
        } else {
            this.movementX = this.getMouseX() - this.placementX;
            this.movementY = this.getMouseY() - this.placementY;
            this.recordPlacement();
        }
    }

    processMouseEvent(e) {
        this.mouseEvent = e;
        this.recordMovement();
    }

    sizeTip(returnString) {
        returnString = returnString || false;
        var jq = this.getChildJQuery();
        var id = this.getId();
        var innerId = this.getInnerId(id);
        var padding = jq('#' + innerId).css('paddingLeft');
        padding = padding.replace('px', '');
        padding = parseFloat(padding);
        if (isNaN(padding)) {
            padding = 0;
        }
        padding = padding * 2;
        var width = jq('#' + innerId).width();
        var height = jq('#' + innerId).height();
        var tip = '<b>Box Size</b><br /><i class="fa fa-arrows-h"></i> Width: ' + (width + padding) + ' px<br />';
        tip += '<i class="fa fa-arrows-v"></i> Height: ' + (height + padding) + ' px';

        if (returnString) {
            return tip;
        }

        this.controlTip(tip);
    }

    radiusTip() {
        var jq = this.getChildJQuery();
        var id = this.getId();
        var innerId = this.getInnerId(id);
        var radius = jq('#' + innerId).css('border-radius');
        var radiusWidth = jq('#' + innerId).css('border-width');
        radiusWidth = radiusWidth.replace('px', '');
        radiusWidth = parseFloat(radiusWidth);
        radius = radius.replace('px', '');
        radius = parseFloat(radius);
        if (isNaN(radius)) {
            radius = 0;
        }
        if (isNaN(radiusWidth)) {
            radiusWidth = 0;
        }

        var tip = '<b>Border/Radius</b><br /><i class="fa fa-arrows-v"></i> Border Width: ' + radiusWidth + ' px<br />';
        tip += '<i class="fa fa-arrows-h"></i>  Corner Curve: ' + radius + ' px';
        this.controlTip(tip);
    }

    fontTip() {
        var jq = this.getChildJQuery();
        var id = this.getId();
        var innerId = this.getInnerId(id);
        var fontSize = jq('#' + innerId).css('font-size');
        var lineHeight = jq('#' + innerId).css('line-height');
        var olh = lineHeight;
        fontSize = fontSize.replace('px', '');
        fontSize = parseFloat(fontSize);
        lineHeight = lineHeight.replace('px', '');
        lineHeight = parseFloat(lineHeight);

        if (olh == 'normal') {
            lineHeight = fontSize;
        }
        var tip = '<b>Font Size/Line Height</b><br /><i class="fa fa-arrows-v"></i> Font Size: ' + fontSize + ' px<br />';
        tip += '<i class="fa fa-arrows-h"></i> Line Height: ' + lineHeight + ' px';
        this.controlTip(tip);
    }

    shadowTip() {
        var jq = this.getChildJQuery();
        var id = this.getId();
        var innerId = this.getInnerId(id);
        var shadow = jq('#' + innerId).css('box-shadow');
        if (shadow == 'none') {

            var hShadow = 0;
            var vShadow = 0;
            var blur = 0;
            var spread = 0;
        } else {
            var parts = shadow.split(' ');
            var hShadow = parts[3];
            hShadow = parseInt(hShadow.replace('px', ''));
            var vShadow = parts[4];
            vShadow = parseInt(vShadow.replace('px', ''));
            var blur = parts[5];
            blur = parseInt(blur.replace('px', ''));
            var spread = parts[6];
            spread = parseInt(spread.replace('px', ''));
        }
        var tip = '<b>Shadow</b><br /><i class="fa fa-arrows-h"></i> H Shadow: ' + hShadow + 'px<br />';
        tip += '<i class="fa fa-arrows-v"></i> V Shadow: ' + vShadow + 'px';

        this.controlTip(tip);
    }

    shadowTextTip() {
        var jq = this.getChildJQuery();
        var id = this.getId();
        var innerId = this.getInnerId(id);
        var shadow = jq('#' + innerId).css('text-shadow');
        if (shadow == 'none') {

            var hShadow = 0;
            var vShadow = 0;
            var blur = 0;

        } else {
            var parts = shadow.split(' ');
            var hShadow = parts[3];
            hShadow = parseInt(hShadow.replace('px', ''));
            var vShadow = parts[4];
            vShadow = parseInt(vShadow.replace('px', ''));
            var blur = parts[5];
            blur = parseInt(blur.replace('px', ''));

        }
        var tip = '<b>Text Shadow</b><br /><i class="fa fa-arrows-h"></i> H Shadow: ' + hShadow + 'px<br />';
        tip += '<i class="fa fa-arrows-v"></i> V Shadow: ' + vShadow + 'px <br />';

        tip += 'Blur: ' + blur + 'px';

        this.controlTip(tip);
    }

    shadowBlurTip() {
        var jq = this.getChildJQuery();
        var id = this.getId();
        var innerId = this.getInnerId(id);
        var shadow = jq('#' + innerId).css('box-shadow');
        if (shadow == 'none') {

            var hShadow = 0;
            var vShadow = 0;
            var blur = 0;
            var spread = 0;
        } else {
            var parts = shadow.split(' ');
            var hShadow = parts[3];
            hShadow = parseInt(hShadow.replace('px', ''));
            var vShadow = parts[4];
            vShadow = parseInt(vShadow.replace('px', ''));
            var blur = parts[5];
            blur = parseInt(blur.replace('px', ''));
            var spread = parts[6];
            spread = parseInt(spread.replace('px', ''));
        }
        var tip = '<b>Shadow</b><br /><i class="fa fa-arrows-h"></i> Blur: ' + blur + 'px<br />';
        tip += '<i class="fa fa-arrows-v"></i> Spread: ' + spread + 'px';

        this.controlTip(tip);
    }

    paddingTip() {
        var jq = this.getChildJQuery();
        var id = this.getId();
        var innerId = this.getInnerId(id);
        var padding = jq('#' + innerId).css('paddingLeft');
        var tip = '<b>Box Padding</b><br /><i class="fa fa-arrows-h"></i> Padding: ' + padding + '<br />';
        tip += this.sizeTip(true);
        this.controlTip(tip);
    }

    opacityTip() {
        var jq = this.getChildJQuery();
        var id = this.getId();
        var innerId = this.getInnerId(id);
        var opacity = jq('#' + innerId).css('opacity');
        var tip = '<b>Box Opacity</b><br /><i class="fa fa-arrows-v"></i> Opacity: ' + (opacity * 100) + '%<br />';

        this.controlTip(tip);
    }

    controlTip(tip) {
        var jq = this.getChildJQuery();
        var id = this.getId();
        jq('#' + JMCassets.div.controlTipId(id)).html(tip);
        jq('#' + JMCassets.div.controlTipId(id)).show();

    }

    controlKeyPressed(down) {
        down = down || false;
        if (down) {
            this.controlKeyDown = true;
        } else {
            this.controlKeyDown = false;
        }
        var self = this;
        setTimeout(function () {
            self.controlKeyDown = false;
        }, 4000);
    }

    isControlKeyPressed() {
        return this.controlKeyDown;
    }

    initControlKey() {
        var jq = this.getChildJQuery();
        var self = this;
        var childDocument = this.getJMC().getChildDocument();
        jq(document).keydown(function (e) {


            if (e.keyCode == 17) {
                self.controlKeyPressed(true);
            }
        });
        jq(document).keyup(function (e) {

            self.controlKeyPressed(false);

        });
        jq(childDocument).keydown(function (e) {

            console.log(e.keyCode);
            if (e.keyCode == 17) {
                self.controlKeyPressed(true);
            }
        });
        jq(childDocument).keyup(function (e) {

            self.controlKeyPressed(false);

        });
    }

    stretchEvents(type) {
        var jq = this.getChildJQuery();
        var self = this;
        var id = self.getId();
        var innerId = self.getInnerId(id);
        var outerId = self.getOuterId(id);

        this.initPlacement();

        self.getContainer().mousemove(function (e) {


                self.processMouseEvent(e);

                switch (type) {
                    case 'radius':

                        var width = jq('#' + innerId).width();
                        var radius = jq('#' + innerId).css('border-radius');
                        var radiusWidth = jq('#' + innerId).css('border-width');
                        radiusWidth = radiusWidth.replace('px', '');
                        radiusWidth = parseFloat(radiusWidth);
                        radius = radius.replace('px', '');
                        radius = parseFloat(radius);
                        if (isNaN(radius)) {
                            radius = 0;
                        }
                        if (isNaN(radiusWidth)) {
                            radiusWidth = 0;
                        }
                        if (radius > width) {
                            radius = width;
                        }

                        console.log(radius);
                        self.cssLayoutInner({
                            'border-radius': radius - self.movementX + 'px',
                            'border-width': radiusWidth - self.movementY + 'px'
                        });


                        self.radiusTip();
                        break;

                    case 'size':
                        var padding = jq('#' + innerId).css('paddingLeft');
                        var boxSizing = jq('#' + innerId).css('box-sizing');

                        padding = padding.replace('px', '');
                        padding = parseFloat(padding);
                        if (isNaN(padding)) {
                            padding = 0;
                        }
                        padding = padding * 2;
                        var width = jq('#' + outerId).width();
                        var height = jq('#' + outerId).height();
                        var innerHeight;

                        switch (boxSizing) {

                            case 'border-box':
                                innerHeight = jq('#' + innerId).outerHeight();
                                break;

                            default:
                                innerHeight = jq('#' + innerId).height();
                                break;
                        }

                        self.cssLayoutInner({
                            'width': (width - padding) + self.movementX + 'px',
                            'height': innerHeight + self.movementY + 'px'
                        });

                        self.cssLayoutOuter({
                            'width': width + self.movementX + 'px',
                            'height': height + self.movementY + 'px'
                        });


                        self.sizeTip();

                        break;
                    case 'shadow':
                        var shadow = jq('#' + innerId).css('box-shadow');

                        if (shadow == 'none') {
                            var color = 'rgb(0, 0, 0)';
                            var hShadow = 0;
                            var vShadow = 0;
                            var blur = 0;
                            var spread = 0;
                        } else {
                            var parts = shadow.split(' ');
                            var color = parts[0] + ' ' + parts[1] + ' ' + parts[2];
                            var hShadow = parts[3];
                            hShadow = parseInt(hShadow.replace('px', ''));
                            var vShadow = parts[4];
                            vShadow = parseInt(vShadow.replace('px', ''));
                            var blur = parts[5];
                            blur = parseInt(blur.replace('px', ''));
                            var spread = parts[6];
                            spread = parseInt(spread.replace('px', ''));
                        }

                        hShadow = hShadow + self.movementX;
                        vShadow = vShadow + self.movementY;

                        self.cssLayoutInner({
                            'box-shadow': color + ' ' + hShadow + 'px ' + vShadow + 'px ' + blur + 'px ' + spread + 'px'
                        });
                        self.shadowTip();
                        break;

                    case 'font-shadow':
                        var shadow = jq('#' + innerId).css('text-shadow');

                        if (shadow == 'none') {
                            var color = 'rgb(0, 0, 0)';
                            var hShadow = 0;
                            var vShadow = 0;
                            var blur = 0;

                        } else {
                            var parts = shadow.split(' ');
                            var color = parts[0] + ' ' + parts[1] + ' ' + parts[2];
                            var hShadow = parts[3];
                            hShadow = parseInt(hShadow.replace('px', ''));
                            var vShadow = parts[4];
                            vShadow = parseInt(vShadow.replace('px', ''));
                            var blur = parts[5];
                            blur = parseInt(blur.replace('px', ''));

                        }

                        hShadow = hShadow + self.movementX;
                        vShadow = vShadow + self.movementY;
                        blur = (hShadow + vShadow) + 4;
                        if (hShadow == 2 || vShadow == 2) {
                            blur = 1;
                        }
                        if ((hShadow < 1 || vShadow < 1) && (hShadow > -1 || vShadow > -1)) {
                            blur = 0;
                            hShadow = 0;
                            vShadow = 0;
                        }
                        self.cssLayoutInner({
                            'text-shadow': color + ' ' + hShadow + 'px ' + vShadow + 'px ' + blur + 'px'
                        });
                        self.shadowTextTip();
                        break;

                    case 'shadow-blur':
                        var shadow = jq('#' + innerId).css('box-shadow');

                        if (shadow == 'none') {
                            var color = 'rgb(0, 0, 0)';
                            var hShadow = 0;
                            var vShadow = 0;
                            var blur = 0;
                            var spread = 0;

                        } else {
                            var parts = shadow.split(' ');
                            var color = parts[0] + ' ' + parts[1] + ' ' + parts[2];
                            var hShadow = parts[3];
                            hShadow = parseInt(hShadow.replace('px', ''));
                            var vShadow = parts[4];
                            vShadow = parseInt(vShadow.replace('px', ''));
                            var blur = parts[5];
                            blur = parseInt(blur.replace('px', ''));
                            var spread = parts[6];
                            spread = parseInt(spread.replace('px', ''));

                        }

                        blur = blur + self.movementX;
                        spread = spread + self.movementY;
                        self.cssLayoutInner({
                            'box-shadow': color + ' ' + hShadow + 'px ' + vShadow + 'px ' + blur + 'px ' + spread + 'px'
                        });
                        self.shadowBlurTip();
                        break;

                    case 'shadow-section':
                        var shadow = jq('#' + outerId).css('box-shadow');

                        if (shadow == 'none') {
                            var color = 'rgb(0, 0, 0)';
                            var hShadow = 0;
                            var vShadow = 0;
                            var blur = 0;
                            var spread = 0;

                        } else {
                            var parts = shadow.split(' ');
                            var color = parts[0] + ' ' + parts[1] + ' ' + parts[2];
                            var hShadow = parts[3];
                            hShadow = parseInt(hShadow.replace('px', ''));
                            var vShadow = parts[4];
                            vShadow = parseInt(vShadow.replace('px', ''));
                            var blur = parts[5];
                            blur = parseInt(blur.replace('px', ''));
                            var spread = parts[6];
                            spread = parseInt(spread.replace('px', ''));

                        }
                        vShadow = vShadow + self.movementY;

                        blur = blur + self.movementX;

                        self.cssLayoutOuter({
                            'box-shadow': color + ' ' + hShadow + 'px ' + vShadow + 'px ' + blur + 'px ' + spread + 'px'
                        });

                        break;

                    case 'font':
                        var fontSize = jq('#' + innerId).css('font-size');
                        var lineHeight = jq('#' + innerId).css('line-height');
                        var maxLineHeight = jq('#' + innerId).css('height');
                        var olh = lineHeight;
                        maxLineHeight = maxLineHeight.replace('px', '');
                        maxLineHeight = parseFloat(maxLineHeight);
                        if (isNaN(maxLineHeight)) {
                            maxLineHeight = 12;
                        }
                        fontSize = fontSize.replace('px', '');
                        fontSize = parseFloat(fontSize);
                        lineHeight = lineHeight.replace('px', '');
                        lineHeight = parseFloat(lineHeight);

                        if (olh == 'normal') {
                            lineHeight = fontSize;
                        }

                        if (self.isControlKeyPressed()) {
                            lineHeight = fontSize;
                        }
                        var newLineHeight = (lineHeight + self.movementX);
                        if (newLineHeight > maxLineHeight) {
                            newLineHeight = maxLineHeight;
                        }
                        self.cssLayoutInner({
                            'line-height': newLineHeight + 'px',
                            'font-size': fontSize + self.movementY + 'px'
                        });

                        self.fontTip();
                        break;


                    case 'opacity':


                        var opacity = jq('#' + innerId).css('opacity');
                        var opacityPer = opacity * 100;
                        var movement = self.movementY;
                        var newOpacity = opacityPer - movement;

                        if (newOpacity > 100) {
                            newOpacity = 100;
                        }
                        if (newOpacity < 3) {
                            newOpacity = 3;
                        }
                        var applyOpacity = newOpacity / 100;

                        self.cssLayoutInner({'opacity': applyOpacity});
                        self.opacityTip();
                        break;

                    case 'padding':
                        var width = jq('#' + outerId).width();
                        var height = jq('#' + outerId).height();
                        var padding = jq('#' + innerId).css('paddingLeft');

                        padding = padding.replace('px', '');
                        padding = parseFloat(padding);
                        if (isNaN(padding)) {
                            padding = 0;
                        }
                        var movement = self.movementX;
                        var pMovement = movement;
                        if ((padding * 2) > width || (padding * 2) > height) {

                            pMovement = -5;

                        }
                        console.log('step2:' + padding);
                        movement = (pMovement + padding);
                        self.cssLayoutInner({'padding': movement + 'px'});

                        var innerElement = jq('#' + innerId);
                        self.cssLayoutOuter({
                            'width': innerElement.outerWidth() + 'px',
                            'height': innerElement.outerHeight() + 'px'
                        });

                        self.paddingTip();

                        break;
                    case 'height':

                        var height = jq('#' + outerId).height();
                        var heightPixels = height + self.movementY;
                        self.cssLayoutInner({'height': heightPixels + 'px', 'min-height': heightPixels + 'px'});
                        self.cssLayoutOuter({'height': heightPixels + 'px', 'min-height': heightPixels + 'px'});

                        break;

                }

                var childWindow = self.getJMC().getChildWindow();
                jq(childWindow).resize();
            }
        ).mouseup(
            function () {
                var innerElement = jq('#' + innerId);
                self.cssLayoutOuter({
                    'width': innerElement.outerWidth() + 'px',
                    'height': innerElement.outerHeight() + 'px'
                });

                jq(this).unbind('mousemove');
            }
        )
        ;

    }

    divStretch(id) {
    }

    fontStretch(id) {

    }


}
