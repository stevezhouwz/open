/**
 * Created by zhou on 2017/7/4.
 */
$(function () {
    var Event = new EventCtrl();
    var screenStatus = '1';
    var openStart = '1';
    var command = {
        afterBind:afterBind,
        receiveStart:receiveStart,
        receiveReload:receiveReload,
        receiveScreenStatus:receiveScreenStatus,
    }

    //初始绑定数据
    function afterBind(data) {
        console.log(data,"----场控初始绑定数据");
        openStart = data.openStart;
        change();
    }
    //接收开始状态
    function receiveStart(data) {
        console.log(data,"----接收开始状态");
        openStart = data.openStart;
        change();
    }

    function receiveReload(data) {
        console.log(data,"----receiveReload");
        openStart = data.openStart;
        change();
    }

    function sendSart() {
        var status = "2";
        Event.sendStart(status);
    }

    function receiveScreenStatus(data) {
        console.log(data,"----接收大屏加载状态");
        screenStatus = data.screenStatus;
        change();
    }
    var url_wslist = $("#url_wslist").val();
    var sequence = $("#sequence").val();
    Event.init(sequence,command,url_wslist,"ctrl");
    $("#start").click(function () {
        sendSart();
        $("#start").html("启动中...");
    })

    function change() {
        if(screenStatus == "1"){
            $("#start").html("启动");
            $("#start").attr("disabled","disabled");
            $("#start").css("cursor","no-drop");

            $("#start").css("background","#D3D3D3");
            $("#start").css("color","#fff");
            $("#start").css("border-color","#D3D3D3");

        }else {
            if(openStart == "2"){
                $("#start").html("已启动");
                $("#start").attr("disabled","disabled");
                $("#start").css("cursor","no-drop");

                $("#start").css("background","#ff4343");
                $("#start").css("color","#fff");
                $("#start").css("border-color","#ff4343");
            }else {
                $("#start").html("启动");
                $("#start").attr("disabled",false);
                $("#start").css("cursor","pointer");

                $("#start").css("background","#fff");
                $("#start").css("color","#ff4343");
                $("#start").css("border-color","#ff4343");
            }
        }
    }
})