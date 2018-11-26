<?php

/**
 *
 */
namespace Application\Controller;

use Application\Service\CoverService;
use Application\Service\CustomService;
use Application\Service\IndexService;
use Application\Service\MusicService;
use Application\Service\OwnVideoService;
use Application\Service\ShakeWnoService;
use Infobird\Controller\BaseController;
use Infobird\Utils\GuidUtils;
use Infobird\Utils\LogUtils;
use Infobird\Utils\RedisUtils;


class IndexController extends BaseController
{
    /**
     * 名字：init
     * 功能：1、初始化接口
     *      2、深度拷贝
     */
    public function initAction(){
        $data = $_REQUEST;
        $comp_id = isset($data['comp_id'])?$data['comp_id']:"";
        $meet_id = isset($data['meet_id'])?$data['meet_id']:"";
        $sequence = isset($_REQUEST['sequence'])?$_REQUEST['sequence']:"";
        if(empty($comp_id)||empty($meet_id)){
            echo json_encode(array("result"=>"1003","sequence"=>""));
            exit;
        }else if (isset($sequence) && !empty($sequence)) {
            $where = array("sequence"=>$sequence);
            $open = new IndexService();
            $cover = new CoverService();
            $shake = new ShakeWnoService();
            $video = new OwnVideoService();
            $music = new MusicService();
            $custom = new CustomService();

            try {
                $guid = new GuidUtils();
                $uuid= $guid->create_guid();
                $music_id = $guid->create_guid();
                $insert_dt = date("Y-m-d H:i:s", time());

                $result = $open->searchOpen($where);
                $rescover = $cover->searchCover($sequence);
                $reshake = $shake->shakeAll($sequence);
                $musicData = $music->musicData($sequence);
                $customData = $custom->checkCustomData($sequence);
                $video_id = isset($result['0']['video_id'])?$result['0']['video_id']:"";
                if($musicData){
                    $musicArr = array(
                        "sequence"=>$uuid,
                        "music_id"=>$music_id,
                        "music_url"=>isset($musicData['0']['music_url'])?$musicData['0']['music_url']:"",
                        "music_name"=>isset($musicData['0']['music_name'])?$musicData['0']['music_name']:"",
                        "insert_dt"=>$insert_dt
                    );
                    $music->insertMusic($musicArr);
                }
                if($customData){
                    $customArr = array(
                        "sequence"=>$uuid,
                        "custom_bg"=>isset($customData['0']['custom_bg'])?$customData['0']['custom_bg']:"",
                        "custom_pattern"=>isset($customData['0']['custom_pattern'])?$customData['0']['custom_pattern']:"",
                        "custom_color"=>isset($customData['0']['custom_color'])?$customData['0']['custom_color']:"",
                        "shake_text"=>isset($customData['0']['shake_text'])?$customData['0']['shake_text']:"",
                        "shake_text_color"=>isset($customData['0']['shake_text_color'])?$customData['0']['shake_text_color']:"",
                        "shake_img_url"=>isset($customData['0']['shake_img_url'])?$customData['0']['shake_img_url']:"",
                        "insert_dt"=>$insert_dt
                    );
                    $custom->inserCustomData($customArr);
                }

                if($result && $rescover && $reshake){
                    $data = array(
                        "sequence"=>$uuid,
                        "comp_id"=>$comp_id,
                        "meet_id"=>$meet_id,
                        "num"=>$result['0']['num'],
                        "shake_type"=>$result['0']['shake_type'],
                        "loading_url"=>$result['0']['loading_url'],
                        "countdown_url"=>$result['0']['countdown_url'],
                        "down_type"=>$result['0']['down_type'],
                        "down_nav"=>$result['0']['down_nav'],
                        "patter"=>$result['0']['patter'],
                        "video_src"=>$result['0']['video_src'],
                        "video_content"=>$result['0']['video_content'],
                        "sort"=>$result['0']['sort'],
                        "video_id"=>$video_id,
                        "music_id"=>$music_id,
                        "down_id"=>$result['0']['down_id'],
                        "insert_dt"=>$insert_dt,
                    );
                    $coverData = array(
                        "sequence"=>$uuid,
                        "load_cover"=>$rescover['0']['load_cover'],
                        "load_name"=>$rescover['0']['load_name'],
                        "countdown_cover"=>$rescover['0']['countdown_cover'],
                        "countdown_name"=>$rescover['0']['countdown_name'],
                        "video_cover"=>$rescover['0']['video_cover'],
                        "video_name"=>$rescover['0']['video_name'],
                        "insert_dt"=>$insert_dt,
                    );

                    $sharr1 = array(
                        "sequence"=>$uuid,
                        "shake_url"=>$reshake['0']['shake_url'],
                        "shake_text"=>$reshake['0']['shake_text'],
                        "shake_img"=>$reshake['0']['shake_img'],
                        "shake_type"=>$reshake['0']['shake_type'],
                        "insert_dt"=>$insert_dt,
                    );

                    $sharr2 = array(
                        "sequence"=>$uuid,
                        "shake_url"=>$reshake['1']['shake_url'],
                        "shake_text"=>$reshake['1']['shake_text'],
                        "shake_img"=>$reshake['1']['shake_img'],
                        "shake_type"=>$reshake['1']['shake_type'],
                        "insert_dt"=>$insert_dt,
                    );

                    $sharr3 = array(
                        "sequence"=>$uuid,
                        "shake_url"=>$reshake['2']['shake_url'],
                        "shake_text"=>$reshake['2']['shake_text'],
                        "shake_img"=>$reshake['2']['shake_img'],
                        "shake_type"=>$reshake['2']['shake_type'],
                        "insert_dt"=>$insert_dt,
                    );

                    try {
                        $open->insert($data);
                        $cover->insertCover($coverData);
                        $shake->insertWno($sharr1);
                        $shake->insertWno($sharr2);
                        $shake->insertWno($sharr3);

                        $redis =  RedisUtils::getRedis();
                        $key = "ceremony_returndata_".$meet_id."_".$comp_id."_".$uuid;
                        $redis->set($key,json_encode(array("num"=>$result['0']['num'])));
                        $redis->close();
                        echo json_encode(array("result"=>"0","sequence"=>$uuid));
                        exit;
                    } catch (\Exception $e) {
                        LogUtils::log("nh_open_info.log", 'insert'.$e->getMessage(),array("result"=>"2000"));
                        exit;
                    }
                }
            } catch (\Exception $e) {
                LogUtils::log("nh_open_info.log", 'init'.$e->getMessage(),array("result"=>"2000"));
                exit;
            }
        }else{
            $guid = new GuidUtils();
            $sequence = $guid->create_guid();
            $insert_dt = date("Y-m-d H:i:s", time());
            $num = "50";
            $shake_type = "0";
            $loading_url = "2";
            $countdown_url = "http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/5sjins.mp4";
            $down_type = "0";
            $patter = "0";
            $video_src = 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/start_1.mp4';
            $video_content = '{"color":"ffffff","offset":"0","offsetH":0,"family":"微软雅黑","style":"","fontSize":40,"gradualHF":"2017会议盛典","gradualHE":0,"opacity":"1.00","animal":"bounceInUp","bold":"","underline":"","contxt":"font-family: 微软雅黑; font-weight: normal; font-style: normal; text-decoration: none; color: rgb(255, 255, 255); text-shadow: rgb(240, 240, 240) 0px 0px 0px, rgb(240, 240, 240) 1px 0px 0px, rgb(0, 0, 0) 2px 0px 1px, rgba(0, 0, 0, 0.498039) 2px 0px 1px; font-size: 40px;","time":"6.6","text":"2017会议盛典"}';
            $sort = '{"first":"1","two":"2","three":"3"}';
            $arr = array(
                "sequence"=>$sequence,
                "comp_id"=>$comp_id,
                "meet_id"=>$meet_id,
                "num"=>$num,
                "shake_type"=>$shake_type,
                "loading_url"=>$loading_url,
                "countdown_url"=>$countdown_url,
                "down_type"=>$down_type,
                "patter"=>$patter,
                "video_src"=>$video_src,
                "video_content"=>$video_content,
                "sort"=>$sort,
                "insert_dt"=>$insert_dt,
                "music_id"=>"0",
            );

            $arr1 = array(
                "sequence"=>$sequence,
                "shake_url"=>"1",
                "insert_dt"=>$insert_dt,
            );
            $arr2 = array(
                "sequence"=>$sequence,
                "shake_url"=>"2",
                "shake_text"=>"讯鸟年度盛会",
                "shake_img"=>"/img/newlogo.png",
                "shake_type"=>"0",
                "insert_dt"=>$insert_dt,
            );
            $arr3 = array(
                "sequence"=>$sequence,
                "shake_url"=>"3",
                "shake_text"=>"讯鸟年度盛会",
                "shake_img"=>"/img/newlogo.png",
                "shake_type"=>"1",
                "insert_dt"=>$insert_dt,
            );

            $coverArr = array(
                "sequence"=>$sequence,
                "load_cover"=>"/img/open/one.jpg",
                "load_name"=>"动画2",
                "countdown_cover"=>"/img/down/5sjins.png",
                "countdown_name"=>"动画2",
                "video_cover"=>"/img/down/start_1.png",
                "video_name"=>"时代前沿",
                "insert_dt"=>$insert_dt,
            );
            try {

                $open = new IndexService();
                $wno = new ShakeWnoService();
                $cover = new CoverService();

                $res = $open->insert($arr);
                $resu1 = $wno->insertWno($arr1);
                $resu2 = $wno->insertWno($arr2);
                $resu3 = $wno->insertWno($arr3);
                $cres = $cover->insertCover($coverArr);

                $redis =  RedisUtils::getRedis();
                $key = "ceremony_returndata_".$meet_id."_".$comp_id."_".$sequence;
                $redis->set($key,json_encode(array("num"=>$num)));
                $redis->close();

                echo json_encode(array("result"=>"0","sequence"=>$sequence));
                exit;
            } catch (\Exception $e) {
                LogUtils::log("nh_open_info.log", 'init'.$e->getMessage(),array("result"=>"2000"));
                exit;
            }
        }
    }

