// TODO handle href
;(function (global) {
    'use strict';

    if (global.ProxyLoad1) {
        return;
    }

    var fileRe = /^file:\/\//i,
        protocolsRe = /^(?:https?:)?\/\//i,
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

        request.send(null);
    }

    // redirect rewrites a dom element src to a given url
    function redirect(element, url) {
        return function () {
            element.setAttribute('src', url);
        }
    }

    function ProxyLoad1(options) {
        options = options || {};

        // select every nodes we want to rewrite
        var elements = document.querySelectorAll(
            options.selector || '[data-ProxyLoad1]'
        );

        for (var i=0; i<elements.length; i++) {
            var element = elements[i];

            // first we get the element src if it exists...
            if (!element.src) {
                continue;
            }
            var src = element.src.trim();
            console.log("---"+src);
            // if src is local is not of our concern
            if (src.match(fileRe)) {
                continue;
            }

            //var proxyUrl = options.url + '/' + src.replace(protocolsRe, '');
            var videosrc = src.replace(protocolsRe, '').replace(hostRe, '');
            var arr = videosrc.split("/");
            var proxyUrl = options.url + "/" + "video" + "/" + arr[arr.length-1];
            console.log("---"+proxyUrl);
            // if proxy serves file
            ping(
                proxyUrl,
                redirect(element, proxyUrl),

                function () {
                    //var proxyUrl = options.url + '/' + src.replace(protocolsRe, '').replace(hostRe, '');
                    var videosrc = src.replace(protocolsRe, '').replace(hostRe, '');
                    var arr = videosrc.split("/");
                    var proxyUrl = options.url + "/" + "video" + "/" + arr[arr.length-1];
                    ping(proxyUrl, redirect(element, proxyUrl));
                }
            );

        }
    }

    global.ProxyLoad1 = ProxyLoad1;
})(this);
