JMCstarterkit.assets.trustPilot = JMCstarterkit.assets.trustPilot || {};
/**
 *
 * @type {{name: string, width: number, height: number, assetOptions: {width: string, height: string, button color: {color: string}, side button bg color: {color: string}, side button color: {color: string}, side button size: string, side button position: {selected: string, options: {1: string, 2: string, 3: string, 4: string}}, curve: string, slide1: {image: string}, slide2: {image: string}, slide3: {image: string}, slide4: {image: string}, slide5: {image: string}, slide6: {image: string}, slide7: {image: string}, slide8: {image: string}, slide9: {image: string}, slide10: {image: string}, slide1html: string, slide2html: string, slide3html: string, slide4html: string, slide5html: string, slide6html: string, slide7html: string, slide8html: string, slide9html: string, slide10html: string}, callbackFrontend: JMCstarterkit.assets.carousel.callbackFrontend, callbackAdmin: JMCstarterkit.assets.carousel.callbackAdmin, noCursor: boolean}}
 */
JMCstarterkit.assets.trustPilot = {
    name: 'Trust Pilot Widget',
    width: 440,
    height: 220,
    assetOptions: {
        'width': '440',
        'height': '220',
        'template_id': '54ad5defc6454f065c28af8b',
        'businessunit_id': '573ed0f50000ff00058d1d65',
        'theme': {
            'selected': 'outside',
            'options': {1: "dark", 2: "light"}
        }

    },
    callbackFrontEnd: function (id, win, jq, jqId, assetOptions) {
        var height = assetOptions.height;
        var html = ' <div class="trustpilot-widget" data-locale="en-GB"' +
            'data-template-id="' + assetOptions.template_id + '"' +
            ' data-businessunit-id="' + assetOptions.businessunit_id + '"' +
            ' data-style-height="' + height + 'px" data-style-width="' + assetOptions.width + 'px"' +
            ' data-theme="' + assetOptions.theme.selected + '" data-tags="Homepage" data-stars="1,2,3,4,5">' +
            '    </div>';
        jq('#trustPilotWidgetScript').remove();
        setTimeout(function () {
            var script = '//widget.trustpilot.com/bootstrap/v5/tp.widget.sync.bootstrap.min.js';
            var s = win.document.createElement('script');
            s.type = 'text/javascript';
            s.src = script;
            s.async = true;
            s.id = 'trustPilotWidgetScript';
            s.onload = function () {

                jq(jqId).html(html);

            };
            if (typeof(win.document.head) != 'undefined') {
                win.document.head.appendChild(s);
            }
        }, 200);

    },
    callbackAdmin: function (id, JMC, assetOptions) {
        var width = parseInt(assetOptions.width);
        var height = parseInt(assetOptions.height) + 50;
        var jq = JMC.getChildJQuery();
        var handleFuncs = function () {

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
            console.log('callback changed widget height width!');
        }, 50);


    },
    noCursor: false
};

