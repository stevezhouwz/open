<?php
/**
 * Created by PhpStorm.
 * User: SAMSUNG-R428
 * Date: 16-1-25
 */

namespace Infobird\Controller;

abstract class AbstractBaseController
{
	/**
	 * @var array
	 */
	private $globalConfig;

	/**
	 * @param array $global_config
	 */
	public function __construct($global_config = array()) {
		$this->globalConfig = $global_config;
	}

	/**
	 * 获取配置文件中的配置项
	 * 	包括 module.application.config.php、global.php、local.php和application.application.config.php 等文件中的配置项
	 * @param mixed $configKey
	 * @param string $default
	 * @return string|null
	 */
	protected function getConfigValue($configKey, $default=null) {
		if (empty($configKey)) {
			return $default;
		}
		$configArray = $this->globalConfig;
		if (isset($configArray[$configKey])) {
			return $configArray[$configKey];
		}
		return $default;
	}

	/**
	 * 获取HTTP提交过来的参数值，包括GET和POST。如果不存在这样的参数，则返回null
	 * @param string $paramName
	 * @param string $default
	 * @return string||NULL
	 */
	protected function getParamValue($paramName, $default=null) {
		if (isset($_REQUEST[$paramName])) {
			return $_REQUEST[$paramName];
		} else {
			return $default;
		}
	}

	/**
	 * 调用请求的Action前需要执行的动作
	 * @return boolean 返回true则继续执行当前请求的Action和afterDispatch，否则不再执行
	 * 重要：如果需要执行URL跳转【例如$this->redirect()->toUrl()】，则需要在该方法中返回false，否则导致原有Action和afterDispatch仍然会执行一遍，然后再跳转
	 */
	abstract public function beforeDispatch();


	/**
	 * 调用请求的Action后需要执行的动作，如果在beforeDispatch或Action中调用了exit或die，则不会再执行该方法
	 * 注意在该方法中执行echo内容会显示在网页的最前面，而不是最后面！
	 *
	 */
	abstract public function afterDispatch();
}