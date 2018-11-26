<?php
/**
 * Created by PhpStorm.
 * User: SAMSUNG-R428
 * Date: 16-1-26
 */

namespace Application\Dao;

use Infobird\Dao\MysqliBaseDao;

class IndexDao extends MysqliBaseDao
{
	/**
	 * 提供数据表名
	 * @return string
	 */
	protected  function _provideTableName() {
		return 'nh_open_info';
	}

    /**
     * @param $sequence
     * @param $shakeUrl
     * @return array
     * 功能：查询自定义摇一摇的数据
     */
	public function searchOpen($sequence,$shakeUrl){
	    $sql = "SELECT
                	*
                FROM
                	nh_shake_wno
                WHERE
                	nh_shake_wno.sequence = '{$sequence}'
                AND nh_shake_wno.shake_url ='{$shakeUrl}'";
	    return $this->queryBySql($sql);
	}

    /**
     * @param $sequence
     * @return array
     * 功能：查询该sequence下，设置的开幕式信息
     */
	public function searchOpenInfo($sequence){
	    $sql = "SELECT
                    nh_open_info.sequence,
                    nh_open_info.comp_id,
                    nh_open_info.meet_id,
                    nh_open_info.num,
                    nh_open_info.down_id,
                    nh_open_info.music_id,
                    nh_open_info.video_id,
                    nh_open_info.sort,
                    nh_open_info.video_content,
                    nh_open_info.video_src,
                    nh_open_info.countdown_url,
                    nh_open_info.loading_url,
                    nh_open_info.down_type,
                    nh_shake_wno.shake_text,
                    nh_shake_wno.shake_img,
                    nh_shake_wno.shake_type
                FROM
                    nh_open_info,
                    nh_shake_wno
                WHERE
                    nh_open_info.loading_url = nh_shake_wno.shake_url
                AND nh_open_info.sequence = nh_shake_wno.sequence
                AND nh_open_info.sequence = '{$sequence}'";
	    return $this->queryBySql($sql);
	}

    /**
     * @param $sequence
     * @param $videoUrl
     * @return array
     * 功能：查询开场视频的信息
     */
	public function openInfo($sequence,$videoUrl){
	    $sql = "SELECT * FROM nh_open_info where nh_open_info.sequence = '{$sequence}' and video_src = '{$videoUrl}'";
	    return $this->queryBySql($sql);
	}

    /**
     * @param $meet_id
     * @return array
     * 功能：查询本次年会视频url
     */
	public function getVideo($meet_id){
	    $sql = "SELECT * FROM nh_open_info WHERE nh_open_info.meet_id = '{$meet_id}'";
        return $this->queryBySql($sql);
    }

    /**
     * @param $sequence
     * @return array
     * 功能：删除开幕式
     */
    public function delOpen($sequence){
        $sql = "DELETE  FROM nh_open_info WHERE nh_open_info.sequence = '{$sequence}'";
        return $this->queryBySql($sql);
    }

    public function getVideoName($video_id){
        $sql = "SELECT * FROM nh_own_video WHERE video_id = '{$video_id}'";
        return $this->queryBySql($sql);
    }

    public function getMyVideoName($video_id,$video_url){
        $sql = "SELECT * FROM nh_open_myvideo WHERE video_id = '{$video_id}' OR video_url = '{$video_url}'";
        return $this->queryBySql($sql);
    }

    public function getShake($sequence,$shakeUrl,$type){
        $sql = "SELECT
                    nh_shake_wno.shake_img
                FROM
                    nh_shake_wno
                WHERE
                    nh_shake_wno.sequence = '{$sequence}'
                AND nh_shake_wno.shake_url = '{$shakeUrl}'
                AND nh_shake_wno.shake_type = '{$type}'";
        return $this->queryBySql($sql);
    }

    public function getCustomShake($sequence){
        $sql = "SELECT
                    nh_custom_shake.custom_bg,
                    nh_custom_shake.shake_img_url
                FROM
                    nh_custom_shake
                WHERE
                    nh_custom_shake.sequence = '{$sequence}'";
        return $this->queryBySql($sql);
    }
}