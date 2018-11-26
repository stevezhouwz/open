/******定义*******/
var set = "";//定义定时器名字
var centArr = new Array();

/****初始化加载方法******/
function videoInit(){
	addInput();
	saveData();
	resetData();
	back();
	preVideo();
	xianinput();
}
/***********返回上一页***********/
function back(){
	$(".cancel").click(function(){
    	var sequence = $("#sequence").val();
		window.location = "/application/video/index?sequence="+sequence;
    })
}


/************数据回填************/
function resetData(){
     var video_src = $("#video_src").val();
     var contents = $("#contents").val().split("|");
	console.log(contents);
	if(contents != ""){
		 for(var i=0;i<contents.length;i++){
			 var cont = JSON.parse(contents[i]);
			 centArr[cont.time] = cont;
			 var ss = '<div class="video_div">'
						 +'<label class="video_label">'+cont.time+'</label><span class="video_span">秒</span>'
						 +"<input class='video_input' type='text'  value='" +cont.text+ "'  maxlength='16'>"
						 +'<div class="v_div"><button class="v_btn">编辑文字效果</button><span class="v_span">|</span>'
						 +'<button  class="premove">删除</button></div></div>';
		     $("#vedioedit").append(ss);
			 $("button.premove").bind("click",btnremove);
			 var rand = Math.floor(Math.random()*1000);
			 var input = $("#vedioedit").children().last().find('input[class=video_input]');
			 $(".v_btn").editor({
			 	 id: "id"+rand,
				 animal:cont.animal,
				 color:cont.color,
				 family:cont.family,
				 fontSize:cont.fontSize,
				 bold:cont.bold,
				 style:cont.style,
				 underline:cont.underline,
				 offset:cont.offset,
				 offsetH:cont.offsetH,
				 opacity:cont.opacity,
				 text:cont.text,
				 time:cont.time,
				 textInput: input,
				 callback:saveDates});
	     };

	}
}

//把设置的数据存入数组中
function saveDates(res){
	var time = res.data.time;
	centArr[time] = res.data;
	console.log(centArr);
}

/***********保存数据************/
function saveData(){
	$("#save").bind("click",function(){
		var sequence = $("#sequence").val();
		var videoUrl = $("#videoUrl").val();
		var times = $("#vedioedit").children().first().find("label[class=video_label]").text();
		var timeArr = new Array();
		if(times){

			$("#vedioedit>div").each(function () {
				var target = $(this);
				var time = target.children("label").eq(0).text();
				var text = target.children("input[type=text]").eq(0).val();
				timeArr.push(time);
				timeArr = timeArr.sort(function(a,b){
					return a-b;
				});

				var textCont = centArr[time].text;
				if(!centArr[time] || textCont==""){
					var obj = new Object();
					obj.animal = "bounceInUp";
					obj.bold = "";
					obj.style="";
					obj.underline="";
					obj.color = "ffffff";
					obj.contxt = "font-family: 微软雅黑; font-weight: normal; font-style: normal; text-decoration: none; color: rgb(255, 255, 255); text-shadow: rgb(240, 89, 89) 0px 0px 0px, rgb(240, 89, 89) 1px 0px 0px, rgba(0, 0, 0, 0) 2px 0px 1px, rgba(0, 0, 0, 0.498039) 2px 0px 1px; font-size: 40px;";
					obj.family = "微软雅黑";
					obj.fontSize = "40";
					obj.offset = "0";
					obj.offsetH = "0";
					obj.opacity = "1";
					obj.text = text;
					obj.time = time;
					centArr[time] = obj;
				}else {
					var obj = new Object();
					obj.animal = centArr[time].animal;
					obj.bold = centArr[time].bold;
					obj.style=centArr[time].style;
					obj.underline=centArr[time].underline;
					obj.color = centArr[time].color;
					obj.contxt = centArr[time].contxt;
					obj.family = centArr[time].family;
					obj.fontSize = centArr[time].fontSize;
					obj.offset = centArr[time].offset;
					obj.offsetH = centArr[time].offsetH;
					obj.opacity = centArr[time].opacity;
					obj.text = text;
					obj.time = time;
					centArr[time] = obj;
				}
			});
		}
		var contents = new Array();
		for(var i=0;i<timeArr.length;i++){
			contents[i] = JSON.stringify(centArr[timeArr[i]]);
		}
		contents=contents.join("|");

		$.ajax({
            type:'POST',
            url: "/application/video/videoSave",
            datatype:"JSON",
            data:{"sequence":sequence,"contents":contents,"videoUrl":videoUrl},
            success: function(ret){
            	ret=JSON.parse(ret);
                if(ret.result==0){
                	var callback =function(){
                		window.location = "/application/video/index?sequence="+sequence;
                	}
                	popupalert('保存成功','message',callback);
                }
            },
            error:function(e){
            	var callback =function(){
            		window.location.reload();
            	}
            	popupalert('网络错误','error',callback);
            }     
    	});
		
	})
}

