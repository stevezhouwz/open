<?php
/**
 * Created by PhpStorm.
 * User: SAMSUNG-R428
 * Date: 16-1-26
 */

namespace Application\Dao;

use Infobird\Dao\MysqliBaseDao;

class CoverDao extends MysqliBaseDao
{
	/**
	 * 提供数据表名
	 * @return string
	 */
	protected  function _provideTableName() {
		return 'nh_open_cover';
	}

    /**
     * @param $sequence
     * @return array
     * 功能：查询开幕式的封面信息
     */
	public function searchCover($sequence){
	    $sql = "SELECT * FROM nh_open_cover WHERE nh_open_cover.sequence = '{$sequence}'";
	    return $this->queryBySql($sql);
	}

    /**
     * @param $sequence
     * @return array
     * 功能：删除封面
     */
	public function delCover($sequence){
        $sql = "DELETE  FROM nh_open_cover WHERE nh_open_cover.sequence = '{$sequence}'";
        return $this->queryBySql($sql);
    }
}