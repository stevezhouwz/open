/**
 * Created by zhou on 2017/6/30.
 */
var Event = new EventCtrl();
var command = {
    afterBind:afterBind,
    receiveStart:receiveStart,
    receiveOpenNum:receiveOpenNum,
    receiveStart:receiveStart,
    receiveOpenYao:receiveOpenYao,
    receiveReload:receiveReload,
}

var startS = null;
//初始绑定数据
function afterBind(data) {
    console.log("初始数据--：",data);
    startS = data.openStart;
    if(data.openStart == "2"){
        var music_url = $("#music_url").val();
        $(".onlineAudio").attr("src",music_url);
        if(music_url){
            ProxyLoad({
                url: 'http://localhost:3000',
                selector: ".onlineAudio",
                filename:"audio"
            });
        }
        var sort = $("#sort").val();
        var sort = JSON.parse(sort);
        switch (data.openVideo) {
            case "yao":
                onbody.init();
                onbody.setData();
                var timer = setInterval(function () {
                    if(onbody.shakeSum){
                        clearInterval(timer);
                        onbody.openShake(data.openNum);
                    }
                },500);
                break;
            case "dwon":
                onbody.shakeUrl = "5";
                loadDown();
                break;
            case "video":
                onbody.shakeUrl = "5";
                loadVideo();
                break;
            case "end":
                onbody.shakeUrl = "5";
                break;
        }
    }else {
        onbody.init();
    }
}
//接收开始状态
function receiveStart(data) {
    console.log("接收开始状态--：",data);
    var openStart = data.openStart;
    startS = data.openStart;
    startOpen(openStart);
}

function receiveReload(data) {
    console.log(data,"----receiveReload");
    var openStart = data.openStart;
    if(openStart == 1){
        window.location.reload();
    }
}
//接收手机端摇一摇数据
function receiveOpenNum(data) {
    console.log("摇一摇数据--：",data);
    if(startS == "2"){
        if(data.openYao == "1"){
            var num = data.openNum;
            onbody.openShake(num);
        }
        onbody.openYao = data.openYao;
    }
}

//发送当前环节状态
function sendOpenVideo(status) {
    Event.sendOpenVideo(status);
}

//接收摇一摇状态
function receiveOpenYao(data) {
    console.log("摇一摇状态--：",data);
}
function sendScreen() {
    Event.sendScreenStatus("2");
}

$(function () {
    var url_wslist = $("#url_wslist").val();
    var sequence = $("#sequence").val();
    Event.init(sequence,command,url_wslist,"screen");
    setTimeout(function () {
        sendScreen();
    },500);
})


function startOpen(openStart) {
    if(openStart == "2"){
        var music_url = $("#music_url").val();
        $(".onlineAudio").attr("src",music_url);
        if(music_url){
            ProxyLoad({
                url: 'http://localhost:3000',
                selector: ".onlineAudio",
                filename:"audio"
            });
        }
        var sort = $("#sort").val();
        var sort = JSON.parse(sort);
        if(sort.first){
            onbody.setData();
            var tim = setInterval(function () {
                if(onbody.shakeSum){
                    clearInterval(tim);
                    onbody.openShake(0);
                }
            },500);
            sendOpenVideo("yao");
        }else if(sort.two){
            loadDown();
        }else if(sort.three){
            loadVideo();
        }
    }
}

