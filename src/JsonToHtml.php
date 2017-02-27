<?php

namespace JellyMould;


class JsonToHtml
{
    /**
     * @var string
     */
    protected $json;
    /**
     * @var object
     */
    protected $desktopData;
    protected $tabletData;
    protected $mobileData;
    protected $pageData;
    protected $systemData;
    protected $configUID;

    public function __construct($json)
    {
        $this->processJson($json);
    }

    protected function processJson($json)
    {
        $this->json = $json;
        $this->pageData = json_decode($json);
        $this->desktopData = $this->pageData->desktop;
        $this->tabletData = $this->pageData->tablet;
        $this->mobileData = $this->pageData->mobile;
        $this->systemData = $this->pageData->systemWidths;
        if (isset($this->pageData->configUID)) {
            $this->configUID = $this->pageData->configUID;

        }
    }


    public function pageStyle()
    {

        $system = $this->getSystemData();

        $desktopWidth = $system->desktop+20;
        $tabletWidth = $system->tablet;


        $mediaQueryDesktop = "@media (min-width:{$desktopWidth}px) and (max-width:1000000000px){
        #jm-tablet{
            display:none !important;
        }
        #jm-mobile{
            display:none !important;
        }
        #jm-desktop{
            display:block !important;
        }
        }";

        $mediaQueryTablet = "@media (min-width:{$tabletWidth}px) and (max-width:{$desktopWidth}px){
        #jm-tablet{
            display:block !important;
        }
        #jm-mobile{
            display:none !important;
        }
        #jm-desktop{
            display:none !important;
        }
        }";

        $mediaQueryMobile = "@media (min-width:0px) and (max-width:{$tabletWidth}px){
        #jm-tablet{
            display:none !important;
        }
        #jm-mobile{
            display:block !important;
        }
        #jm-desktop{
            display:none !important;
        }
        }";

        return '<style>
            .jm-link:hover{
               opacity:0.85 !important;
            }
            ' . $mediaQueryDesktop
        . $mediaQueryTablet
        . $mediaQueryMobile
        . '</style>';
    }

    public function widthRestrictScript()
    {
        $system = $this->getSystemData();
        $mobileWidth = $system->mobile;
        return "<script>widthJMRestrict({$mobileWidth});</script>";
    }

    public function getHtml()
    {

        return $this->widthRestrictScript() . $this->pageStyle() .
        '<div id="jm-desktop">' .
        $this->processSections($this->pageData->desktop) .
        '</div>' .
        '<div id="jm-tablet">' .
        $this->processSections($this->pageData->tablet) .
        '</div>' .
        '<div id="jm-mobile">' .
        $this->processSections($this->pageData->mobile) .
        '</div>';

    }

    protected function processSections($data)
    {
        if (!isset($data->sections)) {
            return false;
        }
        $sections = $data->sections;

        $html = '';
        foreach ($sections as $sectionNumber => $section) {

            if (!is_object($section)) {
                continue;
            }
            $id = 'jmSection-' . $section->uniqueId;
            $outerStyle = $this->getStyleFromObject($section->outer);
            $innerStyle = $this->getStyleFromObject($section->inner);
            $html .= '<div id="outer-' . $id . '" style="' . $outerStyle . '"><div id="inner-' .
                $id . '" style="' . $innerStyle . '">';

            $html .= $this->processContent($section);

            $html .= '</div ></div > ';

        }
        return $html;
    }

    protected function processContent($data)
    {
        if (!isset($data->contents)) {
            return false;
        }
        $contents = $data->contents;
        $html = '';
        foreach ($contents as $contentNumber => $content) {

            if (!is_object($content)) {
                continue;
            }
            $id = 'jmContent-' . $content->uniqueId;
            $outerStyle = $this->getStyleFromObject($content->outer);

            $link = $this->getLink($content);
            $linkCodeStart = ($link) ? $link : '';
            $linkCodeEnd = ($link) ? '</a>' : '';

            $innerStyle = '';
            if (isset($content->inner)) {
                $innerStyle = $this->getStyleFromObject($content->inner, $content);
            } elseif (isset($content->width) && isset($content->height)) {
                $width = $content->width;
                $height = $content->height;
                $innerStyle = "min-width:{$width}px;max-width:{$width}px;min-height:{$height}px;max-height:{$height}px;";
            }
            $jsClick = $this->processOnClick($content);
            $jsExternal = $this->processExternalFunction($content);
            $jmLinkClass = '';
            if ($jsExternal || $jsClick || $link) {
                $jmLinkClass = 'class="jm-link"';
            }
            $html .= '<div id="outer-' . $id . '" style="' . $outerStyle . '">' . $linkCodeStart .
                '<div id="inner-' . $id . '" style="' . $innerStyle . '" ' . $jmLinkClass .
                ' data-content_uid="' . $content->uniqueId . '"' .
                ' data-config_uid="' . $this->configUID . '">';
            if (isset($content->text)) {
                $html .= $content->text;
            }
            $html .= '</div>' . $linkCodeEnd . '</div> ';
            $jsAsset = $this->processAsset($content);
            if ($jsAsset) {
                $html .= $jsAsset;
            }

            if ($jsClick) {
                $html .= $jsClick;
            }

            if ($jsExternal) {
                $html .= $jsExternal;
            }
        }

        return $html;
    }

    protected function processAsset($content)
    {
        if (!isset($content->assetOptions)) {
            return false;
        }
        $id = 'jmContent-' . $content->uniqueId;
        $jqId = '#inner-' . $id;
        $assetOptionsJson = json_encode($content->assetOptions);
        $function = json_encode($content->callbackFrontEnd);
        $html = "<script>var jmAsset{$content->uniqueId} = compileJMFunction({$function});" .
            "  $(document).ready(function(){
            jmAsset{$content->uniqueId}({$content->uniqueId},window,jQuery,'{$jqId}',{$assetOptionsJson});
            });</script>";

        return $html;
    }

    protected function processExternalFunction($content)
    {
        if (!(isset($content->externalFunction) && $content->externalFunction != false)) {
            return false;
        }
        $id = 'jmContent-' . $content->uniqueId;
        $jqId = '#inner-' . $id;
        $function = $content->externalFunction;
        $html = "<script>" .
            "  $(document).ready(function(){
            $('{$jqId}').click(function(){
                runExternalJMFunction('{$function}');
            });
           
            });</script>";

        return $html;
    }

    protected function processOnClick($content)
    {
        if (!(isset($content->clickFunction) && $content->clickFunction != false)) {
            return false;
        }
        $id = 'jmContent-' . $content->uniqueId;
        $jqId = '#inner-' . $id;
        $function = json_encode($content->clickFunction->callback);
        $html = "<script>var jmClick{$content->uniqueId} = compileJMFunction({$function});" .
            "  $(document).ready(function(){
            $('{$jqId}').click(function(e){
             jmClick{$content->uniqueId}(window,jQuery,'{$jqId}',e);
            });
           
            });</script>";

        return $html;
    }

    protected function getLink($content)
    {
        $link = '';
        $linkExternal = '';
        $colorText = '';
        if (!empty($content->href)) {
            if (strpos($content->href, 'http') !== FALSE) {
                $linkExternal = ' target="_blank" ';
            }
            $color = (isset($content->inner->color)) ? $content->inner->color : false;

            if ($color) {
                $colorText = 'color:' . $color;
            }
            $link .= '<a class="jm-href" style="text-decoration:none;' . $colorText . '" title="' .
                $content->href . '" href="' . $content->href . '" ' . $linkExternal . '>';

        } else {
            return false;
        }

        return $link;

    }

    public function getStyleFromObject($object, $content = null)
    {

        $css = '';
        foreach ($object as $key => $value) {

            $value = str_replace('"', "'", $value);
            $css .= $key . ':' . $value . ';';
        }

        if ($content !== null && ((isset($content->clickFunction) && $content->clickFunction != false) ||
                (isset($content->externalFunction) && $content->externalFunction != false))
        ) {
            $css .= 'cursor:pointer;';
        }

        return $css;
    }

    /**
     * @return mixed
     */
    public function getSystemData()
    {
        return $this->systemData;
    }

    /**
     * @param mixed $systemData
     */
    public function setSystemData($systemData)
    {
        $this->systemData = $systemData;
    }
}