    /**
     * 名字：get_video_list
     * 功能：1、获取本次年会中使用的视频文件
     */
    public function get_video_listAction(){
        $meet_id = isset($_REQUEST['meet_id'])?$_REQUEST['meet_id']:"";
        $open = new IndexService();
        $music = new MusicService();
        $host = $this->getConfigValue("host");
        if($meet_id){
            $result = $open->getVideoUrl($meet_id);
            if($result){
                foreach ($result as $value) {
                    $down_id = $value['down_id'];
                    $down_url = $value['countdown_url'];
                    $res = $open->getVideoName($down_id);

                    if($res){
                        $dnname = isset($res[0]['video_name'])?$res[0]['video_name']:"";
                    }else {
                        $reselt = $open->getMyVideoName($down_id,$down_url);
                        $dnname = isset($reselt[0]['video_name'])?$reselt[0]['video_name']:"";
                    }

                    $temp[] = array(
                        "url"=>$value['countdown_url'],
                        "name"=>$dnname,
                        "md5"=>"",
                        "type" => "video",
                        "module" => "mt-open"
                    );

                    $video_id = $value['video_id'];
                    $video_url = $value['video_src'];
                    $res = $open->getVideoName($video_id);
                    if($res){
                        $vownname = isset($res[0]['video_name'])?$res[0]['video_name']:"";
                    }else {
                        $res = $open->getMyVideoName($video_id,$video_url);
                        $vownname = isset($res[0]['video_name'])?$res[0]['video_name']:"";
                    }
                    $temp[] = array(
                        "url"=>$value['video_src'],
                        "name"=>$vownname,
                        "md5"=>"",
                        "type" => "video",
                        "module" => "mt-open"
                    );
                    $music_id = $value['music_id'];

                    switch ($music_id){
                        case "0":
                            $music_url = "";
                            $music_name = "";
                            break;
                        case "1":
                            $music_url = $host."/file/music1.mp3";
                            $music_name = "音乐1";
                            break;
                        case "2":
                            $music_url = $host."/file/music2.mp3";
                            $music_name = "音乐2";
                            break;
                        case "3":
                            $music_url = $host."/file/music3.mp3";
                            $music_name = "音乐3";
                            break;
                        default:
                            $musicData = $music->seachMusic($music_id);
                            $music_url = isset($musicData[0]['music_url'])?$musicData[0]['music_url']:"";
                            $music_name = isset($musicData[0]['music_name'])?$musicData[0]['music_name']:"";
                    }
                    if($music_url && $music_name){
                        $temp[] = array(
                            "url"=>$music_url,
                            "name"=>$music_name,
                            "md5"=>"",
                            "type" => "audio",
                            "module" => "mt-open"
                        );
                    }

                    $sequence = $value['sequence'];
                    $shakeUrl = $value['loading_url'];
                    $type = $value['shake_type'];

                    if($shakeUrl == 0){
                        $customShakeData = $open->getCustomShake($sequence);
                        $customBg = isset($customShakeData[0]['custom_bg'])?$customShakeData[0]['custom_bg']:"";
                        $shake_img_url = isset($customShakeData[0]['shake_img_url'])?$customShakeData[0]['shake_img_url']:"";
                        if($shake_img_url == "/img/newlogo.png"){
                            $shake_img_url = $host."/img/newlogo.png";
                        }
                        if($customBg){
                            $customBgData = explode("/",$customBg);
                            $customBgName = $customBgData[count($customBgData)-1];
                            if($customBgName == "custombg.jpg"){
                                $customBgImg = $host."/img/online/onlinebg.jpg";
                            }else{
                                $customBgImg = $customBg;
                            }
                        }
                        if($shake_img_url){
                            $shakeImgData = explode("/",$shake_img_url);
                            $shakeImgName = $shakeImgData[count($shakeImgData)-1];
                        }

                        $temp[] = array(
                            "url"=>$customBgImg,
                            "name"=>$customBgName,
                            "md5"=>"",
                            "type" => "pic",
                            "module" => "mt-open"
                        );
                        $temp[] = array(
                            "url"=>$shake_img_url,
                            "name"=>$shakeImgName,
                            "md5"=>"",
                            "type" => "pic",
                            "module" => "mt-open"
                        );
                    }else {
                        $shakeData = $open->getShake($sequence,$shakeUrl,$type);
                        $shake_img = isset($shakeData[0]['shake_img'])?$shakeData[0]['shake_img']:"";
                        if($shake_img == "/img/newlogo.png"){
                            $shake_img = $host."/img/newlogo.png";
                        }
                        if($shake_img){
                            $imgData = explode("/",$shake_img);
                            $imgName = $imgData[count($imgData)-1];
                        }
                        $temp[] = array(
                            "url"=>$shake_img,
                            "name"=>$imgName,
                            "md5"=>"",
                            "type" => "pic",
                            "module" => "mt-open"
                        );
                    }
                }

                $arr = array(
                    "code"=>"0",
                    "message"=>"ok",
                    "data"=>$temp
                );

                echo (json_encode($arr) );
                exit;
            }else {
                echo json_encode(array("code"=>"2","message"=>"params  missing or format error!!!"));
                exit;
            }
        }else {
            echo json_encode(array("code"=>"-1","message"=>"meet_id error"));
            exit;
        }
    }
    /**
     * 名字：index
     * 功能：1、开幕式首页
     */
    public function indexAction()
    {
        $sequence = isset($_REQUEST['sequence'])?$_REQUEST['sequence']:"";
        $comp_id = isset($_REQUEST['comp_id'])?$_REQUEST['comp_id']:"";
        $meet_id = isset($_REQUEST['meet_id'])?$_REQUEST['meet_id']:"";
// 	   if($sequence =="" || $comp_id =="" || $meet_id ==""){
// 	       echo "errer meet_id or sequence";
// 	       exit;
// 	   }
        $open = new IndexService();
        $cover = new CoverService();
        $custom = new CustomService();
        $ownVideo = new OwnVideoService();
        $music = new MusicService();
        $where = array("sequence"=>$sequence);

        $config = $this->getConfigValue('annual');
        $scon = $config['speed']."?meet_id=";

        try {
            $result = $open->searchOpen($where);
            $video_id = isset($result[0]['video_id'])?$result[0]['video_id']:"";
            $down_id = isset($result[0]['down_id'])?$result[0]['down_id']:"";
            $music_id = isset($result[0]['music_id'])?$result[0]['music_id']:"";

            $down = $ownVideo->searchOpenVideo($down_id);
            $videoData = $ownVideo->searchOpenVideo($video_id);

            if($result){
                //查询自定义摇一摇的数据
                $customData = $custom->checkCustomData($sequence);
                $custom_bg = isset($customData[0]['custom_bg'])?$customData[0]['custom_bg']:"";
                $custom_pattern = isset($customData[0]['custom_pattern'])?$customData[0]['custom_pattern']:"";
                $custom_color = isset($customData[0]['custom_color'])?$customData[0]['custom_color']:"";
                $custom_text = isset($customData[0]['shake_text'])?$customData[0]['shake_text']:"";
                $shake_text_color = isset($customData[0]['shake_text_color'])?$customData[0]['shake_text_color']:"";
                $shake_img_url = isset($customData[0]['shake_img_url'])?$customData[0]['shake_img_url']:"";

                //查询更换摇一摇2、3中的数据
                $res = $open->searchOpenInfo($sequence);
                $shake_text = isset($res[0]['shake_text'])?$res[0]['shake_text']:"";
                $shake_img = isset($res[0]['shake_img'])?$res[0]['shake_img']:"";
                $shake_type = isset($res[0]['shake_type'])?$res[0]['shake_type']:"";

                //其他开幕式数据
                $sort = json_decode($result['0']['sort'],true);
                $meet_id = isset($result['0']['meet_id'])?$result['0']['meet_id']:"";
                $speed = $scon.$meet_id;
                $loading_url = isset($result['0']['loading_url'])?$result['0']['loading_url']:"";
                $downUrl = isset($result['0']['countdown_url'])?$result['0']['countdown_url']:"";
                $video_src = isset($result['0']['video_src'])?$result['0']['video_src']:"";
                $video_content = isset($result['0']['video_content'])?$result['0']['video_content']:"";

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

            }else {
                echo "errer sequence";
                exit;
            }
            try {
                $openCover = $cover->searchCover($sequence);

            } catch (\Exception $e) {
                LogUtils::log("nh_open_info.log", 'searchCover'.$e->getMessage(),array("result"=>"2000"));
                exit;
            }
        } catch (\Exception $e) {
            LogUtils::log("nh_open_info.log", 'searchOpen'.$e->getMessage(),array("result"=>"2000"));
            exit;
        }

        $down_pre = isset($down[0]['preview_url'])?$down[0]['preview_url']:"";
        $video_pre = isset($videoData[0]['preview_url'])?$videoData[0]['preview_url']:"";

        return array(
            "sequence"=>$sequence,
            "meet_id"=>$meet_id,
            "first"=>$sort['first'],
            "two"=>$sort['two'],
            "three"=>$sort['three'],
            "openCover"=>$openCover,
            "loading_url"=>$loading_url,
            "custom_bg"=>$custom_bg,
            "custom_pattern"=>$custom_pattern,
            "custom_color"=>$custom_color,
            "custom_text"=>$custom_text,
            "shake_text_color"=>$shake_text_color,
            "shake_img_url"=>$shake_img_url,
            "shake_text"=>$shake_text,
            "shake_img"=>$shake_img,
            "shake_type"=>$shake_type,
            "downUrl"=>$downUrl,
            "video_src"=>$video_src,
            "video_content"=>$video_content,
            "speed"=>$speed,
            "down_pre"=>$down_pre,
            "video_pre"=>$video_pre,
            "music_url"=>$music_url
        );
    }