onbody = new Vue({
    el: "#onbody",
    data: {
        shakeUrl:"100",
        shakeSum:"",
        shType: "",
        threeText:"",
        threeimg:"",
        openYao:"1",

        twoType:"",
        twoText:"",
        twoimg:"",
        twith:"",
        imgwith:"",
        bai:0,

        mycustomBg: "/img/open/custombg.jpg",
        myprogressColor: "white",
        myinputText: "讯鸟年度盛会",
        mytextColor: "white",
        mylogo: "/img/newlogo.png",
        myinputVal: "2",
        SpeedData: {
            i: "0",
            width: "380",
            timer: "0",
        },
        TextData: {
            TextOpacity: "0",
            TextTimer: "0"
        },
        ImgData: {
            ImgOpacity: "0",
            ImgTimer: "0"
        }
    },
    methods:{
        init:function () {
            this.reset();
            this.CustomReData();
        },
        reset:function(){

            var shakeUrl = $("#shakeUrl").val();

            var twoType = $("#shake_type").val();
            var twoText = $("#shake_text").val();
            var twoimg = $("#shake_img").val();

            var shType = $("#shake_type").val();
            var threeText = $("#shake_text").val();
            var threeimg = $("#shake_img").val();

            var sort = $("#sort").val();
            var sort = JSON.parse(sort);
            if(sort.first){
                onbody.shakeUrl = shakeUrl;
                onbody.twoType = twoType;
                onbody.twoText = twoText;
                onbody.twoimg = twoimg;

                onbody.shType = shType;
                onbody.threeText = threeText;
                onbody.threeimg = threeimg;

                if(onbody.shakeUrl == 2 && onbody.twoType == 1){
                    setTimeout(function () {
                        ProxyLoad({
                            url: 'http://localhost:3000',
                            selector: "#twoimg",
                            filename:"pic",
                        });
                    },500)
                }else if(onbody.shakeUrl == 3 && onbody.shType == 1){
                    setTimeout(function () {
                        ProxyLoad({
                            url: 'http://localhost:3000',
                            selector: "#img",
                            filename:"pic",
                        });
                    },500)
                }
                return;
            }else if(sort.two) {
                $("#down").show();
            }else if(sort.three) {
                $("#editvideo").show();
            }else{
                alert("网络错误");
            }
        },
        CustomReData:function () {
            onbody.mycustomBg = $("#custom_bg").val();
            onbody.myprogressColor = $("#custom_color").val();
            onbody.myinputText = $("#custom_text").val();
            onbody.mytextColor = $("#shake_text_color").val();
            onbody.mylogo = $("#shake_img_url").val();
            onbody.myinputVal = $("#custom_pattern").val();
            var srcArr =  onbody.mycustomBg.substr( onbody.mycustomBg.lastIndexOf("/"));
          //  console.log("---------->>>>",srcArr);return;

            if(srcArr == "/custombg.jpg"){
                onbody.mycustomBg = "/img/online/onlinebg.jpg";
            }
           $(".customShakeContent").css("background-image","url("+onbody.mycustomBg+")");

            if(onbody.shakeUrl == 0){
                ProxyLoad({
                    url: 'http://localhost:3000',
                    selector: ".customShakeContent",
                    filename:"pic",
                    imgUrl:onbody.mycustomBg
                });

                if(onbody.myinputVal == 3){
                    setTimeout(function () {
                        ProxyLoad({
                            url: 'http://localhost:3000',
                            selector: ".myopenimgSrc",
                            filename: "pic",
                        });
                    },500)
                }
            }
        },
        shakeAdd: function (bai,shNum) {
            $(".myopenYao").css("width", shNum*20);
            $(".myopenLoading").html(bai + "%");
        },
        TextOpacity: function (bai,opacty) {
            $(".myopentextCont").css("opacity", opacty);
            $(".myopentextLoading").html(bai + "%");
        },
        ImgOpacity: function (bai,opacty) {
            $(".myopenimgSrc").css("opacity", opacty);
            $(".myopenimgLoading").html(bai + "%");
        },
        //自定义摇一摇
        PrevView: function (inputVal,opacty,bai,shNum) {
            $(".customShakeContent").show();
            switch (inputVal) {
                case "1":
                    onbody.shakeAdd(bai,shNum);
                    break;
                case "2":
                    onbody.TextOpacity(bai,opacty);
                    break;
                case "3":
                    onbody.ImgOpacity(bai,opacty);
                    break;
                default:
            }
        },
        //根据数据选择摇一摇的开幕方式
        setData:function () {
            switch (this.shakeUrl) {
                case "1":
                {
                    onbody.shakeSum = 800;
                    onbody.openShake(0);
                    break;
                }
                case "2":
                {
                    if(this.twoType == 0){
                        var twidth;
                        var t = setInterval(function(){
                            twidth = $(".twoText").width();
                            var tw = twidth + 10;
                            $(".twoZhe").css("width",tw);
                            this.twith = tw;
                            onbody.shakeSum = tw;
                            if(twidth>0){
                                clearInterval(t);
                            }
                        },500);

                        break;

                    }else {
                        var iwidth = "";
                        var ti = setInterval(function(){
                            var _im = document.getElementById('twoimg');
                            iwidth = _im.width;
                            var imt = iwidth + 10;
                            this.imgwith = imt;

                            $(".imgZhe").css("width",imt);
                            $(".imgbai").css("width",imt);
                            onbody.shakeSum = imt;
                            if(iwidth>0){
                                clearInterval(ti);
                            }
                        },500);
                        break;
                    }
                }
                case "3":
                {
                    onbody.shakeSum = 50;
                    break;
                }
                case "0":{
                    onbody.shakeSum = 50;
                    break;
                }
            }
           $(".onlineAudio")[0].load();
            // $(".onlineAudio")[0].play();
            $(".onlineAudio").attr("autoplay","autoplay");
        },
        openShake:function (num) {

            var num = Number(num);
            var number = Number($("#num").val());
            var znum = Number(onbody.shakeSum);
            var shNum = Number(Math.round((znum / number) * num));
            var bai = Number(Math.round(shNum / znum * 100));
            // console.log(number,"--总数--",znum,"--宽度--",shNum,"--占比--",bai,"--百分比--");
            if(isNaN(bai)){
                bai = onbody.bai;
            }else {
                onbody.bai = bai;
            }
            var opacty = Number(shNum / znum);
            var siOpen = Number(bai - 100);
            if (siOpen >= 0 || siOpen >= (-1)) {
                onbody.shakeUrl = "5";
                var sort = $("#sort").val();
                var sort = JSON.parse(sort);
                if(sort.two){
                    loadDown();
                }else if(sort.three){
                    loadVideo();
                }
            }
            switch (this.shakeUrl) {
                case "0":{
                    var custom_pattern = $("#custom_pattern").val();
                    onbody.PrevView(custom_pattern,opacty,bai,shNum);
                    break;
                }
                case "1": {
                    $(".amount").css("width", shNum);
                    $(".loaded").html(bai + "%");
                    break;
                }
                case "2": {
                    if (onbody.twoType == 0) {
                        var w = znum - shNum;
                        var l = znum - w;
                        $(".twoZhe").css("width", w);
                        $(".twoZhe").css("left", l);
                        $(".tbai").html(bai + "%");
                        break;
                    } else {
                        var w = znum - shNum;
                        var l = znum - w;
                        $(".imgZhe").css("width", w);
                        $(".imgZhe").css("left", l);
                        $(".imgbai").html(bai + "%");
                        break;
                    }

                }
                case "3": {
                    var type = onbody.shType;
                    if (type == 0) {
                        $("#textThree").css("opacity", opacty);
                        $(".thbai").html(bai + "%");
                        break;
                    } else {
                        $("#img").css("opacity", opacty);
                        $(".imgthbai").html(bai + "%");
                        break;
                    }
                }
            }
        }

    }
})

