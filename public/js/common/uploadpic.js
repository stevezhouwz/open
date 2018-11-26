
var uploadPic = {
    fileFiled:document.getElementById('uploadPicFile'),//绑定上传的input的id
    submitElement:document.getElementById('submint'),//绑定提交id
    pubPercent:"",//记录上传错误时候百分比
    project:$("#project").val(), //上传项目名
    username:$("#sequence").val(),//以sequence来重新命名上传的文件
    feature:$("#feature").val(),//上传文件夹名称
    env: $("#env").val(),//上传环境
    module:$("#module").val(),//项目名
    uploadType:"",
	//初始化方法
	init:function (i) {
		this.BindData();  //绑定数据
		this.CloseDiv(); //关闭弹框
        this.submintEvent();
        uploadPic.uploadType = i;
    },
    //绑定数据
	BindData:function () {
        var project = {
            project:uploadPic.project,
            module: uploadPic.module,
            feature: uploadPic.feature,
            username:uploadPic.username ,
        };
        var options = {
            project: project,
            fileField: uploadPic.fileFiled,
            onFileFieldChange: uploadPic.onFileFieldChange,
            submitElement: uploadPic.submitElement,
            progressFunc: uploadPic.progressFunc,
            completeFunc: uploadPic.completeFunc,
            totalCompleteFunc: uploadPic.totalCompleteFunc,
            exceptionFunc: uploadPic.exceptionFunc,
            env: uploadPic.env,
        };

        var storage = new Storage(options);
    },
	//选择inupt改变时候事件
    onFileFieldChange:function (e) {
        var fileList = [];
        var filetype = ["jpg", "jpeg", "png"];
        for(var f in e.target.files) {
            if(e.target.files[f] instanceof File){
                var file = e.target.files[f];
                if (window.createObjectURL != undefined) {
                    url = window.createObjectURL(file)
                } else if (window.URL != undefined) {
                    url = window.URL.createObjectURL(file)
                } else if (window.webkitURL != undefined) {
                    url = window.webkitURL.createObjectURL(file)
                }
                if(e.target.files[f].type) {
                    var etype = e.target.files[f].type.toLowerCase().split('/');
                    var imgtype = etype[1];
                    if(e.target.files[f] instanceof File){
                        var imgSize = '<div class="uploadImgSrcCont">'
                            + '<div class="uploadImgZhe">图片大小超过限制</div>'
                            + '<img src="'+url+'" width="100%" height="100%">'
                            + '</div>';
                        var button = '<button type="button" id="reChocie" class="submintBtn">重新选择</button>';
                        if(filetype.indexOf(imgtype) == -1) {
                            popupalert('图片格式不对！','notice',"");
                            uploadPic.fileFiled.value = null;

                        }else if( e.target.files[f].size > 10 * 1024 * 1024){
                            $("#submint").hide();
                            $("#submint").before(button);
                            $("#reChocie").show();
                            $(".ImgContent").html(imgSize);
                            uploadPic.fileFiled.value = null;
                            uploadPic.CompleteUpload();
                        }else {
                            var htmlImg = '<div class="uploadImgSrcCont">'
                                + '<img src="'+url+'" width="100%" height="100%">'
                                + '</div>';
                            $(".ImgContent").html(htmlImg);
                            $("#reChocie").hide();
                            $("#submint").show();
                            fileList.push(e.target.files[f]);

                        }
                    }
                }
            }
        }
        return fileList;
    },
	//上传错误事件
    exceptionFunc:function(e){

	},
    submintEvent:function () {
        $("#submint").click(function () {
            uploadPic.Loading();
        })
    },
	//上传过程中的进度条
    progressFunc:function (percent) {
        $(".loadingCont>p").text(Math.floor(percent*100)+'%');
    },
	//单个文件上传完成
    completeFunc:function (file_url,filename) {
		//上传完成处理数据

        if(uploadPic.uploadType == 1){
            $(".customLeft").css("background-image","url("+file_url+")");
        } else {
            $(".imgSrc").attr("src",file_url);
        }
        $(".loadingCont>p").text("0%");
        $('.uploadZhe').hide();
        $(".loadingCont").hide();
        $(".submintBtn").hide();
        uploadPic.stopLoading();
        var upload = '  <div class="uploadC" id="uploadPic">'
                   + '<i class="iconfont">&#xe658;</i>'
                   + '<p>上传图片</p>'
                   + '</div>';
        $(".ImgContent").html(upload);
        customCont.UploadImg();
        uploadPic.fileFiled.value = null;
        popupalert('上传成功！','message',"");
    },
    //对事件进行重新绑定
    CompleteUpload:function () {
        $("#reChocie").bind("click",function () {
            $("#uploadPicFile").click();
        })
    },
	//所有文件上传完毕
    totalCompleteFunc:function () {
       // console.log('所有文件上传完毕');
    },
	//关闭展示弹框
	CloseDiv:function () {
        $('.iconClose').click(function(){
            var callback = function(){
                $('.uploadZhe').hide();
                window.location.reload();
            }
            popupalert("是否确定退出上传？","alert",callback);
        });
    },
    Loading:function (index) {
        $(".loadingCont").show();
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
                self.Loading(index);
            },
        });
    },
    stopLoading:function(){
        $('.myloading').snabbt('stop');
    },

}

$(function () {

});