$(function () {
    uploadMusic.init();
})

var uploadMusic = {
    fileFiled:document.getElementById('musicFile'),//绑定上传的input的id
    submitElement:document.getElementById('uploadMusic'),//绑定提交id
    pubPercent:"",//记录上传错误时候百分比
    project:$("#project").val(), //上传项目名
    username:$("#sequence").val(),//以sequence来重新命名上传的文件
    feature:$("#feature").val(),//上传文件夹名称
    env: $("#env").val(),//上传环境
    module:$("#module").val(),//项目名
	//初始化方法
	init:function () {
		this.BindData();  //绑定数据
		this.onFileSubmit();  //确定上传
		this.CloseDiv(); //关闭弹框
    },
    //绑定数据
	BindData:function () {
        var project = {
            project:uploadMusic.project,
            module: uploadMusic.module,
            feature:uploadMusic.feature,
            username:uploadMusic.username ,
        };
        var options = {
            project: project,
            fileField: uploadMusic.fileFiled,
            onFileFieldChange: uploadMusic.onFileFieldChange,
            submitElement: uploadMusic.submitElement,
            progressFunc: uploadMusic.progressFunc,
            completeFunc: uploadMusic.completeFunc,
            totalCompleteFunc: uploadMusic.totalCompleteFunc,
            exceptionFunc: uploadMusic.exceptionFunc,
            env: uploadMusic.env,
        };
        var storage = new Storage(options);
    },
	//提交事件
	onFileSubmit:function () {
        $('#musicFile').on("change", function() {
            uploadMusic.submitElement.removeAttribute('disabled')
            uploadMusic.submitElement.click();
        });
    },
	//选择inupt改变时候事件
    onFileFieldChange:function (e) {
        var fileList = [];
        for(var f in e.target.files) {
            if(e.target.files[f] instanceof File) {
                var etype = e.target.files[f].type.toLowerCase().split('/');
                var msctype = etype[1];
                if(e.target.files[f].size > 10 * 1024 * 1024) {
                    popupalert('音乐文件大小超过限制！(10M)', 'notice', "");
                    uploadMusic.fileFiled.value = null;
                    return fileList;
                } else if(msctype != 'mp3') {
                    popupalert('音乐格式仅支持mp3!', 'notice', "");
                    uploadMusic.fileFiled.value = null;
                    return fileList;
                } else {
                    fileList.push(e.target.files[f]);
                }
                $('#upload-div').show();
            }
        }

        return fileList;
    },
	//上传错误事件
    exceptionFunc:function(e){
        $("#retrybtn").css({"border":"solid red 1px","background-color":"#FF4343","color":"#fff"});
        $("#retrybtn").show().removeAttr('disabled');
        var parcent = $("#upprecent").text();

        $("#upprecent").css('color','#989898').text(parcent);
        $(".uploadprecess").css({'border-color':'#989898'});
        $(".uploadprecess-bar").css({'background-color':'#989898'});
        $('#retrybtn').on('click',function(){
            uploadMusic.submitElement.removeAttribute('disabled');
            uploadMusic.submitElement.click();
            $(".uploadprecess").css({'border-color':'#FF4343'});
            $(".uploadprecess-bar").css({'background-color':'#FF4343'});
            $('#retrybtn').attr("disabled","disabled").hide();
            $("#upprecent").text(Math.floor(uploadMusic.pubPercent*100)+'%').css('color','#333333');
        });
	},
	//上传过程中的进度条
    progressFunc:function (percent) {
        uploadMusic.pubPercent = percent;
        $(".uploadprecess-bar").animate({"width": 100 * percent + "%"}, "fast");
        $("#upprecent").text(Math.floor(percent*100)+'%');
    },
	//单个文件上传完成
    completeFunc:function (file_url,filename) {
		//上传完成处理数据
        if($("#music_url").val()){
            var html ='<input  type="radio" name="shakeMusic" value="'+$("#music_id").val()+'">'
                + '<i class="iconfont msRadio" after="&#xe67a" before="&#xe6a9"></i>'
                + '<span>'+filename+'</span>'
                + '<i class="iconfont audioPlay up">&#xe600;</i>'
                + '<audio id="" class="musicAudio" src="'+file_url+'"></audio>';
            $(".width130").html(html);
        } else {
            var html = '<div class="musicRadio width130">'
                + '<input  type="radio" name="shakeMusic" value="4">'
                + '<i class="iconfont msRadio" after="&#xe67a" before="&#xe6a9"></i>'
                + '<span>'+filename+'</span>'
                + '<i class="iconfont audioPlay up">&#xe600;</i>'
                + '<audio id="" class="musicAudio" src="'+file_url+'"></audio>'
                + '</div>';
            $("#music_url").val(file_url);
            $("#music_id").val(4);
            $("#lastMusic").after(html);
            $("#uploadMusic").addClass("blank");
            var changHtml = '<span>更换音乐</span><p class="music_bubble" style="display: none;">仅支持mp3格式，大小不超过10M</p>';
            $("#uploadMusic").html(changHtml);
        }
        $('#upload-div').hide();
        popupalert('上传成功！','message',"");
        uploadMusic.CompleteUpload();
    },
    //对事件进行重新绑定
    CompleteUpload:function () {
        $(".uploadprecess-bar").animate({"width": "0%"}, "fast");
        $("#upprecent").text("0%");
        uploadMusic.fileFiled.value = null;
        $(".audioPlay").unbind("click");
        $(".msRadio").unbind("click");
        $(".msRadio").removeAttr("checked");
        $(".width130").find("input[name='shakeMusic']").prop('checked',true);
        $("#uploadMusic").removeAttr("disabled");
        shakeEvent.init();
    },
	//所有文件上传完毕
    totalCompleteFunc:function () {
       // console.log('所有文件上传完毕');
    },
	//关闭展示弹框
	CloseDiv:function () {
        $('#upload-div .iconfont2,#cancelbtn').click(function(){
            var callback = function(){
                $('#upload-div').hide();
                window.location.reload();
            }
            popupalert("是否确定退出上传？","alert",callback);
        });
    }
}