<?php

namespace Infobird\Utils;

/**
 * HTTP相关的功能工具
 * @author Jason
 *
 */
class HttpUtils {
	
	/**
	 * 发起GET请求
	 *
	 * @param string $url
	 * @return string content
	 */
	public static function http_get($url) {
		$oCurl = curl_init ();
		if (stripos ( $url, "http://" ) !== FALSE || stripos ( $url, "https://" ) !== FALSE) {
			curl_setopt ( $oCurl, CURLOPT_SSL_VERIFYPEER, FALSE );
			curl_setopt ( $oCurl, CURLOPT_SSL_VERIFYHOST, FALSE );
		}
		curl_setopt ( $oCurl, CURLOPT_URL, $url );
		curl_setopt ( $oCurl, CURLOPT_RETURNTRANSFER, 1 );
		$sContent = curl_exec ( $oCurl );
		$aStatus = curl_getinfo ( $oCurl );
		curl_close ( $oCurl );
		if (intval ( $aStatus ["http_code"] ) == 200) {
			return array(
					'status' => true,
					'content' => $sContent,
					'code' => $aStatus ["http_code"],
			);
		} else {
			return array(
					'status' => false,
					'content' => false,
					'code' => $aStatus ["http_code"],
			);
		}
	}
	
	/**
	 * 发起POST请求
	 *
	 * @param string $url
	 * @param array $param
	 * @return string content
	 */
	public static function http_post($url, $param) {
		$oCurl = curl_init ();
		if (stripos ( $url, "http://" ) !== FALSE || stripos ( $url, "https://" ) !== FALSE) {
			curl_setopt ( $oCurl, CURLOPT_SSL_VERIFYPEER, FALSE );
			curl_setopt ( $oCurl, CURLOPT_SSL_VERIFYHOST, false );
		}
		if (is_string ( $param )) {
			$strPOST = $param;
		} else {
			$aPOST = array ();
			foreach ( $param as $key => $val ) {
				$aPOST [] = $key . "=" . urlencode ( $val );
			}
			$strPOST = join ( "&", $aPOST );
		}
		curl_setopt ( $oCurl, CURLOPT_URL, $url );
		curl_setopt ( $oCurl, CURLOPT_RETURNTRANSFER, 1 );
		curl_setopt ( $oCurl, CURLOPT_POST, true );
		curl_setopt ( $oCurl, CURLOPT_POSTFIELDS, $strPOST );
		$sContent = curl_exec ( $oCurl );
		$aStatus = curl_getinfo ( $oCurl );
		curl_close ( $oCurl );
		if (intval ( $aStatus ["http_code"] ) == 200) {
			return array(
					'status' => true,
					'content' => $sContent,
					'code' => $aStatus ["http_code"],
			);
		} else {
			return array(
					'status' => false,
					'content' => false,
					'code' => $aStatus ["http_code"],
			);
		}
	}
	
}
