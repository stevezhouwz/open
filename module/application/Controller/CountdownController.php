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
use Infobird\Utils\LogUtils;
use Application\Service\MyVideoService;


class CountdownController extends BaseController
{
    /**
     * 名字：index
     * 功能：1、倒计时显示页
     *      2、加载数据库中的倒计时信息
     *      3、数据回填
     *
     */
	public function indexAction() 
	{
	   $sequence = isset($_REQUEST['sequence'])?$_REQUEST['sequence']:"";
       $open = new IndexService();
	   $where = array("sequence"=>$sequence);
        $ownvideo = new OwnVideoService();

	   $myvideo = new MyVideoService();
        $config = $this->getConfigValue('annual');
        $storage = $config['storage_js']."/transcode/result";
        $storage_js = $config['storage_js']."/public/javascripts/storage.min.js";
        $project = $config['project'];
        $env = $config['env'];
        $feature = $config['feature'];
        $module = $config['module'];

	   try {
	       $result = $open->searchOpen($where);
	       $down_type = isset($result['0']['down_type'])?$result['0']['down_type']:"";
	       $countdown_url = isset($result['0']['countdown_url'])?$result['0']['countdown_url']:"";
	       
	       $video_type = "5";
	       $res = $myvideo->searchMyVideo($video_type);
	       
	       $video_type = "10";
	       $arr = $myvideo->searchMyVideo($video_type);
           $resultopen = $open->searchOpen($where);
           $down_nav = isset($resultopen[0]['down_nav'])?$resultopen[0]['down_nav']:"0";
           if($resultopen){
               $comp_id = $resultopen[0]['comp_id'];
               $videoType = "1";//上传的倒计时
               $arrData = $ownvideo->searchVideo($comp_id,$videoType);
           }

	   } catch (\Exception $e) {
	       LogUtils::log("nh_open_info.log", 'shake'.$e->getMessage(),array("result"=>"2000"));
	       exit;
	   }
       return array(
           "sequence"=>$sequence,
           "downType"=>$down_type,
           "downUrl"=>$countdown_url,
           "resFive"=>$res,
           "resTen"=>$arr,
           "storage"=>$storage,
           "storage_js"=>$storage_js,
           "project"=>$project,
           "module"=>$module,
           "env"=>$env,
           "downData"=>$arrData,
           "down_nav"=>$down_nav,
           "feature"=>$feature
       );	
	}

    /**
     * 功能：1、测试
     */
	public function index1Action()
	{
	    return;
	}

    /**
     * 名字：downSave
     * 功能：1、保存倒计时数据
     *      2、保存倒计时选中的封面、名字信息
     */
	public function downSaveAction() {
	    $downType = isset($_REQUEST['downType'])?$_REQUEST['downType']:"";
	    $sequence = isset($_REQUEST['sequence'])?$_REQUEST['sequence']:"";
	    $downUrl = isset($_REQUEST['downUrl'])?$_REQUEST['downUrl']:"";
	    $downName = isset($_REQUEST['downName'])?$_REQUEST['downName']:"";
	    $downImg = isset($_REQUEST['downImg'])?$_REQUEST['downImg']:"";
        $down_nav = isset($_REQUEST['navType'])?$_REQUEST['navType']:"";
        $down_id = isset($_REQUEST['down_id'])?$_REQUEST['down_id']:"";

	    $insert_dt = date("Y-m-d H:i:s", time());
	    $where = array("sequence"=>$sequence);
	    $data = array(
	        "countdown_url"=>$downUrl,
	        "down_type" => $downType,
            "down_nav" => $down_nav,
            "down_id" => $down_id,
	        "insert_dt" => $insert_dt
	    );
	    $arr = array(
	        "countdown_cover"=>$downImg,
	        "countdown_name"=>$downName,
	        "insert_dt"=>$insert_dt
	    );
	    $open = new IndexService();
	    $cover = new CoverService();
	    try {
	        $result = $open->updataOpen($data, $where);
	        $res = $cover->updataCover($arr, $where);
	        echo json_encode(array("result"=>"0"));
	        exit;
	    } catch (\Exception $e) {
	        LogUtils::log("nh_open_info.log", 'shakeSave'.$e->getMessage(),array("result"=>"2000"));
	        exit;
	    }
	    
	}

    /**
     * 功能：1、倒计时个人素材库视频上传保存
     *       2、video_type为1倒计时视频
     *       3、上传完成时未转码，转码成功后修改状态video_status
     */
	public function uploadSaveAction(){
        $video_src = isset($_REQUEST['video_src'])?$_REQUEST['video_src']:"";
        $video_name = isset($_REQUEST['video_name'])?$_REQUEST['video_name']:"";
        $sequence = isset($_REQUEST['sequence'])?$_REQUEST['sequence']:"";
        $video_id = GuidUtils::create_guid();

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
                    "video_type"=>"1",
                    "video_id"=>$video_id,
                    "video_cover"=>"/img/down/default.jpg",
                    "video_url"=>$video_src,
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
     * 功能：1、管理倒计时个人素材库
     *
     */
    public function manageAction(){
        $sequence = isset($_REQUEST['sequence'])?$_REQUEST['sequence']:"";

        $open = new IndexService();
        $video = new OwnVideoService();
        $where = array("sequence"=>$sequence);

        try{
            $resultopen = $open->searchOpen($where);
            if($resultopen){
                $video_type = "1";
                $comp_id = $resultopen[0]['comp_id'];
                $resu = $video->noDownVideo($comp_id,$video_type);
                $result = $video->downVideo($comp_id,$video_type);

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
}