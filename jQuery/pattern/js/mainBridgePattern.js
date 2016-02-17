/**
 * Created by Administrator on 2015/10/31.
 */
require.config({
    baseUrl:"../../",
    paths:{
        "jquery":"lib/jQuery/jquery-1.11.3",
        "XHRUtil":"jQuery/pattern/utils/XHRUtil"
    }
});
define([
    "jquery",
    "XHRUtil"
],function($,XHRUtil){
    Function.prototype.method = function(name,fn){
        if(arguments.length != 2){
            throw new Error("need two arguments");
        }
        this.prototype[name] = fn;
        return this;
    };
    if(true){
        Array.method("forEach",function(fn,context){
            var scope = context || window;
            for(var i = 0,len = this.length; i < len; i++){
                fn.call(scope,this[i],i,this);
            }
        });
    }
    if(true){
        Array.method("filter",function(fn,context){
            var scope = context || window;
            var a = [];
            for(var i = 0,len = this.length; i < len; i++){
                if(!fn.call(scope,this[i],i,this)){
                //利用函数的返回值不同来
                //如果是自身则返回undefined，
                //如果不是自己则返回一个函数，函数也是对象
                    continue;
                }
                a.push(this[i]);
            }
            return a;
        });
    }
    window.DED = window.DED || {};
    DED.util = DED.util || {};
    DED.util.Observer  = function(){
        console.info("Observer constructor");
        this.fns = [];
    };
    DED.util.Observer.prototype = {
        constructor:DED.util.Observer,
        subscribe:function(fn){
            this.fns.push(fn);
        },
        unsubscribe:function(fn){
            this.fns = this.fns.filter(function(el){
                if(el != fn){
                    return el;
                }
            });
        },
        fire:function(o){
            this.fns.forEach(function(el){
                el(o);
            });
        }
    };
    DED.Queue = function(){
        this.queue = [];
        this.onComplete = new DED.util.Observer();
        this.onFailure = new DED.util.Observer();
        this.onFlush = new DED.util.Observer();
        this.timeout = 100;
        this.retryCount = 3;
        this.currentRetry = 0;
        this.paused = false;
        this.conn = null;
        this.timer = {};
    };
    DED.Queue
        .method("setRetryCount",function(count){
            this.retryCount = count;
        })
        .method("setTimeout",function(time){
            this.timeout = time;
        })
        .method("flush",function(){
            if(! this.queue.length > 0){
                return;
            }
            if(this.paused){
                this.paused = false;
                return;
            }
            var that = this;
            this.currentRetry++;
            var abort = function(){
                that.conn.abort();
                if(that.currentRetry == that.retryCount){
                    that.onFailure.fire();
                    that.currentRetry = 0;
                }else{
                    that.flush();
                }
            };
            this.timer = window.setTimeout(abort,this.timeout);
            var callback = function(o){
                window.clearTimeout(that.timer);
                that.currentRetry = 0;
                that.queue.shift();
                that.onFlush.fire(o);
                if(that.queue.length == 0){
                    that.onComplete.fire();
                    return;
                }
                that.flush();
            };
            this.conn = XHRUtil.sendRequest(
                this.queue[0].method,
                this.queue[0].uri,
                callback,
                this.queue[0].param
            );
        })
        .method("add",function(o){
            this.queue.push(o);
        })
        .method("dequeue",function(){
            this.queue.pop();
        })
        .method("pause",function(){
            this.paused = true;
        })
        .method("clear",function(){
            this.queue = [];
        });
    return window.DED;
});