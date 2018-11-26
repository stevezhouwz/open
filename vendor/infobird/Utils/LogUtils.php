<?php
/**
 * Created by PhpStorm.
 * User: SAMSUNG-R428
 * Date: 16-1-28
 * 日志收集工具类
 */

namespace Infobird\Utils;


class LogUtils
{
	/**
	 * @param string $file 日志文件名
	 * @param string $message 日志描述
	 * @param array $context 日志内容
	 * @param null $level 日志级别 默认INFO级别
	 */
	public static function log($file, $message, $context = array(), $level = null) {
		$dir = BASE_PATH . "/data/logs/";
		if (is_dir($dir) == false) {
			mkdir($dir);
			chmod($dir, 0777);
		}
		$fileName = $dir . $file;
		$date = date("Y/m/d H:i:s", time());
		if ($level == null) {
			$level = "INFO";
		} else {
			$level = strtoupper($level);
		}
		$contextJson = json_encode($context, JSON_UNESCAPED_UNICODE);
		$log = "[" . $date . "] - " . $level . " - " . $message . " - " . $contextJson. "\r\n\r\n";
		file_put_contents($fileName, $log, FILE_APPEND);
	}
}