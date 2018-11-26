<?php
/**
 * Created by PhpStorm.
 * User: SAMSUNG-R428
 * Date: 16-1-26
 */

namespace Infobird\Dao;

use MysqliDb;

abstract class MysqliBaseDao
{
	private $host;
	private $username;
	private $password;
    private $database;
    private $port;
    private $charset;
	/**
	 * @var \mysqli
	 */
	private $db;

	public function __construct() {
		$config = include BASE_PATH . '/config/application.config.php';
		$db_info = $config['db'];
		$this->host = $db_info['host'];
		$this->username = $db_info['username'];
		$this->password = $db_info['password'];
		$this->database = $db_info['database'];
		$this->port = $db_info['port'];
		$this->charset = $db_info['charset'];

		$this->db = $this->conn();
	}

	// 各dao子类提供当前dao需要操作的Model对应的表名
	abstract protected function _provideTableName();

	/**
	 * create db connection
	 * @return MysqliDb
	 */
	protected function conn() {
		$conn = new MysqliDb($this->host, $this->username, $this->password, $this->database, $this->port, $this->charset);
		return $conn->getInstance();
	}

	/**
	 * insert db
	 * @param array $insertData
	 * @return bool
	 */
	public function insert($insertData) {
		return $this->db->insert($this->_provideTableName(), $insertData);
	}

	/**
	 * query all data & direction
	 * @param array $order array('field'=>'direction')
	 * @return array
	 * @throws \Exception
	 */
	public function fetchAll($order=array()) {
		$obj = null;
		if (empty($order) == false) {
			foreach ($order as $key => $value) {
				$obj = $this->db->orderBy($key, $value);
			}
		} else {
			$obj = $this->db;
		}
		return $obj->get($this->_provideTableName());
	}

	/**
	 * query data by id
	 * @param int|string $id
	 * @return array
	 */
	public function fetchById($id) {
		return $this->db->where('id', $id)->get($this->_provideTableName());
	}

	/**
	 * query data by condition
	 * @param array $where
	 * @param array $order
	 * @param int $offset
	 * @param int $fetchNum
	 * @param array $orWhere
	 * @return array
	 * @throws \Exception
	 */
	public function fetch($where, $order=array(), $offset=0, $fetchNum=1, $orWhere=array()) {
		$obj = null;
		if (empty($where) == false) {
			foreach ($where as $key => $value) {
				$obj = $this->db->where($key, $value);
			}
		}
		if (empty($orWhere) == false) {
			foreach ($orWhere as $key => $value) {
				$obj = $this->db->orWhere($key, $value);
			}
		}
		if (empty($order) == false) {
			foreach ($order as $key => $value) {
				$obj = $this->db->orderBy($key, $value);
			}
		}
		$limits = array();
		if ($fetchNum > 0) {
			if ($offset >= 0) {
				array_push($limits, $offset);
			}
			array_push($limits, $fetchNum);
		}
		if ($obj == null) return array();
		return $obj->get($this->_provideTableName(), $limits);
	}

	/**
	 * count data
	 * @param array $where
	 * @return int|mixed
	 */
	public function fetchCount($where=array()) {
		$obj = null;
		if (empty($where) == false) {
			foreach ($where as $key => $value) {
				$obj = $this->db->where($key, $value);
			}
		} else {
			$obj = $this->db;
		}
		$ret = $obj->getValue($this->_provideTableName(), 'count(*)');
		$count = 0;
		if ($ret) {
			$count = $ret;
		}
		return $count;
	}

	/**
	 * update table field
	 * @param array $insertData
	 * @param array $where
	 * @param array $orWhere
	 * @return bool
	 */
	public function update($insertData, $where=array(), $orWhere=array()) {
		$obj = null;
		if (empty($where) == false) {
			foreach ($where as $key => $value) {
				$obj = $this->db->where($key, $value);
			}
		}
		if(empty($orWhere) == false) {
			foreach ($orWhere as $key => $value) {
				$obj = $this->db->orWhere($key, $value);
			}
		}
		if ($obj == null) return false;
		return $obj->update($this->_provideTableName(), $insertData);
	}

	/**
	 * query data by SQL
	 * @param string $sql
	 * @param array $params
	 * @return array
	 */
	public function queryBySql($sql, $params=array()) {
		if (empty($params) == false) {
			$ret = $this->db->rawQuery($sql, $params);
		} else {
			$ret = $this->db->rawQuery($sql);
		}
		return $ret;
	}

	/**
	 * begin Transaction
	 */
	public function beginTransaction() {
		$this->db->startTransaction();
	}

	/**
	 * commit Transaction
	 */
	public function commitTransaction() {
		$this->db->commit();
	}

	/**
	 * rollback Transaction
	 */
	public function rollbackTransaction() {
		$this->db->rollback();
	}
}