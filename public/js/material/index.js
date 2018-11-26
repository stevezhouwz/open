/**
 * Created by Musicbear on 2017/3/21.
 */

var storageUrl = $('#storageJs').val();

var originVideoUploader;
var preUploader;
var materialUploader;

var project = {
    project: $('#project').val(),
    module: $('#module').val(),
    feature: $('#feature').val(),
    username: 'authority',
};

function StorageFactory () {
    var fileFiled = document.getElementById('videoFile');
    var submitElement = document.getElementById('realUpVideo');

    var hasFile = false;
    var updateDom = '';
    var innerStorage = '';
    var loader = '';
    var self = this;

    // 必须返回一个File类型的数组
    var fileList = [];

    var onFileFieldChange = function(e){
        fileList = [];
        loader.cleanDom();
        for(var f in e.target.files) {
            if(e.target.files[f] instanceof File) {
                if(!self.fileCheck(e.target.files[f],f)){
                    //验证失败
                    // console.log('验证不通过');
                    return fileList;
                }
                fileList.push(e.target.files[f]);
                var name = e.target.files[f].name;
                loader.addDom(name);
            }
        }
        if(fileList.length){
            hasFile = true;
        }else{
            hasFile = false;
        }
        return fileList;
    };

    // 浏览器自动处理上传进度
    // 参数1：上传进度
    var progressFunc = function ( percent ){
        // console.log(percent);
        loader.processUpdate(updateDom,percent);
    };

    // 单个文件上传完成的回调函数
    // 参数1：完成上传后得到的文件的url
    var completeFunc = function(file_url){
        // console.log(file_url);
        loader.uploadStop(updateDom,file_url);

    };

    // 所有文件上传回调
    var totalCompleteFunc =function(){
        // console.log('所有文件上传完毕');
    };

    // 自定义异常处理
    var exceptionFunc = function(e){
        console.error(e);
    };

    var options = {
        project: project,
        fileField: fileFiled,
        onFileFieldChange: onFileFieldChange,
        submitElement: submitElement,
        progressFunc: progressFunc,
        completeFunc: completeFunc,
        totalCompleteFunc: totalCompleteFunc,
        exceptionFunc: exceptionFunc,
        env:$('#env').val()
    };

    this.fileCheck = function(file,key){
        var ext = file.name.substr(file.name.lastIndexOf(".")).toLowerCase();//获得文件后缀名
        // console.log(ext);
        var size = file.size;
        // console.log(size);
        if(file.type == '' || file.type == null){
            innerStorage.setType(key,'video/mkv');
            innerStorage.setType(key,'video/rmvb');
            // console.log('设置类型');
        }
        return true;
    };

    this.getFileList = function(){
        return fileList;
    };

    this.getStorage = function(){
        return innerStorage;
    };

    this.setUpdateDom = function(dom){
        updateDom = dom;
    };

    this.reset = function(){
        hasFile = false;
        fileList = [];
    };

    this.hasFile = function(){
        return hasFile;
    }

    this.init = function(configObject){
        fileFiled = configObject.fileFiled;
        submitElement = configObject.submitElement;
        options.fileField = fileFiled;
        options.submitElement = submitElement;
        loader = configObject.loader;
        innerStorage = new Storage(options);
    }

    return this;

}

