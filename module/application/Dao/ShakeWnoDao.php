<?php
/**
 * Created by PhpStorm.
 * User: SAMSUNG-R428
 * Date: 16-1-26
 */

namespace Application\Dao;

use Infobird\Dao\MysqliBaseDao;

class ShakeWnoDao extends MysqliBaseDao
{
	/**
	 * 提供数据表名
	 * @return string
	 */
	protected  function _provideTableName() {
		return 'nh_shake_wno';
	}

	public function delShake($sequence){
        $sql = "DELETE  FROM nh_shake_wno WHERE nh_shake_wno.sequence = '{$sequence}'";
        return $this->queryBySql($sql);
    }

    public function shakeAll($sequence){
        $sql = "SELECT *  FROM nh_shake_wno WHERE nh_shake_wno.sequence = '{$sequence}'";
        return $this->queryBySql($sql);
    }
}