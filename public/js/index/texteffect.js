(function($) {
	"use strict";
		var isOn = 0, sets, fx, toAnimate = "#effect"; 
		// settings = {
		// 	animation:5,
		// 	animationType: "in",
		// 	backwards: false,
		// 	easing: "easeOutQuint",
		// 	speed: 1000,
		// 	sequenceDelay: 20,
		// 	startDelay: 2,
		// 	offsetX: 100,
		// 	offsetY: 50,
		// 	onComplete: fireThis,
		// 	restoreHTML: true
		// }
		var settings_1={
          animation: 8, animationType: "in",backwards: false,startDelay: 2, restoreHTML: false,onComplete: fireThis_1,offsetX: 50,offsetY: 100
		};
		var settings_2={
		  animation: 11, animationType: "in",backwards: false,startDelay: 2, restoreHTML: false,onComplete: fireThis_2,offsetX: 50,offsetY: 100
		};
		var settings_3={
		  animation: 14, animationType: "in",backwards: false,startDelay: 2, restoreHTML: false,onComplete: fireThis_3,offsetX: 50,offsetY: 100
		};
		var settings_4={
		  animation: 5, animationType: "in",backwards: false,startDelay: 2, restoreHTML: false,onComplete: fireThis_4,offsetX: 50,offsetY: 100
		};
		var settings_5={
				  animation: 6, animationType: "in",backwards: false,startDelay: 2, restoreHTML: false,onComplete: fireThis_5,offsetX: 50,offsetY: 100
				};
		var settings_6={
				  animation: 8, animationType: "in",backwards: false,startDelay: 2, restoreHTML: true,offsetX: 50,offsetY: 100
				};
		
		function Dictionary(){
			 this.data = new Array();
			 
			 this.put = function(key,value){
			  this.data[key] = value;
			 };

			 this.get = function(key){
			  return this.data[key];
			 };

			 this.remove = function(key){
			  this.data[key] = null;
			 };
			 
			 this.isEmpty = function(){
			  return this.data.length == 0;
			 };

			 this.size = function(){
			  return this.data.length;
			 };
		}
		var module = $("#moduleId").val();
		var arr = new Dictionary();
		var n = 0;
		var playarr = new Array();
		var i=0;
		jQuery(document).ready(function() {
			$("#reread").click(function(){
				n=0;
				clearInterval(timenum);
				$(".scrollstyle").remove();
				var pv = $("#vedioedit>p");
				if(!pv.length){return;}
				
				var keyarr = new Array();
				pv.each(function(){
					var target = $(this);
					var inp1 = target.children("label").eq(0).html();
					var inp2 = target.children("input[type=text]").eq(0).val();
					if(inp2!=""|inp2!=null){
						keyarr.push(inp1);
						arr.put(inp1,inp2);
					}
				});
				keyarr = keyarr.sort(function(a,b){
					return a-b;
				});
				 _V_("showvideo").play();
				 _V_("showvideo").addEvent("ended",function(){
					 $("#effect").html("");
					 clearInterval(set);
				 });
				_V_("showvideo").currentTime(0);
				//var module = $("#moduleId").val();
				var module = "2";
				//setInterval(function(){var current = _V_("showvideo").currentTime().toFixed(2);alert(current);},90);
				window.onload = window.set = setInterval(setinter,100,keyarr,arr,module);
				
				
			});
		
		});
	
		
		function setinter(tm,fonts,module){
			    console.log("=aaaa"+fonts);
				if(!(tm.length)){
					clearInterval(set);
				}
				
				var times = tm.length;
				
				for(var i=0;i<tm.length;i++){
					
					var current = _V_("showvideo").currentTime().toFixed(1);
					if(n<times){
						
						if((current==tm[i])){
							var ht = fonts.get(tm[i]);
							var setting = "";
							switch(module){
								case 1:
								{
									setting = settings_1;
									$("#effect").css("color","#FFFC94");
									break;
								}
								case 2:
								{
									setting = settings_2;
									$("#effect").css("color","#FFFFFF");
									break;
								}
								case 3:
								{
									setting = settings_3;
									$("#effect").css("color","#F9C382");
									break;
								}
								case 4:
								{
									setting = settings_4;
									$("#effect").css("color","#FFFC94");
									break;
								}
								case 5:
								{
									setting = settings_5;
									$("#effect").css("color","#1E7B86");
									break;
								}
								default:
								{
									setting = settings_1;
									break;
								}
							}
							$("#effect").stop(false, true);	
							$("#effect").html(ht);
							$.cjTextFx(setting);
							$.cjTextFx.animate(toAnimate);
							console.log(">>>>>>>>>>>>>>key>>>>>>>>>>>>>>>>"+tm[i]);
							console.log(">>>>>>>>>>>>>>>value>>>>>>>>>>>>>>>"+ht);
							current = "";
							
							console.log("当前数量"+times);
							console.log("设置数量"+n);
							console.log("比较值"+(current==tm[i]));
							console.log("确定值"+(n<times));
							if($("#effect").is(":animated")){
								n++;
							}
							
					      }
					}else{
						clearInterval(set);
					}
				
				}
				return n;
			}
		
		function fireThis_1(){
			sets = {animation: 1, animationType: "out", restoreHTML: false,onComplete: ""};
			jQuery.cjTextFx.animate(toAnimate, sets);
		}
		function fireThis_2(){
			sets = {animation: 6, animationType: "out", restoreHTML: false,onComplete: ""};
			jQuery.cjTextFx.animate(toAnimate, sets);
		}
		function fireThis_3(){
			sets = {animation: 10, animationType: "out", restoreHTML: false,onComplete: ""};
			jQuery.cjTextFx.animate(toAnimate, sets);
		}
		function fireThis_4(){
			sets = {animation: 9, animationType: "out", restoreHTML: false,onComplete: ""};
			jQuery.cjTextFx.animate(toAnimate, sets);
		}
		function fireThis_5(){
			sets = {animation: 8, animationType: "out", restoreHTML: false,onComplete: ""};
			jQuery.cjTextFx.animate(toAnimate, sets);
		}

})(jQuery);