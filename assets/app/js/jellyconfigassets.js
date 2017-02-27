var JMconf = JMconf || {};
JMconf.div = JMconf.div || {};
JMconf.css = JMconf.css || {};

JMconf.div = {
    configControlPanel: function () {
        return '<div style="background-color:#333;color:#FFF;font-weight: bold;font-size: 14px;padding:5px;">' +
            '<i class="fa fa-cogs" aria-hidden="true"></i> Page Config</div>' +
            '<div>' +

            '<button class="btn green" id="jm-newLayoutConfig"><i class="fa fa-plus-square-o" aria-hidden="true">' +
            '</i> Layout</button>' +
            '<button class="btn blue" id="jm-saveLayoutConfig">' +
            '<i class="fa fa-floppy-o" aria-hidden="true"></i>' +
            '</button>' +
            '<button id="jm-test-conditions" class="btn blue"><i class="fa fa-flask" aria-hidden="true"></i>' +
            ' Test Conditions' +
            '</button>' +
            '<div id="jm-testOptions" >Test Options not loaded</div>' +
            '<button data-screen_type="mobile" class="btn blue jelly-screentyper mobile-jelly" title="View Mobile Layout">' +
            '<i class="fa fa-mobile" aria-hidden="true"></i>' +
            '</button>' +
            '<button data-screen_type="tablet" class="btn blue jelly-screentyper tablet-jelly" title="View Tablet Layout">' +
            '<i class="fa fa-tablet" aria-hidden="true"></i>' +
            '</button>' +
            '<button data-screen_type="desktop" class="btn blue jelly-screentyper desktop-jelly active " title="View Desktop Layout">' +
            '<i class="fa fa-desktop" aria-hidden="true"></i>' +
            '</button>' +
            '<button class="btn blue showhide-sections-jelly" >' +
            '<i class="fa fa-eye-slash" aria-hidden="true"></i> Sections' +
            '</button>' +
            '<button class="btn yellow jm-back-to-layout"><i class="fa fa-angle-left" aria-hidden="true"></i>' +
            ' back to Main Menu' +
            '</button>' +
            '</div>'
    },
    testOptions: function (testOptions) {
        var html = '<div style="text-align: center;padding-top:4px;' +
            'padding-bottom:4px;border-bottom:solid 1px #ccc;">' +
            '<b>Testing Conditions</b>' +
            '</div>';
        Object.keys(testOptions).forEach(function (key) {
            var value = testOptions[key];
            var keyName = key;

            switch (key) {
                case 'goalClicks':
                    keyName = 'Meet Clicks';
                    break;
                case 'marginClicks':
                    keyName = 'Clicks Margin';
                    break;
                case 'goalConversion':
                    keyName = 'Meet Conversions';
                    break;
                case 'marginConversion':
                    keyName = 'Conversions Margin';
                    break;
            }

            html += '<div><div style="min-width:135px !important;display:inline-block;font-size: 12px;' +
                'font-weight: bold;min-height: 25px;line-height: 16px;">' + keyName + ':</div> ' +
                '<input class="jm-testOptions" ' +
                'style="max-width:100px !important;' +
                ' min-width:100px !important;max-height:18px;font-size:12px;font-weight: normal;" type="number" ' +
                'data-option_key="' + key + '" value="' + value + '" /></div>';
        });
        html += '<div style="text-align:center;margin-bottom:10px;">' +
            '<button id="jm-setTestConditions">Set Test Conditions</button>' +
            '</div>';
        return html;
    },
    configArea: function () {
        return '<div id="' + this.configAreaId() + '" style="display:none;">' +
            this.configControlPanel() +
            '<div id="' + this.configLayoutsContainerId() + '"></div>';
        '</div>';
    },
    configAreaId: function () {
        return 'jm-config-area';
    },
    configLayoutsContainerId(){
        return 'jm-config-layouts';
    },
    layout: function (layoutsArray, configName, filename, publishedLayout, testData) {

        var publishedLayoutName = undefined;

        if (publishedLayout != null &&
            typeof(publishedLayout) == 'object' &&
            typeof(publishedLayout.layoutName) != 'undefined') {
            publishedLayoutName = '<b>' + publishedLayout.layoutName + '</b> <small>(' +
                publishedLayout.configUID + ')</small>';

        }
        publishedLayoutName = publishedLayoutName || 'n/a';
        var finalLayoutColor = '#35aa47';
        if (publishedLayoutName == 'n/a') {
            finalLayoutColor = '#999';
        }
        configName = configName || 'untitled';

        filename = filename || 'untitled';

        layoutsArray = layoutsArray || [];
        var moveBack = ' <button id="jm-move-back-to-testing"' +
            ' style="font-size:10px;line-height: 18px;min-height: 18px;max-height: 18px;padding:0;' +
            ' padding-left:8px;padding-right:8px;" class="btn red">' +
            '<i class="fa fa-backward" aria-hidden="true"></i> Move back into testing' +
            '</button>';
        if (publishedLayoutName == 'n/a') {
            moveBack = '';
        }
        var publishedControls = function (publishedLayout) {
            if (publishedLayout == null) {
                return '';
            } else {

                return ' <div class="jelly-view-layout"  style="display:inline-block;' +
                    'margin-left:10px;margin-right:10px;cursor:pointer;">' +
                    '<i class="fa fa-eye" aria-hidden="true"></i> ' +
                    '</div>';

            }
        };
        var impressions = 0;
        var clicks = 0;
        var conversions = 0;
        if (publishedLayoutName != 'n/a') {
            var uid = publishedLayout.configUID;
            if (typeof(testData[uid]) === 'object') {
                var impressions = testData[uid].impressions;
                var clicks = testData[uid].clicks;
                var conversions = testData[uid].conversions;
            }
        }
        var layoutsHtml = '<div style="background-color:#555;color:#FFF;' +
            'font-weight: bold;font-size: 14px;padding:5px;' +
            'padding-left:20px;">' +
            ' <i class="fa fa-flask" aria-hidden="true"></i> ' +
            configName + ' <small>(' + filename + ')</small>' +
            '</div>' +
            '<div style="background-color:' + finalLayoutColor + ';color:#fff;font-weight: normal;font-size: 12px;' +
            'padding:5px;padding-left:20px;">' +
            'Final Layout: ' + publishedLayoutName +
            publishedControls(publishedLayout) +
            moveBack +
            this.statLine(impressions, clicks, conversions) +
            '</div>';
        var i;

        for (i = 0; i < layoutsArray.length; i++) {
            var bgColor = '#f2f2f2';
            if (i % 2 == 0 || i == 0) {
                bgColor = '#fff';
            }
            var layoutObj = layoutsArray[i];
            if (layoutObj == null) {
                continue;
            }
            var name = layoutObj.layoutName;
            var isNewLayout = false;
            if (name == null) {
                isNewLayout = true;
                name = 'untitled';
            }
            var uid = layoutObj.configUID;
            var impressions = 0;
            var clicks = 0;
            var conversions = 0;
            if (typeof(testData[uid]) === 'object') {
                var impressions = testData[uid].impressions;
                var clicks = testData[uid].clicks;
                var conversions = testData[uid].conversions;
            }

            layoutsHtml += '<div style="background-color:' + bgColor +
                ';min-height: 20px;border-bottom:solid 1px #ccc;' +
                'padding:5px;padding-left:20px;"><b>' +
                (i + 1) + '.</b> ' +
                '<b>' + name + '</b> <small>(' + uid + ')</small>';
            if (isNewLayout) {
                layoutsHtml += ' <div class="jelly-grab-layout" title="grab current layout displayed!" ' +
                    'data-config_uid="' + uid +
                    '" style="display:inline-block;margin-left:10px;color:#000;background-color:#FFF;">' +
                    '<i class="fa fa-hand-rock-o" aria-hidden="true"></i>' +
                    '</div>';
            }
            layoutsHtml += ' <div class="jelly-view-layout" data-config_uid="' + uid +
                '" style="display:inline-block;margin-left:10px;cursor:pointer;position:relative;">' +
                '<i class="fa fa-eye" aria-hidden="true"></i> ' +
                '</div>' +
                ' <div id="jm-save-' + uid + '" class="jelly-save-layout" data-config_uid="' + uid +
                '" style="display:inline-block;margin-left:10px;cursor:pointer;display:none;">' +
                '<i class="fa fa-floppy-o" aria-hidden="true"></i> ' +
                '</div>' +
                ' <div class="jelly-delete-layout" data-config_uid="' + uid +
                '" style="display:inline-block;margin-left:10px;cursor:pointer;">' +
                '<i class="fa fa-trash" aria-hidden="true"></i> ' +
                '</div>' +
                this.statLine(impressions, clicks, conversions) +
                '</div>';
        }

        return layoutsHtml;
    },
    statLine: function (impressions, clicks, conversions) {
        impressions = impressions || 0;
        clicks = clicks || 0;
        conversions = conversions || 0;

        var clickRatio = (clicks / impressions) * 100;
        var conversionRatio = (conversions / impressions) * 100;
        if (isNaN(clickRatio)) {
            clickRatio = 0;
        }
        if (isNaN(conversionRatio)) {
            conversionRatio = 0;
        }
        clickRatio = Math.round(clickRatio);
        conversionRatio = Math.round(conversionRatio);

        return '<div style="float:right;">' +
            '<div style="display:inline-block;margin-left:30px;min-width:150px;">' +
            'Engagement: <b>' + clickRatio + '%</b></div>' +
            '<div style="display:inline-block;margin-left:30px;min-width:150px;">' +
            'Conversion: <b>' + conversionRatio + '%</b></div>' +
            '<div style="display:inline-block;margin-left:30px;min-width:150px;">' +
            'Impressions: <b>' + impressions + '</b></div>' +
            '<div style="display:inline-block;margin-left:30px;min-width:150px;">' +
            'Clicks: <b>' + clicks + '</b></div>' +
            '<div style="display:inline-block;margin-left:30px;min-width:150px;">' +
            'Conversions: <b>' + conversions + '</b></div></div>';
    }
};

JMconf.css = {
    testOptions: function () {
        return {
            'position': 'absolute',
            'left': '75px',
            'background-color': '#FFF',
            'border': 'solid 1px #CCC',
            'min-height': '40px',
            'min-width': '280px',
            'display': 'none',
            'padding-left': '10px',
            'padding-right': '10px',
            'z-index': '1000'
        };
    }
};