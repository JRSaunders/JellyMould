var JMCassets = JMCassets || {};

JMCassets.div = JMCassets.div || {};
JMCassets.color = JMCassets.color || {};
/**
 *
 * @type {{fonts: string[], masterControl: JMCassets.div.masterControl, masterControlId: JMCassets.div.masterControlId, addFont: JMCassets.div.addFont, mergeFonts: JMCassets.div.mergeFonts, textControl: JMCassets.div.textControl, controlTip: JMCassets.div.controlTip, controlTipId: JMCassets.div.controlTipId, textControlId: JMCassets.div.textControlId, controlColorId: JMCassets.div.controlColorId, controlColorBgId: JMCassets.div.controlColorBgId, controlColorBorderId: JMCassets.div.controlColorBorderId, textControlInnerId: JMCassets.div.textControlInnerId, textControlInputId: JMCassets.div.textControlInputId, textId: JMCassets.div.textId, textOuterId: JMCassets.div.textOuterId, imageControl: JMCassets.div.imageControl, imageControlOuterId: (function(*)), imageControlInnerId: (function(*)), textOptions: JMCassets.div.textOptions, boxOptions: JMCassets.div.boxOptions, boxBackwardsId: (function(*)), boxForwardsId: (function(*)), trashId: JMCassets.div.trashId, boldId: JMCassets.div.boldId, alignLeftId: JMCassets.div.alignLeftId, alignCenterId: JMCassets.div.alignCenterId, alignRightId: JMCassets.div.alignRightId, alignJustifyId: JMCassets.div.alignJustifyId, fontSelect: JMCassets.div.fontSelect, fontSelectId: JMCassets.div.fontSelectId, jellyId: JMCassets.div.jellyId, jellyInnerId: JMCassets.div.jellyInnerId, jellyOuterId: JMCassets.div.jellyOuterId, dragHandleClass: JMCassets.div.dragHandleClass, dragDiv: JMCassets.div.dragDiv, dragOutlineClass: JMCassets.div.dragOutlineClass, section: JMCassets.div.section, sectionOuterClass: JMCassets.div.sectionOuterClass, sectionInnerClass: JMCassets.div.sectionInnerClass, sectionControl: JMCassets.div.sectionControl, sectionOuterId: JMCassets.div.sectionOuterId, sectionId: JMCassets.div.sectionId, sectionInnerId: JMCassets.div.sectionInnerId, sectionControlOpenId: JMCassets.div.sectionControlOpenId, getSectionMasterControlModesArray: JMCassets.div.getSectionMasterControlModesArray, sectionMasterControlModeSelect: JMCassets.div.sectionMasterControlModeSelect, sectionMasterControl: JMCassets.div.sectionMasterControl, sectionMasterControlId: JMCassets.div.sectionMasterControlId, controlPointClass: JMCassets.div.controlPointClass, getBackgroundPositionArray: JMCassets.div.getBackgroundPositionArray, getBackgroundSizeArray: JMCassets.div.getBackgroundSizeArray, getBackgroundRepeatArray: JMCassets.div.getBackgroundRepeatArray, backgroundControl: JMCassets.div.backgroundControl, backgroundChooseId: (function(*)), backgroundUrlId: JMCassets.div.backgroundUrlId, imageSubmitId: JMCassets.div.imageSubmitId, backgroundSizeSelect: (function(*=, *)), backgroundPositionSelect: (function(*=, *)), backgroundRepeatSelect: (function(*=, *)), backgroundSelectPositionId: (function(*)), backgroundSelectRepeatId: (function(*)), backgroundSelectSizeId: (function(*)), getPositionArray: JMCassets.div.getPositionArray, controlPoints: JMCassets.div.controlPoints, centerControlPointClass: JMCassets.div.centerControlPointClass, sectionControlPoints: JMCassets.div.sectionControlPoints, getControlPointsIds: JMCassets.div.getControlPointsIds}}
 */
