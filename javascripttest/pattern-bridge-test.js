window.onload = function(){
    var asyncRequest = function(){
        function handleRequestState(xhr, callback){
            var poll = window.setInterval(function(){
                if(xhr && xhr.readyState == 4){
                    window.clearInterval(poll);
                    if(callback){
                        callback(xhr);
                    }
                }
            },100);
        }
        var getXHR = function(){
            var http;
            try{
                http = new XMLHttpRequest();
                getXHR = function(){
                    return new XMLHttpRequest();
                };
            }catch(ex){

            }
            return http;
        };
        return function(method, uri, callback, postData){
            var xhr = getXHR();
            xhr.open(method, uri, true);
            handleRequestState(xhr,callback);
            xhr.open(postData || null);
        };
    };
    Function.prototype.method = function(name,fn){
        this.prototype[name] = fn;
        return this;
    };
    if(!Array.prototype.forEach){
        Array.method("forEach",function(fn, context){
            var scope = context||window;
            for(var i = 0, len = this.length; i < len; i++){
                fn.call(scope, this[i], i, this);
            }
        });
    }
    if(!Array.prototype.filter){
        Array.method("filter",function(fn, context){
            var scope = context||window;
            var a = [];
            for(var i = 0, len = this.length; i < len; i++){
                if(!fn.call(scope, this[i], i, this)){
                    continue;
                }
                a.push(this[i]);
            }
            return a;
        })
    }
    window.DED = window.DED || {};
    DED.util = DED.util || {};
    DED.util.Observer = function(){
        this.fns = [];
    };
    DED.util.Observer.prototype = {
        subscribe:function(fn){
            this.fns.push(fn);
        },
        unsubscribe:function(fn){
            this.fns.filter(function(el){
                if(el !== fn){
                    return el;
                }
            });
        },
        fire:function(o){
            this.fns.forEach(function(){
                el(o);
            });
        }
    };
    DED.Queue = function(){
        this.queue = [];
        this.onComplete = new DED.util.Observer;
        this.onFailure = new DED.util.Observer;
        this.onFlush = new DED.util.Observer;
        this.retryCount = 3;
        this.currentRetry = 0;
        this.paused = false;
        this.timeout = 50000;
        this.conn = {};
        this.timer = {};
    };
    DED.Queue.
        method("flush",function(){
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
            that.timer = window.setTimeout(abort, this.timeout);
            var callback = function(o){
                window.clearTimeout(that.timer);
                that.currentRetry = 0;
                that.queue.shift();
                that.onFlush.fire(o.responseText);
                if(that.queue.length == 0){
                    that.onComplete.fire();
                    return;
                }
                that.flush();
            };
            this.conn = asyncRequest(
                this.queue[0]["method"],
                this.queue[0]["uri"],
                callback,
                this.queue[0]["param"]
            );
        }).
        method("setRetryCount",function(count){
           this.retryCount = count;
        }).
        method("setTimeout",function(time){
            this.timeout = time;
        }).
        method("add",function(o){
            this.queue.push(o);
        }).
        method("pause",function(){
            this.paused = true;
        }).
        method("dequeue",function(){
            this.queue.pop();
        }).
        method("clear",function(){
            this.queue = [];
        });
};