countdown = new Vue({
	el:"#countdown",
	data:{
		downType:"",
		downUrl:"",
        navType:"0",
	},
	methods:{
		init:function(){
			this.NavEvent();
			this.ClickEvent();
		},
		ClickEvent:function () {
            $(".shakeBtn").click(function(){
                var src = $(this).parent().parent().next().find("input[name='shake']").attr("pre_url");
                if(!src){
                    var src = $(this).parent().parent().next().find("input[name='shake']").val();
                }
                playVideo(src);
            });
            $(".shRadio").click(function(){
                var input = $(this).parent().find("input");
                if(input.is(':checked')==false){
                    $(".shRadio").removeAttr("checked");
                    input.prop('checked',true);
                }
            });
            $(".cancel").click(function(){
                var sequence = $("#sequence").val();
                window.location = "/application/index/index?sequence="+sequence;
            });

            $("#guan").click(function(){
                var sequence = $("#sequence").val();
                window.location = "/application/countdown/manage?sequence="+sequence;
            });

            $(".shakeImg").hover(function(){
                $(this).find("div[class='shakeZhe']").show();
            },function(){
                $(this).find("div[class='shakeZhe']").hide();
            });
            $(".shakeBtn>i").hover(function(){
                $(this).next("p").show();
            },function(){
                $(this).next("p").hide();
            });

            $(".shakeWImg").hover(function(){
                $(this).find("div[class='shakeWZhe']").show();
            },function(){
                $(this).find("div[class='shakeWZhe']").hide();
            });
        },
		click:function(){
			var downType = this.downType;
			var navType = this.navType;
			var sequence = $("#sequence").val();
			if(downType ==0 && navType == 0){
				var checked = $(".Radio5 input[name='shake']:checked");
				var downUrl = checked.val();
                var down_id = checked.attr("dic_id");
				if(downUrl){
					var downName = checked.parent().find("span").html();
					var downImg = checked.parent().parent().children().find("img[name='cover']").attr("src");
				}else{
					var callback;
					popupalert('请选择相对的倒计时','notice',callback);
					return;
				}
			}else if(downType ==1 && navType == 0){
				var checked = $(".Radio10 input[name='shake']:checked");
				var downUrl = checked.val();
                var down_id = checked.attr("dic_id");

				if(downUrl){
					var downName = checked.parent().find("span").html();
					var downImg = checked.parent().parent().children().find("img[name='cover']").attr("src");
				}else{
					var callback;
					popupalert('请选择相对的倒计时','notice',callback);
					return;
				}
			}else {
                var checked = $(".shakeRadio input[name='shake']:checked");
                var downUrl = checked.val();
                var downName = checked.parent().find("span").html();
                var downImg = checked.parent().parent().children().find("img[name='cover']").attr("src");
                var down_id = checked.attr("dic_id");
            }

			$.ajax({
	            type:'POST',
	            url: "/application/countdown/downSave",
	            datatype:"JSON",
	            data:{"downType":downType,"sequence":sequence,"downUrl":downUrl,"downName":downName,"downImg":downImg,"navType":navType,"down_id":down_id,},
	            success: function(ret){
	                ret=JSON.parse(ret);
	                if(ret.result==0){
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
		},
		resetData:function(){
			countdown.downType = $("#downType").val();
			countdown.downUrl = $("#downUrl").val();
			var down_nav = $("#down_nav").val();
            $(".vnavBtn").removeClass("active");
            if(down_nav == 1){
                $(".right").addClass("active");
            }else {
                $(".left").addClass("active");
            }
			countdown.navType = down_nav;
		},
		NavEvent:function () {
            $(".vnavBtn").click(function(){
                var type = $(this).attr("value");
                $(".vnavBtn").removeClass("active");
                if(type == 0){
                    countdown.navType = 0;
                    $(this).addClass("active");
                }else{
                    countdown.navType = 1;
                    $(this).addClass("active");
                }
            });
        },
        addData:function (filename,file_url,video_cover,video_id) {
            var cont = '<div class="shakeList" ><div class="shakeImg"><div class="shakeSZhe">'
                	 + '<span class="ing">正在转码...</span></div>'
                +'<img name="cover" alt="" src="'+video_cover+'" width="150" height="150"></div>'
                +'<div class="shakeRadio">'
				+ '<input class="shRadio" type="radio" name="shake" v-model="downUrl" dic_id="'+video_id+'"  value="'+file_url+'">'
                +'<i class="iconfont shRadio noRadio" after="&#xe67a" before="&#xe6a9"></i>'
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
                            countdown.updateData(transcodeStatus,transcodedUrl,cover,video_id);
                        }
                    }
                });
            },2000)
        },
        updateData:function (transcodeStatus,transcodedUrl,cover,video_id) {
            var sequence = $("#sequence").val();
            $.ajax({
                type: "POST",
                url: "/application/video/updateVideo",
                data: {
                    "sequence": sequence,
                    "video_status": transcodeStatus,
                    "transcodedUrl": transcodedUrl,
                    "video_cover": cover,
                    "video_id": video_id
                },
                success: function (ret) {
                    var obj = $(".shakeRadio").find("input[dic_id='" + video_id + "']");
                    obj.attr("value", transcodedUrl);
                    obj.parent().prev().find("img").attr("src", cover);
                    obj.parent().prev().find("div").removeClass("shakeSZhe");
                    obj.parent().prev().find("div").addClass("shakeZhe");
                    var cont = '<div class="shakeBtn"><i class="iconfont">&#xe6d9;</i><p>预览</p></div>';
                    obj.parent().prev().find("div").html(cont);
                    countdown.ClickEvent();
                    $(".shRadio").removeAttr("checked");
                    obj.prop('checked', true);
                },
                error: function () {

                }
            });
        },
        LoadingEvent:function () {
            var url = $("#storage").val();
            $(".customDown>div[v_status='0']").each(function () {
                var target = $(this);
                var video_id = target.find("div[class='shakeRadio']").find("input[class='shRadio']").attr("dic_id");
                var inputv = target.find("div[class='shakeRadio']").find("input[class='shRadio']").val();
                target.find("div[class='videoRadio']").find("i").unbind("click");
                var timer = setInterval(function () {
                    $.ajax({
                        type:"get",
                        url:url,
                        async:true,
                        data:{'file_url':inputv},
                        success:function(ret){
                            var transcodeStatus = ret.transcodeStatus;
                            var transcodedUrl = ret.transcodedUrl;
                            var cover = ret.cover;
                            if(transcodeStatus == "1" && transcodedUrl && cover){
                                clearInterval(timer);
                                countdown.updateData(transcodeStatus,transcodedUrl,cover,video_id);
                            }
                        }
                    });
                },2000)
            })
        }
	}
})
$().ready(function(){
	countdown.init();
	countdown.resetData();
	countdown.LoadingEvent();
})