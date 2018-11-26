openBody = new Vue({
	el:"#openBody",
	data:{
		first:"",
		two:"",
		three:"",
	},
})

function index(){
	var that;
}
index.prototype = {
	init:function(){
		that = this;
		this.bindEvent();
		this.resetData();
		this.preview();
	},
	bindEvent:function(){
		$(".openCheckbox").removeAttr("checked");
		$(".openImg").hover(function(){
			$(this).find("div[class='sZhe']").show();
		},function(){
			$(this).find("div[class='sZhe']").hide();
		});
		$(".sZhe").find("i").hover(function () {
			$(this).next('p').show();
        },function () {
            $(this).next('p').hide();
        });
		
		$(".check").click(function(){
			var input = $(this).parent().find("input");
			var zhe = $(this).parent().next().find("div[class='bigZhe']");
			if(input.is(':checked')==true){
				input.prop('checked',false);
				$(zhe).show();
	    	}else{
	    		input.prop('checked',true);
	    		$(zhe).hide();
	    	}
		});
		
		$("#shakeUrl").click(function(){
			var sequence = $("#sequence").val();
			window.location = "/application/index/shake?sequence="+sequence;
		});
		
		$("#countdown").click(function(){
			var sequence = $("#sequence").val();
			window.location = "/application/countdown/index?sequence="+sequence;
		});
		
		$("#videoUpdate").click(function(){
			var sequence = $("#sequence").val();
			window.location = "/application/video/index?sequence="+sequence;
		});
				
		$("#save").click(function(){
			var shyao = $("#shyao:checked").val();
			var downCheck = $("#downCheck:checked").val();
			var openVideo = $("#openVideo:checked").val();
			var sequence = $("#sequence").val();
			if(!shyao && !downCheck && !openVideo){
				popupalert('您至少需要选择一个素材','notice',"");
				return;
			}
			$.ajax({
	            type:'POST',
	            url: "/application/index/sortSave",
	            datatype:"JSON",
	            data:{"shyao":shyao,"sequence":sequence,"downCheck":downCheck,"openVideo":openVideo},    
	            success: function(ret){
	                ret=JSON.parse(ret);
	                if(ret.result==0){
	                	//message("保存成功");
	                	var callback =function(){
	                		window.location.reload();
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
	},
	resetData:function(){
		openBody.first = $("#shyao").attr("dic");
		openBody.two = $("#downCheck").attr("dic");
		openBody.three = $("#openVideo").attr("dic");
	},
	preview:function(){
		$("#shakePre").click(function(){
			var shakeUrl = $("#loading_url").val();
			var shake_text = $("#shake_text").val();
			var shake_img = $("#shake_img").val();
			var shake_type = $("#shake_type").val();
            if(shakeUrl == 1){
				$("#shakeOne").show();
				shakeMove($("#music_url").val());
			}else if(shakeUrl == 2){
				shakeWOne.radioType = shake_type;
            	shakeWOne.spanImg = shake_img;
            	shakeWOne.spanText = shake_text;
				$("#spanText").html(shakeWOne.spanText);

            	$("#shakeWOne").show();
        		if(shakeWOne.radioType == "0"){
        			var width = $("#spanText").width();
        			$(".zhewno").css("width",width);
        			shakeWOne.ywidth = width;
        			var bai = $(".wbai").html();
        			if(bai== "100%" || bai== ""){
        				moveWno($("#music_url").val());
        			}
        		}else{
        			var bai = $(".baiimg").html();
        			if(bai== "100%" || bai== ""){
        				$(".zheimg").css("width","300px");
        				moveWnoimg($("#music_url").val());
        			}
        		}
			}else if(shakeUrl == 3){
            	shakeWTwo.radioTwoType = shake_type;
            	shakeWTwo.spanImg = shake_img;
            	shakeWTwo.spanTwoText = shake_text;
        		
            	$("#shakeWTwo").show();
        		if(shakeWTwo.radioTwoType == "0"){
        			var bai = $(".wTwobai").html();
        			if(bai== "100%" || bai== ""){
        				moveWnoTwo($("#music_url").val());
        			}
        		}else{
        			var bai = $(".baiimgTwo").html();
        			if(bai== "100%" || bai== ""){
        				$(".zheimg").css("width","300px");
        				moveWnoimgTwo($("#music_url").val());
        			}
        		}
			}else if(shakeUrl == 0){
				var custom_pattern = $("#custom_pattern").val();
                var music_url = $("#music_url").val();
                customShake.PrevView(custom_pattern,music_url);
			}
		});
		$("#downPre").click(function(){
			var downUrl = $("#downUrl").attr("pre_url");
			if(!downUrl){
                var downUrl = $("#downUrl").val();
			}
			playVideo(downUrl);

		});
		
		$("#videoPre").click(function(){
            var videoUrl = $("#vidUrl").attr("pre_url");
            if(!videoUrl){
                var videoUrl = $("#vidUrl").val();
			}
			var videoCont = $("#videoCont").val();
			$("#videoSe").show();
    		getvDate(videoCont,videoUrl);
		})
	}
}

$(function(){
	var obj = new index();
	obj.init();
})
