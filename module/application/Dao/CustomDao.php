<?php
/**
 * Created by PhpStorm.
 * User: zhou
 * Date: 17-3-14
 */

namespace Application\Dao;

use Infobird\Dao\MysqliBaseDao;

class CustomDao extends MysqliBaseDao
{
	/**
	 * 提供数据表名
	 * @return string
	 */
	protected  function _provideTableName() {
		return 'nh_custom_shake';
	}

    public function checkCustomData($sequence){
        $sql = "SELECT * FROM nh_custom_shake WHERE sequence = '{$sequence}'";
        return $this->queryBySql($sql);
    }
}