/*
 * url get ws cluster's url
 * heartbeatTime is interval time that test is not can receive ws event
 */
function PlumeWS(urls , heartbeatTime){
	var plume = this;
	this.wsListConfig = urls;
	this.plumeSocket = null;//公有属性，原生的WebSocket对象,外部可直接使用
	this.wsUrl = '';//current ws url
	this.wsList = [];//公有属性，服务器地址

	var openCb = null;//私有属性，用来接收onopen的回调
	//var messageCb = null;//私有属性，用来接收onmessage的回调
	var errorCb = null;//私有属性，用来接收onerror的回调
	var closeCb = null;//私有属性，用来接收onclose的回调
	var prevSuccessReceiveEventTime = Date.parse(new Date());//记录ws上一次成功接收事件的时间
	var heartbeatTime = heartbeatTime || 580000;//最后一次收到事件到现在超过该时间（单位：毫秒）后向后台发起心跳测试，如果失败就重连
	var isConnected = 0;//是否和ws保持连接，1表示连接，0表示断开

	this.currentWsIndex = 0;//wsList的索引
	this.reTryCount = 0;//链接某个ws已重试次数
	this.eventList = {};
	this.messageCb = null; //用来接收onmessage的回调,这里为了兼容老版本的写法

	this.init = function(){
		console.log('et ws cluster......');
		plume.wsList = plume.wsListConfig.split("|");
		console.log(plume.wsList);
		plume.currentWsIndex = (Math.ceil((plume.wsList.length-1) * 10 * Math.random()) / 10).toFixed(0);
		plume.wsUrl = plume.wsList[plume.currentWsIndex];
		console.log(plume.wsUrl);
		plume.connect();
		plume.heartbeatTest();
	}

	this.connect = function(){
		console.log('connecting ws......');
		if(!openCb){//要求必须绑定onopen事件
			return ;
		}
		//第一次或者是异常断开时都重新实例化WebSocket对象
		plume.plumeSocket =  new WebSocket(plume.wsUrl);
		plume.plumeSocket.onopen = openCb;
		//plume.plumeSocket.onmessage = messageCb;
		plume.plumeSocket.onmessage = function(e){
			if(e && e.data){
				if(e.data == 'pingpong'){//处理心跳接收事件
					isConnected = 1;
					prevSuccessReceiveEventTime = Date.parse(new Date());//记录最近一次收到事件的时间
					return;
				}
				var fullData = JSON.parse(e.data);
				if(fullData.event == 'error'){//system error
					console.log('system error.error detail:' + fullData.data);
					return;
				}
				if(plume.eventList[fullData.event]){
					plume.eventList[fullData.event](fullData);
				}else if(plume.messageCb){//兼容老版本的写法
					plume.messageCb(fullData);
				}
				prevSuccessReceiveEventTime = Date.parse(new Date());//记录最近一次收到事件的时间
			}

		}
		plume.plumeSocket.onerror = errorCb;
		var closeCbWrap = function(e){//执行外部绑定的onclose事件并自动重连
			if(plume.reTryCount > 3){
				plume.currentWsIndex++;
				if(plume.wsList[plume.currentWsIndex]){
					plume.wsUrl = plume.wsList[plume.currentWsIndex];
				}else{
					plume.currentWsIndex = 0;
					plume.wsUrl = plume.wsList[0];
				}
				plume.reTryCount = 0;
			}
			if(closeCb){
				closeCb(e);
			}
			plume.connect();//重连
			plume.reTryCount++;
		}
		plume.plumeSocket.onclose = closeCbWrap;
	}

	this.bindOpen = function(cb){//接收onopen的回调
		openCb = cb;
	}
	this.bindMessage = function(cb){//接收onmessage的回调
		plume.messageCb = cb;
	}
	this.bindError = function(cb){//接收onerror的回调
		errorCb = cb;
	}
	this.bindClose = function(cb){//接收onclose的回调
		closeCb = cb;
	}
	this.sendMessage = function(data){//发送消息的方法
		if(plume.plumeSocket){
			plume.plumeSocket.send(JSON.stringify(data));
		}
	}
	this.regEvent = function(eventName , eventCb){
		plume.eventList[eventName] = eventCb;
	}
	this.heartbeatTest = function(){
		setInterval(function(){
			var currentTime = Date.parse(new Date());
			if(currentTime - prevSuccessReceiveEventTime >= heartbeatTime){
				isConnected = 0;//reset init
				var fullData = {
					url:'plumeWSService/cluster/ping',
					data:'ping'
				};
				plume.sendMessage(fullData);
				setTimeout(function(){
					if(isConnected == 0){
						plume.connect();//重连
					}else{
						console.log("heartbeat test success ...");
					}
				} , 1500);
			}
		} , 2000);
	}
	this.ajax = function(options) {
		options = options || {};
		if (!options.url || !options.callback) {
			throw new Error("参数不合法");
		}

		//创建 script 标签并加入到页面中
		var callbackName = ('jsonp_' + Math.random()).replace(".", "");
		var oHead = document.getElementsByTagName('head')[0];
		options.data[options.callback] = callbackName;
		var params = plume.formatParams(options.data);
		var oS = document.createElement('script');
		oHead.appendChild(oS);

		//创建jsonp回调函数
		window[callbackName] = function (json) {
			oHead.removeChild(oS);
			clearTimeout(oS.timer);
			window[callbackName] = null;
			options.success && options.success(json);
		};

		//发送请求
		oS.src = options.url + '?' + params;

		//超时处理
		if (options.time) {
			oS.timer = setTimeout(function () {
				window[callbackName] = null;
				oHead.removeChild(oS);
				options.fail && options.fail({ message: "timeout" });
			}, options.time);
		}
	};
	//ajax格式化参数
	this.formatParams = function(data) {
		var arr = [];
		for (var name in data) {
			arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
		}
		return arr.join("&");
	}
}