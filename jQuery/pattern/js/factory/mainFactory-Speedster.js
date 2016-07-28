/**
 * Created by Administrator on 2015/10/31.
 */
require.config({
    baseUrl:"../../",
    paths:{
        "jquery":"lib/jQuery/jquery-1.11.3",
        "InterfaceUtil":"jQuery/pattern/utils/InterfaceUtil",
        "BicycleInterface":"jQuery/pattern/js/factory/mainFactory-BicycleInterface"
    }
});
//可以在每个实例中测试是否实现了当前的Interface
//缺点：在模块化中代码太分散
define([
    "jquery",
    "InterfaceUtil",
    "BicycleInterface"
],function($, InterfaceUtil, BicycleInterface){
    /**
     * implements BicycleInterface
     * @constructor
     */
    var Speedster = function(){
        Interface.ensureImplements(this,BicycleInterface);
        console.info("Speedster constructor");
    };
    Speedster.prototype = {
        constructor:Speedster,
        assemble:function(){
            console.info("assemble");
        },
        wash:function(){
            console.info("wash");
        },
        ride:function(){
            console.info("ride");
        },
        repair:function(){
            console.info("repair");
        }
    };
    return Speedster;
});