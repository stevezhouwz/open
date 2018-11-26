<?php

/**
 * 
 */
namespace Application\Controller;

use Application\Service\OwnVideoService;
use Infobird\Controller\BaseController;
use Application\Service\IndexService;
use Application\Service\CoverService;
use Infobird\Utils\GuidUtils;
use Infobird\Utils\HttpUtils;
use Infobird\Utils\LogUtils;
use Infobird\Utils\RedisUtils;
use Application\Service\MyVideoService;
use Zend\Db\Sql\Predicate\In;


class VideoController extends BaseController
{
    /**
     * 名字：index
     * 功能：1、开场视频显示页
     *      2、加载数据库中开场视频的数据信息
     */
	public function indexAction() 
	{
 	   $sequence = isset($_REQUEST['sequence'])?$_REQUEST['sequence']:"";
       $open = new IndexService();
	   $where = array("sequence"=>$sequence);
	   
	   $myvideo = new MyVideoService();

       $ownvideo = new OwnVideoService();
       $config = $this->getConfigValue('annual');
       $storage = $config['storage_js']."/transcode/result";
       $storage_js = $config['storage_js']."/public/javascripts/storage.min.js";
       $project = $config['project'];
       $module = $config['module'];
       $env = $config['env'];
       $www = $config['newyear'];
       $newyear = $www."/hd/order/isPayment";
       $feature = $config['feature'];


	   try {
	       $result = $open->searchOpen($where);
	       $video_src = isset($result['0']['video_src'])?$result['0']['video_src']:"";
           $patter = isset($result['0']['patter'])?$result['0']['patter']:"";

	       $video_type = "1";//默认库中的视频
	       $res = $myvideo->openVideoData($video_type);

           $resultopen = $open->searchOpen($where);
           if($resultopen){
               $comp_id = $resultopen[0]['comp_id'];
               $videoType = "0";//上传的开场视频
               $resu = $ownvideo->searchVideo($comp_id,$videoType);
               $newres = HttpUtils::http_post($newyear,array("comp_id"=>$comp_id));
               if($newres){
                   $content = json_decode($newres['content'],true);
                   $ispayment = $content['result'];
               }else{
                   $ispayment = "-2";
               }
           }
	   } catch (\Exception $e) {
	       LogUtils::log("nh_video.log", 'index'.$e->getMessage(),array("result"=>"2000"));
	       exit;
	   }

       return array(
           "sequence"=>$sequence,
           "video_src"=>$video_src,
           "result"=>$res,
           "nvideo"=>$resu,
           "storage"=>$storage,
           "patter"=>$patter,
           "storage_js"=>$storage_js,
           "project"=>$project,
           "env"=>$env,
           "ispayment"=>$ispayment,
           "www"=>$www,
           "feature"=>$feature,
           "module"=>$module
       );	
	}

    /**
     * 名字:videoedit
     * 功能：1、开场视频页
     *      2、获取redis中自定义的视频信息
     */
	public function videoeditAction(){
	    $sequence = isset($_REQUEST['sequence'])?$_REQUEST['sequence']:"";
	    
	    $redis = RedisUtils::getRedis();
	    $key = "video_".$sequence;
	    
	    $res = $redis->get($key);
	    $redis->close();
	    $resu = json_decode($res,true);
	   
        $videoUrl = isset($resu['videoUrl'])?$resu['videoUrl']:"";
        
        $open = new IndexService();
        $video = new MyVideoService();

        try {
            $result = $open->openInfo($sequence,$videoUrl);
            $videoData = $video->searchMyVideoData($videoUrl);
            $video_content = isset($result['0']['video_content'])?$result['0']['video_content']:"";
            $preview_url = isset($videoData['0']['preview_url'])?$videoData['0']['preview_url']:"";

        } catch (\Exception $e) {
            LogUtils::log("nh_videoedit.log", 'videoedit'.$e->getMessage(),array("result"=>"2000"));
            exit;
        }
	    return array(
	        "sequence"=>$sequence,
	        "videoUrl"=>$videoUrl,
	        "contents"=>$video_content,
            "preview_url"=>$preview_url
	    );
	}

