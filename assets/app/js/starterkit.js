var JMCstarterkit = JMCstarterkit || {};
JMCstarterkit.assets = JMCstarterkit.assets || {};
JMCstarterkit.clickFunctions = JMCstarterkit.clickFunctions || {};
JMCstarterkit.clickFunctions = {

    'Scroll to top': function (win, jq, jqId, e) {
        jq("html, body").animate({scrollTop: 0}, "slow");
    },

    'Scroll to bottom': function (win, jq, jqId, e) {
        jq("html, body").animate({scrollTop: jq(win).height()}, "slow");
    }
};