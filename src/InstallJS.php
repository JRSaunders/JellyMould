<?php

namespace JellyMould;


class InstallJS
{
    /**
     * @var array
     */
    protected $installFilesArray = array('jellymouldfrontend.js', 'jellymouldpage.js', 'spectrum.js');

    /**
     * InstallJS constructor.
     * @param null $jellymouldFrontendJSDirectory
     */
    public function __construct($jellymouldFrontendJSDirectory = null)
    {
        $jellymouldFrontendJSDirectory = isset($jellymouldFrontendJSDirectory) ? rtrim($jellymouldFrontendJSDirectory, '/') . '/' : null;
        $this->installFiles($jellymouldFrontendJSDirectory);

    }

    protected function installFiles($jellymouldFrontendJSDirectory = null)
    {
        foreach ($this->installFilesArray as $file) {
            $jSpath = __DIR__ . '/../js/' . $file;
            $srcExists = file_exists($jSpath);
            if (isset($jellymouldFrontendJSDirectory) && $srcExists) {
                $writePath = $jellymouldFrontendJSDirectory . $file;
                if (!file_exists($writePath)) {
                    $jSData = file_get_contents($jSpath);
                    file_put_contents($writePath, $jSData);
                }
            }
        }
    }

}