    /**
     * 名字：saveData
     * 功能：1、保存选择开场视频
     *      2、保存开场视频的封面、名字
     */
	public function saveDataAction(){
	    $videoName = isset($_REQUEST['videoName'])? $_REQUEST['videoName']:"";
	    $videoImg = isset($_REQUEST['cover'])? $_REQUEST['cover']:"";
	    $videoUrl = isset($_REQUEST['videoUrl'])? $_REQUEST['videoUrl']:"";
	    $sequence = isset($_REQUEST['sequence'])?$_REQUEST['sequence']:"";
	    $patter = isset($_REQUEST['patter'])?$_REQUEST['patter']:"";
        $video_id = isset($_REQUEST['video_id'])?$_REQUEST['video_id']:"";

	    $open = new IndexService();
	    $cover = new CoverService();
	    
	    try {
	        $res = $open->openInfo($sequence, $videoUrl);
	        if($res){
	            echo json_encode(array("result"=>"1","message"=>"no modify"));
	            exit;
	        }else {
	            try {
	                $where = array("sequence"=>$sequence);
	                $data = array(
	                    "patter"=>$patter,
	                    "video_src"=>$videoUrl,
	                    "video_content"=>"",
                        "video_id"=>$video_id
	                );
	                 
	                $arr = array(
	                    "video_cover"=>$videoImg,
	                    "video_name"=>$videoName
	                );

	                $result = $open->updataOpen($data, $where);
	                $res = $cover->updataCover($arr, $where);
	                echo json_encode(array("result"=>"0","message"=>"update ok"));
	                exit;
	            } catch (\Exception $e) {
	                LogUtils::log("nh_saveData.log", 'update'.$e->getMessage(),array("result"=>"2000"));
	                exit;
	            }
	        }
	    } catch (\Exception $e) {
	        LogUtils::log("nh_saveData.log", 'search'.$e->getMessage(),array("result"=>"2000"));
	        exit;
	    }
	    
	}

    /**
     * 名字：videoSave
     * 功能：1、自定义视频中的文字，存入数据库中
     */
	public function videoSaveAction(){

        $sequence = isset($_REQUEST['sequence'])? $_REQUEST['sequence']:"";
        $contents = isset($_REQUEST['contents'])? $_REQUEST['contents']:"";
        $videoUrl = isset($_REQUEST['videoUrl'])? $_REQUEST['videoUrl']:"";

        $redis = RedisUtils::getRedis();
        $key = "video_".$sequence;
         
        $res = $redis->get($key);
        $redis->close();
        $resu = json_decode($res,true);
        
        $videoName = isset($resu['videoName'])?$resu['videoName']:"";
        $videoImg = isset($resu['videoImg'])?$resu['videoImg']:"";
        $patter = isset($resu['patter'])?$resu['patter']:"";
        $video_id = isset($resu['video_id'])?$resu['video_id']:"";

        $where = array("sequence"=>$sequence);
        $data = array(
            "patter"=>$patter,
            "video_src"=>$videoUrl,
            "video_content"=>$contents,
            "video_id"=>$video_id
        );
        
        $arr = array(
            "video_cover"=>$videoImg,
            "video_name"=>$videoName
        );
        
        $open = new IndexService();
        $cover = new CoverService();
        try {
            $res = $open->updataOpen($data, $where);
            $resul = $cover->updataCover($arr, $where);
            echo json_encode(array("result"=>"0","message"=>"save ok"));
            exit;
        } catch (\Exception $e) {
            LogUtils::log("nh_videoSave.log", 'videoSave'.$e->getMessage(),array("result"=>"2000"));
            exit;
        }
	}

    /**
     * 名字：setRedis
     * 功能：1、点击自定义，把相关的数据存入redis中
     */
	public function setRedisAction() {
	    $videoName = isset($_REQUEST['videoName'])? $_REQUEST['videoName']:"";
	    $videoImg = isset($_REQUEST['cover'])? $_REQUEST['cover']:"";
	    $videoUrl = isset($_REQUEST['videoUrl'])? $_REQUEST['videoUrl']:"";
	    $sequence = isset($_REQUEST['sequence'])?$_REQUEST['sequence']:"";
        $patter = isset($_REQUEST['patter'])?$_REQUEST['patter']:"";
        $video_id = isset($_REQUEST['video_id'])?$_REQUEST['video_id']:"";
	    
	    $redis = RedisUtils::getRedis();
	    $key = "video_".$sequence;
	    $data = array(
	        "videoName"=>$videoName,
	        "videoImg"=>$videoImg,
	        "videoUrl"=>$videoUrl,
            "patter"=>$patter,
            "video_id"=>$video_id
	    );
	    $redis->set($key,json_encode($data));
	    $res = $redis->get($key);
	    $redis->close();
	    if($res){
	       echo json_encode(array("result"=>"0"));
	       exit;
	    }else {
	        LogUtils::log("nh_videoedit.log", 'setRedis error',array("result"=>"500"));
	     	exit;
	    }
	}

    /**
     * 名字：getVideoData
     * 功能：1、获取自定义数据库中的内容
     */
	public function getVideoDataAction(){
	    $videoUrl = isset($_REQUEST['videoUrl'])? $_REQUEST['videoUrl']:"";
	    $sequence = isset($_REQUEST['sequence'])?$_REQUEST['sequence']:"";
	    $where = array("sequence"=>$sequence,"video_src"=>$videoUrl);
	    $open = new IndexService();
	    try {
	        $result = $open->openInfo($sequence, $videoUrl);
	        if($result){
	            $contents = $result['0']['video_content'];
	        }else {
	            $contents = "";
	        }
	        echo json_encode(array("content"=>$contents));
	        exit;
	    } catch (\Exception $e) {
	        LogUtils::log("nh_getVideoData.log", 'getVideoData'.$e->getMessage(),array("result"=>"500"));
	        exit;
	    }
	}

