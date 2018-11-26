/**
 * Created by zhou on 2017/6/29.
 */
$(function () {
    var Event = new EventCtrl();
    var command = {
        afterBind:afterBind,
        receiveStart:receiveStart,
        receiveOpenNum:receiveOpenNum,
        receiveOpenYao:receiveOpenYao,
        receiveOpenDwon:receiveOpenDwon,
        receiveOpenVideo:receiveOpenVideo,
    }

    //初始绑定数据
    function afterBind(data) {
        console.log(data,"---初始数据");
    }
    //接收开始状态
    function receiveStart(data) {
        console.log(data,"---开始状态");
    }
    //接收手机端摇一摇数据
    function receiveOpenNum(data) {
        console.log(data,"---摇一摇数据");
    }
    //接收摇一摇状态
    function receiveOpenYao(data) {
        console.log(data,"---摇一摇状态");
    }
    //接收倒计时状态
    function receiveOpenDwon(data) {
        console.log(data,"---倒计时状态");
    }
    //接受开场视频状态
    function receiveOpenVideo(data) {
        console.log(data,"---开场视频状态");
    }

    function sendSart() {
        var status = "2";
        Event.sendStart(status);
    }

    function sendOpenNum() {
        Event.sendOpenNum();
    }

    function sendOpenYao() {
        var status = "2";
        Event.sendOpenYao(status);
    }

    function sendOpenDwon() {
        var status = "start";
        Event.sendOpenDwon(status);
    }

    function sendOpenVideo() {
        var status = "start";
        Event.sendOpenVideo(status);
    }
    var url_wslist = "ws://120.24.187.47:54129|ws://120.24.187.47:54129";
    var sequence = $("#sequence").val();
    // Event.init(sequence,command,url_wslist,"ctrl");
    Event.init(sequence,command,url_wslist,"screen");
    $("#send-btn").click(function () {
        // sendSart();
       // sendOpenNum();
        for (var i=0;i<2000;i++){
            sendOpenNum();
        }
    })


})
function test() {
    
}