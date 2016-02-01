/**
 * Created by Administrator on 2015/10/31.
 */
require.config({
    baseUrl:"../../",
    paths:{
        "jquery":"lib/jQuery/jquery-1.11.3"
    }
});
define([
    "jquery"
],function($){
    /**
     * implements BicycleInterface
     * @constructor
     */
    var Speedster = function(){
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