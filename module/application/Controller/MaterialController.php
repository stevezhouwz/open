<?php

/**
 *
 */
namespace Application\Controller;

use Application\Dao\MyVideoDao;
use Application\Service\MaterialService;
use Application\Service\MyVideoService;
use Infobird\Controller\BaseController;
use Infobird\Utils\GuidUtils;
use Infobird\Utils\LogUtils;


class MaterialController extends BaseController
{
    /**
     * 名字：index
     * 功能：1、资源管理页面加载
     */
    public function indexAction()
    {
        $token = $this->getParamValue('token');
        $conf = $this->getConfigValue('annual');
        $storageJs = $conf['storage_js'];
        $project = $conf['project'];
        $module = $conf['module'];
        $feature = $conf['feature'];
        $env = $conf['env'];
        $nhAdmin = $conf['nh_admin'];

        $materialSer = new MaterialService();
        $result = $materialSer->authority($nhAdmin,$token);
        if($result['code'] != 0 ){
            $materialSer->errorPage($result['message']);
            exit;
        }

        return array(
            'storageJs'=>$storageJs,
            'project'=>$project,
            'module' => $module,
            'feature'=> $feature,
            'env'=>$env
        );
    }

    /**
     * @method 加载视频接口
     */
    public function loadvideoAction(){
        $type = $this->getParamValue('mode');
        $ser = new MyVideoService();
        try {
            $videos = $ser->searchMyVideoDesc($type);
            $result = array('result'=>0,'message'=>'success','videos'=>$videos);
        }catch (\mysqli_sql_exception $e){
            $result = array('result'=>1,'message'=>'数据库查询有误','error'=>$e->getMessage(),'videos'=>array());
        }
        echo json_encode($result);
        exit;
    }

    /**
     * @method 数据库执行脚本接口，批量添加video_id字段
     */
    public function initAction(){
        $token = $this->getParamValue('token');
        $conf = $this->getConfigValue('annual');
        $nhAdmin = $conf['nh_admin'];

        $materialSer = new MaterialService();
        $result = $materialSer->authority($nhAdmin,$token);
        if($result['code'] != 0 ){
            $materialSer->errorPage($result['message']);
            exit;
        }

        $dao = new MyVideoDao();
        $all = $dao->fetchAll();

        if(empty($all)){
            echo 'no data';
            exit;
        }
        if(!empty($all[0]['video_id'])){
            echo 'already executed';
            exit;
        }

        foreach ($all as $each){
            if(empty($each['video_id'])) {
                $video_id = GuidUtils::create_guid();
                $insertData = array(
                    'video_id' => $video_id
                );
                $where = array('id'=>$each['id']);
                $dao->update($insertData, $where);
            }
        }
        echo 'success';
        exit;
    }

    /**
     * @method 新增视频保存接口
     */
    public function saveVideoAction(){
        $video_type = $this->getParamValue('video_type');
        $video_url = $this->getParamValue('video_url');
        $video_cover = $this->getParamValue('video_cover');
        $video_name = $this->getParamValue('video_name');
        $preview_url = $this->getParamValue('preview_url');
        $dl_url = $this->getParamValue('dl_url');

        $data = array(
            'video_type'=>$video_type,
            'video_url'=>$video_url,
            'video_cover'=>$video_cover,
            'video_name'=>$video_name,
            'preview_url'=>$preview_url,
        );
        $videoSer = new MyVideoService();
        $result = $videoSer->addVideo($data,$dl_url);
        echo json_encode($result);
        exit;
    }

    /**
     * @method 修改视频保存接口
     */
    public function editVideoAction(){
        $video_id = $this->getParamValue('video_id');

        $preview_url = $this->getParamValue('preview_url');
        $dl_url = $this->getParamValue('dl_url');

        $videoSer = new MyVideoService();
        $result = $videoSer->editVideo($video_id,$preview_url,$dl_url);
        echo json_encode($result);
        exit;
    }


}