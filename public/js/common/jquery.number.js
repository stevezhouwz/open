/**
 *input[type=text] 相应操作
 *
 */
;(function(){	
	var pN = "number";  //只能输入数字
	var pF = "float";   //可以输入小数
	var pC = "chinese"; //只能输入中文
	var pM = "moeny";   //金额输入
	function pn(event){
		event.target.value = event.target.value.replace(/[\u4e00-\u9fa5]/g,'');
		event.target.value = event.target.value.replace(/^0/g, '');
		event.target.value = event.target.value.replace(/[^\d]/g,'');	
	}
	function pf(event){
	    event.target.value = event.target.value.replace(/[\u4e00-\u9fa5]/g,'');
		event.target.value = event.target.value.replace(/[^\d.]/g, '');
		event.target.value = event.target.value.replace(/^0{2,}/g, '0');
		event.target.value = event.target.value.replace(/\.{2,}/g, '.');
		event.target.value = event.target.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");		
	}
	function pc(event){
		event.target.value = event.target.value.replace(/[^\u4e00-\u9fa5]/g,'');
	}
	function pm(event){
		event.target.value = event.target.value.replace(/[\u4e00-\u9fa5]/g,'');
		event.target.value = event.target.value.replace(/[^\d.]/g, '');
		event.target.value = event.target.value.replace(/^0{2,}/g, '0');
		event.target.value = event.target.value.replace(/\.{2,}/g, '.');
		event.target.value = event.target.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
		event.target.value = event.target.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');		
	}
	
	function pInit(){		
		$("input["+pN+"]").each(function(){
			$(this).bind("input oninput", pn)
		});		
		$("input["+pF+"]").each(function(){
			$(this).bind("input oninput", pf)
		});
		$("input["+pC+"]").each(function(){
			$(this).bind("input oninput", pc)
		});
		$("input["+pM+"]").each(function(){
			$(this).bind("input oninput", pm)
		});
	}
	window.onload=function(){
	    pInit();
		$("#shakeNum").bind("input oninput", pn);
    }
})();