upShakeV = new Vue({
	el:"#upShakeV",
	data:{
		radioType:0,
		text:"",
		spanText:"",
		spanImg:"",
		ywidth:0,
	},
	methods:{
		init:function(){
			if(this.radioType == "0"){
				var width = $(".span").width()+4;
				$(".yaocont").css("width",width);
				this.ywidth = width;
			}
			
		},
		change:function(){
			$(".yaocont").css("width","");
			$(".bai").html("");
			var text = this.text;
			$("#spanText").html(text);
			var width = $("#spanText").width()+4;
			console.log(width);
			$(".yaocont").css("width",width);
			this.ywidth = width;
		},
		click:function(){
			var radioType = this.radioType;
			var sequence = $("#sequence").val();
			var shakeUrl = $("#shakeUrl").val();
			var cover = $("#cover").val();
			var name = $("#coverName").val();

			//console.log(cover);return;
			var shakeCont;
			if(radioType == 0){
				shakeCont = $("#test").val();
			}else{
				shakeCont = $(".yaoimg").find("img").attr("src");
			}
			$.ajax({
	            type:'POST',
	            url: "/application/index/shakeWSave",
	            datatype:"JSON",
	            data:{"name":name,"cover":cover,"radioType":radioType,"sequence":sequence,"shakeCont":shakeCont,"shakeUrl":shakeUrl},
	            success: function(ret){
	                ret=JSON.parse(ret);
	                if(ret.result==0){
	                	var callback =function(){
	                		window.location = "/application/index/shake?sequence="+sequence;
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
		},
	}
});
//页面初始化
function shakeInit(){
	checkFile();
	radioClick();
	clickMove();
	dataSet();
	cancel();
	upShakeV.init();
}

function dataSet(){
	upShakeV.radioType = $("#shake_type").val();
	upShakeV.spanImg = $("#shake_img").val();
	upShakeV.text = $("#shake_text").val();
	$("#spanText").html($("#shake_text").val());
	checkFile();
}
function clickMove(){
	$("#preview").click(function(){
		if(upShakeV.radioType == "0"){
			var width = $("#spanText").width()+4;
			upShakeV.ywidth = width;
			var bai = $(".bai").html();
			if(bai== "100%" || bai== ""){
				move();
			}
		}else{
			var bai = $(".baiimg").html();
			if(bai== "100%" || bai== ""){
				moveimg();
			}
		}
	})
}
var i=0;
function add(i){
	$("#spanText").css("opacity",i/upShakeV.ywidth);
	var bai = Math.round(i*100 / upShakeV.ywidth);
	$(".bai").html(bai+"%");
}
function move(){
	
	if(i>upShakeV.ywidth){
		//$(".zhe").css("left","");
		return i=0;
	}
	if(i/upShakeV.ywidth<=1){
		setTimeout("move()",10)
		add(i);
	    i++;
		}
}

var j=0;
function addimg(j){
	$("#yaoimg").css("opacity",j/300);
	var bai = Math.round(j*100 / 300);
	$(".baiimg").html(bai+"%");
}
function moveimg(){
	
	if(j>300){
		
		return j=0;
	}
	if(j/300<=1){
		setTimeout("moveimg()",10)
		addimg(j);
	    j++;
		}
}

//单选框事件
function radioClick(){
	$(".upRadio").click(function(){
		var input = $(this).parent().find("input[type='radio']");
		if(input.is(':checked')==false){
    		upShakeV.radioType = input.val();
    		checkFile();
    	}
	});
}

//判断单选事件，判断是否可以输入和上传图片
function checkFile(){
	if(upShakeV.radioType == '0'){
		var obj = $(".uploadCont");
		var obi = $(".shFile");
		obj.removeClass("inputAtive");
		obj.addClass("inputAtive");
		obj.removeAttr("readonly");
		obi.removeClass("btnAtive");
		obi.removeAttr("onclick");
	}else if(upShakeV.radioType == '1'){
		var obj = $(".uploadCont");
		var obi = $(".shFile");
		obj.removeClass("inputAtive");
		obj.attr("readonly","readonly");
		obi.removeClass("btnAtive");
		obi.addClass("btnAtive");
		obi.attr("onclick","uploadFile()");
	}else{
		var obj = $(".uploadCont");
		var obi = $(".shFile");
		obj.removeClass("inputAtive");
		obj.attr("readonly","readonly");
		obi.removeClass("btnAtive");
		obi.removeAttr("onclick");
	}
}
//取消
function cancel(){
	$(".cancel").click(function(){
		var sequence = $("#sequence").val();
		window.location = "/application/index/shake?sequence="+sequence;
	})
}


var submitElement = document.getElementById('submit');//上传按钮
var fileFiled = document.getElementById('uploadFile');//input元素
//input change事件 
var onFileFieldChange = function(e){
	$('#upload-div').show();
	
	var fileList = [];
	for(var f in e.target.files) {
		if(e.target.files[f] instanceof File)					
			fileList.push(e.target.files[f]);
		}
		//必须传回file数组
	return fileList;
}
//上传进度回调
var progressFunc = function(percent,file) {
	//进度条
	//$(".bai").animate({"width": 100 * percent + "%"}, "fast");
	var bai = Math.round(percent*100);
	$(".uploadBai").text(bai+'%');
	console.log(percent+' : '+file);//进度：原文件名
}
// 单个文件上传完成的回调函数
var completeFunc = function(file_url,filename){
	console.log(file_url);//新url
	console.log(filename);//原文件名
	uploading(file_url);//回调
}
// 所有文件上传完成回调
var totalCompleteFunc = function(){
	$("#uploadFile").val("");
	stoploading();
}
//项目 : { project, module, feature, username }
var sequence = $("#sequence").val();
var project = $("#project").val();
var feature = $("#feature").val();
var module = $("#module").val();
var project = {
	project: project,
	module: module,
	feature: feature,
	username: sequence
};
	//出错处理
var exceptionFunc = function(e){
	console.log(e.message);
}
var options = {
	project: project,
	fileField: fileFiled,
	onFileFieldChange: onFileFieldChange,
	submitElement: submitElement,
	progressFunc: progressFunc,
	completeFunc: completeFunc,
	totalCompleteFunc: totalCompleteFunc,
	exceptionFunc: exceptionFunc,
	env:$("#env").val(),
};
var storage = new Storage(options);

function uploading(file_url){
	$(".img-logo").attr("src","");
	$(".img-logo").attr("src",file_url);
}

function stoploading(){
	$(".uploadZhe").hide();
	$(".uploadBai").html("0%");
}
//上传事件
function uploadFile(){
	$("#uploadFile").click();
}

//change直接触发上传
$('#uploadFile').on("change",function(){
	submitElement.removeAttribute('disabled')
	submitElement.click();
	$(".uploadZhe").show();
});

//loading加载动画
function loading(index){
        if(typeof(index)=='undefined'){
            index = 0;
        }
        var self = this;
        $('.myloading').eq(index%3).snabbt({
            scale: [1.5,1.5]
        }).snabbt({
            scale: [1,1],
            complete:function(){
                index = (index+1)%3;
                self.loading(index);
            },
        });
}