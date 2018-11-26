/**
 * Created by zhou on 2017/6/28.
 */
function EventCtrl(){
    this.sequence = 0;
    this.open_id = '';
    this.socket = {};
    this.type = 'index';
    var self = this;
    var blankFunc = function(){
        // console.log('不执行');
    }
    var command = {
        afterBind:blankFunc,
        receiveStart:blankFunc,
        receiveOpenNum:blankFunc,
        receiveOpenYao:blankFunc,
        receiveReload:blankFunc,
        receiveOpenVideo:blankFunc,
        receiveScreenStatus:blankFunc,
    }

    var setCommand = function(setCommands){
        for(var key in setCommands){
            command[key] = setCommands[key];
        }
    }

    this.init = function(sequence,setCommands,url_wslist,type){
        //获取当前用户ID
        self.sequence = sequence;
        //连接socket
        self.socket = new PlumeWS(url_wslist);
        if(type) {
            self.type = type;
        }
        //绑定socket事件
        self.socket.bindOpen(self.onOpen);
        self.socket.bindClose(self.onClose);
        self.socket.bindError(self.onError);
        setCommand(setCommands);
        self.regReEvent();//onMessage
        self.socket.init();
    }

    this.onOpen = function(event){
        console.log("ws open.");
        if(self.type == 'screen'){
            var url = 'application/index/screen';
            console.log('screen');
        }else if(self.type == 'ctrl'){
            var url = 'application/index/ctrl';
            console.log('ctrl');
        }
        var fullData = {url:url, data:{sequence:self.sequence,open_id:self.open_id}};
        //发送登录信息
        self.socket.sendMessage(fullData);
    }

    //收到操作信息的处理事件，需要复写
    this.regReEvent = function(){
        //绑定用户登录事件
        self.socket.regEvent('re_bind' , function(fullData){
            if(fullData.code === 0){
                var data  = fullData.data;
                if(typeof(command.afterBind)=='function') {
                    command.afterBind(data);
                }
            }else{
                console.log('缺少参数');
            }
        });

        self.socket.regEvent('return' , function(fullData){
            if(fullData.code !== 0){
                var fromEvent = fullData.data;
                console.log(fromEvent+'操作失败');
            }else{
                var fromEvent = fullData.data;
                // console.log(fromEvent+'操作成功');
            }
        });

        self.socket.regEvent('receiveStart' , function(fullData){
            if(fullData.code !== 0){
                console.log('操作失败');
            }else{
                var data = fullData.data;
                if(typeof(command.receiveStart)=='function') {
                    command.receiveStart(data);
                }
            }
        });

        self.socket.regEvent('receiveOpenNum' , function(fullData){
            if(fullData.code !== 0){
                console.log('操作失败');
            }else{
                var data = fullData.data;
                if(typeof(command.receiveOpenNum)=='function'){
                    command.receiveOpenNum(data);
                }
            }
        });

        self.socket.regEvent('receiveOpenYao' , function(fullData){
            if(fullData.code !== 0){
                console.log('操作失败');
            }else{
                var data = fullData.data;
                if(typeof(command.receiveOpenYao)=='function'){
                    command.receiveOpenYao(data);
                }
            }
        });

        self.socket.regEvent('receiveOpenVideo' , function(fullData){
            if(fullData.code !== 0){
                console.log('操作失败');
            }else{
                var data = fullData.data;
                if(typeof(command.receiveOpenVideo)=='function'){
                    command.receiveOpenVideo(data);
                }
            }
        });

        self.socket.regEvent('receiveReload' , function(fullData){
            if(fullData.code !== 0){
                console.log('操作失败');
            }else{
                var data = fullData.data;
                if(typeof(command.receiveReload)=='function'){
                    command.receiveReload(data);
                }
            }
        });
        self.socket.regEvent('receiveScreenStatus' , function(fullData){
            if(fullData.code !== 0){
                console.log('操作失败');
            }else{
                var data = fullData.data;
                if(typeof(command.receiveScreenStatus)=='function'){
                    command.receiveScreenStatus(data);
                }
            }
        });
    }

    this.onClose = function(event){
        console.log("ws closed.");
    }

    this.onError = function(event){
        console.log("ws error.");
    }

    //发送事件
    this.sendStart = function(status){
        if(typeof(status)=='undefined'){
            console.log('参数错误');
            return;
        }
        var fullData = {url:'application/index/start', data:{sequence:self.sequence,status:status}};
        //发送登录信息
        self.socket.sendMessage(fullData);
    }

    //发送手机端摇一摇数据事件
    this.sendOpenNum = function(){
        var fullData = {url:'application/index/sendOpenNum', data:{sequence:self.sequence}};
        //发送登录信息
        self.socket.sendMessage(fullData);
    }

    //发送大屏摇一摇是否结束事件
    this.sendOpenYao = function(status){
        if(typeof(status)=='undefined'){
            console.log('参数错误');
            return;
        }
        var fullData = {url:'application/index/sendOpenYao', data:{sequence:self.sequence,status:status}};
        //发送登录信息
        self.socket.sendMessage(fullData);
    }
    //发送大屏倒计时是否开始状态
    this.sendOpenDwon = function(status){
        if(typeof(status)=='undefined'){
            console.log('参数错误');
            return;
        }
        var fullData = {url:'application/index/sendOpenDwon', data:{sequence:self.sequence,status:status}};
        //发送登录信息
        self.socket.sendMessage(fullData);
    }
    //发送大屏开场视频是否开始状态
    this.sendOpenVideo = function(status){
        if(typeof(status)=='undefined'){
            console.log('参数错误');
            return;
        }
        var fullData = {url:'application/index/sendOpenVideo', data:{sequence:self.sequence,status:status}};
        //发送登录信息
        self.socket.sendMessage(fullData);
    }

    //发送大屏是否加载好状态
    this.sendScreenStatus = function(status){
        if(typeof(status)=='undefined'){
            console.log('参数错误');
            return;
        }
        var fullData = {url:'application/index/sendScreenStatus', data:{sequence:self.sequence,status:status}};
        //发送登录信息
        self.socket.sendMessage(fullData);
    }
}