<?php
/**
 * Created by PhpStorm.
 * User: SAMSUNG-R428
 * Date: 16-1-26
 */

namespace Application\Dao;

use Infobird\Dao\MysqliBaseDao;

class OwnVideoDao extends MysqliBaseDao
{
	/**
	 * 提供数据表名
	 * @return string
	 */
	protected  function _provideTableName() {
		return 'nh_own_video';
	}

	public function searchVideo($comp_id,$video_type){
	    $sql = "SELECT
                    *
                FROM
                    nh_own_video
                WHERE
                    nh_own_video.comp_id = '{$comp_id}'
                AND 
                    nh_own_video.video_type = '{$video_type}'
                ORDER BY
	                nh_own_video.id DESC";
        return $this->queryBySql($sql);

    }

    public function ownVideo($comp_id,$video_type){
        $sql = "SELECT
                    a.*
                FROM
                    nh_own_video AS a
                WHERE
                    NOT EXISTS (
                        SELECT
                            b.video_id
                        FROM
                            nh_open_info AS b
                        WHERE
                            a.video_id = b.video_id)
                AND a.comp_id = '{$comp_id}' AND a.video_type = '{$video_type}' ORDER BY a.id DESC";
        return $this->queryBySql($sql);
    }

    public function noOwnVideo($comp_id,$video_type){
        $sql = "SELECT
                    a.*
                FROM
                    nh_own_video AS a
                WHERE
                     EXISTS (
                        SELECT
                            b.video_id
                        FROM
                            nh_open_info AS b
                        WHERE
                            a.video_id = b.video_id)
                AND a.comp_id = '{$comp_id}' AND a.video_type = '{$video_type}'  ORDER BY a.id DESC";
        return $this->queryBySql($sql);
    }

    public function delOwnVideo($video_id){
        $sql = "DELETE FROM nh_own_video WHERE video_id = '{$video_id}'";
        return $this->queryBySql($sql);
    }

    public function videoInfo($video_id){
        $sql = "SELECT * FROM nh_own_video WHERE video_id = '{$video_id}'";
        return $this->queryBySql($sql);
    }

    public function downVideo($comp_id,$video_type){
        $sql = "SELECT
                    a.*
                FROM
                    nh_own_video AS a
                WHERE
                    NOT EXISTS (
                        SELECT
                            b.video_id
                        FROM
                            nh_open_info AS b
                        WHERE
                            a.video_id = b.down_id)
                AND a.comp_id = '{$comp_id}' AND a.video_type = '{$video_type}' ORDER BY a.id DESC";
        return $this->queryBySql($sql);
    }

    public function noDownVideo($comp_id,$video_type){
        $sql = "SELECT
                    a.*
                FROM
                    nh_own_video AS a
                WHERE
                     EXISTS (
                        SELECT
                            b.video_id
                        FROM
                            nh_open_info AS b
                        WHERE
                            a.video_id = b.down_id)
                AND a.comp_id = '{$comp_id}' AND a.video_type = '{$video_type}'  ORDER BY a.id DESC";
        return $this->queryBySql($sql);
    }

    public function searchOpenVideo($video_id){
        $sql = "SELECT * FROM nh_open_myvideo WHERE video_id = '{$video_id}'";
        return $this->queryBySql($sql);
    }
}