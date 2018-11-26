<?php
/**
 *
 */

namespace Application\Service;

use Application\Dao\OwnVideoDao;
use Infobird\Service\BaseService;

class OwnVideoService extends BaseService
{

	private $myVideoDao;

	function __construct(){
		$this->OwnVideoDao = new OwnVideoDao();
	}

    /**
     * 功能：1、插入新的数据
     * @param $data
     * @return bool
     */
	public function insertVideo($data){
	    return $this->OwnVideoDao->insert($data);
    }

    /**
     * 功能：1、根据条件查询未转码的视频信息
     * @param $comp_id
     * @return array
     */
    public function searchVideo($comp_id,$video_type){
        return $this->OwnVideoDao->searchVideo($comp_id,$video_type);
    }

    public function updateVideo($data,$where){
        return $this->OwnVideoDao->update($data,$where);
    }

    public function ownVideo($comp_id,$video_type){
        return $this->OwnVideoDao->ownVideo($comp_id,$video_type);
    }

    public function noOwnVideo($comp_id,$video_type){
        return $this->OwnVideoDao->noOwnVideo($comp_id,$video_type);
    }

    public function delOwnVideo($video_id){
        return $this->OwnVideoDao->delOwnVideo($video_id);
    }

    public function videoInfo($video_id){
        return $this->OwnVideoDao->videoInfo($video_id);
    }

    public function downVideo($comp_id,$video_type){
        return $this->OwnVideoDao->downVideo($comp_id,$video_type);
    }

    public function noDownVideo($comp_id,$video_type){
        return $this->OwnVideoDao->noDownVideo($comp_id,$video_type);
    }

    public function searchOpenVideo($video_id){
        return $this->OwnVideoDao->searchOpenVideo($video_id);
    }
}