/*****限制输入********/
function xianinput() {
	var keycode = 0;
	var endcode = 0;
	$(".video_input").on("input",function (event) {
		//$(this).val($(this).val().replace(/[|\/\\/]/g,''));
		var tx = event.srcElement || event.target;
		var start = tx.setSelectionRange?tx.selectionStart:1;
		var str = tx.value;
		var lt = str.substr(0, str.length);
		if(keycode == 229){
			if(!lt.match(/[.~@#$\^\+\*\\\/\?\|:\.{}()';="]/g)){
				return;
			}else {
				event.target.value = event.target.value.replace(/[.~@#$\^\+\*\\\/\?\|:\.{}()';="]/,'');
				//event.target.value = str.substr(0,str.length-1);
			}
		}else {
			event.target.value = event.target.value.replace(/[.~@#$\^\+\*\\\/\?\|:\.{}()';="]/,'');
		}

		var end = tx.setSelectionRange?tx.selectionStart:1;
		endcode = end;
		if(start<end){
			tx.setSelectionRange(start,start);
		}
	})
	$(".video_input").on("keydown",function (event) {
		keycode = event.keyCode;
	})
}

/****动态添加输入框******/
function addInput(){
	$(".vjs-progress-holder").click(function(){
		var n = $("#vedioedit").children().length; //控制插入个数
		if(n>="6"){
			return;
		}
    	var whereYouAt =  _V_("showvideo").currentTime();
    	whereYouAt =  _V_("showvideo").currentTime().toFixed(1);

		var timed ="";
		$(".video_label").each(function () {
			var timeL = $(this).text();
			if(whereYouAt == timeL){
				return timed = whereYouAt;
			}
		});

    	if(whereYouAt-0.0<0 || timed){
	    	return;
    	}
		var ell = '<div class="video_div">'
					+'<label class="video_label">'+whereYouAt+'</label><span class="video_span">秒</span>'
					+"<input class='video_input' type='text'  value=''  maxlength='16'>"
					+'<div class="v_div"><button class="v_btn">编辑文字效果</button><span class="v_span">|</span>'
					+'<button  class="premove">删除</button></div></div>';

        $("#vedioedit").append(ell);
        $("button.premove").bind("click",btnremove);
		var rand = Math.floor(Math.random()*1000);
		var input = $("#vedioedit").children().last().find('input[class=video_input]');
		$(".v_btn").editor({
			id: "id"+rand,
			text:"",
			family:"微软雅黑",
			color:"ffffff",
			offset:0,
			fontSize:40,
			offsetH:0,
			opacity:1,
			textInput: input,
			time:whereYouAt,
			callback:saveDates
		});
		centArr[whereYouAt] = "";
		xianinput();
	});
}

/************预览*************/
function preVideo(){
	$("#reread").bind("click",function () {
		clearInterval(set);
		_V_("showvideo").currentTime(0);
		var times = $("#vedioedit").children().first().find("label[class=video_label]").text();
		if(times){
			var timeArr = new Array();
			$("#vedioedit>div").each(function () {
				var target = $(this);
				var time = target.children("label").eq(0).text();
				var text = target.children("input[type=text]").eq(0).val();
				timeArr.push(time);
				timeArr = timeArr.sort(function(a,b){
					return a-b;
				});
				var textCont = centArr[time].text;
				if(!centArr[time] || textCont==""){
					var obj = new Object();
					obj.animal = "bounceInUp";
					obj.bold = "";
					obj.style="";
					obj.underline="";
					obj.color = "ffffff";
					obj.contxt = "font-family: 微软雅黑; font-weight: normal; font-style: normal; text-decoration: none; color: rgb(255, 255, 255); text-shadow: rgb(240, 89, 89) 0px 0px 0px, rgb(240, 89, 89) 1px 0px 0px, rgba(0, 0, 0, 0) 2px 0px 1px, rgba(0, 0, 0, 0.498039) 2px 0px 1px; font-size: 40px;";
					obj.family = "微软雅黑";
					obj.fontSize = "40";
					obj.offset = "0";
					obj.offsetH = "0";
					obj.opacity = "1";
					obj.text = text;
					obj.time = time;
					centArr[time] = obj;
				}else {
					var obj = new Object();
					obj.animal = centArr[time].animal;
					obj.bold = centArr[time].bold;
					obj.style=centArr[time].style;
					obj.underline=centArr[time].underline;
					obj.color = centArr[time].color;
					obj.contxt = centArr[time].contxt;
					obj.family = centArr[time].family;
					obj.fontSize = centArr[time].fontSize;
					obj.offset = centArr[time].offset;
					obj.offsetH = centArr[time].offsetH;
					obj.opacity = centArr[time].opacity;
					obj.text = text;
					obj.time = time;
					centArr[time] = obj;
				}
			});
			_V_("showvideo").play();
			_V_("showvideo").addEvent("ended",function(){
				$("#effect").html("");
				clearInterval(set);
			});
			var n = $("#vedioedit").children().length; //控制插入个数
			set = setInterval(setinter,100,n,timeArr,centArr);
		}else {
			_V_("showvideo").play();
		}
	})
}

/************播放插入的文字************/
function setinter(n,timeArr,centArr) {
	var current = _V_("showvideo").currentTime().toFixed(1);
	for(var x=0;x<n;x++){
		if(current == timeArr[x] ){
			var cont = centArr[timeArr[x]];
			var p = "<p class='animated "+cont.animal+"' style='"+cont.contxt+"'>"+cont.text+"</p>";
			$("#effect").html(p);
			if($("#effect>p").html()){
				$("#effect>p").css("font-size",cont.fontSize*0.8+"px");
				var t = setInterval(function () {
					$("#effect>p").removeClass(cont.animal);
					var aclass = cont.animal+"MyOut";
					$("#effect>p").addClass(aclass);
					clearInterval(t);
				},2000);
			}
		}

	}

}

/*******删除视频内容******/
function btnremove(){
	var target = $(this);
	var key = $(this).parent().parent().find("label[class=video_label]").text();
	delete(centArr[key]);
	$(this).parent().parent().remove();
}
