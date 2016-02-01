/**
 * Created by Administrator on 2015/10/31.
 */
define([

],function(){
    var Interface = function(name,methods){
        if(arguments.length !=  2){
            throw new Error("arguments != 2");
        }
        this.name = name;
        this.methods = [];
        for(var i = 0,len = methods.length; i < len; i++){
            if(typeof methods[i] !== "string"){
                throw new Error(methods[i]+"is not a string");
            }
            this.methods.push(methods[i]);
        }
    };
    Interface.ensureImplements = function(instance){
        for(var i = 1,len = arguments.length; i < len; i++){
            var interface = arguments[i];
            if(interface.constructor !== Interface){
                throw new Error("please user InterfaceUtil to create interface");
            }
            var methods = interface.methods,
                methlen = methods.length,
                j;
            for(j = 0;j < methlen; j++){
                var method = methods[j];
                if(!instance[method] || typeof instance[method] !== "function"){
                    throw new Error("please implement the method in instance,methodName: "+method);
                }
            }
        }
    };
    return Interface;
});