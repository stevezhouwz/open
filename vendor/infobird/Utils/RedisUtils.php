<?php
/**
 * Created by PhpStorm.
 * User: MuLing
 * Date: 2015/8/18
 * Time: 18:28
 */
namespace Infobird\Utils;

class RedisUtils {

    /**
     * @var \Redis
     */
    private static $redis = null;

    /**
     * 是否是连接状态?
     * @var bool
     */
    private static $is_connected = false;

    /**
     * 获取redis对象
     * @param array $redis_info 数据库连接对象
     * @return \Redis
     * @throws \Exception
     */
    public static function getRedis(){
        if(self::$redis == null){
            self::$redis = new \Redis();
        }
        $config = include BASE_PATH . '/config/application.config.php';
        $redis_info = $config["redis"];
        
        //var_dump($redis_info);exit;
        
        $host = isset($redis_info['host']) ? $redis_info['host'] : 'redis_host';
        $port = isset($redis_info['port']) ? $redis_info['port'] : '6379';
        $dbIndex = isset($redis_info['db_index']) ? $redis_info['db_index'] : '0';
        self::$is_connected = self::$redis->connect($host,$port);
        self::$redis->select($dbIndex); //数据库选择
        if(self::$is_connected == false){
            throw new \Exception('create redis connection Fail!');
        }
        return self::$redis;
    }

    /**
     * 关闭redis
     */
    public static function closeRedis(){
        if(empty(self::$redis) == false && self::$is_connected == true){
            self::$is_connected = false;
            self::$redis->close();
        }
    }

}