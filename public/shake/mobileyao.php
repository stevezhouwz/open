<html lang="zh-CN">
<head>
<meta content="text/html; charset=UTF-8" http-equiv="Content-Type">
<meta content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport">
<meta content="no-cache,must-revalidate" http-equiv="Cache-Control">
<meta content="no-cache" http-equiv="pragma">
<meta content="0" http-equiv="expires">
<meta content="telephone=no, address=no" name="format-detection">
<meta name="apple-mobile-web-app-capable" content="yes"> 
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta charset="utf-8">
<head>
<title>摇一摇页面</title>
<link rel="stylesheet" href="../mobile/font/iconfont.css"  />
<link rel="stylesheet" href="./css/shake.css"  />
</head>
<body>
<div class="my_body" style="display: none;">
	<div class="hander">
		<div class="img1">
			
		</div>
	</div>
	<div class="zhong" >
		<div class="img2">
		</div>
		<div class="zhong_i" style="  text-align: center;    margin-top: -45px;">
			<i class="icon iconfont" style="font-size: 200px;color: #fffdbe; ">&#xe62a;</i>
		</div>
	</div>
</div>
<div class="shake_box"  style="display: block">
	<div class="shakTop"><span></span></div>
		
	<div class="shakBottom"><span style="color: white;font-size: 24px;">摇一摇</span></div>
</div>

<?php
/**
 * 获取配置文件的信息
 */
	$conf = require '../../config/application.config.php';
	$tot = $conf['annual']['total'];
	$total= $tot."/collect/data";
	$url_js = $conf['annual']['url_js'];
	$back_js= $url_js."/js/back.js";

?>
<input type='hidden' id="total" name='total' value="<?php  echo $total;?>"/>
<input type='hidden' id="module_status" name='module_status' value='<?php echo isset($_REQUEST['openid'])?$_REQUEST['openid']:"";?>' />
<input type='hidden' id="comp_id" name='compId' value='<?php echo isset($_REQUEST['comp_id'])?$_REQUEST['comp_id']:"";?>' />
<input type='hidden' id="meet_id" name='meetId' value='<?php echo isset($_REQUEST['meet_id'])?$_REQUEST['meet_id']:"";?>' />
<input type='hidden' id="sequence" name='sequence' value='<?php echo isset($_REQUEST['sequence'])?$_REQUEST['sequence']:"";?>' />

<script type="text/javascript" src="../js/common/jquery-2.1.4.min.js"></script>
<script type="text/javascript" src="<?php  echo $back_js;?>"></script>
<script type="text/javascript" src="./js/shake.js"></script>
<script type="text/javascript">
$().ready(function(){
	var height = document.body.scrollHeight;
	$(".my_body").css("height",height);
})
</script>
</body>			
</html>
