<?php

namespace JellyMould;


use JellyMould\JsonToHtml;
use JellyMould\LayoutData;
use JellyMould\LabResult;
use PhpMimeMailParser\Exception;

class FileManager
{
    /**
     * @var string
     */
    protected $layoutRoot = null;
    protected $configRoot = null;
    protected $fileName = null;
    protected $fileType = null;
    protected $allowedFileTypes = array('jml', 'jmc', 'jmtpl', 'jmdata');
    protected $error = false;


    public function __construct($layoutRoot = null, $configRoot = null)
    {
        $this->setlayoutRoot($layoutRoot);
        $this->setConfigRoot($configRoot);

    }

    /**
     * @return string
     */
    public function getlayoutRoot()
    {
        return rtrim($this->layoutRoot, '/');
    }

    /**
     * @param string $layoutRoot
     */
    public function setlayoutRoot($layoutRoot)
    {
        $this->layoutRoot = $layoutRoot;
    }

    /**
     * @param null $configData
     * @return bool|string
     */
    public function getTestData($configData = null)
    {
        $json = $this->getJsonFromInput();
        $data = json_decode($json);
        $convergedData = array();
        if (isset($data->filename)) {

            $layoutData = new LayoutData($this->getConfigRoot(), $data->filename, $configData);
            $convergedData = $layoutData->convergeDataFiles();
        }

        $json = json_encode($convergedData);

        return $json;
    }

    protected function getJsonFromInput()
    {
        $json = file_get_contents("php://input");
        if (strlen($json)) {
            $data = json_decode($json);
            if (is_object($data)) {
                return $json;
            }
            return false;
        } else {
            return false;
        }
    }

