<?php
	
/**
 * 功能:插入摇一摇接口
 */

require_once './common/db_base.php';
$conf = require '../../config/application.config.php';

class YaoNum
{
	private $initNum;
	private $db;
	private $redis;
	private $conf;
	
	public function __construct ($conf)
	{
		$this->conf = json_encode($conf);
		$this->initNum = 0;
		$this->db = new db_base();
	}
	
	public function connect_db($conf, $name) 
	{
		$this->db->connect_db($conf, $name);
	}
	
	public function connect_redis()
	{
		$this->db->connect_db();
	}
	
	public function getInitNum($meet_id, $comp_id, $sequence)
	{
		$str_sql = "SELECT
                        num
                    FROM
                        nh_open_info
                    WHERE
                       sequence = '{$sequence}'
                    AND meet_id = '{$meet_id}'
                    AND comp_id = '{$comp_id}'";
		
		$result = $this->db->fetchAll($str_sql);
		return $result;
	}
	
	public function setNum($meet_id, $comp_id, $sequence)
	{
		$arr = array("result"=>null,'message' => "");

		//$snum = $this->getInitNum($meet_id, $comp_id, $sequence);
		$numkey = "ceremony_returndata_".$meet_id."_".$comp_id."_".$sequence;
		$num = $this->db->get($numkey);
        $snum = json_decode($num,true);

        if (!$snum) {
            $snum = $this->getInitNum($meet_id, $comp_id, $sequence);
            $num = $snum['0']['num'];
            $this->db->set($numkey,json_encode(array("num"=>$num)));
        } else {
            $num = $snum['num'];
        }

		$key = "ceremony_yao_".$comp_id."_".$meet_id."_".$sequence;
		 
		$resu = $this->db->get($key);
		if($resu) {
			if($num - $resu <=0) {
				$arr['result'] = "1";
				json_encode($arr);
				return json_encode($arr);
			}
		}
		$this->db->incr($key);
		$this->db->close();

		$arr['result'] = "0";
		$arr['message'] = "保存成功";
		json_encode($arr);
		return json_encode($arr);
	}
	
}

$meet_id = isset($_REQUEST["meet_id"]) ? $_REQUEST["meet_id"] : "";
$comp_id = isset($_REQUEST["comp_id"]) ? $_REQUEST["comp_id"] : "";
$sequence = isset($_REQUEST["sequence"]) ? $_REQUEST["sequence"] : "";

$yaoNum = new YaoNum($conf);
$yaoNum->connect_db($conf, "db");

$result = $yaoNum->setNum($meet_id, $comp_id, $sequence);
echo $result;
exit;