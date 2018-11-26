<?php
/**
 *
 */

namespace Application\Service;

use Application\Dao\IndexDao;
use Infobird\Service\BaseService;

class IndexService extends BaseService
{

	private $indexDao;

	function __construct(){
		$this->indexDao = new IndexDao();
	}

    /**
     * @param $data
     * @return bool
     * 功能：插入开幕信息（nh_open_info）
     */
	public function insert($data){
	    return $this->indexDao->insert($data);
	}

    /**
     * @param $where
     * @return array
     * 功能：1、查询开幕式信息
     */
	public function searchOpen($where){
	    return $this->indexDao->fetch($where);
	}

    /**
     * @param $data
     * @param $where
     * @return bool
     * 功能：更新开幕式信息
     */
    public function updataOpen($data,$where){
        return $this->indexDao->update($data,$where);
    }

    /**
     * @param $sequence
     * @param $shakeUrl
     * @return array
     * 功能：1、查询自定义摇一摇的数据
     */
    public function searchWnoOpenInfo($sequence,$shakeUrl){
        return $this->indexDao->searchOpen($sequence,$shakeUrl);
    }

    /**
     * @param $sequence
     * @return array
     * 功能：查询该sequence下，设置的开幕式信息
     */
    public function searchOpenInfo($sequence){
        return $this->indexDao->searchOpenInfo($sequence);
    }

    /**
     * @param $sequence
     * @param $videoUrl
     * @return array
     * 功能：查询开场视频的信息
     */
    public function openInfo($sequence,$videoUrl){
        return $this->indexDao->openInfo($sequence,$videoUrl);
    }

    /**
     * @param $meet_id
     * @return array
     * 功能：查询本次年会使用视频url
     */
    public function getVideoUrl($meet_id){
        return $this->indexDao->getVideo($meet_id);
    }

    /**
     * @param $sequence
     * @return array
     * 功能：删除开幕式
     */
    public function delOpen($sequence){
        return $this->indexDao->delOpen($sequence);
    }

    /**
     * 功能：1、获取视频名称
     * @param $video_id
     * @return array
     */
    public function getVideoName($video_id){
        return $this->indexDao->getVideoName($video_id);
    }

    /**
     * 功能：1、获取视频名称
     * @param $video_id
     * @return array
     */
    public function getMyVideoName($video_id,$video_url){
        return $this->indexDao->getMyVideoName($video_id,$video_url);
    }

    /**
     * 功能：1、获取用户上传的logo图
     * @param $shakeUrl
     * @param $type
     * @return mixed
     */
    public function getShake($sequence,$shakeUrl,$type){
        return $this->indexDao->getShake($sequence,$shakeUrl,$type);
    }

    /**
     * 功能：1、获取自定义背景图、上传logo图
     * @param $shakeUrl
     * @param $type
     * @return mixed
     */
    public function getCustomShake($sequence){
        return $this->indexDao->getCustomShake($sequence);
    }
}