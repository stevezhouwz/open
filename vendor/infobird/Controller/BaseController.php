<?php
/**
 * Created by PhpStorm.
 * User: SAMSUNG-R428
 * Date: 16-1-25
 */

namespace Infobird\Controller;

abstract class BaseController extends AbstractBaseController
{
	/**
	 * 调用请求的Action前需要执行的动作
	 * @return boolean 返回true则继续执行当前请求的Action和afterDispatch，否则不再执行
	 * 重要：如果需要执行URL跳转【例如$this->redirect()->toUrl()】，则需要在该方法中返回false，否则导致原有Action和afterDispatch仍然会执行一遍，然后再跳转
	 */
	public function beforeDispatch() {
		// 默认什么也不做，各子类可重写该方法
	}


	/**
	 * 调用请求的Action后需要执行的动作，如果在beforeDispatch或Action中调用了exit或die，则不会再执行该方法
	 * 注意在该方法中执行echo内容会显示在网页的最前面，而不是最后面！
	 *
	 */
	public function afterDispatch() {
		// 默认什么也不做，各子类可重写该方法
	}
}