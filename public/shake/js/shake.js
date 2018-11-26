/**
 * Created by zhou on 2016/8/18.
 */

//先判断设备是否支持HTML5摇一摇功能
if (window.DeviceMotionEvent) {
    //获取移动速度，得到device移动时相对之前某个时间的差值比
    window.addEventListener('devicemotion', deviceMotionHandler, false);
}else{
    alert('您好，你目前所用的手机好像不支持重力感应哦！');
}

//设置临界值,这个值可根据自己的需求进行设定，默认就3000也差不多了,晃动反应时间
var shakeThreshold = 3000;
//设置最后更新时间，用于对比
var lastUpdate  = 0;
//设置位置速率
var curShakeX=curShakeY=curShakeZ=lastShakeX=lastShakeY=lastShakeZ=0;

function deviceMotionHandler(event){

    //获得重力加速
    var acceleration =event.accelerationIncludingGravity;

    //获得当前时间戳
    var curTime = new Date().getTime();

    if ((curTime - lastUpdate)> 100) {
        //时间差
        var diffTime = curTime -lastUpdate;
        lastUpdate = curTime;

        //x轴加速度
        curShakeX = acceleration.x;
        //y轴加速度
        curShakeY = acceleration.y;
        //z轴加速度
        curShakeZ = acceleration.z;

        var speed = Math.abs(curShakeX + curShakeY + curShakeZ - lastShakeX - lastShakeY - lastShakeZ) / diffTime * 10000;

        if (speed > shakeThreshold) {
            //播放音效
            shakeAudio.play();
            //播放动画
            $('.shake_box').addClass('shake_box_focus');

            total();//摇一摇统计
            setNum();//存入redis

            clearTimeout(shakeTimeout);
            var shakeTimeout = setTimeout(function(){
                $('.shake_box').removeClass('shake_box_focus');
            },1000)

        }

        lastShakeX = curShakeX;
        lastShakeY = curShakeY;
        lastShakeZ = curShakeZ;
    }
}

//成功显示开幕
function show(){
    $('.shake_box').css("display","none");
    $('.my_body').css("display","block");
}

//预加摇一摇声音
var shakeAudio = new Audio();
shakeAudio.src = '../mobile/img/shake_sound.mp3';
var shake_options = {
    preload  : 'auto'
}

for(var key in shake_options){
    if(shake_options.hasOwnProperty(key) && (key in shakeAudio)){
        shakeAudio[key] = shake_options[key];

    }
}
//返回按钮
BackPrev({});

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
            console.log("开幕人数统计"+data);
            //alert(data);
            var data = JSON.parse(data);
            if(data.code == '0') {
                //alert("成功");
            }
        }
    });
}

var num = "";
function setNum() {
    num++;
    var meet_id = $("#meet_id").val();
    var comp_id = $("#comp_id").val();
    var sequence = $("#sequence").val();
    var setNum = num % 5;
    if(setNum == 0){
        $.ajax({
            url: 'yaoNum.php',
            data: {"meet_id":meet_id,"comp_id":comp_id,"sequence":sequence},
            datatype: 'text',
            type: 'post',
            success: function(data){
                var data = JSON.parse(data);
                if(data.result == '1') {
                    show();
                    shakeAudio.src = '';
                }
            }
        });
    }
}