<?php
/**
 * Created by PhpStorm.
 * User: SAMSUNG-R428
 * Date: 16-2-25
 */

namespace Infobird\Utils;


class ProxyUtils
{
	/**
	 * 获取发请求的客户端IP地址
	 * @return string|NULL
	 */
	public static function getClientIP() {
		$client_ip = "";
		if (empty($_SERVER["HTTP_CLIENT_IP"])==false && 'unknown'!=strtolower($_SERVER["HTTP_CLIENT_IP"]))
		{
			$client_ip = $_SERVER["HTTP_CLIENT_IP"];
		}
		else if (empty($_SERVER["HTTP_X_FORWARDED_FOR"])==false && 'unknown'!=strtolower($_SERVER["HTTP_X_FORWARDED_FOR"]))
		{
			$client_ip = $_SERVER["HTTP_X_FORWARDED_FOR"];
		}
		else if (empty($_SERVER["REMOTE_ADDR"])==false && 'unknown'!=strtolower($_SERVER["REMOTE_ADDR"]))
		{
			$client_ip = $_SERVER["REMOTE_ADDR"];
		}
		return $client_ip;
	}

	/**
	 * 获取当前请求的域名
	 * 注意：1、此方法返回的域名不包含http或https头
	 *       2、此方法返回的域名不包含端口（代理的HTTP_VIA中可能包含端口）
	 * @return string|NULL
	 */
	public static function getDomain() {
		//如果有代理的HTTP_VIA，则返回HTTP_VIA
		if (isset($_SERVER['HTTP_VIA']) && !empty($_SERVER['HTTP_VIA'])) {
			return $_SERVER['HTTP_VIA'];
		}
		return (isset($_SERVER['SERVER_NAME']) ? $_SERVER['SERVER_NAME'] : '');
	}

	/**
	 * 获取当前请求的端口
	 * @return string|NULL
	 */
	public static function getPort() {
		return (isset($_SERVER['SERVER_PORT']) ? $_SERVER['SERVER_PORT'] : '');
	}
}