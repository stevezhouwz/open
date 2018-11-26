<?php

/**
 * 
 */
namespace Application\Controller;

use Infobird\Controller\BaseController;
use Infobird\Utils\LogUtils;
use Infobird\Utils\RedisUtils;
use Application\Service\IndexService;

class MobileController extends BaseController
{
    /**
     * 名字：index
     * 功能：1、摇一摇页面
     *      2、返回js
     *      3、数据统计js
     */
	public function indexAction() 
	{
	    $config = $this->getConfigValue('annual');
        $url_js = $config['url_js']."/js/back.js";
        $total = $config['total']."/collect/data";
        $data = $_REQUEST;
        $meet_id = isset($data['meet_id'])?$data['meet_id']:"";
        $comp_id = isset($data['comp_id'])?$data['comp_id']:"";
        $sequence = isset($data['sequence'])?$data['sequence']:"";
        $openid = isset($data['openid'])?$data['openid']:"";

        $where = array("sequence"=>$sequence);
        $open = new IndexService();
        $result = $open->searchOpen($where);
        $num = isset($result[0]['num'])?$result[0]['num']:"";
        $sort = isset($result[0]['sort'])?$result[0]['sort']:"";
        $websocket_list = $this->getConfigValue('websocket_list');

        return array(
            "back"=>$url_js,
            "total"=>$total,
            "meet_id"=>$meet_id,
            "comp_id"=>$comp_id,
            "sequence"=>$sequence,
            "openid"=>$openid,
            "num"=>$num,
            "websocket_list"=>$websocket_list,
            "sort"=> $sort
        );
	}

    /**
     * 名字：setNum
     * 功能：1、把摇一摇的次数存入redis中
     */
	public function setNumAction(){
	    $data = $_REQUEST;
	    $num = isset($data['num'])?$data['num']:"";
	    $meetid = isset($data['meet_id'])?$data['meet_id']:"";
	    $comp_id = isset($data['comp_id'])?$data['comp_id']:"";
	    $sequence = isset($data['sequence'])?$data['sequence']:"";
        $setNum = isset($data['setNum'])?$data['setNum']:"";

	    $redishandle = RedisUtils::getRedis();
	    $ret = array("result"=>null,'message' => "");
	    $count = 0;
	    
	    $key = "ceremony_yao_".$comp_id."_".$meetid."_".$sequence;
	     
	    $resu = $redishandle->get($key);
	    if($resu) {
            if($setNum - $resu <=0) {
                $arr['result'] = "1";
                $result = json_encode($arr);
                echo $result;
                exit;
            }
	    }
	    $redishandle->incr($key);
	    $redishandle->close();
	    
	    $ret['result'] = "0";
	    $ret['message'] = "保存成功";
	    $result = json_encode($ret);
	    echo $result;
	    exit;
	}

    /**
     * 名字:loadnum
     * 功能：1、取摇一摇的数据
     */
	public function loadnumAction(){
	    $data = $_REQUEST;
        $meetid = isset($data['meet_id'])?$data['meet_id']:"";
        $comp_id = isset($data['comp_id'])?$data['comp_id']:"";
        $sequence = isset($data['sequence'])?$data['sequence']:"";

        $redis = RedisUtils::getRedis();
        $key = "ceremony_yao_".$comp_id."_".$meetid."_".$sequence;
        $num = $redis->get($key);
        $redis->close();
        if($num){
            echo json_encode(array("num"=>$num));
            exit;
        }else {
            echo json_encode(array("num"=>"0"));
            exit;
        }
    }

    /**
     * 名字：mobilecontrol
     * 功能：手机端控制器
     */
    public function mobilecontrolAction(){
        $config = $this->getConfigValue('annual');
        $display_server = $config['display_server'];
        $data = $_REQUEST;
        $comp_id = isset($data['comp_id'])?$data['comp_id']:"";
        $meet_id = isset($data['meet_id'])?$data['meet_id']:"";
        $sequence = isset($_REQUEST['sequence'])?$_REQUEST['sequence']:"";
        $websocket_list = $this->getConfigValue('websocket_list');
        return array(
            "display_server"=>$display_server,
            "comp_id"=>$comp_id,
            "meet_id"=>$meet_id,
            "sequence"=>$sequence,
            "websocket_list"=>$websocket_list
        );
    }

    /**
     * 名字：deletenum
     * 功能：1、清除摇一摇次数
     */
    public function deletenumAction(){
        $data = $_REQUEST;
        $comp_id = isset($data['comp_id'])?$data['comp_id']:"";
        $meet_id = isset($data['meet_id'])?$data['meet_id']:"";
        $sequence = isset($_REQUEST['sequence'])?$_REQUEST['sequence']:"";
        $redis = RedisUtils::getRedis();
        $key = "ceremony_yao_".$comp_id."_".$meet_id."_".$sequence;

        $redis->set($key, "");

        $redis->close();
        echo json_encode(array("result"=>"0","message"=>"clear ok"));
        exit;
    }

    public function setRedisAction(){
        $data = $_REQUEST;
        $comp_id = isset($data['comp_id'])?$data['comp_id']:"";
        $meet_id = isset($data['meet_id'])?$data['meet_id']:"";
        $sequence = isset($_REQUEST['sequence'])?$_REQUEST['sequence']:"";
        $redis = RedisUtils::getRedis();
        $key = "ceremony_start_".$comp_id."_".$meet_id."_".$sequence;
        $open = new IndexService();
        $where = array("sequence"=>$sequence);
        try{
            $result = $open->searchOpen($where);
            $firt = isset($result['0']['sort'])?$result['0']['sort']:"";
            $res = json_decode($firt,true);
            if($res['first'] == 1){
                $redis->set($key, "10");
                $redis->close();
                echo json_encode(array("result"=>"10","message"=>"set start ok"));
                exit;
            }else{
                $redis->set($key, "11");
                $redis->close();
                echo json_encode(array("result"=>"11","message"=>"no yao"));
                exit;
            }
        }catch (\Exception $e){
            LogUtils::log("mobile.log", 'setRedisAction'.$e->getMessage(),array("result"=>"2000"));
            exit;
        }

    }
}