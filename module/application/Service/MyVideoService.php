<?php
/**
 *
 */

namespace Application\Service;

use Application\Dao\MaterialDao;
use Application\Dao\MyVideoDao;
use Infobird\Service\BaseService;
use Infobird\Utils\GuidUtils;

class MyVideoService extends BaseService
{

	private $myVideoDao;

	function __construct(){
		$this->myVideoDao = new MyVideoDao();
	}

    /**
     * @param string 视频类型
     * @return array
     * 功能：1、查询数据库视频信息
     */
    public function searchMyVideo($video_type){
        return $this->myVideoDao->searchMyVideo($video_type);
    }

    public function searchMyVideoDesc($video_type){
        if($video_type == 1){
            return $this->myVideoDao->searchOpenVideoDesc();
        }else {
            return $this->myVideoDao->searchMyVideoDesc($video_type);
        }
    }

    /**
     * @param array $data 保存数据
     * @param string $dl_url 资源下载地址
     * @return array
     * 功能：1、添加视频
     */
    public function addVideo($data,$dl_url){
        $video_id = GuidUtils::create_guid();
        $data['video_id'] = $video_id;
        $date = date("Y-m-d H:i:s", time());
        $data['insert_dt'] = $date;
        try {
            $this->myVideoDao->insert($data);
            if(!empty($dl_url)) {
                $this->MaterialDataSave($dl_url,$video_id);
            }
            return array('result'=>0,'message'=>'保存成功');
        }catch (\mysqli_sql_exception $e){
            return array('result'=>1,'message'=>'保存出错','error'=>$e->getMessage());
        }
    }

    /**
     * @param string $video_id
     * @param string $pre_url
     * @param string $dl_url
     * @return array
     * 功能：1、修改视频
     */
    public function editVideo($video_id,$pre_url,$dl_url){
        $date = date("Y-m-d H:i:s", time());
        $where = array(
            'video_id'=>$video_id
        );
        try {
            if(!empty($pre_url)) {
                $videoTableData = array(
                    'preview_url' => $pre_url,
                    'insert_dt' => $date
                );
                $this->myVideoDao->update($videoTableData, $where);
            }
            if(!empty($dl_url)) {
                $this->MaterialDataSave($dl_url,$video_id);
            }
            return array('result'=>0,'message'=>'保存成功');
        }catch (\mysqli_sql_exception $e){
            return array('result'=>1,'message'=>'保存出错','error'=>$e->getMessage());
        }
    }

    /**
     * @param $dl_url
     * @param $video_id
     * 功能：1、资源文件数据库保存与修改
     */
    public function MaterialDataSave($dl_url,$video_id){
        $MaterialDao = new MaterialDao();
        $date = date("Y-m-d H:i:s", time());
        $where = array(
            'video_id'=>$video_id
        );
        $hasMaterial = $MaterialDao->fetch($where);
        if(empty($hasMaterial)){
            //没数据，新建
            $saveData = array(
                'video_id' => $video_id,
                'dl_url' => $dl_url,
                'insert_dt' => $date
            );
            $MaterialDao->insert($saveData);
        }else{
            //有数据，更改
            $updateData = array(
                'dl_url' => $dl_url,
                'insert_dt' => $date
            );
            $MaterialDao->update($updateData,$where);
        }
    }

    /**
     * 查询预览视频地址
     * @param $video_url
     * @return mixed
     */
    public function searchMyVideoData($video_url){
        return $this->myVideoDao->searchMyVideoData($video_url);
    }

    public function openVideoData($video_type){
        return $this->myVideoDao->openVideoData($video_type);
    }
}