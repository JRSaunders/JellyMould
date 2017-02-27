<?php
namespace JellyMould;

/**
 * Class Scripts
 * @package JellyMould
 */
class Scripts extends InstallJS
{


    public static function getFrontEnd()
    {
        return self::$installFilesArray['frontend'];
    }

    public static function getAdmin()
    {
        return self::$installFilesArray['admin'];
    }

    public static function getSpectrum()
    {
        return self::$installFilesArray['spectrum'];
    }

    /**
     * @param string $browserPath
     * @return string
     */
    public static function getHtml($browserPath = '/public/js/jellymould/')
    {
        $html = '';
        foreach (self::$installFilesArray as $file) {
            $html .= "<script src='{$browserPath}{$file}'></script>";
        }

        return $html;
    }

}