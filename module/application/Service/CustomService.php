<?php
/**
 *
 */

namespace Application\Service;


use Application\Dao\CustomDao;
use Infobird\Service\BaseService;

class CustomService extends BaseService
{

	private $customDao;

	function __construct(){
		$this->customDao = new CustomDao();
	}

    public function checkCustomData($sequence){
        return $this->customDao->checkCustomData($sequence);
    }

    public function updateCustom($data,$where){
        return $this->customDao->update($data,$where);
    }

    public function inserCustomData($data){
        return $this->customDao->insert($data);
    }
}