/**
 * Created by Administrator on 2015/9/20.
 */
window.onload = function(){
    function inheritPrototype(SubType, SuperType){
        var prototype = Object(SuperType.prototype);
        prototype.constructor = SubType;
        SubType.prototype = prototype;
        /**
         * add superClass to SubType
         */
        SubType.superClass = SuperType.prototype;
        if(SuperType.prototype.constructor == Object.prototype.constructor){
            SuperType.prototype.constructor = SubType.superClass;
        }
    }
    function Object(obj){
        function F(){}
        F.prototype = obj;
        return new F();
    }
    function EventTarget(){
        this.handlers = {};
    }
    EventTarget.prototype = {
        constructor:EventTarget,
        addHandler:function(type, handler){
            console.info("addHandler");
            if(typeof this.handlers[type] == "undefined"){
                this.handlers[type] = [];
            }
            this.handlers[type].push(handler);
        },
        removeHandler:function(type, handler){
            console.info("removeHandler");
            if(this.handlers[type] instanceof Array){
                var handlers = this.handlers[type];
                for(var i = 0,len = handlers.length; i < len; i++){
                    if(handlers[i] === handler){
                        break;
                    }
                }
                handlers.splice(i,1);
            }
        },
        fire:function(event){
            console.info("fire");
            if(!event.target){
                event.target = this;
            }
            if(this.handlers[event.type] instanceof Array){
                var handlers = this.handlers[event.type];
                for(var i = 0,len = handlers.length; i < len; i++){
                    handlers[i](event);
                }
            }
        }
    };
    function handleMessage(event){
        console.info("Message received:"+event.message);
    }
    var target = new EventTarget();
    target.addHandler("message",handleMessage);
    target.fire({type:"message",message:"Hello listner"});
    target.removeHandler("message",handleMessage);
    function PersonListener(name, age){
        EventTarget.call(this);
        this.name = name;
        this.age = age;
    }
    inheritPrototype(PersonListener,EventTarget);
    PersonListener.prototype.say = function(message){
        this.fire({type:"message",message:message});
    };
    function PersonHandler(event){
        console.info(event.target.name+"say:"+event.message);
    }
    function PersonHandlerTo(event){
        console.info(event.target.name+"say:--->"+event.message);
    }
    var person = new PersonListener("thomas",12);
    person.addHandler("message",PersonHandler);
    person.addHandler("message",PersonHandlerTo);
    person.say("love the world");
};
