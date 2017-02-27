class JellyDevice {
    /**
     *
     * @param jQuery
     * @param frame
     */
    constructor(jQuery, frame) {
        frame = frame || window;
        if (typeof(jQuery) !== 'function') {
            alert('You Need JQuery installed');
            console.log('You Need JQuery installed');
            return;
        }
        this.frame = frame;
        this.jQuery = jQuery;
        this.getDevice();
    }

    getJQuery() {
        return this.jQuery;
    }

    getFrame() {
        return this.frame;
    }

    getDevice() {

        var $ = this.getJQuery();
        var width = $(this.getFrame()).width();
        this.width = width;
        if (width > JMCassets.css.defaultDesktopWidth) {
            return this.device = 'desktop';
        }
        if (width > JMCassets.css.defaultTabletWidth) {
            return this.device = 'tablet';
        }

        return this.device = 'mobile';

    }

    getWidth() {
        return this.width;
    }
}