function playVideo(){
    $(".onlineAudio")[0].pause();
    var sort = $("#sort").val();
    var sort = JSON.parse(sort);
    $("#down").show();
    // $("#downVideo")[0].play();
    $("#downVideo").attr("autoplay","autoplay");

    $("#downVideo")[0].addEventListener("ended",function(){
        if(sort.three){
            $("#down").hide();
            loadVideo();
        }
    })
}

var timerPre = "";
var timeArr = new Array();
var centArr = new Array();

function getvDate(content){
    if(content != ""){
        var contents = content.split("|");
        for(var i=0;i<contents.length;i++){
            var cont = JSON.parse(contents[i]);
            centArr[cont.time] = cont;
            timeArr.push(cont.time);
        };

        $("#showvideo")[0].addEventListener("ended",function(){
            $("#effect").html("");
            clearInterval(timerPre);
            sendOpenVideo("end");
        });
        timerPre = setInterval(videoPlay,100,timeArr,centArr);
    }

}

/*********实现播放时候添加文字的效果******/
function videoPlay(timeArr,centArr){
    var current = $("#showvideo")[0].currentTime.toFixed(1);
    for(var x=0;x<timeArr.length;x++){
        if(current == timeArr[x] ){
            var cont = centArr[timeArr[x]];
            var p = "<p class='animated "+cont.animal+"' style='"+cont.contxt+"'>"+cont.text+"</p>";
            $("#effect").html(p);
            if($("#effect>p").html()){
                $("#effect>p").css("font-size",cont.fontSize*1.8+"px");
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

//加载倒计时url
function loadDown(){
    sendOpenVideo("dwon");
    var downUrl = $("#downUrl").val();
    $("#downVideo").css("width",window.screen.width);
    $("#downVideo").css("height",window.screen.height);

    $("#downVideo").attr("src",downUrl);
    ProxyLoad({
        url: 'http://localhost:3000',
        selector: "#downVideo",
        filename:"video"
    });
    playVideo();
}
//加载开场视频url
function loadVideo(){
    sendOpenVideo("video");
    $(".onlineAudio")[0].pause();
    var video_src = $("#video_src").val();
    $("#showvideo").css("width",window.screen.width);
    $("#showvideo").css("height",window.screen.height);
    $("#showvideo").attr("src",video_src);
    ProxyLoad({
        url: 'http://localhost:3000',
        selector: "#showvideo",
        filename:"video"
    });
    $("#editvideo").show();
    // $("#showvideo")[0].play();
    $("#showvideo").attr("autoplay","autoplay");
    var contents= $("#contents").val();
    var patter = $("#patter").val();
    getvDate(contents,patter);
}