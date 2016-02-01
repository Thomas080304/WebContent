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
     * abstract class
     * @constructor
     */
    var BicycleShop = function(){
        console.info("BicycleShop constructor");
    };
    BicycleShop.prototype = {
        constructor:BicycleShop,
        sellBicycle:function(model){
            var bicycle = this.createBicycle(model);
            bicycle.assemble();
            bicycle.wash();
            return bicycle;
        },
        createBicycle:function(model){
            throw new Error("could not use the abstract method");
        }
    };
    return BicycleShop;
});