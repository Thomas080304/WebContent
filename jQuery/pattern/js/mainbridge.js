/**
 * Created by Administrator on 2015/11/1.
 */
require.config({
    baseUrl:"../../",
    paths:{
        "jquery":"lib/jQuery/jquery-1.11.3",
        "EventUtil":"web/jQuery/utils/EventUtil",
        "mainBridgePattern":"web/jQuery/js/mainBridgePattern"
    }
});
define([
    "jquery",
    "EventUtil",
    "../../../web/jQuery/js/mainBridgePattern"
],function($,EventUtil,DED){
    var q = new DED.Queue();
    q.setRetryCount(3);
    q.setTimeout(100);
    var item = document.getElementById("items");
    var result = document.getElementById("results");
    var queue = document.getElementById("queue-items");
    var add = document.getElementById("adds");
    var requests = [];
    q.onFlush.subscribe(function(data){
        requests.innerHTML = data;
        requests.shift();
        queue.innerHTML = requests.toString();
    });
    q.onFailure.subscribe(function(){
        requests.innerHTML += '<span style="color:#ff0000;">Connection Failure</span>';
    });
    q.onComplete.subscribe(function(){
        requests.innerHTML += '<span style="color:#008000;">Complete</span>';
    });
    var actionDispatcher = function(element){
        switch(element){
            case "flush":
                q.flush();
                break;
            case "dequeue":
                q.dequeue();
                requests.pop();
                queue.innerHTML = requests.toString();
                break;
            case "pause":
                q.pause();
                break;
            case "clear":
                q.clear();
                requests = [];
                queue.innerHTML = "";
                break;
        }
    };
    EventUtil.addHandler(item,"click",function(){
        var e = EventUtil.getEvent();
        var src = EventUtil.getTarget(e);
        EventUtil.preventDefault(e);
        actionDispatcher(src.id);
    });
    var addRequst = function(request){
        var data = request.split("-")[1];
        q.add({
            method:"GET",
            uri:"www.baidu.com",
            param:null
        });
        requests.push(data);
        queue.innerHTML = requests.toString();
    };
    EventUtil.addHandler(add,"click",function(e){
        var e = EventUtil.getEvent();
        var src = EventUtil.getTarget(e);
        EventUtil.preventDefault(e);
        addRequst(src.id);
    });
});