JMCassets.div = {
    /**
     *
     */
    fonts: [
        'Arial, Helvetica, sans-serif',
        '"Arial Black", Gadget, sans-serif',
        '"Comic Sans MS", cursive, sans-serif',
        'Impact, Charcoal, sans-serif',
        '"Lucida Sans Unicode", "Lucida Grande", sans-serif',
        '"Trebuchet MS", Helvetica, sans-serif',
        'Verdana, Geneva, sans-serif',
        '"Courier New", Courier, monospace',
        '"Lucida Console", Monaco, monospace'
    ],
    masterControl: function () {
        return '<div id="' + this.masterControlId() + '" style="position:relative;z-index:10;">' +
            '<div style="background-color:#333;color:#FFF;font-weight: bold;font-size: 14px;padding:5px;">' +
            ' <i class="fa fa-file" aria-hidden="true"></i> ' +
            ' <span id="jmLayoutNameDisplay">untitled</span></div>' +
            '<button id="addSectionJelly" class="btn green" title="Add Section To Canvas">' +
            '<i class="fa fa-plus-square-o" aria-hidden="true"></i> Section' +
            '</button>' +
            '<button class="btn blue" id="fileSectionJelly" title="Open Global File Manager">' +
            '<i class="fa fa-globe" aria-hidden="true"></i> File Manager' +
            '</button>' +
            '<button class="btn blue" id="openSectionJelly" title="Open Layout Files & Templates">' +
            '<i class="fa fa-file-o" aria-hidden="true"></i>' +
            '</button>' +
            this.openFile() +
            '<button class="btn blue" id="saveSectionJelly" title="Save Layout Files & Templates">' +
            '<i class="fa fa-floppy-o" aria-hidden="true"></i>' +
            '</button>' +
            this.saveFile() +
            this.nameFile() +
            '<button data-screen_type="mobile" class="btn blue jelly-screentyper mobile-jelly" title="View Mobile Layout">' +
            '<i class="fa fa-mobile" aria-hidden="true"></i>' +
            '</button>' +
            '<button data-screen_type="tablet" class="btn blue jelly-screentyper tablet-jelly" title="View Tablet Layout">' +
            '<i class="fa fa-tablet" aria-hidden="true"></i>' +
            '</button>' +
            '<button data-screen_type="desktop" class="btn blue jelly-screentyper desktop-jelly active " title="View Desktop Layout">' +
            '<i class="fa fa-desktop" aria-hidden="true"></i>' +
            '</button>' +
            '<button class="btn blue showhide-sections-jelly">' +
            '<i class="fa fa-eye-slash" aria-hidden="true"></i> Sections' +
            '</button>' +
            '<button  class="btn blue" data-theme="light" ' +
            ' id="change-control-theme-jelly" title="Change Control Theme Dark/Light">' +
            '<i class="fa fa-toggle-off" aria-hidden="true"></i>' +
            '</button>' +
            '<button data-screen_type="desktop" class="btn yellow" id="open-config-jelly">' +
            '<i class="fa fa-cogs" aria-hidden="true"></i> Page Config' +
            '</button>' +
            '</div>';
    },
    layoutNameId: function () {
        return 'jmLayoutNameDisplay';
    },
    nameFile: function (currentName) {
        currentName = currentName || 'untitled';
        return '<div id="jellyNameFile" class="jm-file-menu" style="max-width:160px;">' +
            '<label style="max-width:80px;font-size: 12px;font-weight: normal;" >Layout Name</label>' +
            '<input style="max-width:80px;font-size: 12px;font-weight: normal;" ' +
            'type="text" id="jm-filenamer" value="' + currentName + '" />' +
            '<button id="jm-namer-save">Save <i class="fa fa-floppy-o" aria-hidden="true"></i></button>' +
            '</div>';
    },
    saveFile: function () {
        return '<div id="jellySaveFile" class="jm-file-menu" style="text-align: right;">' +
            '<div style="min-height: 25px;border-bottom:solid 1px #ccc;cursor:pointer;padding:3px;"' +
            ' class="jm-savefile">Save <i class="fa fa-floppy-o" aria-hidden="true"></i></div>' +
            '<div style="min-height: 25px;cursor:pointer;padding:3px;border-bottom:solid 1px #ccc;"' +
            ' class="jm-saveAsfile">' +
            'Save As <i class="fa fa-floppy-o" aria-hidden="true"></i>' +
            '</div>' +
            '<div style="min-height: 25px;cursor:pointer;padding:3px;border-bottom:solid 1px #ccc;"' +
            ' class="jm-saveAsTemplatefile">' +
            'Save As Template <i class="fa fa-floppy-o" aria-hidden="true"></i>' +
            '</div>' +
            '<div style="min-height: 25px;cursor:pointer;padding:3px;" ' +
            'class="jm-trashfile">' +
            'Delete <i class="fa fa-trash-o" aria-hidden="true"></i>' +
            '</div>' +
            '</div>';

    },
    openFile: function () {
        return '<div id="jellyOpenFile" class="jm-file-menu">Ajax Call has not got files!!!</div>';
    },
    openFileInner: function (filesArray) {
        filesArray = filesArray || [];
        filesArray.sort();
        var files = '';
        var i;
        for (i = 0; i < filesArray.length; i++) {
            files += '<div style="padding:3px;border-bottom:solid 1px #CCC;">' +
                filesArray[i] +
                '<div style="float:right;cursor:pointer;" class="jm-open-file" data-filename="' + filesArray[i] + '">' +
                '<i class="fa fa-pencil" aria-hidden="true"></i>' +
                '</div></div>';
        }
        return files;
    },
    masterControlId: function () {
        return 'MasterControllerPanel';
    },
    addFont: function (font) {
        this.fonts.push(font);
        this.fonts.sort();
    },
    mergeFonts: function (mergeArray) {
        mergeArray = mergeArray || [];
        Array.prototype.push.apply(this.fonts, mergeArray);
        this.fonts.sort();
    },
    /**
     *
     * @param id
     * @returns {string}
     */
    textControl: function (id) {
        return '<div id="' + this.textControlId(id) + '">' +
            '<div id="' + this.textControlInnerId(id) + '">' +
            this.textOptions(id) +
            '<textarea data-jelly-change-id="' + this.jellyInnerId(id) + '" id="' + this.textControlInputId(id) + '" ></textarea>' +
            '</div></div>';
    },
    /**
     *
     *
     * @param id
     */
    controlTip: function (id) {
        return '<div id="' + this.controlTipId(id) + '">tip</div>';
    },
    controlTipId: function (id) {
        return id + '--controlTip';
    },
    /**
     *
     * @param id
     * @returns {string}
     */
    textControlId: function (id) {
        return id + '--textControl';
    },
    /**
     *
     * @param id
     * @returns {string}
     */
    controlColorId: function (id) {
        return id + '--colorControl';
    },
    /**
     *
     * @param id
     * @returns {string}
     */
    controlColorBgId: function (id) {
        return id + '--colorControlBg';
    },
    /**
     *
     * @param id
     * @returns {string}
     */
    controlColorBorderId: function (id) {
        return id + '--colorControlBorder';
    },
    /**
     *
     * @param id
     * @returns {string}
     */
    textControlInnerId: function (id) {
        return this.textControlId(id) + 'Inner';
    },
    /**
     *
     * @param id
     * @returns {string}
     */
    textControlInputId: function (id) {
        return id + '--textControl-input';
    },
    /**
     *
     * @param id
     * @returns {*}
     */
    textId: function (id) {
        return this.jellyId(id);
    },
    textInnerId: function (id) {
        return this.jellyInnerId(id);
    },
    textOuterId: function (id) {
        return this.jellyOuterId(id);
    },
    /**
     *
     * @param id
     * @returns {string}
     */
    imageControl: function (id) {
        return '<div style="position:relative;display:inline-block;" title="Image Control" id="' + this.imageControlOuterId(id) + '">' +
            '<i class="fa fa-image open-image-button"></i>' +
            '<div id="' + this.imageControlInnerId(id) + '"></div>' +
            '</div>';
    },
    /**
     *
     * @param id
     */
    imageControlOuterId(id){
        return id + '--imageControlOuter';
    },
    /**
     *
     * @param id
     */
    imageControlInnerId(id){
        return id + '--imageControlInner';
    },
    /**
     *
     * @param id
     * @returns {string}
     */
    textOptions: function (id) {
        return '<div style="min-width:220px;">' +
            '<div id="' + this.controlColorBorderId(id) + '"></div>' +
            '<div id="' + this.controlColorBgId(id) + '"></div>' +
            '<div id="' + this.controlColorId(id) + '"></div>' +
            this.fontSelect(id) +
            this.controlTip(id) +
            '<div style="background-color:rgba(255,255,255,0.2);">' +

            '<div title="Bold" style="display:inline-block;margin:2px;" id="' + this.boldId(id) + '">' +
            '<i class="fa fa-bold" aria-hidden="true"></i>' +
            '</div>' +
            '<div title="Align Left" style="display:inline-block;margin:2px;" id="' + this.alignLeftId(id) + '">' +
            '<i class="fa fa-align-left" aria-hidden="true"></i>' +
            '</div>' +
            '<div title="Align Center" style="display:inline-block;margin:2px;" id="' + this.alignCenterId(id) + '">' +
            '<i class="fa fa-align-center" aria-hidden="true"></i>' +
            '</div>' +
            '<div title="Align Right" style="display:inline-block;margin:2px;" id="' + this.alignRightId(id) + '">' +
            '<i class="fa fa-align-right" aria-hidden="true"></i>' +
            '</div>' +
            '<div title="Align Justify" style="display:inline-block;margin:2px;" id="' + this.alignJustifyId(id) + '">' +
            '<i class="fa fa-align-justify" aria-hidden="true"></i>' +
            '</div>' +
            this.boxOptions(id) +
            this.imageControl(id) +
            this.functionControl(id) +
            '</div>' +
            '</div>';
    },
    functionControl: function (id) {
        return '<div title="Click Function/Href Link out" style="position:relative;display:inline-block;margin:2px;" id="' + this.functionOuterId(id) + '">' +
            '<i class="fa fa-cogs open-function-button" aria-hidden="true"></i>' +
            '<div id="' + this.functionInnerId(id) + '"></div>' +
            '</div>';
    },
    functionClickControl: function (id, clickFunctions, childFunctions) {

        return '<div>On Click Run <br /><span id="' + this.clickControlId(id) + '" style="font-weight: bold">?</span></div>' +
            '<div><label>Functions:</label><br />' + this.clickFunctionSelect(id, clickFunctions) + '</div><hr />' +
            '<div><label>HREF Link out</label><input id="' + this.hrefId(id) + '" type="text" value="" /></div><hr />' +
            '<div>On Click Run External Script<br /><span id="' + this.externalScriptId(id) + '" style="font-weight: bold">?</span></div>' +
            '<div><label>External Scripts:</label><br />' + this.childFunctionsSelect(id, childFunctions) + '</div>';
    },
    clickControlId(id){
        return id + '--clickControl';
    },
    clickControlSelectId(id){
        return id + '--clickSelectControl';
    },
    clickControlUseId(id){
        return id + '--clickUseControl';
    },
    clickControlRunId(id){
        return id + '--clickRunControl';
    },
    hrefId(id){
        return id + '--href';
    },
    externalScriptId(id){
        return id + '--externalScript';
    },
    externalScriptSelectId(id){
        return id + '--externalSelectScript';
    },
    externalScriptUseId(id){
        return id + '--externalUseScript';
    },
    externalScriptRunId(id){
        return id + '--externalRunScript';
    },
    clickFunctionSelect: function (id, clickFunctions) {
        clickFunctions = clickFunctions || [];
        var i;
        var options = '<option value="">No Function</option>';
        for (i = 0; i < clickFunctions.length; i++) {
            var funcObject = clickFunctions[i];
            options += '<option value="' + i + '">' + funcObject.name + '</option>';
        }
        var select = '<select id="' + this.clickControlSelectId(id) + '">' +
            options +
            '</select><br />' +
            '<button class="jelly-button" id="' + this.clickControlUseId(id) + '">Use</button>' +
            '<button  class="jelly-button" id="' + this.clickControlRunId(id) + '">Run</button>';
        return select;
    },
    childFunctionsSelect: function (id, childFunctions) {
        childFunctions = childFunctions || [];
        var i;
        var options = '<option value="">No Function</option>';
        for (i = 0; i < childFunctions.length; i++) {
            childFunctions
            options += '<option value="' + childFunctions[i] + '">' + childFunctions[i] + '</option>';
        }
        var select = '<select id="' + this.externalScriptSelectId(id) + '">' +
            options +
            '</select><br />' +
            '<button  class="jelly-button" id="' + this.externalScriptUseId(id) + '">Use</button>' +
            '<button  class="jelly-button" id="' + this.externalScriptRunId(id) + '">Run</button>';
        return select;
    },
    functionOuterId: function (id) {
        return id + '--functionOuter';
    },
    functionInnerId: function (id) {
        return id + '--functionInner';
    },
    screenTypeMasterControls: function () {
        return '<div class="jelly-screen-type" id="jellySectionDesktop"></div>' +
            '<div class="jelly-screen-type" id="jellySectionTablet"></div>' +
            '<div class="jelly-screen-type" id="jellySectionMobile"></div>';
    },
    screenTypePageDivs: function () {

        return '<div style="display:none;" class="jelly-screen-type" id="jellyMould-desktop"></div>' +
            '<div style="display:none;" class="jelly-screen-type" id="jellyMould-mobile"></div>' +
            '<div style="display:none;" class="jelly-screen-type" id="jellyMould-tablet"></div>'
    },
    boxOptions: function (id) {
        return '<div title="Trash" style="display:inline-block;margin:2px;margin-left:10px;" id="' + this.trashId(id) + '">' +
            '<i class="fa fa-trash" aria-hidden="true"></i>' +
            '</div>' +
            '<div title="Move Up/Forward" style="display:inline-block;margin:2px;" id="' + this.boxBackwardsId(id) + '">' +
            '<i class="fa fa-arrow-down" aria-hidden="true"></i>' +
            '</div>' +
            '<div title="Move Down/Backwards" style="display:inline-block;margin:2px;" id="' + this.boxForwardsId(id) + '">' +
            '<i class="fa fa-arrow-up" aria-hidden="true"></i>' +
            '</div>' +
            '<div title="Copy" style="display:inline-block;margin:2px;" id="' + this.boxCopyId(id) + '">' +
            '<i class="fa fa-clipboard" aria-hidden="true"></i>' +
            '</div>';
    },
    boxCopyId: function (id) {
        return id + '--copy';
    },
    boxBackwardsId(id){
        return id + '--backwards';
    },
    boxForwardsId(id){
        return id + '--forwards';
    },
    /**
     *
     * @param id
     * @returns {string}
     */
    trashId: function (id) {
        return id + '--trash';
    },
    /**
     *
     * @param id
     * @returns {string}
     */
    boldId: function (id) {
        return id + '--bold';
    },
    /**
     *
     * @param id
     * @returns {string}
     */
    alignLeftId: function (id) {
        return id + '--alignLeft';
    },
    /**
     *
     * @param id
     * @returns {string}
     */
    alignCenterId: function (id) {
        return id + '--alignCenter';
    },
    /**
     *
     * @param id
     * @returns {string}
     */
    alignRightId: function (id) {
        return id + '--alignRight';
    },
    /**
     *
     * @param id
     * @returns {string}
     */
    alignJustifyId: function (id) {
        return id + ''
    },

    /**
     *
     * @param id
     * @returns {string}
     */
    fontSelect: function (id) {
        var options = '';
        this.fonts.forEach(function (font, index) {
            options += "<option value='" + font + "'>" + font + "</option>";
        });

        return '<select class="jelly-select" style="vertical-align:top;max-width:150px;display: inline-block;" id="' + this.fontSelectId(id) + '">' + options + '</select>';
    },
    /**
     *
     * @param id
     * @returns {string}
     */
    fontSelectId: function (id) {
        return id + '--fontsSelect';
    },
    /**
     *
     * @param id
     * @returns {string}
     */
    jellyId: function (id) {
        return 'jelly-' + id;
    },
    /**
     *
     * @param id
     * @returns {string}
     */
    jellyInnerId: function (id) {
        return this.jellyId(id) + '-inner';
    },
    jellyOuterId: function (id) {
        return this.jellyId(id) + '-outer';
    },
    /**
     *
     * @returns {string}
     */
    dragHandleClass: function () {
        return 'jelly-drag-handle';
    },
    /**
     *
     * @param visibleContent
     * @param control
     * @param id
     * @param postFix
     * @returns {string}
     */
    dragDiv: function (visibleContent, control, id, postFix) {
        postFix = postFix || 'default';
        return '<div id="' + this.jellyOuterId(id) + '" class="jelly-drag" data-jelly_id="' + id + '">' +
            '<div id="' + this.jellyId(id) + '"  class="' + this.dragOutlineClass() + '">' +
            '<div id="' + this.jellyInnerId(id) + '" class="' + this.dragHandleClass() + '">' +
            visibleContent +
            '</div>' +
            control +
            this.controlPoints(id, postFix, this.jellyId(id)) +
            '</div>' +
            '</div>';
    },
    dragOutlineClass: function () {
        return 'dragOutline';
    },
    /**
     *
     * @param id
     * @param visibleContent
     * @param postFix
     * @returns {string}
     */
    section: function (id, visibleContent, postFix) {
        postFix = postFix || 'section';
        return '<div class="' + this.sectionOuterClass() + '" id="' + this.sectionOuterId(id) + '" >' +
            '<div class="' + this.sectionInnerClass() + '" id="' + this.sectionInnerId(id) + '">' + visibleContent + '</div>' +
            this.sectionControl(id) +
            this.sectionControlPoints(id, 'section', this.sectionOuterId(id)) +
            '</div>';
    },
    sectionOuterClass: function () {
        return 'jelly-outer-section';
    },
    sectionInnerClass: function () {
        return 'jelly-outer-section';
    },
    /**
     *
     * @param id
     * @returns {string}
     */

    sectionControl: function (id) {
        return '<div id="' + this.sectionControlId(id) + '" class="jelly-drag">' +
            '<div id="' + this.sectionControlInnerId(id) + '" class="jelly-drag-handle">' +
            this.sectionOptions(id) +
            '</div></div>';
    },
    sectionOptions: function (id, mode) {
        return '<div style="min-width:80px;vertical-align: top;">' +
            '<div id="' + this.controlColorBgId(id) + '">&nbsp;</div>' +
            '<div id="' + this.controlColorId(id) + '">&nbsp;</div>' +
            ' ' +
            this.imageControl(id) +
            this.boxOptions(id) +
            '</div>';
    },
    /**
     *
     * @param id
     * @returns {string}
     */
    sectionOuterId: function (id) {
        return id + '--sectionOuter';
    },
    /**
     *
     * @param id
     * @returns {string}
     */
    sectionInnerId: function (id) {
        return id + '--sectionInner';
    },
    /**
     *
     * @param id
     * @returns {string}
     */
    sectionControlId: function (id) {
        return id + '--sectionControl';
    },
    sectionControlInnerId: function (id) {
        return id + '--sectionInnerControl';
    },
    /**
     *
     * @param id
     * @returns {string}
     */
    getSectionMasterControlModesArray: function () {
        return ['full', 'constrain'];
    },
    sectionModeSelect: function (id, mode) {
        var options = this.sectionModeSelectOptions(mode);

        return '<select class="jelly-select" id="' + this.sectionModeSelectId(id) + '">' +
            options +
            '</select>';
    },
    sectionModeSelectId: function (id) {
        return id + '--SectionMode';
    },
    sectionModeSelectOptions: function (mode) {
        mode = mode || 'full';
        var modes = this.getSectionMasterControlModesArray();
        var i;
        var options = '';
        for (i = 0; i < modes.length; i++) {
            var selected = '';
            if (mode == modes[i]) {
                selected = ' selected="selected"';
            }
            options += '<option value="' + modes[i] + '" ' + selected + ' >' + modes[i] + '</option>';
        }

        return options;
    },
    sectionMasterControlModeSelect: function (mode) {

        var options = this.sectionModeSelectOptions(mode);

        return '<select class="jelly-select" class="jelly-section-mode">' +
            options +
            '</select>';
    },
    sectionMasterControl: function (id, sectionHeading, mode, assetArray) {
        assetArray = assetArray || [];
        mode = mode || 'full';
        sectionHeading = sectionHeading || 'default section';
        return '<div id="' + this.sectionMasterControlId(id) + '" class="jelly-section-control">' +
            '<h4 class="jelly-section-control-heading">' + sectionHeading + '</h4>' +
            '<button title="Add New Text/Image Box" class="jelly-section-add-text" data-section_id="' + this.sectionInnerId(id) + '" data-put_id="' + id + '">' +
            '<i class="fa fa-plus-square-o" aria-hidden="true"></i> <i class="fa fa-th" aria-hidden="true"></i> ' +
            '</button>' +
            '<button title="Remove This Section" class="jelly-section-remove" data-remove_id="' + id + '">' +
            '<i class="fa fa-trash" aria-hidden="true"></i> Section' +
            '</button>' +
            // this.sectionMasterControlModeSelect(mode) +
            //this.sectionMasterAssetList(id, assetArray) +
            this.sectionMasterAssetOptions(id, assetArray) +
            '</div>';
    },
    sectionMasterAssetList: function (id, assetArray) {
        assetArray = assetArray || [];
        var list = '';
        var i;

        for (i = 0; i < assetArray.length; i++) {
            var obj = assetArray[i];

            var name = obj.assetName;
            var assetId = i;
            list += '<button class="jelly-section-asset" data-section_id="' + this.sectionInnerId(id) + '" data-asset_id="' + assetId + '" data-put_id="' + id + '">' +
                '<i class="fa fa-plus-square-o" aria-hidden="true"></i> '
                + name + '</button>';
        }
        return list;
    },
    sectionMasterAssetOptions: function (id, assetArray) {
        assetArray = assetArray || [];
        var select = '<br />Assets: <select  class="jelly-section-asset">';
        var i;

        for (i = 0; i < assetArray.length; i++) {
            var obj = assetArray[i];

            var name = obj.assetName;
            var assetId = i;
            select += '<option value="' + assetId + '" >' +
                name +
                '</option>';
        }
        select += '</select><button title="Add This Asset" class="jelly-section-asset-button" ' +
            'data-section_id="' + this.sectionInnerId(id) + '" data-section_control_id="' + this.sectionMasterControlId(id) + '"  data-put_id="' + id + '">' +
            '<i class="fa fa-plus-square-o" aria-hidden="true"></i> Asset</button>';
        return select;

    },
    sectionMasterControlId: function (id) {
        return id + '--sectionMasterControl';
    },
    /**
     *
     * @param postFix
     * @returns {string}
     */
    controlPointClass: function (postFix) {
        postFix = postFix || 'default';
        return 'jelly-control-point-' + postFix;
    },
    /**
     *
     * @returns {string[]}
     */
    getBackgroundPositionArray: function () {
        return ['left top',
            'left center',
            'left bottom',
            'right top',
            'right center',
            'right bottom',
            'center top',
            'center center',
            'center bottom'];
    },
    getBackgroundSizeArray: function () {
        return ['cover', 'contain', 'auto', '100% 100%'];
    },
    getBackgroundRepeatArray: function () {
        return ['no-repeat', 'repeat-x', 'repeat-y', 'repeat'];
    },
    backgroundControl: function (id, boxType, mode, initUrl, initPosition, initRepeat, initSize) {
        initUrl = initUrl || '';
        initPosition = initPosition || 'center center';
        initRepeat = initRepeat || 'no-repeat';
        initSize = initSize || 'cover';
        boxType = boxType || 'text';
        var modeSelect = '';
        if (boxType == 'section') {
            modeSelect = '<div>' + this.sectionModeSelect(id, mode) + '</div>';
        }
        return modeSelect +
            '<div><button class="jelly-button" id="' + this.backgroundChooseId(id) + '">Choose Image</button></div>' +
            '<div><label>Image:</label><input class="jelly-input" id="' + this.backgroundUrlId(id) + '" type="text" value="' + initUrl + '" /></div>' +
            '<div><label>Position:</label>' + this.backgroundPositionSelect(id, initPosition) + '</div>' +
            '<div><label>Repeat:</label>' + this.backgroundRepeatSelect(id, initRepeat) + '</div>' +
            '<div><label>Size:</label>' + this.backgroundSizeSelect(id, initSize) + '</div>' +
            '<div><button  class="jelly-button" id="' + this.imageSubmitId(id) + '">Apply</button></div>' +
            '';
    },
    backgroundChooseId(id){
        return id + '--chooseImage';
    },
    backgroundUrlId: function (id) {
        return id + '--imageUrl';
    },
    imageSubmitId: function (id) {
        return id + '--imageSubmit';
    },
    backgroundSizeSelect(id, initSize){
        var sizes = this.getBackgroundSizeArray();
        var i;
        var options = '';
        for (i = 0; i < sizes.length; i++) {
            var selected = '';
            if (sizes[i] == initSize) {
                selected = ' selected="selected"';
            }
            var textOption = sizes[i];
            if (sizes[i] == '100% 100%') {
                textOption = 'stretch';
            }
            options += '<option value="' + sizes[i] + '" ' + selected + ' >' + textOption + '</option>';
        }

        return '<select class="jelly-select" id="' + this.backgroundSelectSizeId(id) + '">' + options + '</select>';
    },
    backgroundPositionSelect(id, initPosition){
        var positions = this.getBackgroundPositionArray();
        var i;
        var options = '';
        for (i = 0; i < positions.length; i++) {
            var selected = '';
            if (positions[i] == initPosition) {
                selected = ' selected="selected"';
            }
            options += '<option value="' + positions[i] + '" ' + selected + ' >' + positions[i] + '</option>';
        }

        return '<select class="jelly-select" id="' + this.backgroundSelectPositionId(id) + '">' + options + '</select>';
    },
    backgroundRepeatSelect(id, initRepeat){
        var repeats = this.getBackgroundRepeatArray();
        var i;
        var options = '';
        for (i = 0; i < repeats.length; i++) {
            var selected = '';
            if (repeats[i] == initRepeat) {
                selected = ' selected="selected"';
            }
            options += '<option value="' + repeats[i] + '" ' + selected + ' >' + repeats[i] + '</option>';
        }

        return '<select class="jelly-select" id="' + this.backgroundSelectRepeatId(id) + '">' + options + '</select>';
    },
    backgroundSelectPositionId(id){
        return id + '--backgroundPositionSelect';
    },
    backgroundSelectRepeatId(id){
        return id + '--backgroundRepeatSelect';
    },
    backgroundSelectSizeId(id){
        return id + '--backgroundSizeSelect';
    },
    /**
     *
     * @returns {string[]}
     */
    getPositionArray: function () {
        return ['left-top',
            'right-top',
            'right-bottom',
            'left-bottom'];
    },

    /**
     *
     * @param id
     * @param postFix
     * @param controlId
     * @returns {string}
     */
    controlPoints: function (id, postFix, controlId) {
        controlId = controlId || 'default';
        postFix = postFix || 'default';
        var initId = id + '-CP-' + postFix;
        var positionArray = this.getPositionArray();
        var returnValue = '';
        this.controlPointsIdsArray = [];
        for (i = 1; i < 5; i++) {

            var divId = initId + '-' + i;
            this.controlPointsIdsArray.push(divId);
            returnValue += '<div data-jelly-point="' + controlId + '" class="' + this.controlPointClass(postFix) +
                ' ' + positionArray[(i - 1)] + '" id="' + divId + '"></div>';
        }
        return returnValue;
    },
    centerControlPointClass: function () {
        return 'centered-control';
    },
    sectionControlPoints: function (id, postFix, controlId) {
        controlId = controlId || 'default';
        postFix = postFix || 'default';
        var initId = id + '-CP-' + postFix;
        var positionArray = this.getPositionArray();

        this.controlPointsIdsArray = [];


        var divId = initId;
        this.controlPointsIdsArray.push(divId);
        var returnValue = '<div data-jelly-point="' + controlId + '" class="' + this.controlPointClass(postFix) +
            ' ' + this.centerControlPointClass() + '" id="' + divId + '"></div>';

        return returnValue;
    },
    /**
     *
     * @returns {Array}
     */
    getControlPointsIds: function () {
        return this.controlPointsIdsArray;
    },
    assetOptions: function (id, assetOptions) {
        assetOptions = assetOptions || {};
        var options = '';
        var self = this;
        var i = 0;
        Object.keys(assetOptions).forEach(function (key) {
            var value = assetOptions[key];
            console.log(typeof(value));
            if (typeof(value) == 'object' && typeof(value.selected) != 'undefined') {

                options += '<div><label>' + key + '</label><select class="jelly-select" style="width:90%;" id="' + self.assetOptionId(id, i) + '">';
                Object.keys(value.options).forEach(function (k) {
                    var selected = '';
                    var arrayValue = value.options[k];
                    var safeValue = JSON.stringify(arrayValue).slice(1, -1);
                    if (arrayValue == value.selected) {
                        selected = ' selected="selected" ';
                    }
                    options += '<option value="' + safeValue + '" ' + selected + '>' + safeValue + '</option>';
                });
                options += '</select></div>';
            } else if (typeof(value) == 'object' && typeof(value.image) != 'undefined') {
                var safeValue = JSON.stringify(value.image).slice(1, -1);
                options += '<div><label>' + key + ':</label> ' +
                    '<div><button id="' + self.assetChooseImageId(id, i) + '">Choose Image</button></div>' +
                    '<input class="jelly-input" style="width:90%;" type="text" id="' + self.assetOptionId(id, i) + '" value="' + safeValue + '" />' +
                    '</div>';
            } else if (typeof(value) == 'object' && typeof(value.color) != 'undefined') {
                var safeValue = JSON.stringify(value.color).slice(1, -1);
                options += '<div><label>' + key + ':</label> ' +
                    '<input class="jelly-input" style="width:90%;" type="text" id="' + self.assetOptionId(id, i) + '" value="' + safeValue + '" />' +
                    '</div>';
            } else {
                var safeValue = JSON.stringify(value).slice(1, -1);
                options += '<div><label>' + key + ':</label> ' +
                    '<input class="jelly-input" style="width:90%;" type="text" id="' + self.assetOptionId(id, i) + '" value="' + safeValue + '" />' +
                    '</div>';

            }
            i++;
        });
        if (i == 0) {
            return '';
        }
        return '<hr /><div class="jelly-assets-options">' + options + '</div><br /><button class="jelly-button" id="' + this.assetApplyId(id) + '">Apply</button>';
    },
    assetApplyId: function (id) {
        return id + '--assetApply';
    },
    assetOptionId: function (id, i) {
        return id + '-' + i + '-assetOption';
    },
    assetChooseImageId: function (id, i) {
        return id + '-' + i + '-assetChooseImage';
    },
    assetControl: function (id, assetOptions) {

        var options = this.assetOptions(id, assetOptions);

        var boxControl = this.boxOptions(id);
        return '<div id="' + this.assetControlId(id) + '">' +
            '<div id="' + this.assetControlInnerId(id) + '">' +
            '<div>' + boxControl + '</div>' +
            options +
            '</div></div>';

    },
    assetControlId: function (id) {
        return id + '--assetControl';
    },
    assetControlInnerId: function (id) {
        return id + '--assetInnerControl';
    },
    asset: function (id, assetOptions) {

        var control = this.assetControl(id, assetOptions);
        return '<div class="jelly-drag" data-jelly_id="' + id + '" id="' + this.assetOuterId(id) + '">' +
            '<div id="' + this.assetId(id) + '" class="' + this.dragOutlineClass() + '">' +
            '<div id="' + this.assetInnerId(id) + '" class="' + this.dragHandleClass() + '">' +
            '</div>' +
            control +
            '</div>' +
            '</div>';
    },

    assetId: function (id) {
        return id + '--asset';
    },
    assetInnerId: function (id) {
        return id + '--assetInner';
    },
    assetOuterId: function (id) {
        return id + '--assetOuter';
    }
};



