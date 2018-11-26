<?php

namespace Infobird\Utils;

/**
 * Class ArrayUtils
 *
 * @package Application\Utils
 */
class ArrayUtils {
	
	/**
	 * 获取数组节点的值，如果节点不存在则返回null，不抛出异常
	 * @param mixed $arr 数组
	 * @param mixed $key 键值
	 * @param mixed $default 默认值。当数组不存在、键值不存在或节点的值为null时，需要返回的值，默认为null
	 * @return string|null|mixed
	 */
	public static function getValue($arr, $key, $default=null)
	{
		if(!is_array($arr) || isset($arr[$key])==false)
		{
			return $default;
		}
		return $arr[$key];
	}
	
}
