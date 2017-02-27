<?php

namespace JellyMould;

use JellyMould\LayoutData;

/**
 * Class LabResult
 * @package JellyMould
 * @property layoutData LayoutData
 */
class LabResult
{

    protected $configRoot = null;
    protected $fileName = null;
    protected $configData = null;
    protected $testData = null;
    protected $testOptions = null;
    /**
     * @var array
     */
    protected $compareDataClicks = array();
    protected $compareDataConversions = array();
    /**
     * @var \JellyMould\LayoutData
     */
    protected $layoutData;

    public function __construct($configRoot, $fileName)
    {
        $this->setConfigRoot($configRoot);
        $this->setFileName($fileName);
        $this->layoutData = new LayoutData($this->getConfigRoot(), $this->getFileName());
        $configData = $this->layoutData->getConfigData();
        $this->setConfigData($configData);
        if (isset($configData->testOptions)) {
            $this->setTestOptions($configData->testOptions);
        }
        $testData = $this->layoutData->convergeDataFiles();
        $this->setTestData($testData);
    }

    protected function meetClicks($data)
    {

        $compare = $this->compareDataClicks;
        $margin = $this->getTestOptions()->marginClicks;
        if (isset($compare[$data->configUID])) {
            unset($compare[$data->configUID]);
        }
        $freshHold = $this->getTestOptions()->goalClicks;
        if ($freshHold == 0) {
            return true;
        }
        $passed = 0;
        foreach ($compare as $cvs) {
            if ($data->clicks > $freshHold && $data->clicks > ($cvs + $margin)) {
                $passed++;
            }
        }

        if ($passed == count($compare)) {
            return true;
        }

        return false;

    }


    protected function meetConversions($data)
    {
        $compare = $this->compareDataConversions;
        $margin = $this->getTestOptions()->marginConversion;
        if (isset($compare[$data->configUID])) {
            unset($compare[$data->configUID]);
        }
        $freshHold = $this->getTestOptions()->goalConversion;
        if ($freshHold == 0) {
            return true;
        }
        $passed = 0;
        foreach ($compare as $cvs) {
            if ($data->conversions > $freshHold && $data->conversions > ($cvs + $margin)) {
                $passed++;
            }
        }

        if ($passed == count($compare)) {
            return true;
        }

        return false;
    }

    protected function generateCompareData()
    {
        $testData = $this->getTestData();
        foreach ($testData as $configUID => $data) {
            $this->compareDataClicks[$configUID] = $data->clicks;
            $this->compareDataConversions[$configUID] = $data->conversions;
        }

    }

    protected function getWinner()
    {
        $testData = $this->getTestData();
        if (isset($testData->publishedLayout)) {
            return false;
        }
        $this->generateCompareData();
        $winningConfigUIDs = array();
        foreach ($testData as $configUID => $data) {

            $data->configUID = $configUID;
            $clicks = $this->meetClicks($data);
            $conversions = $this->meetConversions($data);
            if ($conversions && $clicks) {
                $winningConfigUIDs[] = $configUID;
            }

        }

        if (count($winningConfigUIDs) == 1) {
            return $winningConfigUIDs[0];
        }

        return false;
    }

    public function run()
    {
        $winner = $this->getWinner();

        if ($winner) {
            $this->setWinningConfigUID($winner);
        }

    }

    protected function setWinningConfigUID($configUID)
    {
        $configObject = $this->getConfigData();

        if (isset($configObject->layouts)) {
            $i = 0;
            foreach ($configObject->layouts as $layout) {

                if (isset($layout->configUID) && $layout->configUID == $configUID) {
                    $publishedLayout = clone($layout);
                    unset($configObject->layouts[$i]);
                    $configObject->publishedLayout = $publishedLayout;
                    $configObject->testing = false;
                    break;
                }
                $i++;
            }
        }


        file_put_contents($this->getConfigRoot() . '/' . $this->getFileName(), json_encode($configObject));

    }

    /**
     * @return null
     */
    public function getConfigRoot()
    {
        return $this->configRoot;
    }

    /**
     * @param null $configRoot
     */
    public function setConfigRoot($configRoot)
    {
        $this->configRoot = $configRoot;
    }

    /**
     * @return null
     */
    public function getFileName()
    {
        return $this->fileName;
    }

    /**
     * @param null $fileName
     */
    public function setFileName($fileName)
    {
        $this->fileName = $fileName;
    }

    /**
     * @return null
     */
    public function getConfigData()
    {
        return $this->configData;
    }

    /**
     * @param null $configData
     */
    public function setConfigData($configData)
    {
        $this->configData = $configData;
    }

    /**
     * @return null
     */
    public function getTestData()
    {
        return $this->testData;
    }

    /**
     * @param null $testData
     */
    public function setTestData($testData)
    {
        $this->testData = $testData;
    }

    /**
     * @return null
     */
    public function getTestOptions()
    {
        return $this->testOptions;
    }

    /**
     * @param null $testOptions
     */
    public function setTestOptions($testOptions)
    {
        $this->testOptions = $testOptions;
    }
}