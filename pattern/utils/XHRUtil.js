/**
 * Created by Administrator on 2015/10/31.
 */
define([

],function(){
    var _handleResponse = function(xhr,callback){
        var poll = window.setInterval(function(){
            if(xhr && xhr.readyState == 4){
                window.clearInterval(poll);
                if(callback){
                    callback(xhr);
                }
            }
        },50);
    };
    var XHRUtil = {
        sendRequest:function(method,url,callback,data){
            var methodFlag = false,
                xhr = XHRUtil.xhrFactory();
            _handleResponse(xhr,callback);
            if(method.toUpperCase() === "GET"){
                data = null;//need format
            }
            if(method.toUpperCase() === "POST"){
                methodFlag = true;
            }
            xhr.open(method,url,methodFlag);
            xhr.send(data || null);
            return xhr;
        },
        xhrFactory:function(){
            if(typeof XMLHttpRequest != "undefined"){
                return new XMLHttpRequest();
            }else if(typeof ActiveXObject != "undefined"){
                if(typeof arguments.callee.activeXString != "string"){
                    var version = ["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"],
                        i,len;
                    for(i = 0,len = version.length; i < len; i++){
                        try{
                            new ActiveXObject(version[i]);
                            arguments.callee.activeXString = version[i];
                            break;
                        }catch (ex){
                           continue;
                        }
                    }
                    return new ActiveXObject(arguments.callee.activeXString);
                }
            }else{
                throw new Error("NO XHR Object avaliable");
            }
        },
        xhrLazyload:function(){
            if(typeof XMLHttpRequest != "undefined"){
                xhrLazyload = function(){
                    return new XMLHttpRequest();
                }
            }else if(typeof ActiveXObject != "undefined"){
                xhrLazyload = function(){
                    if(typeof arguments.callee.activeXString != "string"){
                        var version = ["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"],
                            i,len;
                        for(i = 0,len = version.length; i < len; i++){
                            try{
                                new ActiveXObject(version[i]);
                                arguments.callee.activeXString = version[i];
                                break;
                            }catch (ex){
                               continue;
                            }
                        }
                        return new ActiveXObject(arguments.callee.activeXString);
                    }
                }
            }else{
                xhrLazyload = function(){
                    throw new Error("NO XHR Object avaliable");
                }
            }
            return xhrLazyload();
        },
        xhrLoadClosure:(function(){
            if(typeof XMLHttpRequest != "undefined"){
                return function(){
                    return new XMLHttpRequest();
                }
            }else if(typeof ActiveXObject != "undefined"){
                return function(){
                    if(typeof arguments.callee.activeXString != "string"){
                        var version = ["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"],
                            i,len;
                        for(i = 0,len = version.length; i < len; i++){
                            try{
                                new ActiveXObject(version[i]);
                                arguments.callee.activeXString = version[i];
                                break;
                            }catch (ex){
                                continue;
                            }
                        }
                        return new ActiveXObject(arguments.callee.activeXString);
                    }
                }
            }else{
                return function(){
                    throw new Error("NO XHR Object avaliable");
                }
            }
        })()
    };
    return XHRUtil;
});