var nav = {
    index:0,
    mode:[
        {
            name:'5s倒计时',
            url:'',
            tab:0,
            tag:5, //标志视频类型
            data:[],
        },
        {
            name:'10s倒计时',
            url:'',
            tab:1,
            tag:10,
            data:[],
        },
        {
            name:'开场视频',
            url:'',
            tab:2,
            tag:1,
            data:[],
        }
    ],
    navTo:function(index){
        if(index != nav.index) {
            nav.index = index;
            nav.createTitle(index);
            nav.pageTo(index);
        }
    },
    reload:function(){
        index = nav.index;
        nav.createTitle(index);
        nav.pageTo(index);
    },
    createTitle:function(index){
        var main = $('#Location');
        main.empty();
        main.append(nav.createHTMLELE('p','mtlText mtlShade','开幕式'));
        main.append(nav.createHTMLELE('span','mtlNext','&gt;'));
        main.append(nav.createHTMLELE('p','mtlText mtlShade','资源管理'));
        main.append(nav.createHTMLELE('span','mtlNext','&gt;'));
        main.append(nav.createHTMLELE('p','mtlText',nav.mode[index].name));
    },
    pageTo:function(index){
        nav.tabChange(index);
        nav.loadVideo(index);
        $('.mvEach').remove();
    },
    createHTMLELE:function(type,classname,html){
        if(type == 'img' || type== 'input'){
            var obj = $('<' + type + '/>');
        }else {
            var obj = $('<' + type + '></' + type + '>');
        }
        if(typeof(classname)!='undefined'){
            obj.addClass(classname);
        }
        if(typeof(html)!='undefined'){
            obj.html(html);
        }
        return obj;
    },
    htmlEleInstall:function(htmlObj){
//			var html = $('<div></div>');
//			var child1 = $('<div></div>');
//			var child2 = $('<p></p>');
//			var child3 = $('<img>');
//			var child4 = $('<div></div>');
//			var child5 = $('<div></div>');
//			child5.addClass('child5');
//			var html = {
//				dom:html,
//				children:[
//					{
//						dom:child1,
//						children:[
//							child2,child3,child4
//						]
//					},
//					{
//						dom:child5,
//					}
//				]
//			}
        var isJQueryDom = function(dom){
            if(dom instanceof jQuery){
                return true;
            }
            return false;
        }

        var isLegal = function(html){
            if(typeof(html)=='object'){
                if(isJQueryDom(html.dom)){
                    return true;
                }
            }else{
                if(isJQueryDom(html)){
                    return true;
                }
            }
            return false;
        }

        var domSplit = function(html){
            if(isJQueryDom(html)){
//					console.log(html);
                return html;
            }
            var parent = html.dom;
            if(html.children instanceof Array && html.children.length != 0 ){
                for(var i=0;i<html.children.length;i++){
                    var eachChild = html.children[i];
                    var eachChild = domSplit(eachChild);
                    parent.append(eachChild);
                }
            }
//				console.log(parent);
            return parent;
        }

        htmlObj = domSplit(htmlObj);
//			console.log(html);

    },
    findIndex:function(tab){
        var mode = nav.getMode(tab);
        if(mode.tab == tab){
            return tab;
        }else{
            var found = 0;
            for(var i=0;i<nav.mode.length;i++){
                if(tab == nav.mode[i].tab){
                    found = nav.mode[i].index;
                }
            }
            return found;
        }
    },
    tabChange:function(index){
        $('.mtTab').removeClass('active');
        $('.mtTab').eq(index).addClass('active');
    },
    loadVideo:function(index){
        var url = '/application/material/loadvideo';
        var mode = nav.getMode(index);
        mode.data = [];
        var tag = mode.tag;
        var success = function(ret){
            if(ret.result == 0){
                var videos = ret.videos;
                nav.loadComplete(videos,index);
            }else{
                console.log(ret.message);
            }
        }
        var error = function(XMLHttpRequest, message, errorThrown){
            console.log(message);
        }
        $.ajax({
            url:url,
            type:'POST',
            dataType:'JSON',
            data:{mode:tag},
            success:success,
            error:error
        });
    },
    loadComplete:function(videos,index){
        var mode = nav.getMode(index);
        for(var i=0;i<videos.length;i++){
            var eachVideoSql = videos[i];
            var dom = nav.SqlDataToVideoDom(eachVideoSql,i);
            var dataModel = nav.SqlDataToModel(eachVideoSql);
            $('#videos').append(dom);
            mode.data.push(dataModel);
        }
        nav.hoverBind();
    },
    SqlDataToVideoDom:function(eachSQL,i){
        var frame = nav.createHTMLELE('div','mvPart mvEach');
        var Img = nav.createHTMLELE('img','mvVideo');
        var src = eachSQL.video_cover;
        Img.attr('src',src);
        var hint = nav.createHTMLELE('div','mvHints');
        var text = nav.createHTMLELE('p','',eachSQL.video_name);
        hint.append(text);

        var signals = nav.createHTMLELE('div','mvSignals');
        signals = this.addSignal(signals,eachSQL);

        var cover = nav.createHTMLELE('div','mvCover');
        cover = nav.addCoverCtr(cover,i);
        frame.append(Img);
        frame.append(hint);
        frame.append(signals);
        frame.append(cover);
        return frame;
    },
    addSignal:function(signalDiv,sqlData){
        var icon = '&#xe67a;';
        var AuthorityToClass = {
            hasPre:'hasPre',
            hasM:'hasM'
        }
        if(sqlData.preview_url){
            var Pre = nav.createHTMLELE('i','mvsSignal iconfont '+AuthorityToClass.hasPre,icon);
            signalDiv.append(Pre);
        }
        if(sqlData.dl_url){
            var material = nav.createHTMLELE('i','mvsSignal iconfont '+AuthorityToClass.hasM,icon);
            signalDiv.append(material);
        }
        return signalDiv;
    },
    addCoverCtr:function(cover,i){
        var IconClass = {
            pre:'&#xe6d9;',
            edit:'&#xe6d8;',
            del:'&#xe809;',
        }
        // var pre = nav.createHTMLELE('i','mvcCtr mvcPre iconfont',IconClass.pre);
        // cover.append(pre);
        var edit = nav.createHTMLELE('i','mvcCtr mvcEdit iconfont',IconClass.edit);
        cover.append(edit);
        // var del = nav.createHTMLELE('i','mvcCtr mvcDel iconfont',IconClass.del);
        // cover.append(del);
        return cover;
    },
    SqlDataToModel:function(eachSQL){
        var model = {
            id:eachSQL.id,
            videoId:eachSQL.video_id,
            url:eachSQL.video_url,
            cover:eachSQL.video_cover,
            name:eachSQL.video_name
        }
        return model;
    },
    addVideo:function(index){

    },
    ctrBind:function(){
        $('.mvEach .mvcPre').click(function(){

        });
        $('.mvEach .mvcEdit').click(function(){

        });
        $('.mvEach .mvcDel').click(function(){

        });
    },
    hoverBind:function(){
        $('.mvEach').hover(function(){
            $(this).addClass('active');
        },function(){
            $(this).removeClass('active');
        });
        $('.mvEach .mvcEdit').click(function(){
            var videoIndex = $('.mvEach').index($(this).parent().parent());
            // console.log(videoIndex);
            var navIndex = nav.getIndex();
            var navMode = nav.getMode(navIndex);
            var videoObj = navMode.data[videoIndex];
            upWindowCtrl.windowOpen(navMode,'edit',videoObj);
        });
    },
    getMode:function(index){
        return nav.mode[index];
    },
    getIndex:function(){
        return nav.index;
    },
    init:function(){
        nav.createTitle(nav.index);
        nav.pageTo(nav.index);
    },
    test:function(){
        setTimeout(function(){
            nav.navTo(1);
        },1000)
    }
}

