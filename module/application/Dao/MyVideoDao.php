<?php
/**
 * Created by PhpStorm.
 * User: SAMSUNG-R428
 * Date: 16-1-26
 */

namespace Application\Dao;

use Infobird\Dao\MysqliBaseDao;

class MyVideoDao extends MysqliBaseDao
{
	/**
	 * 提供数据表名
	 * @return string
	 */
	protected  function _provideTableName() {
		return 'nh_open_myvideo';
	}
	
	public function searchMyVideo($video_type){
	    $sql = "SELECT * FROM nh_open_myvideo WHERE video_type = '{$video_type}'";
	    return $this->queryBySql($sql);
	}

    public function searchMyVideoDesc($video_type){
        $sql = "SELECT * FROM nh_open_myvideo WHERE video_type = '{$video_type}' ORDER BY id DESC";
        return $this->queryBySql($sql);
    }

    public function searchOpenVideoDesc(){
        $sql = "
            SELECT
            nh_open_myvideo.id,
            nh_open_myvideo.video_id,
            nh_open_myvideo.video_url,
            nh_open_myvideo.video_cover,
            nh_open_myvideo.video_type,
            nh_open_myvideo.video_name,
            nh_open_myvideo.preview_url,
            nh_open_myvideo.patter,
            nh_open_myvideo.insert_dt,
            nh_video_material.dl_url
            FROM
            nh_open_myvideo
            LEFT JOIN nh_video_material ON nh_open_myvideo.video_id = nh_video_material.video_id
            WHERE nh_open_myvideo.video_type = '1'
            ORDER BY nh_open_myvideo.id DESC
            ";
        return $this->queryBySql($sql);
    }

    public function searchMyVideoData($video_url){
        $sql = "SELECT * FROM nh_open_myvideo WHERE video_url = '{$video_url}'";
        return $this->queryBySql($sql);
    }

    public function openVideoData($video_type){
        $sql = "
            SELECT
            nh_open_myvideo.id,
            nh_open_myvideo.video_id,
            nh_open_myvideo.video_url,
            nh_open_myvideo.video_cover,
            nh_open_myvideo.video_type,
            nh_open_myvideo.video_name,
            nh_open_myvideo.preview_url,
            nh_open_myvideo.patter,
            nh_open_myvideo.insert_dt,
            nh_video_material.dl_url
            FROM
            nh_open_myvideo
            LEFT JOIN nh_video_material ON nh_open_myvideo.video_id = nh_video_material.video_id
            WHERE nh_open_myvideo.video_type = '{$video_type}'
            ORDER BY nh_open_myvideo.id ASC 
            ";
        return $this->queryBySql($sql);
    }
}