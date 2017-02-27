class JellyFont extends JellyBase {

    constructor(childJQuery, id, boxType, JMC) {
        super({id: id, childJQuery: childJQuery, boxType: boxType, JMC: JMC});


    }
    
    /**
     *
     * @param initCss
     */
    fontOptionsInit(initCss) {
        initCss = initCss || {'text-align': 'center', 'font-weight': 'normal'};
        var jq = this.getChildJQuery();
        var id = this.getId();
        var jqInnerElement = jq('#' + JMCassets.div.jellyInnerId(id));
        var self = this;
        jq('#' + JMCassets.div.boldId(id)).unbind();
        jq('#' + JMCassets.div.boldId(id)).click(function () {

            var bold = jqInnerElement.css('font-weight');
            console.log(bold);
            if (bold != 'bold') {
                self.cssLayoutInner({"font-weight": "bold"});
            } else {
                self.cssLayoutInner({"font-weight": "normal"});
            }

        });
        jq('#' + JMCassets.div.alignLeftId(id)).unbind();
        jq('#' + JMCassets.div.alignLeftId(id)).click(function () {
            var align = jqInnerElement.css('text-align');
            console.log(align);
            self.cssLayoutInner({"text-align": "left"});
        });
        jq('#' + JMCassets.div.alignRightId(id)).unbind();
        jq('#' + JMCassets.div.alignRightId(id)).click(function () {
            var align = jqInnerElement.css('text-align');
            console.log(align);
            self.cssLayoutInner({"text-align": "right"});
        });
        jq('#' + JMCassets.div.alignCenterId(id)).unbind();
        jq('#' + JMCassets.div.alignCenterId(id)).click(function () {
            var align = jqInnerElement.css('text-align');
            console.log(align);
            self.cssLayoutInner({"text-align": "center"});
        });
        jq('#' + JMCassets.div.alignJustifyId(id)).unbind();
        jq('#' + JMCassets.div.alignJustifyId(id)).click(function () {
            var align = jqInnerElement.css('text-align');
            console.log(align);
            self.cssLayoutInner({"text-align": "justify"});
        });

        self.cssLayoutInner(initCss);
    }

    /**
     *
     * @param initFont
     */
    fontSelectorInit(initFont) {
        initFont = initFont || 'Arial, Helvetica, sans-serif';
        var jq = this.getChildJQuery();
        var id = this.getId();
        var self = this;


        jq('#' + JMCassets.div.fontSelectId(id)).change(function () {
            var font = jq(this).val();
            self.cssLayoutInner({
                'font-family': font
            });

        });
        jq('#' + JMCassets.div.fontSelectId(id)).val(initFont);


    }
}