    /**
     * 名字：uploadSave
     * 功能：1、把上传未转码的视频信息保存到数据库中
     */
	public function uploadSaveAction(){

	    $url = isset($_REQUEST['src'])?$_REQUEST['src']:"";
        $video_name = isset($_REQUEST['video_name'])?$_REQUEST['video_name']:"";
        $sequence = isset($_REQUEST['sequence'])?$_REQUEST['sequence']:"";

        $guid = new GuidUtils();
        $video_id= $guid->create_guid();

        $video = new OwnVideoService();
        $open = new IndexService();
        $where = array("sequence"=>$sequence);
        $insert_dt = date("Y-m-d H:i:s", time());
        try{
            $res = $open->searchOpen($where);
            if($res){
                $comp_id = $res[0]['comp_id'];
                $data = array(
                    "comp_id"=>$comp_id,
                    "sequence"=>$sequence,
                    "video_type"=>"0",
                    "video_id"=>$video_id,
                    "video_cover"=>"/img/down/default.jpg",
                    "video_url"=>$url,
                    "video_name"=>$video_name,
                    "video_status"=>"0",
                    "insert_dt"=>$insert_dt
                );
                $result = $video->insertVideo($data);

                echo json_encode(array(
                    "result"=>"0",
                    "message"=>"save ok",
                    "video_id"=>$video_id
                ));
                exit;
            }else {
                echo json_encode(array(
                   "result"=>"-1",
                    "message"=>"sequence error"
                ));
                exit;
            }

        }catch (\Exception $e){
            LogUtils::log("uploadSaveAction.log", 'uploadSaveAction'.$e->getMessage(),array("result"=>"500"));
            exit;
        }
    }

    /**
     * 名字：updateVideo
     * 功能：1、更新上传视频数据库中的信息
     *       2、修改视频地址和视频封面地址（视频地址为转码成功后的地址）
     */
    public function updateVideoAction(){
        $sequence = isset($_REQUEST['sequence'])?$_REQUEST['sequence']:"";
        $video_status = isset($_REQUEST['video_status'])?$_REQUEST['video_status']:"";
        $transcodedUrl = isset($_REQUEST['transcodedUrl'])?$_REQUEST['transcodedUrl']:"";
        $video_cover = isset($_REQUEST['video_cover'])?$_REQUEST['video_cover']:"";
        $video_id = isset($_REQUEST['video_id'])?$_REQUEST['video_id']:"";

        $video = new OwnVideoService();
        $data = array(
            "video_cover"=>$video_cover,
            "video_url"=>$transcodedUrl,
            "video_status"=>$video_status,
        );
        $where = array("sequence"=>$sequence,"video_id"=>$video_id);
        try{
            $result = $video->updateVideo($data,$where);
            echo json_encode(array(
               "result"=>"0",
                "message"=>"update ok"
            ));
            exit;
        }catch (\Exception $e){
            LogUtils::log("video.log", 'updateVideoAction'.$e->getMessage(),array("result"=>"500"));
            exit;
        }

    }

    /**
     * 功能：1、管理开场视频个人素材库
     */
    public function manageAction(){
        $sequence = isset($_REQUEST['sequence'])?$_REQUEST['sequence']:"";

        $open = new IndexService();
        $video = new OwnVideoService();
        $where = array("sequence"=>$sequence);

        try{
            $resultopen = $open->searchOpen($where);
            if($resultopen){
                $video_type = "0";
                $comp_id = $resultopen[0]['comp_id'];
                $resu = $video->noOwnVideo($comp_id,$video_type);
                $result = $video->ownVideo($comp_id,$video_type);

                return array(
                    "sequence"=>$sequence,
                    "ownVideo"=> $result,
                    "noOwnVideo"=>$resu
                );

            }else{
                echo json_encode(array(
                    "result"=> "-1",
                    "message"=>"comp_id error"
                ));
                exit;
            }

        }catch (\Exception $e){
            LogUtils::log("manage.log", 'manage'.$e->getMessage(),array("result"=>"500"));
            exit;
        }
    }

    public function delOwnVideoAction(){
        $video_id = isset($_REQUEST['video_id'])?$_REQUEST['video_id']:"";
        $video = new OwnVideoService();
        try{
            $result = $video->delOwnVideo($video_id);
            echo json_encode(array(
                "result"=>"0",
                "message"=>"del ok"
            ));
            exit;
        }catch (\Exception $e){
            LogUtils::log("manage.log", 'del'.$e->getMessage(),array("result"=>"500"));
            exit;
        }
    }

    public function downloadAction(){
        $file_name = $_REQUEST['name'];
       // $file_name="1.wmv";//需要下载的文件

        $file_size=filesize($file_name);//判断文件大小
        //返回的文件
        Header("Content-type: application/octet-stream");
        //按照字节格式返回
        Header("Accept-Ranges: bytes");
        //返回文件大小
        Header("Accept-Length: ".$file_size);
        //弹出客户端对话框，对应的文件名
        Header("Content-Disposition: attachment; filename=".$file_name);
        //防止服务器瞬时压力增大，分段读取
        $buffer=1024;

            $file_data=fread($buffer);
            echo $file_data;

        //关闭文件

 }
}