    /**
     * 名字：sortSave
     * 功能：1、保存选择的功能(摇一摇、倒计时、开场视频)
     */
    public function sortSaveAction(){
        $shyao = isset($_REQUEST['shyao'])?$_REQUEST['shyao']:"";
        $sequence = isset($_REQUEST['sequence'])?$_REQUEST['sequence']:"";
        $downCheck = isset($_REQUEST['downCheck'])?$_REQUEST['downCheck']:"";
        $openVideo = isset($_REQUEST['openVideo'])?$_REQUEST['openVideo']:"";
        $sort = array(
            "first"=>$shyao,
            "two"=>$downCheck,
            "three"=>$openVideo
        );
        $sort = json_encode($sort);
        $data = array("sort"=>$sort);
        $where = array("sequence"=>$sequence);
        $open = new IndexService();
        try {
            $result = $open->updataOpen($data, $where);
            echo json_encode(array("result"=>"0"));
            exit;
        }catch (\Exception $e){
            LogUtils::log("nh_open_info.log", 'sortSave'.$e->getMessage(),array("result"=>"2000"));
            exit;
        }
    }

    /**
     * 名字：shake
     * 功能：1、摇一摇显示页面
     *      2、显示摇一摇的数据
     */
    public function shakeAction()
    {
        $sequence = isset($_REQUEST['sequence'])?$_REQUEST['sequence']:"";
        $open = new IndexService();
        $config = $this->getConfigValue('annual');
        $storage = $config['storage_js']."/transcode/result";
        $storage_js = $config['storage_js']."/public/javascripts/storage.min.js";
        $project = $config['project'];
        $feature = $config['feature'];
        $module = $config['module'];
        $env = $config['env'];

        $where = array("sequence"=>$sequence);
        $music = new MusicService();
        $custom = new CustomService();


        try {
            $result = $open->searchOpen($where);
            $musicData = $music->musicData($sequence);
            $customData = $custom->checkCustomData($sequence);


            $num = isset($result['0']['num'])?$result['0']['num']:"";
            $loading_url = isset($result['0']['loading_url'])?$result['0']['loading_url']:"";
            $music_idd = isset($result['0']['music_id'])?$result['0']['music_id']:"";
            $music_id = isset($musicData[0]['music_id'])?$musicData[0]['music_id']:"";
            $music_url = isset($musicData[0]['music_url'])?$musicData[0]['music_url']:"";
            $music_name = isset($musicData[0]['music_name'])?$musicData[0]['music_name']:"";
            //查询自定义摇一摇的数据
            $custom_bg = isset($customData[0]['custom_bg'])?$customData[0]['custom_bg']:"";
            $custom_pattern = isset($customData[0]['custom_pattern'])?$customData[0]['custom_pattern']:"";
            $custom_color = isset($customData[0]['custom_color'])?$customData[0]['custom_color']:"";
            $custom_text = isset($customData[0]['shake_text'])?$customData[0]['shake_text']:"";
            $shake_text_color = isset($customData[0]['shake_text_color'])?$customData[0]['shake_text_color']:"";
            $shake_img_url = isset($customData[0]['shake_img_url'])?$customData[0]['shake_img_url']:"";

            switch ($music_idd){
                case "0":
                    $checkMusic = "";
                    break;
                case "1":
                    $checkMusic = "/file/music1.mp3";
                    break;
                case "2":
                    $checkMusic = "/file/music2.mp3";
                    break;
                case "3":
                    $checkMusic = "/file/music3.mp3";
                    break;
                default:
                    $musicData = $music->seachMusic($music_id);
                    $checkMusic = isset($musicData[0]['music_url'])?$musicData[0]['music_url']:"";
            }

        } catch (\Exception $e) {
            LogUtils::log("nh_open_info.log", 'shake'.$e->getMessage(),array("result"=>"2000"));
            exit;
        }
        return array(
            "sequence"=>$sequence,
            "num"=>$num,
            "loading_url"=>$loading_url,
            "storage_js"=>$storage_js,
            "project"=>$project,
            "module"=>$module,
            "env"=>$env,
            "music_idd"=>$music_idd,
            "music_id"=>$music_id,
            "music_url"=>$music_url,
            "music_name"=>$music_name,
            "custom_bg" => $custom_bg,
            "custom_pattern"=>$custom_pattern,
            "custom_color"=>$custom_color,
            "custom_text"=>$custom_text,
            "shake_text_color"=>$shake_text_color,
            "shake_img_url"=>$shake_img_url,
            "checkMusic"=>$checkMusic,
            "feature"=>$feature
        );
    }

