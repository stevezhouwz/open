<?php

/**
 * 
 */
namespace Application\Controller;


use Application\Service\CustomService;
use Application\Service\IndexService;
use Application\Service\MusicService;
use Infobird\Controller\BaseController;
use Infobird\Utils\LogUtils;
use Infobird\Utils\RedisUtils;


class OnlineController extends BaseController
{
    /**
     * 名字：index
     * 功能：1、大屏页
     *      2、获取后端设置的数据
     */
    public function indexAction(){
        $data = $_REQUEST;
        $meet_id = isset($data['meet_id'])?$data['meet_id']:"";
        $comp_id = isset($data['comp_id'])?$data['comp_id']:"";
        $sequence = isset($data['sequence'])?$data['sequence']:"";
        $config = $this->getConfigValue('annual');
        $meet_js = $config['meet_js']."/js/meetControl.js";
        $total = $config['total']."/collect/data";
        $websocket_list = $this->getConfigValue('websocket_list');

        if(!$meet_id && !$comp_id && !$sequence){
            echo "no open";
            exit;
        }
        $open = new IndexService();
        $music = new MusicService();
        $custom = new CustomService();
        $where = array("sequence"=>$sequence);
        try{
            $resu = $open->searchOpenInfo($sequence);
            $result = $open->searchOpen($where);

            $music_id = isset($result[0]['music_id'])?$result[0]['music_id']:"";
            $shake_text = isset($resu[0]['shake_text'])?$resu[0]['shake_text']:"";
            $shake_img = isset($resu[0]['shake_img'])?$resu[0]['shake_img']:"";
            $shake_type = isset($resu[0]['shake_type'])?$resu[0]['shake_type']:"";

            switch ($music_id){
                case "0":
                    $music_url = "";
                    break;
                case "1":
                    $music_url = "/file/music1.mp3";
                    break;
                case "2":
                    $music_url = "/file/music2.mp3";
                    break;
                case "3":
                    $music_url = "/file/music3.mp3";
                    break;
                default:
                    $musicData = $music->seachMusic($music_id);
                    $music_url = isset($musicData[0]['music_url'])?$musicData[0]['music_url']:"";
            }
            //查询自定义摇一摇的数据
            $customData = $custom->checkCustomData($sequence);
            $custom_bg = isset($customData[0]['custom_bg'])?$customData[0]['custom_bg']:"";
            $custom_pattern = isset($customData[0]['custom_pattern'])?$customData[0]['custom_pattern']:"";
            $custom_color = isset($customData[0]['custom_color'])?$customData[0]['custom_color']:"";
            $custom_text = isset($customData[0]['shake_text'])?$customData[0]['shake_text']:"";
            $shake_text_color = isset($customData[0]['shake_text_color'])?$customData[0]['shake_text_color']:"";
            $shake_img_url = isset($customData[0]['shake_img_url'])?$customData[0]['shake_img_url']:"";
        }catch (\Exception $e){
            LogUtils::log("nh_online.log","mysql search error".$e->getMessage(),array("result"=>"500"));
            exit;
        }
        return array(
            "comp_id"=>$comp_id,
            "meet_id"=>$meet_id,
            "sequence"=>$sequence,
            "shake_text"=>$shake_text,
            "shake_img"=>$shake_img,
            "shake_type"=>$shake_type,
            "result"=>$result,
            "meet_js"=>$meet_js,
            "total"=>$total,
            "music_url"=>$music_url,
            "custom_bg"=>$custom_bg,
            "custom_pattern"=>$custom_pattern,
            "custom_color"=>$custom_color,
            "custom_text"=>$custom_text,
            "shake_text_color"=>$shake_text_color,
            "shake_img_url"=>$shake_img_url,
            "websocket_list"=>$websocket_list
        );
	}

	public function testAction(){}

    /**
     * 功能：手动设置摇一摇插入数据
     */
	public function setNumAction(){
        $data = $_REQUEST;
        $meet_id = isset($data['meet_id'])?$data['meet_id']:"";
        $comp_id = isset($data['comp_id'])?$data['comp_id']:"";
        $sequence = isset($data['sequence'])?$data['sequence']:"";
        $num = isset($data['num'])?$data['num']:"0";
        if(!$num || !$meet_id || !$comp_id || !$sequence){
            echo json_encode(array("result"=>"-2","message"=>"parm is null"));
            exit;
        }
        $key = "ceremony_yao_".$comp_id."_".$meet_id."_".$sequence;
        $redis =  RedisUtils::getRedis();
        $getNum = $redis->get($key);

        $numkey = "ceremony_returndata_".$meet_id."_".$comp_id."_".$sequence;
        $snum = $redis->get($numkey);
        $snum = json_decode($snum,true);

        if($snum['num']){
            $setNum = $snum['num'];
        }else {
            try{
                $where = array("sequence"=>$sequence);
                $open = new IndexService();
                $result = $open->searchOpen($where);
                $setNum = $result[0]['num'];
            }catch (\Exception $e){
                LogUtils::log("nh_online.log","mysql search error".$e->getMessage(),array("result"=>"500"));
                exit;
            }
        }
        if($getNum - $setNum <=0){
            $redis->incrBy($key,$num);
            $getNum = $redis->get($key);
            $redis->close();
            echo json_encode(array("result"=>"0","num"=>$getNum,"message"=>"setNum ok"));
            exit;
        }else {
            echo json_encode(array("result"=>"1","num"=>$getNum,"message"=>"open ok"));
            exit;
        }

    }
}