    /**
     * @param $layoutFile
     * @return string
     */
    protected function getLayoutHtml($layoutFile)
    {
        $layoutFile = str_replace($this->getlayoutRoot() . '/', '', $layoutFile);
        $layoutFile = $this->getlayoutRoot() . '/' . $layoutFile;
        if (!file_exists($layoutFile)) {
            $this->setError('LayoutFile Location does not exist! ' . $layoutFile);
            return false;
        }

        $json = file_get_contents($layoutFile);
        $layout = new JsonToHtml($json);
        return $layout->getHtml();
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
     * @param $configFile
     * @return bool|string
     */
    public function getHtmlFromConfig($configFile)
    {

        if (isset($_GET['jelly_mould_controller'])) {
            return '';
        }
        $configFile = str_replace('.jmc', '', $configFile);
        $this->setFileName($configFile, 'jmc');

        $fileLocation = $this->getConfigRoot() . '/' . $this->getFileName();
        if (!file_exists($fileLocation)) {
            $this->setError('File does not exist! ' . $fileLocation);

            return false;
        }
        $configObjectJson = file_get_contents($fileLocation);

        if ($configObjectJson == false) {
            $this->setError('File does not exist!');

            return false;
        }

        $configObject = json_decode($configObjectJson);

        if (!(isset($configObject->testing) && is_bool($configObject->testing))) {
            $this->setError('Testing bool is not set in config!');
            return false;
        }

        if (!empty($configObject->publishedLayout) && $configObject->testing == false) {
            $json = json_encode($configObject->publishedLayout);
            $layout = new JsonToHtml($json);
            return $layout->getHtml();
        }

        if (!($configObject->testing && isset($configObject->layouts) &&
            is_array($configObject->layouts) &&
            count($configObject->layouts) && empty($configObject->publishedLayout))
        ) {
            $this->setError('Layouts not set for testing!');
            return false;
        }

        $testsCount = count($configObject->layouts);

        $luckLayout = rand(1, $testsCount) - 1;

        $session = function ($luckLayout, $configFile, $configObject) {
            if (!isset($_SESSION['jellyMould'])) {
                $_SESSION['jellyMould'] = array();
            }
            if (!isset($_SESSION['jellyMould'][$configFile])) {
                $_SESSION['jellyMould'][$configFile] = $luckLayout;
            } elseif (is_numeric($_SESSION['jellyMould'][$configFile])) {
                $luckLayout = $_SESSION['jellyMould'][$configFile];
            }
            if (isset($configObject->layouts[$luckLayout])) {
                if (!isset($_SESSION['jellyMouldConversion'])) {
                    $_SESSION['jellyMouldConversion'] = array();
                }
                $_SESSION['jellyMouldConversion'][$configFile] = $configObject->layouts[$luckLayout]->configUID;
                return $luckLayout;
            }
            return 0;
        };

        if ($this->isSessionStarted()) {
            $luckLayout = $session($luckLayout, $configFile, $configObject);
        } else {
            session_start();
            $luckLayout = $session($luckLayout, $configFile, $configObject);
        }
        $json = json_encode($configObject->layouts[$luckLayout]);
        $layout = new JsonToHtml($json);
        $layoutData = new LayoutData($this->getConfigRoot(), $this->getFileName(), $configObject);
        $layoutData->incrementImpressions($configObject->layouts[$luckLayout]->configUID);
        return $layout->getHtml();


    }


    public function saveLayoutFromJsonInput()
    {
        $json = $this->getJsonFromInput();

        if (!$json) {
            return false;
        }

        $data = json_decode($json);
        if (isset($data->layoutName)) {
            $this->setFileName($data->layoutName, 'jml');
        } else {
            $this->setError('Layout json configuration is WRONG!');
            return false;
        }

        $putData = file_put_contents($this->getlayoutRoot() . '/' . $this->getFileName(), $json);

        if ($putData) {
            return $json;
        } else {
            return false;
        }
    }


    public function lockLayoutFromJsonInput()
    {

        $json = $this->getJsonFromInput();

        $data = json_decode($json);
        if (!isset($data->filename) || strlen($data->filename) < 4) {
            $this->setError('No Filename given for layout! Lock!');
            return false;
        }
        if (!isset($data->session) || strlen($data->session) < 5) {
            $this->setError('No session Set');
            return false;
        }

        $layoutJson = $this->loadLayout();

        $layoutData = json_decode($layoutJson);

        if ((isset($layoutData->locked)) &&
            isset($layoutData->locked->session) &&
            $layoutData->locked->session != $data->session
        ) {

            if (($layoutData->locked->time + 600) > time()) {
                $this->setError('Already Locked By another user!');
                return false;
            }
        }

        $lockData = new \stdClass();
        $lockData->session = $data->session;
        $lockData->time = time();
        $layoutData->locked = $lockData;
        $lockedJson = json_encode($layoutData);
        $putData = file_put_contents($this->getlayoutRoot() . '/' . $data->filename, $lockedJson);

        if ($putData) {
            return $lockedJson;
        } else {
            return false;
        }


    }

    public function unlockLayoutFromJsonInput()
    {
        $json = $this->getJsonFromInput();

        $data = json_decode($json);
        if (!isset($data->filename) || (isset($data->filename) && strlen($data->filename) < 4)) {
            $this->setError('No Filename given for layout! UNLOCK');
            return false;
        }
        $layoutJson = $this->loadLayout();

        $layoutData = json_decode($layoutJson);
        if (isset($layoutData->locked)) {
            unset($layoutData->locked);
        }

        $unlockedJson = json_encode($layoutData);
        $putData = file_put_contents($this->getlayoutRoot() . '/' . $data->filename, $unlockedJson);

        if ($putData) {
            return $unlockedJson;
        } else {
            return false;
        }

    }

    protected function getConfig()
    {
        $json = $this->getJsonFromInput();
        $data = json_decode($json);
        if (isset($data->filename)) {
            $fileName = $data->filename;
        } else {
            $this->setError('Load Config json configuration is WRONG!');
            return false;
        }

        $this->getTypeFromFileName($fileName);
        if (!file_exists($this->getConfigRoot() . '/' . $fileName)) {
            $this->setError('File Does Not Exist!');
            return false;
        }
        return file_get_contents($this->getConfigRoot() . '/' . $fileName);
    }

    public function loadConfig($testData = true)
    {
        $configJson = $this->getConfig();
        if (!$configJson) {
            return false;
        }
        $configData = json_decode($configJson);

        $testDataJson = $this->getTestData($configData);
        $configData = $this->appendTimeNow($configData);
        if ($testData) {
            $config = array(
                'config' => $configData,
                'testData' => json_decode($testDataJson)
            );
        } else {
            $config = $configData;
        }


        return json_encode($config);

    }

    public function unlockConfigFromJsonInput()
    {
        $json = $this->getJsonFromInput();

        $data = json_decode($json);
        if (!isset($data->filename) || (isset($data->filename) && strlen($data->filename) < 4)) {
            $this->setError('No Filename given!');
            return false;
        }
        $configJson = $this->loadConfig(false);

        $configData = json_decode($configJson);
        if (isset($configData->locked)) {
            unset($configData->locked);
        }

        $unlockedJson = json_encode($configData);
        $putData = file_put_contents($this->getConfigRoot() . '/' . $data->filename, $unlockedJson);

        if ($putData) {
            return $unlockedJson;
        } else {
            return false;
        }

    }

    public function lockConfigFromJsonInput()
    {
        $json = $this->getJsonFromInput();

        $data = json_decode($json);
        if (!isset($data->filename) || strlen($data->filename) < 4) {
            $this->setError('No Filename given!');
            return false;
        }
        if (!isset($data->session) || strlen($data->session) < 5) {
            $this->setError('No session Set');
            return false;
        }

        $configJson = $this->loadConfig(false);

        $configData = json_decode($configJson);

        if ((isset($configData->locked)) && isset($configData->locked->session) && $configData->locked->session != $data->session) {
            if (($layoutData->locked->time + 600) > time()) {
                $this->setError('Already Locked By another user!');
                return false;
            }
        }

        $lockData = new \stdClass();
        $lockData->session = $data->session;
        $lockData->time = time();
        $configData->locked = $lockData;
        $lockedJson = json_encode($configData);
        $putData = file_put_contents($this->getConfigRoot() . '/' . $data->filename, $lockedJson);

        if ($putData) {
            return $lockedJson;
        } else {
            return false;
        }

    }

    public function saveConfigFromJsonInput()
    {
        $json = $this->getJsonFromInput();

        if (!$json) {
            return false;
        }

        $data = json_decode($json);
        if (isset($data->configName)) {
            $this->setFileName($data->configName, 'jmc');

        } else {
            $this->setError('Config json configuration is WRONG!');
            return false;
        }

        $putData = file_put_contents($this->getConfigRoot() . '/' . $this->getFileName(), $json);

        if ($putData) {
            $layoutData = new LayoutData($this->getConfigRoot(), $this->getFileName(), $data);
            $layoutData->insertNeededDataFiles();
            return $json;
        } else {
            return false;
        }
    }

    public function saveTemplateFromJsonInput()
    {
        $json = $this->getJsonFromInput();

        if (!$json) {
            return false;
        }

        $data = json_decode($json);
        if (isset($data->layoutName)) {
            $this->setFileName($data->layoutName, 'jmtpl');
        } else {
            $this->setError('Layout json configuration is WRONG!');
            return false;
        }

        $putData = file_put_contents($this->getlayoutRoot() . '/' . $this->getFileName(), $json);

        if ($putData) {
            return $json;
        } else {
            return false;
        }
    }


    public function deleteLayout()
    {
        $json = $this->getJsonFromInput();
        $data = json_decode($json);
        if (isset($data->deleteFilename)) {
            $fileName = $data->deleteFilename;
        } else {
            $this->setError('Delete Request json configuration is WRONG!');
            return false;
        }

        $this->getTypeFromFileName($fileName);

        if (!file_exists($this->getlayoutRoot() . '/' . $fileName)) {
            $this->setError('File Does Not Exist!');
            false;
        }
        $deleted = unlink($this->getlayoutRoot() . '/' . $fileName);
        $deleteObject = new \stdClass();

        if ($deleted) {
            $deleteObject->deletedFilename = $fileName;
        } else {
            $deleteObject->deletedFilename = false;
        }
        return json_encode($deleteObject);
    }

    public function loadLayout()
    {
        $json = $this->getJsonFromInput();

        $data = json_decode($json);
        if (isset($data->filename)) {
            $fileName = $data->filename;
        } else {
            $this->setError('Load Layout json configuration is WRONG!');
            return false;
        }

        $this->getTypeFromFileName($fileName);

        if (!file_exists($this->getlayoutRoot() . '/' . $fileName)) {
            $this->setError('File Does Not Exist!');
            false;
        }
        $jsonLayout = file_get_contents($this->getlayoutRoot() . '/' . $fileName);
        $layoutData = json_decode($jsonLayout);

        return $this->appendTimeNowToJson($layoutData);


    }

    protected function appendTimeNow($data)
    {
        if (is_object($data)) {
            $data->timeNow = time();
        }

        return $data;
    }

    protected function appendTimeNowToJson($data)
    {
        $data = $this->appendTimeNow($data);

        return json_encode($data);
    }


    /**
     * @return null
     */
    public function getConfigRoot()
    {
        return rtrim($this->configRoot, '/');
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
    public function getFileType()
    {
        return $this->fileType;
    }

    public function getLayouts()
    {
        $layoutObject = new \stdClass();
        $layouts = array();
        $dir = scandir($this->getlayoutRoot());

        foreach ($dir as $file) {
            if (strpos($file, '.jml') !== false || strpos($file, '.jmtpl') !== false) {
                $layouts[] = $file;
            }
        }
        $layoutObject->layouts = $layouts;
        return json_encode($layoutObject);


    }

    public function getTypeFromFileName($fileName)
    {

        $parts = explode('.', $fileName);

        if (count($parts) > 1) {
            $index = count($parts) - 1;
            $type = $parts[$index];
            $this->setFileType($type);
            return $this->getFileType();
        }
        return false;
    }

    /**
     * @param null $fileType
     */
    public function setFileType($fileType)
    {
        if (in_array($fileType, $this->allowedFileTypes)) {

            $this->fileType = $fileType;
        } else {
            $this->fileType = null;
        }

    }

    /**
     * @return null
     */
    public function getError()
    {

        return $this->error;
    }

    public function getJsonError()
    {
        $error = new \stdClass();
        $error->error = true;
        $error->message = $this->getError();

        return json_encode($error);
    }

    /**
     * @param null $error
     */
    protected function setError($error)
    {
        $this->error = $error;
    }

    protected function formatFileName($fileName)
    {
        $search = array(' ', ',', '|', '>', '<', '+', '*');
        $fileName = str_replace($search, '.', $fileName);

        return $fileName;
    }

    /**
     * @return null
     */
    public function getFileName()
    {
        if ($this->fileName == null) {
            $this->setError('No Jelly Mould File Name Set');
            return false;
        }

        return $this->fileName;
    }

    /**
     * @param $type
     * @return bool|string
     */
    protected function useFileType($type)
    {

        if (in_array($type, $this->allowedFileTypes)) {
            $this->setFileType($type);
            return '.' . $type;
        } else {
            $this->setError('can only deal with .jml, .jmtpl and .jmc file types');
            return false;
        }
    }

    /**
     * @param null $fileName
     */
    public function setFileName($fileName, $type)
    {

        $formattedFileName = $this->formatFileName($fileName);
        if (strlen($formattedFileName) < 1) {
            $this->setError('No Jelly Mould File Name Length No Long Enough');
            return false;
        }
        $this->fileName = $this->formatFileName($fileName) . $this->useFileType($type);


    }

    public function resetLabTest($fileName = null)
    {
        $json = $this->getJsonFromInput();
        $data = json_decode($json);
        if (isset($data->filename)) {
            $fileName = $data->filename;
            $layoutData = new LayoutData($this->getConfigRoot(), $fileName);
            $layoutData->resetDataFiles();
            return true;
        } elseif ($fileName != null) {
            $layoutData = new LayoutData($this->getConfigRoot(), $fileName);
            $layoutData->resetDataFiles();
            return true;
        }

        return false;
    }

    public function runLabTests()
    {

        /**
         * get config files
         */

        $configFiles = scandir($this->getConfigRoot());

        if (!is_array($configFiles)) {
            $this->setError('No .jmc files to run lab tests on!');
            return false;
        }

        foreach ($configFiles as $file) {
            if (strpos($file, '.jmc')) {
                $labResult = new LabResult($this->getConfigRoot(), $file);
                $labResult->run();


            }
        }

    }

}