    /**
     * 名字：searchWno
     * 功能：1、查询自定义摇一摇的数据
     */
    public function searchWnoAction(){
        $sequence = isset($_REQUEST['sequence'])?$_REQUEST['sequence']:"";
        $shakeUrl = isset($_REQUEST['shakeUrl'])?$_REQUEST['shakeUrl']:"";
        $open = new IndexService();

        try {
            $result = $open->searchWnoOpenInfo($sequence,$shakeUrl);
            $shake_type = isset($result['0']['shake_type'])?$result['0']['shake_type']:"";
            $shake_img = isset($result['0']['shake_img'])?$result['0']['shake_img']:"";
            $shake_text = isset($result['0']['shake_text'])?$result['0']['shake_text']:"";
        } catch (\Exception $e) {
            LogUtils::log("nh_open_info.log", 'shake'.$e->getMessage(),array("result"=>"2000"));
            exit;
        }
        $res = array(
            "result"=>"0",
            "sequence"=>$sequence,
            "shake_type"=>$shake_type,
            "shake_img"=>$shake_img,
            "shake_text"=>$shake_text,
            "shakeUrl"=>$shakeUrl
        );
        echo json_encode($res);
        exit;
    }

    /**
     * 名字：customone
     * 功能：1、自定义摇一摇的数据
     */
    public function customoneAction()
    {
        $sequence = isset($_REQUEST['sequence'])?$_REQUEST['sequence']:"";
        $shakeUrl = isset($_REQUEST['shakeUrl'])?$_REQUEST['shakeUrl']:"";
        $cover = isset($_REQUEST['cover'])?$_REQUEST['cover']:"";
        $coverName = isset($_REQUEST['name'])?$_REQUEST['name']:"";
        $open = new IndexService();
        $config = $this->getConfigValue('annual');
        $project = $config['project'];
        $storage_js = $config['storage_js']."/public/javascripts/storage.min.js";
        $feature = $config['feature'];
        $module = $config['module'];
        $env = $config['env'];
        try {
            $result = $open->searchWnoOpenInfo($sequence,$shakeUrl);
            $shake_type = isset($result['0']['shake_type'])?$result['0']['shake_type']:"";
            $shake_img = isset($result['0']['shake_img'])?$result['0']['shake_img']:"";
            $shake_text = isset($result['0']['shake_text'])?$result['0']['shake_text']:"";
        } catch (\Exception $e) {
            LogUtils::log("nh_open_info.log", 'shake'.$e->getMessage(),array("result"=>"2000"));
            exit;
        }
        return array(
            "sequence"=>$sequence,
            "shake_type"=>$shake_type,
            "shake_img"=>$shake_img,
            "shake_text"=>$shake_text,
            "shakeUrl"=>$shakeUrl,
            "cover"=>$cover,
            "coverName"=>$coverName,
            "project"=>$project,
            "storage_js"=>$storage_js,
            "env"=>$env,
            "feature"=>$feature,
            "module"=>$module
        );
    }

