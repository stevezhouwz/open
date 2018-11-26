/**
 * Created by Musicbear on 2016/7/28.
 */
Myalert = new Vue({
    el:"#popupalert",
    data:{
        type:0,
        background:'rgba(0, 0, 0, 0.5)',
        typeChoice:{
            notice:0,
            message:1,
            alert:2,
            error:3,
            loading:4,
        },
        content:'做一下测试',
        isNeedClose:false,
        btOneTx:'确认',
        btTwoTx:'取消',
        top:50,
    },
    methods:{
        loading:function(index){
            if(typeof(index)=='undefined'){
                index = 0;
            }
            var self = this;
            $('.loading').eq(index%3).snabbt({
                scale: [1.5,1.5]
            }).snabbt({
                scale: [1,1],
                complete:function(){
                    index = (index+1)%3;
                    self.loading(index);
                },
            });
        },
        stopLoading:function(){
            $('.loading').snabbt('stop');
        },
        hasCover:function(){
            this.background = 'rgba(0, 0, 0, 0.5)';
        },
        notCover:function(){
            this.background = 'none';
        },
        msgPop:function(isNeedClose){
            //this.notCover();
            this.type = 1;
            var self = this;
            alertshow(this.type);
            setTimeout(function(){
                self.msgCallback();
            },2000);
            if(typeof(isNeedClose)=='undefined'||isNeedClose==true){
                setTimeout(function(){
                    alertClose();
                },2000);
            }
        },
        loadPop:function(){
            this.hasCover();
            this.type = 4;
            alertshow(this.type);
            this.loading();
        },
        elsePop:function(type,isNeedClose){
            this.hasCover();
            this.type = type;
            if(typeof(isNeedClose)!='undefined'&&isNeedClose==false){
                this.isNeedClose = false;
            }else{
                this.isNeedClose = true;
            }
            alertshow(type);
        },
        msgCallback:function(){

        },
        cancel:function(){
            alertClose();
        },
        sure:function(){
            this.sureFunction();
            if(this.isNeedClose == true){
                alertClose();
            }
        },
        sureFunction:function(){
            alertClose();
        },
        defaultFunc:function(){

        },
    }
});

$().ready(function(){
   // var callback = function(){
   //      setTimeout(function(){
   //          alert('回调');
   //      },2000)
   //  }
   //  setTimeout(function(){
   //      popupalert('看一下行不行','message',callback);
   //  },1000);
   //
   //  setTimeout(function(){
   //      popupalert('看一下行不行','alert','',false);
   //  },10000);
   //  message('测试一下啦');
});

/**
 * 弹框参数 遮罩型弹窗
 * message 必填，弹框内容
 * type 必填，弹框类型string  有message,alert,notice,error,loading五种
 * callback 非必填，回调函数  如在alert,notice,与error状态下，为确认按钮触发事件，如在message状态下则为弹窗消失时执行 , 不填写与loading状态不执行
 * isNeedClose 非必填，如为true或不填写，且有确认按钮的情况下，则为确认按钮点击后，弹窗消失。如为false则不消失。（注意message，默认状态是两秒消失，设为false则不消失）
 */
function popupalert(message,type,callback,isNeedClose){
    if(typeof(message)!= 'string'&&typeof(type)!= 'string'){
        alert('参数错误');
        return;
    }
    if(typeof(Myalert.typeChoice[type])=='undefined'){
        alert('弹框类型错误');
        return;
    }
    Myalert.content = message;
    var typeindex = Myalert.typeChoice[type];
    if(typeindex == 1){
        var offset = 150;
    }else{
        var offset = 100;
    }
    // var top = window.screen.availHeight/2 - offset;
    // Myalert.top = top;

    var top = window.innerHeight/2 - offset;
    Myalert.top = top;
    //添加回调函数
    if(typeindex==0||typeindex==2||typeindex==3){
        if(typeof(callback)=='function') {
            Myalert.sureFunction = callback;
        }else{
            Myalert.sureFunction = Myalert.defaultFunc;
        }
    }else{
        if(typeof(callback)=='function'&&typeindex==1) {
            Myalert.msgCallback = callback;
        }else{
            Myalert.msgCallback = Myalert.defaultFunc;
        }
    }
    if(typeindex == 1){
        Myalert.msgPop(isNeedClose);
    }else if(typeindex == 4){
        Myalert.loadPop();
    }else{
        Myalert.elsePop(typeindex,isNeedClose);
    }
}

/**
 * 发送普通消息
 * @param msg 消息内容
 */
function message(msg){
    if(typeof(msg)!='string'||msg.length == 0){
        return;
    }
    var id = $('.normalMsgContent').length;
    createMessage(msg,id);
    $("#msg_"+id).show();
    $("#msg_"+id).snabbt({
        opacity: 1,
        fromOpacity: 0,
        duration: 500,
        easing: 'easeIn',
    });
    setTimeout(function(){
        $("#msg_"+id).snabbt({
            opacity: 0,
            fromOpacity: 1,
            duration: 500,
            easing: 'easeIn',
            complete:function(){
                $("#"+id).remove();
            }
        });
    },2000);
}

function createMessage(msg,id){
    //获取宽高
    var height = window.screen.availHeight;
    var width = window.screen.availWidth;
    var top = height/2-50;
    var left = width/2-100;
    var css = {
        left: left+'px',
        top: top+'px',
    }

    var parentDiv = $('<div></div>');
    parentDiv.addClass('normalMsgContent popFrame msgContent');
    parentDiv.attr('id','msg_'+id);
    parentDiv.css(css);
    var msgDiv = $('<div></div>');
    msgDiv.addClass("pop-buttons pop-row");
    var i = $('<i></i>');
    i.addClass("iconfont c-success msgHint");
    i.html('&#xe644;');
    var p = $('<p></p>');
    p.addClass("pc-text mc-text mainText");
    p.html(msg);
    i.appendTo(msgDiv);
    p.appendTo(msgDiv);
    msgDiv.appendTo(parentDiv);
    parentDiv.appendTo('body');
    console.log(parentDiv);
}

//停止loading动画事件
function stopLoading(){
    Myalert.stopLoading();
    alertClose();
}

function alertshow(index){
    $("#popupalert").show();
    $(".pop-content").eq(index).snabbt({
        opacity: 1,
        fromOpacity: 0,
        duration: 500,
        easing: 'easeIn',
    });
}

function alertClose(){
    $(".pop-content").snabbt({
        opacity: 0,
        fromOpacity: 1,
        duration: 500,
        easing: 'easeIn',
    });
    setTimeout(function(){
        $("#popupalert").hide();
    },500);
}