<?php
/**
 * Created by PhpStorm.
 * User: SAMSUNG-R428
 * Date: 16-1-26
 */

namespace Application\Dao;

use Application\DbModel\FilmModel;
use Infobird\Dao\BaseDao;

class FilmDao extends BaseDao
{
	function __construct(){
		$this->selfModel = new FilmModel();
	}

	public function save($filmArray){
		$this->selfModel->id = $filmArray['id'];
		$this->selfModel->name = $filmArray['name'];
		$this->selfModel->describe = $filmArray['describe'];
		$this->selfModel->release_date = $filmArray['release_date'];
		$this->selfModel->actor = $filmArray['actor'];
		$this->selfModel->director = $filmArray['director'];
		$this->selfModel->playbill = $filmArray['playbill'];
		$this->selfModel->create_time = $filmArray['create_time'];
		$this->selfModel->update_time = $filmArray['update_time'];
		return $this->selfModel->save();
	}

	public function page($pageIndex , $pageSize){
		$totalCount = $this->selfModel->where('create_time','>','2016-03-03 18:32:09')->count();
		if(($pageIndex - 1) * $pageSize > $totalCount){
			return array();
		}
		return $this->selfModel->where('create_time','>','2016-03-03 18:32:09')->skip(($pageIndex - 1) * $pageSize)->take($pageSize)->get();
	}
}