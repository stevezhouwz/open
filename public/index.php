<?php
/**
 * Created by PhpStorm.
 * User: SAMSUNG-R428
 * Date: 16-1-25
 * 入口文件
 */
header("Content-Type: text/html; charset=UTF-8");
//Eloquent
use Illuminate\Database\Capsule\Manager as Capsule;
// 定义 PUBLIC_PATH
define('PUBLIC_PATH', __DIR__);
// 启动器
require PUBLIC_PATH . '/../init_atuoloader.php';

// Eloquent ORM
$capsule = new Capsule;
$config = require '../config/application.config.php';
$capsule->addConnection($config['db']);
$capsule->bootEloquent();

// Decline static file requests back to the PHP built-in webserver
if (php_sapi_name() === 'cli-server' &&
	is_file(PUBLIC_PATH . parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH)))
{
	return false;
}

$reqUri = $_SERVER['REQUEST_URI'];
$index = strpos($reqUri, '?');
$uri = $index > 0 ? substr($reqUri, 0, $index) : $reqUri;//去除参数部分
if(!empty($uri) && stripos($uri, '.php') == false) {
	$uriArr = explode('/', $uri);
	$url = '/view';
	$module = isset($uriArr[1]) ? $uriArr[1] : 'application';
	
	$controller = (isset($uriArr[2]) && !empty($uriArr[2])) ? $uriArr[2] : 'index';
	$action = (isset($uriArr[3]) && !empty($uriArr[3])) ? $uriArr[3] : 'index';
	$url .= '/' . $module . '/' . $controller . '/' . $action;
	
	//加载全局配置文件
//	$globalConfig = include BASE_PATH . '/config/application.config.php';
	//组装类路径
	$className = ucfirst($module).'\\Controller\\' . ucfirst($controller) . 'Controller';

	$funName = $action . "Action";
	//初始化Controller Action执行结果
	$data = array();
	//判断类是否存在
	if (class_exists($className)) {
		$class = new ReflectionClass($className); // 建立这个类的反射类
		$instance  = $class->newInstanceArgs(array($config)); // 相当于实例化类
		//判断方法是否存在
		if ($class->hasMethod($funName)) {
			$method = $class->getmethod($funName); // 获取类中的方法
			$beforeDispatch = $class->getMethod("beforeDispatch");
			$beforeDispatch->invoke($instance);
			$data = $method->invoke($instance); // 执行方法
			$afterDispatch = $class->getMethod("afterDispatch");
			$afterDispatch->invoke($instance);
		} else {
			echo "Action is not found";
			exit;
		}
	} else {
		echo "Controller is not found";
		exit;
	}
	//得到请求的
	$reqUrl = BASE_PATH . strtolower($url);
	if (file_exists($reqUrl.'.php')) {
		require $reqUrl . '.php';
	} else if (file_exists($reqUrl.'.phtml')) {
		require $reqUrl . '.phtml';
	} else {
		echo "View is not found";
		exit;
	}
} else {
	$reqFile = PUBLIC_PATH . $uri;

	if (file_exists($reqFile)) {
		require $reqFile;
	} else {
		echo "File is not found";
	}
	exit;
}