/**
 * Created by zhou on 2016/8/4.
 */
onbody = new Vue({
    el: "#onbody",
    data: {
        shakeUrl:"100",

        shType: "",
        threeText:"",
        threeimg:"",

        twoType:"",
        twoText:"",
        twoimg:"",
        twith:"",
        imgwith:"",

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
        PrevView: function (inputVal,opacty,bai,shNum) {
            $(".customShakeContent").show();
            onbody.clearTimeout();
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
        clearTimeout: function () {
            clearTimeout(onbody.SpeedData.timer);
            clearTimeout(onbody.TextData.TextTimer);
            clearTimeout(onbody.ImgData.ImgTimer);
        },
        CustomReData:function () {
            onbody.mycustomBg = $("#custom_bg").val();
            onbody.myprogressColor = $("#custom_color").val();
            onbody.myinputText = $("#custom_text").val();
            onbody.mytextColor = $("#shake_text_color").val();
            onbody.mylogo = $("#shake_img_url").val();
            onbody.myinputVal = $("#custom_pattern").val();
            var srcArr =  onbody.mycustomBg.split('.');
            var imgData = srcArr[0].split('/');
            var url = imgData[imgData.length-1];
            if(url == "custombg"){
                onbody.mycustomBg = "/img/online/onlinebg.jpg";
            }

            $(".customShakeContent").css("background-image","url("+onbody.mycustomBg+")");
        },
        setData:function () {
            console.log("==>"+this.shakeUrl);
            switch (this.shakeUrl) {
                case "1":
                {
                    loadnum("1", "800");
                    break;
                }
                case "2":
                {
                    if(this.twoType == 0){
                        var twidth;
                        var t = setTimeout(function(){
                            twidth = $(".twoText").width();
                            var tw = twidth + 10;
                            $(".twoZhe").css("width",tw);
                            this.twith = tw;
                            console.log(tw);
                            loadnum("2", tw);
                        },500);
                        if(twidth >0){
                            clearTimeout(t);
                        }
                        break;

                    }else {
                        var iwidth;
                        var ti = setTimeout(function(){
                            var _im = document.getElementById('twoimg');
                            iwidth = _im.width;
                            var imt = iwidth + 10;
                            this.imgwith = imt;

                            $(".imgZhe").css("width",imt);
                            $(".imgbai").css("width",imt);
                            loadnum("2",imt);
                        },500);
                        if(iwidth >0){
                            clearTimeout(ti);
                        }
                        break;
                    }
                }
                case "3":
                {
                    var znum = "50";
                    loadnum("3",znum);
                    break;
                }
                case "0":{
                    var znum = "50";
                    loadnum("0",znum);
                    break;
                }
            }
            var music_url = $("#music_url").val();
            $(".onlineAudio").attr("src",music_url);
            $(".onlineAudio")[0].load();
            $(".onlineAudio")[0].play();
        },
        bindEvent:function () {

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
                return;
            }else if(sort.two) {
                loadDown();
                $("#down").show();
            }else if(sort.three) {
                loadVideo();
                $("#editvideo").show();
            }else{
                popupalert('没有开幕式','notice',"");
            }
        }
    },
})

//加载倒计时url
function loadDown(){
    var downUrl = $("#downUrl").val();
    $("#downVideo").css("width",window.screen.width);
    $("#downVideo").css("height",window.screen.height);

    $("#downVideo").attr("src",downUrl);
    ProxyLoad3({
        url: 'http://localhost:3000',
    });
}

//加载开场视频url
function loadVideo(){
    var video_src = $("#video_src").val();
    $("#showvideo").css("width",window.screen.width);
    $("#showvideo").css("height",window.screen.height);
    $("#showvideo").attr("src",video_src);
    ProxyLoad4({
        url: 'http://localhost:3000',
    });
}

function loadnum(shakeType,znum){
    var shakeUrl = onbody.shakeUrl;
    var number = $("#num").val();
    if(shakeUrl != "") {
        $.ajax({
            type: 'POST',
            url: "/application/mobile/loadnum",
            datatype: "JSON",
            data: {"comp_id": comp_id, "meet_id": meet_id, "sequence": sequence},
            success: function (ret) {
                ret = JSON.parse(ret);
                var num = ret["num"];
                console.log(number,"-----总次数");
                console.log(num,"-----摇一摇次数");
                var shNum = (znum / number) * num;
                var bai = Math.round(shNum / znum * 100);
                var opacty = shNum / znum;
                switch (shakeType) {
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
                            console.log(znum);
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
                var timer = setTimeout(loadnum, 500, shakeType, znum, number);
                if (bai - 100 >= 0) {
                    clearTimeout(timer);
                    console.log("成功开幕");
                    onbody.shakeUrl = "5";
                    playVideo();
                }

            },
            error: function (e) {
                var callback = function () {
                    window.location.reload();
                }
                popupalert('网络错误', 'error', callback);
            }
        });
    }else {
        playVideo();
    }
}


function playVideo(){
    $(".onlineAudio")[0].pause();
    var sort = $("#sort").val();
    var sort = JSON.parse(sort);
    if(sort.two){
        loadDown();
        $("#down").show();
        $("#downVideo")[0].play();
        $("#downVideo").attr("autoplay","autoplay");

        $("#downVideo")[0].addEventListener("ended",function(){
            if(sort.three){
                $("#down").hide();
                loadVideo();
                $("#editvideo").show();
                $("#showvideo")[0].play();
                $("#showvideo").attr("autoplay","autoplay");
                var contents= $("#contents").val();
                var patter = $("#patter").val();
                getvDate(contents,patter);
            }
        })
    }else if(sort.three){
        loadVideo();
        $("#editvideo").show();
        $("#showvideo")[0].play();
        $("#showvideo").attr("autoplay","autoplay");
        var contents= $("#contents").val();
        getvDate(contents);
    }
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



