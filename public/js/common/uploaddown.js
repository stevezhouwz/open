$(function () {
    uploadDwon.init();
})

var uploadDwon = {
    fileFiled:document.getElementById('files'),//绑定上传的input的id
    submitElement:document.getElementById('uploadbtn'),//绑定提交id
    pubPercent:"",//记录上传错误时候百分比
    project:$("#project").val(), //上传项目名
    username:$("#sequence").val(),//以sequence来重新命名上传的文件
    feature:$("#feature").val(),//上传文件夹名称
    env: $("#env").val(),//上传环境
    module:$("#module").val(),//项目名
    storage:"",
	//初始化方法
	init:function () {
		this.BindData();  //绑定数据
		this.onFileSubmit();  //确定上传
		this.CloseDiv(); //关闭弹框
    },
    //绑定数据
	BindData:function () {
        var project = {
            project:uploadDwon.project,
            module: uploadDwon.module,
            feature: uploadDwon.feature,
            username:uploadDwon.username ,
        };
        var options = {
            project: project,
            fileField: uploadDwon.fileFiled,
            onFileFieldChange: uploadDwon.onFileFieldChange,
            submitElement: uploadDwon.submitElement,
            progressFunc: uploadDwon.progressFunc,
            completeFunc: uploadDwon.completeFunc,
            totalCompleteFunc: uploadDwon.totalCompleteFunc,
            exceptionFunc: uploadDwon.exceptionFunc,
            env: uploadDwon.env,
        };
        var storage = new Storage(options);
        uploadDwon.storage = storage;
    },
	//提交事件
	onFileSubmit:function () {
        $('#files').on("change", function() {
            uploadDwon.submitElement.removeAttribute('disabled')
            uploadDwon.submitElement.click();
        });
    },
	//选择inupt改变时候事件
    onFileFieldChange:function (e) {
        var fileList = [];
        for(var f in e.target.files) {
            if(e.target.files[f] instanceof File){
                var etype = e.target.files[f].type.toLowerCase().split('/');
                //console.log(e.target.files[f]);
                if(e.target.files[f].size > 1024 * 1024 * 1024){
                    popupalert('视频文件大小超过限制(1G)','notice',"");
                    uploadDwon.fileFiled.value = null;
                    return fileList;
                }else if(e.target.files[f].type == '' || e.target.files[f].type == null){
                    fileList.push(e.target.files[f]);
                    uploadDwon.storage.setType(f,'video/mkv');
                    uploadDwon.storage.setType(f,'video/rmvb');
                    console.log(e.target.files[f],"----");
                    console.log("type----->",e.target.files[f].type);
                }else if(etype[0] != 'video' && etype[0] != 'application'){
                    popupalert('视频信息错误!','notice',"");
                    uploadDwon.fileFiled.value = null;
                    return fileList;
                }else{
                    fileList.push(e.target.files[f]);
                }
            }
            $('#upload-div').show();
            return fileList;
        }
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
            uploadDwon.submitElement.removeAttribute('disabled');
            uploadDwon.submitElement.click();
            $(".uploadprecess").css({'border-color':'#FF4343'});
            $(".uploadprecess-bar").css({'background-color':'#FF4343'});
            $('#retrybtn').attr("disabled","disabled").hide();
            $("#upprecent").text(Math.floor(uploadDwon.pubPercent*100)+'%').css('color','#333333');
        });
	},
	//上传过程中的进度条
    progressFunc:function (percent) {
        uploadDwon.pubPercent = percent;
        $(".uploadprecess-bar").animate({"width": 100 * percent + "%"}, "fast");
        $("#upprecent").text(Math.floor(percent*100)+'%');
    },
	//单个文件上传完成
    completeFunc:function (file_url,filename) {
		//上传完成处理数据
        $.ajax({
            type:"post",
            url:"/application/countdown/uploadSave",
            async:true,
            data:{'video_src':file_url,'video_name':filename,'sequence':$('#sequence').val()},
            success:function(ret){
                ret = JSON.parse(ret);
                if(ret.result == '0'){
                    var video_id = ret.video_id;
                    $('#upload-div').hide();
                    popupalert('上传成功！','message',"");
                    var video_cover = "/img/down/default.jpg";
                    countdown.addData(filename,file_url,video_cover,video_id);
                    $(".uploadprecess-bar").css("width","0px");
                    $("#upprecent").text("0%");
                    uploadDwon.fileFiled.value = null;
                }
            }
        });
    },
    //对事件进行重新绑定
    CompleteUpload:function () {

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