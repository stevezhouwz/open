<?php
/**
 *
 */

namespace Application\Service;

use Application\Dao\CoverDao;
use Infobird\Service\BaseService;

class CoverService extends BaseService
{

	private $coverDao;

	function __construct(){
		$this->coverDao = new CoverDao();
	}

    /**
     * @param $data
     * @return bool
     * 功能：1、封面信息插入
     */
	public function insertCover($data){
	    return $this->coverDao->insert($data);
	}

    /**
     * @param $data
     * @param $where
     * @return bool
     * 功能：1、更新封面信息
     */
    public function updataCover($data,$where){
        return $this->coverDao->update($data,$where);
    }

    /**
     * @param $sequence
     * @return array
     * 功能：1、查询封面信息
     */
    public function searchCover($sequence){
        return $this->coverDao->searchCover($sequence);
    }

    /**
     * @param $sequence
     * @return array
     * 功能：删除封面
     */
    public function delCover($sequence){
        return $this->coverDao->delCover($sequence);
    }
}