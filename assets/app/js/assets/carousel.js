JMCstarterkit.assets.carousel = JMCstarterkit.assets.carousel || {};
/**
 *
 * @type {{name: string, width: number, height: number, assetOptions: {width: string, height: string, button color: {color: string}, side button bg color: {color: string}, side button color: {color: string}, side button size: string, side button position: {selected: string, options: {1: string, 2: string, 3: string, 4: string}}, curve: string, slide1: {image: string}, slide2: {image: string}, slide3: {image: string}, slide4: {image: string}, slide5: {image: string}, slide6: {image: string}, slide7: {image: string}, slide8: {image: string}, slide9: {image: string}, slide10: {image: string}, slide1html: string, slide2html: string, slide3html: string, slide4html: string, slide5html: string, slide6html: string, slide7html: string, slide8html: string, slide9html: string, slide10html: string}, callbackFrontend: JMCstarterkit.assets.carousel.callbackFrontend, callbackAdmin: JMCstarterkit.assets.carousel.callbackAdmin, noCursor: boolean}}
 */
JMCstarterkit.assets.carousel = {
    name: 'Carousel',
    width: 440,
    height: 330,
    assetOptions: {
        'width': '440',
        'height': '280',
        'auto play': {'selected': 'on', 'options': {1: 'on', 2: 'off'}},
        'auto play hover pause': {'selected': 'on', 'options': {1: 'on', 2: 'off'}},
        'transition speed ms': '400',
        'delay ms': '1500',
        'button color': {'color': '#000'},
        'side button bg color': {'color': '#000'},
        'side button color': {'color': '#FFF'},
        'side button size': '30',
        'side button position': {
            'selected': 'outside',
            'options': {1: "none", 2: "inside", 3: "outside", 4: "on edge"}
        },

        'curve': '0',
        'slide1': {'image': 'http://animals.sandiegozoo.org/sites/default/files/juicebox_slides/monkey_capuchin_01.jpg'},
        'slide2': {'image': 'http://animals.sandiegozoo.org/sites/default/files/juicebox_slides/monkey_capuchin_01.jpg'},
        'slide3': {'image': ''},
        'slide4': {'image': ''},
        'slide5': {'image': ''},
        'slide6': {'image': ''},
        'slide7': {'image': ''},
        'slide8': {'image': ''},
        'slide9': {'image': ''},
        'slide10': {'image': ''},
        'slide1html': '',
        'slide2html': '',
        'slide3html': '',
        'slide4html': '',
        'slide5html': '',
        'slide6html': '',
        'slide7html': '',
        'slide8html': '',
        'slide9html': '',
        'slide10html': ''

    },
    callbackFrontEnd: function (id, win, jq, jqId, assetOptions) {
        var isChrome = ((navigator.userAgent.toLowerCase().indexOf('chrome') > -1)
        &&
        (navigator.vendor.toLowerCase().indexOf("google") > -1));
        var carouselId = 'jelly-carousel-' + id;
        var width = assetOptions.width;
        var height = assetOptions.height;
        var radius = assetOptions.curve;
        var html = '<div class="jelly-under"><div id="' + carouselId + '" class="owl-carousel">';
        var i;
        for (i = 1; i < 11; i++) {

            var slideImage = assetOptions['slide' + i].image;
            var slideHtml = assetOptions['slide' + i + 'html'];
            if (slideImage != '') {
                html += '<div style="border-radius:' + radius +
                    'px;min-width:' + width + 'px;max-width:' + width +
                    'px;min-height:' + height + 'px;' +
                    'background-image:url(' +
                    slideImage +
                    ');background-size:cover;background-position:center center;">' + slideHtml + '</div>';
            }
        }
        html += '</div></div>';
        var carousel = function (doCss) {
            jq(jqId).html(html);
            var slideSpeed = (!isNaN(parseInt(assetOptions['delay ms']))) ? parseInt(assetOptions['delay ms']) : 1500;
            var transSpeed = (!isNaN(parseInt(assetOptions['transition speed ms']))) ? parseInt(assetOptions['transition speed ms']) : 400;
            var autoPlay = (assetOptions['auto play'].selected == 'on') ? slideSpeed : false;

            var autoPlayHoverPause = (assetOptions['auto play hover pause'].selected == 'on') ? true : false;
            var buttonColor = assetOptions['button color'].color;
            var sideButtonColor = assetOptions['side button color'].color;
            var sideButtonBgColor = assetOptions['side button bg color'].color;
            var sideButtonSize = parseInt(assetOptions['side button size']);
            var sideButtonFont = Math.round(sideButtonSize / 2);
            var nav = true;
            var horizontalGap = 0;
            switch (assetOptions['side button position'].selected) {
                case'none':
                    nav = false;
                    break;
                case'inside':
                    horizontalGap = 0;
                    break;
                case'outside':
                    horizontalGap = -(sideButtonSize + 20);
                    break;
                case'on edge':
                    horizontalGap = -((sideButtonSize / 2) + 10);
                    break;
            }

            doCss = doCss || false;
            jq('#' + carouselId).owlCarousel({
                singleItem: true,
                navigation: nav,
                navigationText: [
                    "<i class='fa fa-chevron-left'></i>",
                    "<i class='fa fa-chevron-right'></i>"
                ],
                autoPlay: autoPlay,
                stopOnHover: autoPlayHoverPause,
                paginationSpeed: transSpeed,
                slideSpeed: transSpeed

            });

            if (doCss) {
                var jQSideButtonElement = jq(jqId + ' .owl-prev, ' + jqId + ' .owl-next');
                var jQSideButtonElementPrev = jq(jqId + ' .owl-prev');
                var jQSideButtonElementPrevIcon = jq(jqId + ' .owl-prev i');
                var jQSideButtonElementNext = jq(jqId + ' .owl-next');
                var jQSideButtonElementNextIcon = jq(jqId + ' .owl-next i');
                var topGap = (height / 2) - (jQSideButtonElementPrev.outerHeight());
                jq(jqId + ' .owl-theme .owl-controls .owl-page span').css({
                    'background': buttonColor

                });
                jQSideButtonElement.css({
                    'background': sideButtonBgColor,
                    'color': sideButtonColor,
                    'font-size': sideButtonFont + 'px',
                    'min-width': sideButtonSize + 'px',
                    'min-height': sideButtonSize + 'px',
                    'max-width': sideButtonSize + 'px',
                    'max-height': sideButtonSize + 'px',
                    'border-radius': sideButtonSize + 'px',
                    'line-height': sideButtonSize + 'px',
                    'text-align': 'center',
                    'padding': '3px',
                    'box-sizing': 'content-box'

                });
                var chromeAdjustHorizontal = (isChrome) ? '-1' : '-1';
                var chromeAdjustVertical = (isChrome) ? '1' : '0';
                jQSideButtonElementPrevIcon.css({
                    'position': 'relative',
                    'top': chromeAdjustVertical + 'px',
                    'left': chromeAdjustHorizontal + 'px'
                });
                jQSideButtonElementNextIcon.css({
                    'position': 'relative',
                    'top': chromeAdjustVertical + 'px',
                    'right': chromeAdjustHorizontal + 'px'
                });
                jQSideButtonElementPrev.css({
                    'position': 'absolute',
                    'left': horizontalGap + 'px',
                    'top': topGap + 'px'
                });
                jQSideButtonElementNext.css({
                    'position': 'absolute',
                    'right': horizontalGap + 'px',
                    'top': topGap + 'px'
                });
                jq(win).resize(function () {
                    setTimeout(function () {
                        jq(jqId + ' .owl-theme .owl-controls .owl-page span').css({'background': buttonColor});

                    }, 550);

                });
            }
        }
        carousel(true);

        setTimeout(function () {
            carousel(true);
        }, 50);


    },
    callbackAdmin: function (id, JMC, assetOptions) {
        var width = parseInt(assetOptions.width);
        var height = parseInt(assetOptions.height) + 50;
        var handleFuncs = function () {

            var jq = JMC.getChildJQuery();
            var carouselId = 'jelly-carousel-' + id;
            jq('#' + carouselId + ' *').click(function (e) {

                e.preventDefault();
                e.stopPropagation();

            });
            jq('#' + carouselId + ' *').mousedown(function (e) {

                e.preventDefault();
                e.stopPropagation();

            });
            jq('#' + JMCassets.div.assetInnerId(id)).css({'width': width + 'px', 'height': height + 'px'});
            jq('#' + JMCassets.div.assetInnerId(id) + ' .jelly-under').css({'z-index': '-1'});
            jq('#' + JMCassets.div.assetInnerId(id)).append('<div class="jelly-drag-handle"></div>');
            jq('#' + JMCassets.div.assetInnerId(id) + ' .jelly-drag-handle').hide();
            jq('#' + JMCassets.div.assetInnerId(id) + ' .jelly-drag-handle').css(
                JMCassets.css.assetDragHandle()
            );
            jq('#' + JMCassets.div.assetInnerId(id)).mouseover(function () {
                jq('#' + JMCassets.div.assetInnerId(id) + ' .jelly-drag-handle').show();
            }).mouseout(function () {
                jq('#' + JMCassets.div.assetInnerId(id) + ' .jelly-drag-handle').hide();
            });
            JMC.getJellyChild().JMD.initJellyDrag();
        }
        handleFuncs();
        setTimeout(function () {
            handleFuncs();
            JMC.getLayout().editContentSettings(id, {width: width, height: height});
            console.log('callback changed carousel height width!');
        }, 50);

    },
    noCursor: true
};