    /**
     * 名字：customtwo
     * 功能：1、自定义摇一摇的数据
     */
    public function customtwoAction()
    {
        $sequence = isset($_REQUEST['sequence'])?$_REQUEST['sequence']:"";
        $shakeUrl = isset($_REQUEST['shakeUrl'])?$_REQUEST['shakeUrl']:"";
        $cover = isset($_REQUEST['cover'])?$_REQUEST['cover']:"";
        $coverName = isset($_REQUEST['name'])?$_REQUEST['name']:"";
        $open = new IndexService();
        $config = $this->getConfigValue('annual');
        $project = $config['project'];
        $storage_js = $config['storage_js']."/public/javascripts/storage.min.js";
        $feature = $config['feature'];
        $module = $config['module'];
        $env = $config['env'];

        try {
            $result = $open->searchWnoOpenInfo($sequence,$shakeUrl);

            $shake_type = isset($result['0']['shake_type'])?$result['0']['shake_type']:"";
            $shake_img = isset($result['0']['shake_img'])?$result['0']['shake_img']:"";
            $shake_text = isset($result['0']['shake_text'])?$result['0']['shake_text']:"";
        } catch (\Exception $e) {
            LogUtils::log("nh_open_info.log", 'shake'.$e->getMessage(),array("result"=>"2000"));
            exit;
        }
        return array(
            "sequence"=>$sequence,
            "shake_type"=>$shake_type,
            "shake_img"=>$shake_img,
            "shake_text"=>$shake_text,
            "shakeUrl"=>$shakeUrl,
            "cover"=>$cover,
            "coverName"=>$coverName,
            "project"=>$project,
            "storage_js"=>$storage_js,
            "env"=>$env,
            "feature"=>$feature,
            "module"=>$module
        );
    }

