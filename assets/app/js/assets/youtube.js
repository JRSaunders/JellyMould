JMCstarterkit.assets.youtube = JMCstarterkit.assets.youtube || {};
/**
 *
 * @type {{name: string, width: number, height: number, assetOptions: {width: string, height: string, youtube url: string}, callbackFrontend: JMCstarterkit.assets.youtube.callbackFrontend, callbackAdmin: JMCstarterkit.assets.youtube.callbackAdmin, noCursor: boolean}}
 */
JMCstarterkit.assets.youtube = {
    name: 'You Tube',
    width: 400,
    height: 225,
    assetOptions: {
        'width': '400',
        'height': '225',
        'youtube url': 'https://www.youtube.com/embed/frdj1zb9sMY'
    },
    callbackFrontEnd: function (id, win, jq, jqId, assetOptions) {
        var width = assetOptions.width;
        var height = assetOptions.height;
        var url = assetOptions['youtube url'];
        var youTubeId = 'youtube-' + id;
        var iframe = '<iframe id="' + youTubeId + '" width="' + width + '" height="' + height + '" src="' + url + '" frameborder="0" allowfullscreen></iframe>';
        jq(jqId).html(iframe);
    },
    callbackAdmin: function (id, JMC, assetOptions) {
        var youTubeId = 'youtube-' + id;
        var width = parseInt(assetOptions.width);
        var height = parseInt(assetOptions.height);
        var handleFuncs = function () {

            var jq = JMC.getChildJQuery();

            jq('#' + youTubeId + ' *').click(function (e) {

                e.preventDefault();
                e.stopPropagation();

            });
            jq('#' + youTubeId + ' *').mousedown(function (e) {

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
            console.log('callback changed youtube height width!');
        }, 50);
    },
    noCursor: true
}