var upWindowCtrl = {
    type:5,
    unSaved:false,
    mode:'insert',
    videoId:'',
    originReady:false,
    preReady:false,
    materialReady:false,
    isProcess:false,
    setUpType:function(type){
        this.type = type;
        if(type == 1){
            $('#matContainer').show();
        }else{
            materialUploader.notMoreUse();
            $('#matContainer').hide();
        }
    },
    setMode:function(mode){
        if(mode == 'insert'){
            this.mode = 'insert';
            originVideoUploader.needUse();
            $('#videoContainer').show();
        }else{
            this.mode = 'edit';
            originVideoUploader.notMoreUse();
            $('#videoContainer').hide();
        }
    },
    reset:function(){
        this.unSaved = false;
        this.videoId = '';
        this.originReady = false;
        this.preReady = false;
        this.materialReady = false;
        this.buttonChange('nonSave');
        originVideoUploader.reset();
        preUploader.reset();
        materialUploader.reset();
        allCheckBoxAllow();
    },
    unSave:function(){
        this.unSaved = true;
    },
    windowOpen:function(navMode,mode,videoObj){
        var type = navMode.tag;
        this.reset();
        this.setUpType(type);
        this.setMode(mode);
        if(videoObj) {
            // console.log(videoObj);
            this.videoId = videoObj.videoId;
        }
        this.windowRename(videoObj);
        $('#addSection').fadeIn(500);
    },
    windowChange:function(){
        var type = this.type;
        if(type == 1){
            materialUploader.needUse();
            $('#matContainer').show();
        }else{
            materialUploader.notMoreUse();
            $('#matContainer').hide();
        }
    },
    buttonChange:function(status){
        if(status == 'save'){
            $('#saveVideos').removeClass('mHidden');
            $('#startUpVideo').addClass('mHidden');
        }else{
            $('#startUpVideo').removeClass('mHidden');
            $('#saveVideos').addClass('mHidden');
        }
    },
    windowClose:function(){
        if(this.unSaved == true){
            var callback = function(){
                $('#addSection').fadeOut(500);
                setTimeout(function(){
                    window.location.reload();
                },500);
            }
            popupalert('文件未保存，确定要关闭吗？关闭会导致页面刷新','alert',callback);
        }else {
            $('#addSection').fadeOut(500);
        }
    },
    windowRename:function(obj){
        var index = nav.getIndex();
        var navMode = nav.getMode(index);
        var name = navMode.name;
        var selfMode = upWindowCtrl.mode;
        if(selfMode == 'insert'){
            name = name+'新增';
            $('#editTarget').hide();
        }else{
            name = name+'修改';
            $('#editTarget .editTarget').html(obj.name);
            $('#editTarget').show();
        }
        $('#ctrlName').html(name);
    },
    save:function(){
        var data = {
            video_type:this.type,
            video_url:originVideoUploader.getUrl(),
            video_cover:originVideoUploader.getCover(),
            video_name:originVideoUploader.getName(),
        }
        if(preUploader.isFinish()){
            data.preview_url = preUploader.getUrl();
        }
        if(materialUploader.isFinish()){
            data.dl_url = materialUploader.getUrl();
        }
        // console.log(data);

        var url ='/application/material/saveVideo';
        upWindowCtrl.post(url,data);
    },
    edit:function(videoId){
        var data = {
            video_id:videoId,
        }
        if(preUploader.isFinish()){
            data.preview_url = preUploader.getUrl();
        }
        if(materialUploader.isFinish()){
            data.dl_url = materialUploader.getUrl();
        }
        // console.log(data);

        var url = '/application/material/editVideo';
        upWindowCtrl.post(url,data);
    },
    sub:function(){
        if(!upWindowCtrl.readySub()){
            //如果未判断通过
            popupalert('上传未完成，不能保存','alert');
            return;
        }
        if(this.mode == 'insert'){
            upWindowCtrl.save();
        }else{
            var videoId = upWindowCtrl.videoId;
            upWindowCtrl.edit(videoId);
        }
    },
    ready:function(label){
        if(label == 'origin'){
            upWindowCtrl.originReady = true;
        }else if(label == 'pre'){
            upWindowCtrl.preReady = true;
        }else if(label == 'material'){
            upWindowCtrl.materialReady = true;
        }
    },
    readySub:function(){
        var ready = true;
        var _this = upWindowCtrl;
        if(upWindowCtrl.mode == 'insert'){
            if(_this.originReady != true){
                ready=false;
            }
        }
        if(preUploader.isNeedUse()) {
            if (_this.preReady != true) {
                ready = false;
            }
        }
        if(upWindowCtrl.type == 1) {
            if(materialUploader.isNeedUse()) {
                if (_this.materialReady != true) {
                    ready = false;
                }
            }
        }
        return ready;
    },
    post:function(url,data){
        var success = function(ret){
            if(ret.result == 0){
                upWindowCtrl.reset();
                upWindowCtrl.windowClose();
                popupalert('保存成功','alert');
                nav.reload();
            }else{
                console.log(ret.message)
            }
            upWindowCtrl.isProcess = false;
        }

        var _exe = function(){
            $.ajax({
                url:url,
                data:data,
                type:'post',
                dataType:'JSON',
                success:success
            });
        }
        upWindowCtrl.isProcess = true;
        _exe();
    },
    uploadButtonClick:function(){
        if(anyMissing()){
            popupalert('请提交上传视频','alert');
            return;
        }
        // if(upWindowCtrl.mode == 'insert'){
        //     if(!originVideoUploader.isUsed()){
        //         popupalert('原始视频不能为空','alert');
        //         return;
        //     }
        // }
        if(noNeedUp()){
            upWindowCtrl.windowClose();
            return;
        }
        if(originVideoUploader.isNeedUse()) {
            originVideoUploader.videoUp();
        }
        if(preUploader.isNeedUse()) {
            preUploader.videoUp();
        }
        if(materialUploader.isNeedUse()) {
            materialUploader.videoUp();
        }
        allAddButtonDeny();
        allCheckBoxDeny();
        upWindowCtrl.unSave();
        upWindowCtrl.buttonChange('save');
    },
}