    /**
     * 名字：shakeWSave
     * 功能：1、自定义摇一摇数据保存
     */
    public function shakeWSaveAction(){

        $shake_type = isset($_REQUEST['radioType'])?$_REQUEST['radioType']:"";
        $shakeCont = isset($_REQUEST['shakeCont'])?$_REQUEST['shakeCont']:"";
        $sequence = isset($_REQUEST['sequence'])?$_REQUEST['sequence']:"";
        $shakeUrl = isset($_REQUEST['shakeUrl'])?$_REQUEST['shakeUrl']:"";
        $cover = isset($_REQUEST['cover'])?$_REQUEST['cover']:"";
        $name = isset($_REQUEST['name'])?$_REQUEST['name']:"";
        $insert_dt = date("Y-m-d H:i:s", time());
        if($shake_type == 0){
            if($shakeCont == ""){
                $shakeCont = "讯鸟年度盛会";
            }
            $data = array(
                "shake_text"=>$shakeCont,
                "shake_type"=>$shake_type,
                "insert_dt"=>$insert_dt
            );
        }else {
            if($shakeCont == ""){
                $shakeCont = "/img/newlogo.png";
            }
            $data = array(
                "shake_img"=>$shakeCont,
                "shake_type"=>$shake_type,
                "insert_dt"=>$insert_dt
            );
        }
        $where = array("shake_url"=>$shakeUrl,"sequence"=>$sequence);
        $shake = new ShakeWnoService();
        $open = new IndexService();
        $cov = new CoverService();
        $arr = array("loading_url"=>$shakeUrl,"shake_type"=>$shake_type,"insert_dt"=>$insert_dt);
        $whe = array("sequence"=>$sequence);
        $arra = array("load_cover"=>$cover,"load_name"=>$name,"insert_dt"=>$insert_dt);

        //  print_r($data);die;
        try {
            $result = $shake->updataShake($data, $where);
            $res = $open->updataOpen($arr, $whe);
            $resu = $cov->updataCover($arra,$whe);
            echo json_encode(array("result"=>"0"));
            exit;
        } catch (\Exception $e) {
            LogUtils::log("nh_open_info.log", 'shakeWSave'.$e->getMessage(),array("result"=>"2000"));
            exit;
        }
    }

    
    /**
     * 名字：shakeSave
     * 功能：1、摇一摇显示页保存摇一摇次数和选择摇一摇的种类
     */
    public function shakeSaveAction(){
        $num = isset($_REQUEST['num'])?$_REQUEST['num']:"";
        $shakeUrl = isset($_REQUEST['shakeUrl'])?$_REQUEST['shakeUrl']:"";
        $shakeName = isset($_REQUEST['shakeName'])?$_REQUEST['shakeName']:"";
        $shakeCover = isset($_REQUEST['shakeCover'])?$_REQUEST['shakeCover']:"";
        $sequence = isset($_REQUEST['sequence'])?$_REQUEST['sequence']:"";
        $music_id = isset($_REQUEST['music_id'])?$_REQUEST['music_id']:"0";
        $music_url = isset($_REQUEST['music_url'])?$_REQUEST['music_url']:"";
        $music_name = isset($_REQUEST['music_name'])?$_REQUEST['music_name']:"";
        $insert_dt = date("Y-m-d H:i:s", time());
        if($num == ""){
            $num = "50";
        }
        $open = new IndexService();
        $cover = new CoverService();
        $music = new MusicService();
        $where = array("sequence"=>$sequence);
        $musicArr = $music->musicData($sequence);
        if($music_id == 4){
            $music_id = isset($musicArr[0]['music_id'])?$musicArr[0]['music_id']:"";
        }
        $data = array(
            "num" => $num,
            "loading_url" => $shakeUrl,
            "insert_dt" => $insert_dt,
            "music_id" => $music_id
        );
        $arr = array(
            "load_cover" => $shakeCover,
            "load_name" => $shakeName,
            "insert_dt" => $insert_dt
        );

        $redis = RedisUtils::getRedis();
        $where = array("sequence" => $sequence);
        $re = $open->searchOpen($where);
        $comp_id = isset($re[0]['comp_id']) ? $re[0]['comp_id'] : "";
        $meet_id = isset($re[0]['meet_id']) ? $re[0]['meet_id'] : "";

        $key = "ceremony_returndata_" . $meet_id . "_" . $comp_id . "_" . $sequence;
        $redis->set($key, json_encode(array("num" => $num)));
        $redis->close();

        try {
            $result = $open->updataOpen($data, $where);
            $res = $cover->updataCover($arr, $where);
            echo json_encode(array("result" => "0"));
            exit;
        } catch (\Exception $e) {
            LogUtils::log("nh_open_info.log", 'shakeSave' . $e->getMessage(), array("result" => "2000"));
            exit;
        }
    }

