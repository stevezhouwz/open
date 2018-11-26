<?php
/**
 *
 */

namespace Application\Service;

use Application\Dao\MaterialDao;
use Infobird\Service\BaseService;
use Infobird\Utils\HttpUtils;

class MaterialService extends BaseService
{

	private $materialDao;

	function __construct(){
		$this->materialDao = new MaterialDao();
	}

    /**
     * @param string $domain
     * @param string $token
     * @return array
     */
    function authority($domain,$token){
        if(empty($token)){
            return $this->response(4,'缺少参数');
        }
        $url = $domain.'/application/login/checktoken?token='.$token;
        $result = HttpUtils::http_get($url);
        if(!empty($result)&&$result['status']==true){
            $content = $result['content'];
            $conArr = json_decode($content,true);
            if(!empty($conArr)){
                if($conArr['result'] == 0){
                    return $this->response(0,'验证通过');
                }else{
                    return $this->response(1,'验证失败');
                }
            }else{
                return $this->response(2,'验证信息解析有误');
            }
        }else{
            return $this->response(3,'网络异常，稍后再试');
        }
    }

    /**
     * @param string $code
     * @param string $message
     * @param string $content
     * @return array
     */
    private function response($code, $message, $content = null){
        if(empty($content)){
            return array('code'=>$code,'message'=>$message);
        }else{
            return array('code'=>$code,'message'=>$message,'content'=>$content);
        }
    }

    /**
     * @param string $message
     */
    function errorPage($message){
        header("Content-type: text/html; charset=utf-8");
        echo $message;
        return;
    }
}