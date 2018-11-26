/**
 * author:liubingbing
   description:上传视频的插件封装;需同时载入文件<script src="http://storage.f5fz.cn:12080/public/javascripts/storage.min.js"></script>
   created:2016,09.7
   update:
 */
;(function($){
	$.fn.uploadvideo = function(options){
		var defaults = {
	            event:'change',//触发类型
	            fileFiled:document.getElementById('files'),//input文件按钮
	            submitElement:document.getElementById('uploadbtn'),//上传按钮
	           // 项目 : { project, module, feature, username },如有修改，必须更换
	            project : {
					project: $("#project").val(),
					module: $("#module").val(),
					feature: $("#feature").val(),
					username: $("#sequence").val(),
	            }
		};

		options = $.extend({},defaults,options);

		this.each(function(){
			var that = $(this);
			//var str = ' ';
			//$('body').find('#upload-div').html(str);

			//点击上传的"关闭"按钮
			$('#upload-div .iconfont2,#cancelbtn').click(function(){
			    var callback = function(){
			            $('#upload-div').hide();
			            window.location.reload();
			        }
				//msgBox.showMsgbox('#note','是否确定退出上传？','',callback);
				popupalert("是否确定退出上传？","alert",callback);
			});

			var onFileFieldChange = function(e){
				var fileList = [];
				for(var f in e.target.files) {
					if(e.target.files[f] instanceof File){
						var etype = e.target.files[f].type.toLowerCase().split('/');
						//console.log(e.target.files[f]);
						if(e.target.files[f].size > 1024 * 1024 * 1024){
							popupalert('视频文件大小超过限制(1G)','message',"");
							options.fileFiled.value = null;
							return fileList;
						}else if(e.target.files[f].type == '' || e.target.files[f].type == null){
							fileList.push(e.target.files[f]);
							storage.setType(f,'video/mkv');
							storage.setType(f,'video/rmvb');
							console.log(e.target.files[f],"----");
							console.log("type----->",e.target.files[f].type);
						}else if(etype[0] != 'video' && etype[0] != 'application'){
							popupalert('视频信息错误!','notice',"");
							options.fileFiled.value = null;
							return fileList;
						}else{
							fileList.push(e.target.files[f]);
						}
					}
					$('#upload-div').show();
					return fileList;
				}
			};

		 //上传进度回调
	       var pubPercent = null;
	       var progressFunc = function(percent,file) {
	    	   pubPercent = percent;
	           //进度条
	            $(".uploadprecess-bar").animate({"width": 100 * percent + "%"}, "fast");
	            $("#upprecent").text(Math.floor(percent*100)+'%');
	        }

	    // 单个文件上传完成的回调函数
	       var completeFunc = function(file_url,filename){
	            console.log(file_url);//新url
	            console.log(filename);//原文件名
	            //向后台发送数据
	             $.ajax({
	                 type:"post",
	                 url:"/application/video/uploadSave",
	                 async:true,
	                 data:{'src':file_url,'video_name':filename,'sequence':$('#sequence').val()},
	                 success:function(ret){
	                     ret = JSON.parse(ret);
	                     if(ret.result == '0'){
	                     	var video_id = ret.video_id;
	                         $('#upload-div').hide();
	                         popupalert('上传成功！','message',"");
							 video_cover = "/img/down/default.jpg";
							 videoCont.addData(filename,file_url,video_cover,video_id);
							 $(".uploadprecess-bar").css("width","0px");
							 $("#upprecent").text("0%");
							 options.fileFiled.value = null;
	                     }
	                 }
	             });
	        };

	     // 所有文件上传完成回调
	        var totalCompleteFunc = function(){
	            console.log('所有文件上传完毕');
	        }

	      //出错处理
	        var exceptionFunc = function(e){
	            $("#retrybtn").css({"border":"solid red 1px","background-color":"#FF4343","color":"#fff"});
	            $("#retrybtn").show().removeAttr('disabled');
	            var parcent=$("#upprecent").text();
	           // $("#upprecent").text("上传失败！");
	            $("#upprecent").css('color','#989898').text(parcent);
	            $(".uploadprecess").css({'border-color':'#989898'});
	            $(".uploadprecess-bar").css({'background-color':'#989898'});
	            $('#retrybtn').on('click',function(){
	                options.submitElement.removeAttribute('disabled');
	                options.submitElement.click();
	                $(".uploadprecess").css({'border-color':'#FF4343'});
	                $(".uploadprecess-bar").css({'background-color':'#FF4343'});
	                $('#retrybtn').attr("disabled","disabled").hide();
	                $("#upprecent").text(Math.floor(pubPercent*100)+'%').css('color','#333333');
	            });
	             console.error(e);
	         }

	        var opt = {
	                project: options.project,
	                fileField: options.fileFiled,
	                onFileFieldChange: onFileFieldChange,
	                submitElement: options.submitElement,
	                progressFunc: progressFunc,
	                completeFunc: completeFunc,
	                totalCompleteFunc: totalCompleteFunc,
	                exceptionFunc: exceptionFunc,
					env: $("#env").val(),

				//  env: 'pro'
				//  env: 'test'
	            };
	        var storage = new Storage(opt);
	        //change直接触发上传
	        that.on(options.event,function(){
	        	 options.submitElement.removeAttribute('disabled');
	        	 options.submitElement.click();
	        });

		});

		return this;
	};
})(jQuery);