function uploadNew(){
    var self = this;

    var isUploading = false;
    var isNeedUse = true;
    var isFinish = false;
    var label = '';
    var selfDom = [];
    var DomIndex = 0;
    var doneUrl = '';
    var selfCover = '';
    var selfName = '';
    var isAllowRename = false; //是否允许更名
    var isNeedRecode = true; //是否需要转码
    var selfStorage = '';
    // var videoType = '';
    var containerId = '';
    var submitElementId = '';
    var fileFiledId = '';

    this.isUploading=function(){
        return isUploading;
    }

    this.init = function(config){
        //config中含有fileFiledId，submitElementId,videoType,containerId;
        containerId = config.containerId;
        submitElementId = config.submitElementId;
        fileFiledId = config.fileFiledId;
        label = config.label;
        isAllowRename = (typeof(config.isAllowRename)!='undefined')?config.isAllowRename:false;
        isNeedRecode = (typeof(config.isNeedRecode)!='undefined')?config.isNeedRecode:true;
        var newConfig = {
            fileFiled:document.getElementById(fileFiledId),
            submitElement:document.getElementById(submitElementId),
            loader:self,
        }
        selfStorage = new StorageFactory();
        selfStorage.init(newConfig);
        self.eventBind();
    };

    this.addDom = function(name){
        var dom = self.createDom();
        if(name){
            if(isAllowRename == true) {
                var name = self.nameFormat(name);
                dom.find('.mamInput').val(name);
            }else{
                dom.find('p.mamaHint').html(name);
            }
            selfName = name;
        }
        $('#'+containerId).append(dom);
        selfDom.push(dom);
    };

    this.cleanDom = function(){
        for(var i=0;i<selfDom.length;i++){
            selfDom[i].remove();
        }
        selfDom = [];
    };

    this.nameFormat = function(name){
        var nameArr = name.split('.');
        var newName = nameArr.splice(0,nameArr.length-1);
        newName = newName.join('.');
//				console.log(newName);
        return newName;
    };

    this.createDom = function(){
        var mamPart = nav.createHTMLELE('div','mamPart mamUpVideo');
        var block = nav.createHTMLELE('div','mamBlock');
        var logo = nav.createHTMLELE('img','mamUPImg');
        logo.attr('src', "/img/newlogo.png");
        block.append(logo);
        mamPart.append(block);

        var hints = nav.createHTMLELE('div','mvHints');
        if(isAllowRename == true) {
            var inputOrP = nav.createHTMLELE('input', 'mamaHint mamInput');
            inputOrP.attr('placeholder', '输入名字');
        }else{
            var inputOrP = nav.createHTMLELE('p', 'mamaHint mamaName','上传中');
        }
        hints.append(inputOrP);
        mamPart.append(hints);

        var cover = nav.createHTMLELE('div','maCover');
        var uploading = nav.createHTMLELE('div','maUploading');
        var process = nav.createHTMLELE('div','maProcess');
        var mapColor = nav.createHTMLELE('div','mapColor');
        process.append(mapColor);
        uploading.append(process);

        var textFrame = nav.createHTMLELE('div','mapTextFrame mRow');
        var mapText = nav.createHTMLELE('p','mapText','已完成：');
        var mapNum = nav.createHTMLELE('p','mapNum nowProcess','100%');
        textFrame.append(mapText);
        textFrame.append(mapNum);

        uploading.append(textFrame);

        cover.append(uploading);

        var recoding = nav.createHTMLELE('div','maRecoding');
        var marText = nav.createHTMLELE('p','marText','转码中……');
        recoding.append(marText);
        cover.append(recoding);

        mamPart.append(cover);
        return mamPart;
    };

    this.videoUp = function(){
        if(selfDom.length == 0){
            return;
        }
        var updateDom = selfDom[DomIndex];
        var fileList = selfStorage.getFileList();
        self.addVideoDeny();
        selfStorage.setUpdateDom(updateDom);
        self.uploadStart(updateDom);
        $('#'+submitElementId).click();
    };

    this.addVideoAllow = function(){
        if(self.isNeedUse()) {
            $('#' + containerId).find('.videoAdd').show();
        }
    };
    this.addVideoDeny = function(){
        $('#'+containerId).find('.videoAdd').hide();
    };
    this.processUpdate = function(dom,percent){
        percent = Math.ceil(percent*100);
        dom.find('.mapColor').width(percent+'%');
        dom.find('.nowProcess').html(percent+'%');
    };

    this.uploadStart = function(dom){
        dom.find('.maCover').show();
        dom.find('.maUploading').show();
        dom.find('.mapColor').width(0+'%');
        dom.find('.nowProcess').html(0+'%');
        isUploading = true;
    }

    this.uploadStop = function(dom,file_url){
        dom.find('.maUploading').hide();
        if(isNeedRecode == true) {
            //需要转码，开启转码
            self.recodeStart(dom, file_url);
        }else{
            //不需要转码，直接结束
            self.allDone(dom,file_url);
        }
    };

    this.recodeStart = function(dom, file_url){
        dom.find('.maRecoding').show();
        var url = storageUrl;
        var isRecodeDone = function(){
            $.ajax({
                type:'get',
                url:url+"/transcode/result?file_url="+file_url,
                dataType:'JSON',
                success:function(ret){
                    var status = ret.transcodeStatus;
                    var newUrl = ret.transcodedUrl;
                    var cover = ret.cover;

                    if(status == '1' && newUrl && cover){
                        self.recodeStop(dom,newUrl,cover);
                    }else{
                        setTimeout(function(){
                            isRecodeDone();
                        },2000);
                    }
                }
            });
        }
        isRecodeDone();
    };

    this.recodeStop = function(dom,newUrl,cover){
        dom.find('.maRecoding').hide();
        dom.find('img').attr('src',cover);
        selfCover = cover;
        self.allDone(dom,newUrl);
    };

    this.allDone = function(dom,url){
        dom.find('.maCover').hide();
        doneUrl = url;
        // console.log(newUrl+' '+cover);
        isUploading = false;
        isFinish = true;
        upWindowCtrl.ready(label);
    };

    this.reset = function(){
        self.cleanDom();
        self.addVideoAllow();
        doneUrl = '';
        selfCover = '';
        selfName = '';
        isUploading = false;
        isFinish = false;
        selfStorage.reset();
    };

    this.getUrl = function(){
        return doneUrl;
    };

    this.getCover = function(){
        return selfCover;
    };

    this.getName = function(){
        if(isAllowRename == true){
            return selfDom[DomIndex].find('.mamInput').val();
        }else {
            return selfName;
        }
    };

    this.getLabel = function(){
        return label;
    };

    this.isNeedUse = function(){
        return isNeedUse;
    };

    this.needUse = function(){
        isNeedUse = true;
        var isCheck = $('#'+containerId).find('.isNeedShow').is(':checked');
        // console.log(containerId+'需要');
        if(isCheck != true){
            $('#'+containerId).find('.isNeedShow').attr("checked", true);
        }
    };

    this.notMoreUse = function(){
        isNeedUse = false;
        var isCheck = $('#'+containerId).find('.isNeedShow').is(':checked');
        if(isCheck == true){
            $('#'+containerId).find('.isNeedShow').attr("checked", false);
        }
        // console.log(containerId+'不需要');
    };

    this.hasFile = function(){
        return selfStorage.hasFile();
    }

    this.isFinish = function(){
        return isFinish;
    };

    this.eventBind = function(){
        $('#'+containerId).find('.videoAdd').click(function(){
            $('#'+fileFiledId).click();
        });
    };
}

