<?php
/**
 *
 */

namespace Application\Service;

use Application\Dao\ShakeWnoDao;
use Infobird\Service\BaseService;

class ShakeWnoService extends BaseService
{

	private $shakeWnoDao;

	function __construct(){
		$this->shakeWnoDao = new ShakeWnoDao();
	}

    /**
     * @param $where
     * @return array
     * 功能：1、查询摇一摇数据
     */
	public function searchShake($where){
	    return $this->shakeWnoDao->fetch($where);
	}

    /**
     * @param $data
     * @param $where
     * @return bool
     * 功能：1、更新摇一摇数据
     */
    public function updataShake($data,$where){
        return $this->shakeWnoDao->update($data,$where);
    }

    /**
     * @param $data
     * @return bool
     * 功能：1、插入摇一摇信息
     */
    public function insertWno($data){
        return $this->shakeWnoDao->insert($data);
    }

    public function delShake($sequence){
        return $this->shakeWnoDao->delShake($sequence);
    }

    public function shakeAll($sequence){
        return $this->shakeWnoDao->shakeAll($sequence);
    }
}