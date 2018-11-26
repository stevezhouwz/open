// TODO handle href
;(function (global) {
    'use strict';

    if (global.ProxyLoad) {
        return;
    }

    var fileRe = /^file:\/\//i,
        protocolsRe = /http:\/\/([^\/]+)\//i,
        hostRe = /[\w.:]+\//i;

    // call executes a callback if it is a function
    function call(callback) {
        if (typeof callback === 'function') {
            callback();
        }
    }

    // ping checks if resource exists at given url
    function ping(url, success, error) {
        var request = new XMLHttpRequest();
        var url = url +  "?timeStamp=" + new Date().getTime();
        request.open(
	        'HEAD', // we don't need the response body
	        url,
	        true // async request
	    );
	    
	   
	    request.onreadystatechange = function () {
	        if (request.readyState === XMLHttpRequest.DONE
	             && request.status === 200) {
	             call(success);
	        } else {
	             call(error);
	        }
	    };
        try{	
	        request.send(null);
        }catch(e){
        	console.log(e);
        }
    }

    // redirect rewrites a dom element src to a given url
    function redirect(element, url, callback,imgUrl) {
    	console.log("替换url------",url);
    	if(imgUrl){
            return function () {
                element.style.backgroundImage = "url("+url+")";
                if(callback){
                    callback();
                }
            }
        }else {
            return function () {
                element.setAttribute('src', url);
                if(callback){
                    callback();
                }
            }
        }
    }

    function ProxyLoad(options) {
        options = options || {};

        // select every nodes we want to rewrite
        var elements = document.querySelectorAll(
            options.selector || 'video'
        );
        for (var i=0; i<elements.length; i++) {
            var element = elements[i];
            if(options.imgUrl){
                console.log("背景图片地址--",options.imgUrl);
                var rep = options.imgUrl.replace(protocolsRe, '');
                var filename = options.filename?options.filename: "video";
                var proxyUrl = options.url + '/'+ filename +"/mt-open"+ rep.substr(rep.lastIndexOf("/"));
                ping(
                    proxyUrl,
                    redirect(element, proxyUrl,options.callback,options.imgUrl),
                    function () {
                        if(options.callback){
                            options.callback();
                        }
                    }
                );
            }else {
                // first we get the element src if it exists...
                if (!element.src) {
                    i++;
                    continue;

                }
                var src = element.src.trim();
                // console.log("---"+src);
                // if src is local is not of our concern
                if (src.match(fileRe)) {
                    i++;
                    continue;
                }
                console.log("原始src--",src);
                var rep = src.replace(protocolsRe, '');
                var filename = options.filename?options.filename: "video";
                var proxyUrl = options.url + '/'+ filename +"/mt-open"+ rep.substr(rep.lastIndexOf("/"));
                // if proxy serves file
                ping(
                    proxyUrl,
                    redirect(element, proxyUrl,options.callback),
                    function () {
                        if(options.callback){
                            options.callback();
                        }

                    }
                );
            }
        }
       
    }

    global.ProxyLoad = ProxyLoad;
})(this);