function init(){
    originVideoUploader = new uploadNew();
    //config中含有fileFiledId，submitElementId,containerId;
    var originVideoUploaderConfig = {
        fileFiledId:'videoFile',
        submitElementId:'realUpVideo',
        containerId:'videoContainer',
        isAllowRename:true,
        label:'origin',
    }
    originVideoUploader.init(originVideoUploaderConfig);

    preUploader = new uploadNew();
    //config中含有fileFiledId，submitElementId,containerId;
    var preConfig = {
        fileFiledId:'preFile',
        submitElementId:'realUpPre',
        containerId:'preContainer',
        label:'pre',
    }
    preUploader.init(preConfig);

    materialUploader = new uploadNew();
    var materialConfig = {
        fileFiledId:'materialFile',
        submitElementId:'realUpMaterial',
        containerId:'matContainer',
        isNeedRecode:false,
        label:'material',
    }
    materialUploader.init(materialConfig);

    eventBind();
}

function eventBind(){
    $('.mtTab').click(function(){
        var tab = $(this).index();
        var index = nav.findIndex(tab);
        nav.navTo(index);
    });
    $('#addVideo').click(function(){
        var index = nav.getIndex();
        var mode = nav.getMode(index);
        upWindowCtrl.windowOpen(mode,'insert');
    });

    $('#startUpVideo').unbind('click');
    $('#startUpVideo').click(function(){
        upWindowCtrl.uploadButtonClick();
    });
    $('#saveVideos').click(function(){
        upWindowCtrl.sub();
    });
    //是否需要选项菜单
    $('.isNeedShow').click(function(){
        var dom = $(this).parent().parent().parent();
        var id = dom.attr('id');
        var idToLoader = {
            'preContainer':preUploader,
            'matContainer':materialUploader
        }
        var loader = idToLoader[id];
        var isCheck = $(this).is(':checked');
        if(isCheck == true){
            loader.needUse();
            dom.find('.videoAdd').show();
        }else{
            loader.notMoreUse();
            dom.find('.videoAdd').hide();
        }
    });
}

