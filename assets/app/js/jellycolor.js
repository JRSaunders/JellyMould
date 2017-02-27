class JellyColor extends JellyBase {
    constructor(childJQuery, id, boxType, JMC) {

        super({id: id, childJQuery: childJQuery, boxType: boxType, JMC: JMC});


    }


    doFill(newColor, bg) {


        bg = bg || false;

        var jq = this.getChildJQuery();
        var id = this.getId();
        switch (this.boxType) {
            case 'text':
            case 'jelly':
                if (bg == true) {
                    this.cssLayoutInner({'background-color': newColor});
                    jq('#' + JMCassets.div.controlColorBgId(id)).css({'background-color': newColor});
                } else {
                    this.cssLayoutInner({'color': newColor});
                    jq('#' + JMCassets.div.controlColorId(id)).css({'background-color': newColor});
                }
                break;
            case 'section':
                if (bg == true) {
                    this.cssLayoutOuter({'background-color': newColor});
                    jq('#' + JMCassets.div.controlColorBgId(id)).css({'background-color': newColor});

                } else {
                    this.cssLayoutInner({'background-color': newColor});
                    jq('#' + JMCassets.div.controlColorId(id)).css({'background-color': newColor});
                }

                break;
        }
    }

    doBorderStroke(newColor) {
        var jq = this.getChildJQuery();
        var id = this.getId();
        switch (this.boxType) {
            case 'text':
            case 'jelly':
                this.cssLayoutInner({
                    'border-color': newColor,
                    'border-style': 'solid'
                });

                jq('#' + JMCassets.div.controlColorBorderId(id)).css({'background-color': newColor});


                break;

        }
    }

    colorSelectorInit(initColor, initBgColor, initBordercolor) {
        initColor = initColor || "rgba(0,0,0,1)";
        initBgColor = initBgColor || "rgba(0,0,0,0)";
        initBordercolor = initBordercolor || "rgba(0,0,0,0)";
        var jq = this.getChildJQuery();
        var id = this.getId();
        var self = this;

        jq('#' + JMCassets.div.controlColorId(id)).css(JMCassets.css.controlColor(initColor));
        jq('#' + JMCassets.div.controlColorBorderId(id)).spectrum({
            preferredFormat: "rgb",
            color: initBordercolor,
            showAlpha: true,
            showInput: true,
            change: function (color) {

                console.log(color);

                var newColor = JMCassets.css.rgba(color);
                self.doBorderStroke(newColor);

            },
            move: function (color) {
                var moveColor = JMCassets.css.rgba(color);
                jq('#' + JMCassets.div.controlColorBorderId(id)).css({'background-color': moveColor});
            }

        });

        jq('#' + JMCassets.div.controlColorBgId(id)).css(JMCassets.css.controlColor(initBgColor));
        jq('#' + JMCassets.div.controlColorBorderId(id)).css(JMCassets.css.controlColor(initBordercolor));
        jq('#' + JMCassets.div.controlColorId(id)).spectrum({
            preferredFormat: "rgb",
            color: initColor,
            showAlpha: true,
            showInput: true,
            change: function (color) {

                console.log(color);

                var newColor = JMCassets.css.rgba(color);

                self.doFill(newColor);

            },
            move: function (color) {
                var moveColor = JMCassets.css.rgba(color);
                jq('#' + JMCassets.div.controlColorId(id)).css({'background-color': moveColor});
            }

        });
        jq('#' + JMCassets.div.controlColorBgId(id)).spectrum({
            preferredFormat: "rgb",
            color: initBgColor,
            showAlpha: true,
            showInput: true,
            change: function (color) {

                console.log(color);

                var newColor = JMCassets.css.rgba(color);
                self.doFill(newColor, true);

            },
            move: function (color) {
                var moveColor = JMCassets.css.rgba(color);
                jq('#' + JMCassets.div.controlColorBgId(id)).css({'background-color': moveColor});
            }

        });


    }
}
