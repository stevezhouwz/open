<?php
/**
 * Created by PhpStorm.
 * User: zhou
 * Date: 17-3-14
 */

namespace Application\Dao;

use Infobird\Dao\MysqliBaseDao;

class MusicDao extends MysqliBaseDao
{
	/**
	 * 提供数据表名
	 * @return string
	 */
	protected  function _provideTableName() {
		return 'nh_music';
	}

	public function musicData($sequence)
    {
        $sql = "SELECT * FROM nh_music WHERE sequence = '{$sequence}'";
        return $this->queryBySql($sql);
    }

    public function seachMusic($music_id)
    {
        $sql = "SELECT * FROM nh_music WHERE music_id = '{$music_id}'";
        return $this->queryBySql($sql);
    }
}