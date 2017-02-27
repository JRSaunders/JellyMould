class JellyMouldDisplay {
    /**
     *
     * @param jQuery
     * @param DomElementId
     */
    constructor(jQuery, DomElementId, footerPadding) {
        this.ready = false;
        if (typeof(window.parent.JMC) == 'undefined') {
            console.log('Jelly Mould Controller not available in parent window');
            return;
        }

        if (typeof(window.parent.JMC.receiveJelly) == 'function') {
            console.log('receiveJelly available!');
            this.JMC = window.parent.JMC;

        } else {
            return;
        }

        if (typeof(jQuery) !== 'function') {
            console.log('You Need JQuery & JQuery UI installed');
            return;
        }
        var $ = jQuery;
        DomElementId = DomElementId || 'jellyMouldDisplay';

        this.DomElementId = DomElementId;
        
        this.jQuery = jQuery;

        this.ready = true;

        this.footerPadding(footerPadding);

    }
    
    getJMC() {
        return this.JMC;
    }

    footerPadding(padding) {
        padding = padding || 600;
        var jq = this.getJQuery();
        jq('#' + this.getDomElementId()).resize(function () {
            jq('#' + this.getDomElementId()).css({'padding-bottom': padding + 'px'});
        });

    }

    isReady() {
        return this.ready;
    }

    getDomElementId() {
        return this.DomElementId;
    }

    getJQuery() {
        return this.jQuery;
    }

    initJellyDrag() {

        var self = this;
        $(".jelly-drag").draggable(
            {
                stop: function () {
                    var left = $(this).offset().left - $(this).parent().offset().left;

                    var top = $(this).offset().top - $(this).parent().offset().top;

                    var id = $(this).data('jelly_id');
                    console.log('---' + id);
                    left = Math.round((left / 20)) * 20;
                    top = Math.round((top / 20)) * 20;

                    var sectionHeight = $(this).parent().height() - 20;

                    if (top > sectionHeight) {
                        top = sectionHeight;
                    }
                    var that = $(this);
                    setTimeout(function () {
                        that.css({'position': 'absolute', 'left': left + 'px', 'top': top + 'px'});
                    }, 300);

                    self.getJMC().receiveJelly(id, left, top);
                },
                grid: [20, 20],
                containment: 'parent',
                handle: '.jelly-drag-handle',
                opacity: 0.5

            }
        );
    }

    /**
     *
     * @param contents
     * @param inToId
     * @param callback
     */
    jellyPut(contents, inToId, callback) {

        callback = callback || function () {
            };
        if (this.isReady()) {
            console.log('is ready! ' + this.getDomElementId());
        }
        console.log('jellyPut on Child received call!');
        var $ = this.getJQuery();

        inToId = inToId || this.getDomElementId();
        console.log(inToId);
        $('#' + inToId).append(contents);


        var self = this;
        this.initJellyDrag();


        $(".jelly-drag").css({

            'display': 'table-caption',
            'text-align': 'center'

        });


        callback(jQuery, window);


    }
}

var JMD = new JellyMouldDisplay(jQuery, 'jellyMouldDisplay');

