videoCont = new Vue({
	el:"#videoCont",
	data:{
		navType:0,
		video_src:"",
	},
	methods:{
    	init:function(){
    		this.bindEvent();
    		this.setRedis();
    		this.resetData();
    		this.saveData();
			// this.download();
			this.paymentEvent();
    	},
    	bindEvent:function(){
    		$(".vRadio").removeAttr("checked");
    		$(".videoWImg").hover(function(){
    			$(this).find("div[class='videoWZhe']").show();
    		},function(){
    			$(this).find("div[class='videoWZhe']").hide();
    		});
            $(".in_block>i").hover(function(){
                $(this).next("p").show();
            },function(){
                $(this).next("p").hide();
            });
    		
    		$(".viRadio").click(function(){
    			var input = $(this).parent().find("input[type='radio']");
    			if(input.is(':checked')==false){
    				$(".vRadio").removeAttr("checked");
    	    		input.prop('checked',true);
    	    	}
    		});

    		$(".vnavBtn").click(function(){
				var type = $(this).attr("value");
				$(".vnavBtn").removeClass("active");
				if(type == 0){
					videoCont.navType = 0;
					$(this).addClass("active");
				}else{
					videoCont.navType = 1;
					$(this).addClass("active");
				}
        	});

        	$(".wvideoy").click(function(){
				var videoUrl = $(this).parent().parent().next().find("input[type='radio']").val();
				var sequence = $("#sequence").val();
                var src = $(this).parent().parent().next().find("input[type='radio']").attr("pre_url");
                if(!src){
                    var src = videoUrl;
                }
				$.ajax({
                    type:'POST',
                    url: "/application/video/getVideoData",
                    datatype:"JSON",
                    data:{"videoUrl":videoUrl,"sequence":sequence},    
                    success: function(ret){
                    	ret=JSON.parse(ret);
                    	var content = ret.content;
                    	$("#videoSe").show();
                		getvDate(content,src);
                    },
                    error:function(e){
                    	var callback =function(){
                    		window.location.reload();
                    	}
                    	popupalert('网络错误','error',callback);
                    }     
            	});
				
            });
            $(".cancel").click(function(){
            	var sequence = $("#sequence").val();
        		window.location = "/application/index/index?sequence="+sequence;
            })

			$("#guan").click(function(){
				var sequence = $("#sequence").val();
				window.location = "/application/video/manage?sequence="+sequence;
			})
    	},
    	setRedis:function(){
        	$(".wclick").click(function(){
        		var sequence = $("#sequence").val();
        		var videoUrl = $(this).parent().parent().next().find("input[type='radio']").val();
				var video_id = $(this).parent().parent().next().find("input[type='radio']").attr("dic_id");
				if(!video_id){
					var video_id = "";
				}
				var videoName = $(this).parent().parent().next().find("span").html();
        		var cover = $(this).parent().parent().find("img").attr("src");
        		var patter = videoCont.navType;

        		$.ajax({
                    type:'POST',
                    url: "/application/video/setRedis",
                    datatype:"JSON",
                    data:{"videoUrl":videoUrl,"videoName":videoName,"cover":cover,"sequence":sequence,"patter":patter,"video_id":video_id},
                    success: function(ret){
                    	console.log(ret);
                    	ret=JSON.parse(ret);
                        if(ret.result == 0){
                        	window.location = "/application/video/videoedit?sequence="+sequence;
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

			var video_src = $("#video_src").val();
			var patter = $("#patter").val();
			videoCont.video_src = video_src;

			$(".vnavBtn").removeClass("active");
			if(patter == 1){
				$(".right").addClass("active");
			}else {
				$(".left").addClass("active");
			}
			videoCont.navType = patter;
        },
        saveData:function(){
            $("#vsave").click(function(){
	            	var sequence = $("#sequence").val();
	            	var checked = $(".videoRadio input[name='video']:checked");
	            	var videoUrl = checked.val();
                    var video_id = checked.attr("dic_id");

	            	var videoName = checked.parent().find("span").html();
	        		var cover = checked.parent().parent().find("img").attr("src");
	        		var patter = videoCont.navType;

	            	$.ajax({
	                    type:'POST',
	                    url: "/application/video/saveData",
	                    datatype:"JSON",
	                    data:{"videoUrl":videoUrl,"videoName":videoName,"cover":cover,"sequence":sequence,"patter":patter,"video_id":video_id},
	                    success: function(ret){
	                    	ret=JSON.parse(ret);
	                        if(ret.result == 0){
	                        	var callback =function(){
	    	                		window.location = "/application/index/index?sequence="+sequence;
	    	                	}
	    	                	popupalert('保存成功','message',callback);
	                        }else if(ret.result == 1){
	                        	var callback =function(){
	    	                		window.location = "/application/index/index?sequence="+sequence;
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
		addData:function (filename,file_url,video_cover,video_id) {
			var cont = '<div class="videoWList"><div class="videoWImg"><div class="videoSZhe">'
						+'<span class="ing">正在转码...</span></div>'
						+'<img name="cover" alt="" src="'+video_cover+'" width="150" height="150"></div>'
						+'<div class="videoRadio">'
						+'<input class="vRadio" type="radio" name="video" v-model="video_src" dic_id="'+video_id+'"  value="'+file_url+'">'
						+'<i class="iconfont viRadio novideo" after="&#xe67a" before="&#xe6a9"></i>'
						+'<span>'+filename+'</span>'
						+'</div></div>';
			$(".up_video").after(cont);
			var url = $("#storage").val();
			var timer = setInterval(function () {
				$.ajax({
					type:"get",
					url:url,
					async:true,
					data:{'file_url':file_url},
					success:function(ret){
						console.log(ret);
						var transcodeStatus = ret.transcodeStatus;
						var transcodedUrl = ret.transcodedUrl;
						var cover = ret.cover;
						if(transcodeStatus == "1" && transcodedUrl && cover){
							clearInterval(timer);
							videoCont.updateData(transcodeStatus,transcodedUrl,cover,video_id);
						}
					}
				});
			},2000)
		},
		updateData:function (transcodeStatus,transcodedUrl,cover,video_id) {
			var sequence = $("#sequence").val();
			$.ajax({
				type:"POST",
				url:"/application/video/updateVideo",
				data:{"sequence":sequence,"video_status":transcodeStatus,"transcodedUrl":transcodedUrl,"video_cover":cover,"video_id":video_id},
				success:function (ret) {
					console.log(ret);
					var obj = $(".videoRadio").find("input[dic_id='"+video_id+"']");
					obj.attr("value",transcodedUrl);
					obj.parent().prev().find("img").attr("src",cover);
					obj.parent().prev().find("div").removeClass("videoSZhe");
					obj.parent().prev().find("div").addClass("videoWZhe");
					var cont = '<div  class="in_block wvideoy">'
                             + '<i class="iconfont">&#xe6d9;</i>'
                             + '<p>预览</p>'
                             + '</div>'
                             + '<div  class="in_block wclick">'
                             + '<i class="iconfont">&#xe649;</i>'
                             + '<p>自定义</p>'
                             + '</div>';
					obj.parent().prev().find("div").html(cont);
					videoCont.bindEvent();
					videoCont.setRedis();
					$(".vRadio").removeAttr("checked");
					obj.prop('checked',true);
				},
				error:function () {
					
				}
			});
		},
		download:function () {
			$(".download").click(function () {
                // var file_url = $(this).attr("d_url");
                // var ispayment = $("#ispayment").val();
                // if(file_url){
                //     window.location.href = file_url;
                //     return;
                // }else {
                //     popupalert('该视频暂无资源。若急需，可咨询客服','notice',"");
                // }
                // if(ispayment == 0){
                //
				// }else {
                 //    $(".payZhe").show();
				// }
            })
        },
		paymentEvent:function () {
			$(".payCloseCont i").click(function () {
				$(".payZhe").hide();
            })
			$(".payBtn").click(function () {
				var www = $("#www").val();
				var url = www+"/hd/price/index";
				window.open(url);
            })
        }
	}
});