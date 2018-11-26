/**
 * Created by zhou on 2016/8/18.
 */

var Event = new EventCtrl();
var setNum = $("#setNum").val();
var MobileNum = 0;
var shakeNum = "";
var command = {
    afterBind:afterBind,
    receiveStart:receiveStart,
    receiveOpenNum:receiveOpenNum,
    receiveReload:receiveReload,
}
var startS = null;
//初始绑定数据
function afterBind(data) {
    console.log(data,"---初始数据");
    MobileNum = data.openNum;
    startS = data.openStart;
    var sort = $("#sort").val();
    console.log(sort);
    var sort = JSON.parse(sort);
    if(sort.first){
        if(data.openStart == "2"){
            if(data.openYao == "1"){
                $(".shake_box").show();
                startShake();
            }else {
                show();
            }
        }else {
            $(".startOpen").show();
        }
    }else {
        $(".startOpen>span").html("未设置摇一摇");
        $(".startOpen").show();
    }

}
//接收开始状态
function receiveStart(data) {
    window.location.reload();
}

//接收重新状态
function receiveReload(data) {
    var openStart = data.openStart;
    if(openStart == 1){
        window.location.reload();
    }

}
function receiveOpenNum(data) {
    MobileNum = data.openNum;
}

function sendOpenYao() {
    Event.sendOpenYao("2");//表示摇一摇已经开幕
}
function sendOpenNum(data) {
    if(startS == "2"){
        shakeNum = data;
        shakeNum++;
        if(shakeNum % 2 == 0){
            Event.sendOpenNum();
        }
    }
}
$(function () {
    var url_wslist = $("#url_wslist").val();
    var sequence = $("#sequence").val();
    Event.init(sequence,command,url_wslist,"screen");
    var height = document.body.scrollHeight;
    $(".my_body").css("height",height);
})

//成功显示开幕
function show(){
    $('.shake_box').css("display","none");
    $('.my_body').css("display","block");
}

//预加摇一摇声音
var shakeAudio = new Audio();
shakeAudio.src = '/mobile/img/shake_sound.mp3';
var shake_options = {
    preload  : 'auto'
}

for(var key in shake_options){
    if(shake_options.hasOwnProperty(key) && (key in shakeAudio)){
        shakeAudio[key] = shake_options[key];
    }
}


//统计开幕式参与人数
function total(){
    var meet_id = $("#meet_id").val();
    var module_status = $("#module_status").val();
    var sequence = $("#sequence").val();
    var total = $("#total").val();
    $.ajax({
        url: total,
        data: {"meet_id":meet_id,"module_status":module_status,"sequence":sequence},
        datatype: 'text',
        type: 'post',
        success: function(data){
            //alert(data);
            var data = JSON.parse(data);
            if(data.code == '0') {
                //alert("成功");
            }
        }
    });
}

function startShake() {
    var shake = new ShakePostMessage();
    shake.init(function(data){
        //播放音效
        shakeAudio.play();
        //播放动画
        $('.shake_box').addClass('shake_box_focus');

        total();//摇一摇统计
        if(Number(MobileNum) < Number(setNum)){
            sendOpenNum(data);
        }else {
            show();
            shakeAudio.src = '';
            sendOpenYao();
            MobileNum = 0;
            window.location.reload();
        }

        clearTimeout(shakeTimeout);
        var shakeTimeout = setTimeout(function(){
            $('.shake_box').removeClass('shake_box_focus');
        },1000)
    });
    shake.sendShake();
}

/**
 * 功能：1、发送摇一摇开始状态
 * @constructor
 */
function ShakePostMessage(){
    var self = this;
    this.connectFlag = false;
    this.shakeCb = null;

    this.init = function(shakeCb){
        self.shakeCb = shakeCb;
        self.initEvent();
    }

    this.sendShake = function(){
        window.top.postMessage({
                action: "shake"
            },
            '*'
        );
    }

    this.initEvent = function (shakeCb) {
        //接收
        window.addEventListener("message", function(e){
            var res = e;
            var action = res.data.action;
            var info = res.data.info;
            switch (action) {
                case 'resp_shake' :
                    if(info == 1){
                        self.connectFlag = true;
                    }
                    break;
                case 'shaking' :
                    if(self.shakeCb){
                        self.shakeCb(info);
                    }
                    break;
                default :
                    return
            }
        });
    }
}