function anyMissing(){
    //有空缺
    var any = false;
    if(upWindowCtrl.mode == 'insert'){
        if(!originVideoUploader.hasFile()){
            any = true;
        }
    }
    if(upWindowCtrl.type == 1){
        if(materialUploader.isNeedUse()) {
            if (!materialUploader.hasFile()) {
                any = true;
            }
            // console.log('资源');
        }
    }
    if(preUploader.isNeedUse()) {
        if (!preUploader.hasFile()) {
            any = true;
        }
        // console.log('预览');
    }
    return any;
}

function noNeedUp(){
    var noNeed = true;
    if(upWindowCtrl.mode == 'insert'){
        noNeed = false;
        // console.log('新增');
    }
    if(preUploader.isNeedUse()||materialUploader.isNeedUse()){
        noNeed = false
        // if(preUploader.isNeedUse()){
        //     console.log('pre');
        // }else{
        //     console.log('mat');
        // }
        // console.log('有人需要');
    }
    return noNeed;
}

function allAddButtonDeny(){
    originVideoUploader.addVideoDeny();
    preUploader.addVideoDeny();
    materialUploader.addVideoDeny();
}

function allCheckBoxDeny(){
    $('.isNeedShow').attr("disabled",true);
}

function allCheckBoxAllow(){
    $('.isNeedShow').removeAttr("disabled");
}

function closeWindow(){
    upWindowCtrl.windowClose();
}

$().ready(function(){
    nav.init();
    init();
})