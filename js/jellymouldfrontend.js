function compileJMFunction(str) {
    //find parameters
    var pstart = str.indexOf('('), pend = str.indexOf(')');
    var params = str.substring(pstart + 1, pend);
    params = params.trim();

    //find function body
    var bstart = str.indexOf('{'), bend = str.lastIndexOf('}');
    var str = str.substring(bstart + 1, bend);

    return Function(params, str);
}

function runExternalJMFunction(func) {

    if (typeof(window[func]) === 'function') {
        var fn = window[func];
        fn.apply();
    }
}

window.JMclickHistory = [];
function recordJMClick(configUID, contentUID, event) {
    if (
        typeof(window.JMclickHistory[contentUID]) != 'undefined'
        && window.JMclickHistory[contentUID] == true
    ) {
        return false;
    }
    if (typeof(window['_JM_recordClick']) === 'function') {
        var fn = window['_JM_recordClick'];
        var args = [configUID, contentUID];

        fn.apply(null, args);
    }
    window.JMclickHistory[contentUID] = true;

    setTimeout(function () {
        return event;
    }, 2000);
}

function recordJMconversion() {
    if (typeof(window['_JM_recordConversion']) === 'function') {
        var fn = window['_JM_recordConversion'];
        fn.apply();
    }
}

function widthJMRestrict(restrictWidth) {
    var currentRestrictions = 0;
    if (typeof($modulus.getRestrictedWidth) === 'function') {
        currentRestrictions = $modulus.getRestrictedWidth();
    }
    if (restrictWidth < currentRestrictions) {
        return false;
    }
    if (/Android|webOS|iPhone|iPod|BlackBerry|AppleWebKit/i.test(navigator.userAgent)) {
        var ww = ( jQuery(window).width() < window.screen.width ) ? jQuery(window).width() : window.screen.width;
        var mw = restrictWidth;
        var ratio = ww / mw;
        if (ww < restrictWidth) {
            jQuery('#viewport').attr('content', 'initial-scale=' + ratio + ', minimum-scale=' + ratio + ', user-scalable=yes, maximum-scale=' + ratio + ', width=' + mw);
        } else {
            jQuery('#viewport').attr('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
        }
        window.removeEventListener("orientationchange", function () {
        });
        window.addEventListener("orientationchange", function () {
            widthJMRestrict(restrictWidth);
        }, false);
        window.jellymouldWidthRestrictSet = restrictWidth;
    }
}


$(document).ready(function () {
    $('.jm-link').click(function (event) {
        var that = $(this);
        var configUID = that.data('config_uid');
        var contentUID = that.data('content_uid');
        recordJMClick(configUID, contentUID, event);
    });
    $('.jm-href').click(function (event) {
        var that = $(this);
        var href = that.attr('href');
        event.preventDefault();
        setTimeout(function () {
            if (that.attr('target')) {

                window.open(href, that.prop('target'));

            } else {

                window.location = href;
            }
        }, 100);


    });
});