    /**
     * 功能：1、保存上傳音樂
     */
    public function musicSaveAction(){
        $sequence = isset($_REQUEST['sequence'])?$_REQUEST['sequence']:"";
        $music_url = isset($_REQUEST['music_url'])?$_REQUEST['music_url']:"";
        $music_name = isset($_REQUEST['music_name'])?$_REQUEST['music_name']:"";
        $music_id = isset($_REQUEST['music_id'])?$_REQUEST['music_id']:"";
        $insert_dt = date("Y-m-d H:i:s", time());

        $music = new MusicService();
        try{
            $musicData = $music->seachMusic($music_id);
            if($musicData){
                $musicWhere = array("sequence" => $sequence);
                $data = array(
                    "music_url" => $music_url,
                    "music_name" => $music_name,
                    "insert_dt" => $insert_dt
                );
                $result = $music->updateMusic($data,$musicWhere);
            }else {
                $music_id = GuidUtils::create_guid();
                $dataArr = array(
                    "sequence" => $sequence,
                    "music_id" => $music_id,
                    "music_url" => $music_url,
                    "music_name" => $music_name,
                    "insert_dt" => $insert_dt
                );
                $res = $music->insertMusic($dataArr);
            }
            echo json_encode(array("result" => "0"));
            exit;
        }catch (\Exception $e){
            LogUtils::log("nh_musicSave.log", 'musicSave' . $e->getMessage(), array("result" => "2000"));
            exit;
        }
    }
    /**
     * 名字：pccontrol
     * 功能：1、pc控制器
     */
    public function pccontrolAction(){
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
     * 名字：del
     * 功能：删除开幕式
     */
    public function delAction(){
        $data = $_REQUEST;
        $data = isset($data["data"])?$data["data"]:"";
        if(empty($data)){
            echo json_encode(array("result"=>"","message"=>"no data"));
            exit;
        }
        $data = json_decode($data,true);
        $arr = "";
        foreach ($data as $d){
            $comp_id = isset($d['comp_id'])?$d['comp_id']:"";
            $meet_id = isset($d['meet_id'])?$d['meet_id']:"";
            $sequence = isset($d['sequence'])?$d['sequence']:"";

            if(empty($comp_id)||empty($meet_id)||empty($sequence)){
                $arr = array("result"=>"1003","message"=>"param error");
                echo json_encode($arr);
                exit;
            }
            try {
                $open = new IndexService();
                $cover = new CoverService();
                $shake = new ShakeWnoService();
                $open->delOpen($sequence);
                $cover->delCover($sequence);
                $shake->delShake($sequence);
                echo json_encode(array("result"=>"0","message"=>"")) ;
                exit;
            }catch (\Exception $e){
                LogUtils::log("nh_open_info.log", 'del'.$e->getMessage(),array("result"=>"2000"));
                exit;
            }
        }
    }

    /**
     * 功能：1、自定义摇一摇
     * @return array
     */
    public function customshakeAction(){
        $sequence = isset($_REQUEST['sequence'])?$_REQUEST['sequence']:"";
        $config = $this->getConfigValue('annual');
        $storage_js = $config['storage_js']."/public/javascripts/storage.min.js";
        $project = $config['project'];
        $feature = $config['feature'];
        $module = $config['module'];
        $env = $config['env'];
        $custom = new CustomService();

        try{
            $customData = $custom->checkCustomData($sequence);
            $custom_bg = isset($customData[0]['custom_bg'])?$customData[0]['custom_bg']:"";
            $custom_pattern = isset($customData[0]['custom_pattern'])?$customData[0]['custom_pattern']:"";
            $custom_color = isset($customData[0]['custom_color'])?$customData[0]['custom_color']:"";
            $shake_text = isset($customData[0]['shake_text'])?$customData[0]['shake_text']:"";
            $shake_text_color = isset($customData[0]['shake_text_color'])?$customData[0]['shake_text_color']:"";
            $shake_img_url = isset($customData[0]['shake_img_url'])?$customData[0]['shake_img_url']:"";
        }catch (\Exception $e){
            LogUtils::log("nh_custom.log", 'customshake'.$e->getMessage(),array("result"=>"2000"));
            exit;
        }
        return array(
            "sequence"=>$sequence,
            "custom_bg" => $custom_bg,
            "custom_pattern" => $custom_pattern,
            "custom_color" => $custom_color,
            "shake_text" => $shake_text,
            "shake_text_color" => $shake_text_color,
            "shake_img_url" => $shake_img_url,
            "storage_js" => $storage_js,
            "project" => $project,
            "env" => $env,
            "feature"=>$feature,
            "module"=>$module
        );
    }

    /**
     * 功能：1、自定义摇一摇数据保存
     */
    public function customSaveAction()
    {
        $sequence = isset($_REQUEST['sequence'])?$_REQUEST['sequence']:"";
        $custom_bg = isset($_REQUEST['custom_bg'])?$_REQUEST['custom_bg']:"";
        $custom_pattern = isset($_REQUEST['custom_pattern'])?$_REQUEST['custom_pattern']:"";
        $custom_color = isset($_REQUEST['custom_color'])?$_REQUEST['custom_color']:"";
        $shake_text = isset($_REQUEST['shake_text'])?$_REQUEST['shake_text']:"";
        $shake_text_color = isset($_REQUEST['shake_text_color'])?$_REQUEST['shake_text_color']:"";
        $shake_img_url = isset($_REQUEST['shake_img_url'])?$_REQUEST['shake_img_url']:"";
        $insert_dt = date("Y-m-d H:i:s", time());

        $custom = new CustomService();
        $cover = new CoverService();
        $open = new IndexService();
        $where = array("sequence"=>$sequence);
        $data = array(
            "custom_bg" => $custom_bg,
            "custom_pattern" => $custom_pattern,
            "custom_color" => $custom_color,
            "shake_text" => $shake_text,
            "shake_text_color" => $shake_text_color,
            "shake_img_url" => $shake_img_url,
            "insert_dt" => $insert_dt
        );
        $arr = array("loading_url"=>"0");

        $arra = array("load_cover"=>$custom_bg,"load_name"=>"自定义","insert_dt"=>$insert_dt);
        try{
            $customData = $custom->checkCustomData($sequence);
            $resu = $cover->updataCover($arra,$where);
            $open->updataOpen($arr,$where);
            if($customData){
                $res = $custom->updateCustom($data,$where);
            }else {
                $data = array(
                    "sequence"=>$sequence,
                    "custom_bg" => $custom_bg,
                    "custom_pattern" => $custom_pattern,
                    "custom_color" => $custom_color,
                    "shake_text" => $shake_text,
                    "shake_text_color" => $shake_text_color,
                    "shake_img_url" => $shake_img_url,
                    "insert_dt" => $insert_dt
                );
                $reult = $custom->inserCustomData($data);
            }
            echo json_encode(array("result"=>"0","msg"=>"ok"));
            exit;
        }catch (\Exception $e){
            LogUtils::log("nh_custom.log", 'save'.$e->getMessage(),array("result"=>"2000"));
            exit;
        }

    }

    public function creatGuidAction(){
        $guid = GuidUtils::create_guid();
        echo json_encode(array("music_id"=>$guid));
        exit;
    }
}