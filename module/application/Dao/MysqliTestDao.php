<?php
/**
 * Created by PhpStorm.
 * User: SAMSUNG-R428
 * Date: 16-1-26
 */

namespace Application\Dao;

use Infobird\Dao\MysqliBaseDao;

class MysqliTestDao extends MysqliBaseDao
{
	/**
	 * 提供数据表名
	 * @return string
	 */
	protected  function _provideTableName() {
		return 'film';
	}
}