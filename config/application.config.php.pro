<?php
/**
 * Created by PhpStorm.
 * User: SAMSUNG-R428
 * Date: 16-1-25
 */
return array(
	'db' => array(  //数据库配置信息
		'driver'    => 'mysql',
		'host' => 'nh-openceremony-mysql',
		'username'=>'root',
		'password'=>'HIBV9mIUchD73uveInY9hdWEPkAjABm3',
		'database'=>'nh_ceremony',
		'port' => '3306',
		'charset'=>'utf8',
		'collation' => 'utf8_general_ci',
		'prefix'    => ''
	),
		
	'redis' => array(  //redis配置信息
		'host' => 'nh-openceremony-redis',
		'port' => '6379'
	),
    'annual' => array(
          'display_server' => "http://1205_service_web_api", // 生产(年会手机、PC端控制大屏端请求命令地址)
          'url_js' => "http://1201_control_web_url",  //返回首页js
          'total' => "http://120.25.73.198:11206", //统计接口地址
          "project"=>"huishen",//图片上传项目名称
          "meet_js"=>"http://1201_control_web_url",//大屏meetContro.js
          "storage_js"=>"http://storage.51nhds.com",//上传图片、视频、音乐、地址
          "module"=>"mt-open",//上传模块名
          "feature"=>"pro", //上传文件夹名
          "env"=>"pro",//上传环境
          "speed"=>"http://1202_design_web_url/application/meetTab/speedguide",//加速器下载地址
          "newyear"=>"http://www.51nhds.com",//正式年会大师判断是否开通
          "nh_admin"=>"http://admin.51nhds.com", //年会网站运营端
    ),
    'websocket_list' => "ws://120.24.187.47:54129|ws://120.24.187.47:54129",
    'host' => "http://120.24.187.47:53178",
);