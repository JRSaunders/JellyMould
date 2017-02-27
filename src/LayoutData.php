<?php
namespace JellyMould;


class LayoutData
{
    protected $configRoot = null;
    protected $fileName = null;
    protected $configData = null;
    protected $dataFile = null;

    /**
     * LayoutData constructor.
     * @param $configRoot
     * @param $fileName
     * @param $configData
     */
    public function __construct($configRoot = null, $fileName = null, $configData = null)
    {
        $this->setConfigRoot($configRoot);
        $this->setFileName($fileName);
        $this->setConfigData($configData);

    }

    function isSessionStarted()
    {
        if (php_sapi_name() !== 'cli') {
            if (version_compare(phpversion(), '5.4.0', '>=')) {
                return session_status() === PHP_SESSION_ACTIVE ? TRUE : FALSE;
            } else {
                return session_id() === '' ? FALSE : TRUE;
            }
        }
        return FALSE;
    }

    /**
     * @return null
     */
    public function getDataFile()
    {
        return $this->dataFile;
    }

    /**
     * @param null $dataFileName
     */
    public function setDataFile($dataFile)
    {
        $this->dataFile = $dataFile;
    }

    protected function getSessionConfigUIDs()
    {

        if ($this->isSessionStarted() == false) {
            session_start();
        }
        $configUIDS = array();
        if (isset($_SESSION['jellyMouldConversion'])) {
            $configUIDS = $_SESSION['jellyMouldConversion'];
        }
        return $configUIDS;
    }

    protected function destroySessionConfigUIDs()
    {
        if ($this->isSessionStarted() == false) {
            session_start();
        }
        $_SESSION['jellyMouldConversion'] = null;
    }

    protected function getData($configUID)
    {
        $dataFileName = $configUID . '.jmdata';

        $file = $this->getConfigRoot() . '/' . $dataFileName;
        $this->setDataFile($file);

        if (file_exists($file)) {

            $json = file_get_contents($file);
            return json_decode($json);
        }
        return false;
    }

    public function convergeDataFiles($json = false)
    {

        $configUIDS = $this->getAllConfigUIDs();
        $convergeArray = array();
        foreach ($configUIDS as $configUID) {
            $convergeArray[$configUID] = $this->getData($configUID);
        }
        if ($json) {
            return json_encode($convergeArray);
        }
        return $convergeArray;

    }

    public function incrementImpressions($configUID)
    {
        $data = $this->getData($configUID);
        if ($data && isset($data->impressions)) {
            $data->impressions++;
            return file_put_contents($this->getDataFile(), json_encode($data));
        }

        return false;
    }

    protected function incrementConversions($configUID)
    {
        $data = $this->getData($configUID);
        if ($data && isset($data->conversions)) {
            $data->conversions++;
            return file_put_contents($this->getDataFile(), json_encode($data));
        }

        return false;
    }

    public function recordConversion()
    {
        $configUIDs = $this->getSessionConfigUIDs();
        foreach ($configUIDs as $configUID) {
            $this->incrementConversions($configUID);
        }
        $this->destroySessionConfigUIDS();
    }

    public function incrementClicks($configUID, $contentUID)
    {

        $data = $this->getData($configUID);

        if ($data && isset($data->clicks)) {
            $data->clicks++;
            if (isset($contentUID) && is_numeric($contentUID)) {
                if (!isset($data->contentCount)) {
                    $data->contentCount = new \stdClass();
                }
                if (!isset($data->contentCount->$contentUID)) {
                    $data->contentCount->$contentUID = 0;
                }
                $data->contentCount->$contentUID++;
            }

            return file_put_contents($this->getDataFile(), json_encode($data));
        }

        return false;
    }


    public function getAllConfigUIDs()
    {

        $configData = $this->getConfigData();


        $configUIDS = array();

        if (!isset($configData->layouts)) {
            return $configUIDS;
        }
        if (is_object($configData)) {
            foreach ($configData->layouts as $layout) {
                if (isset($layout->configUID)) {
                    $configUIDS[] = $layout->configUID;
                }
            }
            if (isset($configData->publishedLayout)) {
                if (isset($configData->publishedLayout->configUID)) {
                    $configUIDS[] = $configData->publishedLayout->configUID;
                }
            }
        }


        return $configUIDS;
    }

    public function insertNeededDataFiles()
    {
        $configUIDS = $this->getAllConfigUIDs();

        foreach ($configUIDS as $configUID) {
            $fileInQuestion = $this->getConfigRoot() . '/' . $configUID . '.jmdata';
            if (!file_exists($fileInQuestion)) {
                file_put_contents($fileInQuestion, $this->blankDataJson());
            }
        }

    }

    public function resetDataFiles()
    {
        $configUIDS = $this->getAllConfigUIDs();

        foreach ($configUIDS as $configUID) {
            $fileInQuestion = $this->getConfigRoot() . '/' . $configUID . '.jmdata';
            file_put_contents($fileInQuestion, $this->blankDataJson());
        }
    }

    public function blankDataJson()
    {
        $blankData = new \stdClass();
        $blankData->configFilename = $this->getFileName();
        $blankData->impressions = 0;
        $blankData->clicks = 0;
        $blankData->conversions = 0;

        return json_encode($blankData);
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
        if ($this->configData == null) {
            if ($filename = $this->getFileName()) {
                $file = $this->getConfigRoot() . '/' . $this->getFileName();
                if (!file_exists($file)) {
                    return false;
                }
                $json = file_get_contents($file);
                $this->configData = json_decode($json);
            }
        }

        return $this->configData;
    }

    /**
     * @param null $configData
     */
    public function setConfigData($configData)
    {
        $this->configData = $configData;
    }


}