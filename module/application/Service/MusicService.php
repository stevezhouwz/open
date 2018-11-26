<?php
/**
 *
 */

namespace Application\Service;


use Application\Dao\MusicDao;
use Infobird\Service\BaseService;

class MusicService extends BaseService
{

	private $musicDao;

	function __construct(){
		$this->musicDao = new MusicDao();
	}

    /**
     * 功能：1、插入上传的音乐
     * @param $data
     * @return bool
     */
    public function insertMusic($data){
	    return $this->musicDao->insert($data);
    }

    public function musicData($sequence){
        return $this->musicDao->musicData($sequence);
    }

    public function updateMusic($musicData,$musicWhere){
        return $this->musicDao->update($musicData,$musicWhere);
    }

    public function seachMusic($music_id){
        return $this->musicDao->seachMusic($music_id);
    }
}