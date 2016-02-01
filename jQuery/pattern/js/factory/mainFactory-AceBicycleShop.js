/**
 * Created by Administrator on 2015/10/31.
 */
require.config({
    baseUrl:"../../",
    paths:{
        "jquery":"lib/jQuery/jquery-1.11.3",
        "ExtendUtil":"jQuery/pattern/utils/ExtendUtil",
        "InterfaceUtil":"jQuery/pattern/utils/InterfaceUtil",
        "BicycleInterface":"jQuery/pattern/js/factory/mainFactory-BicycleInterface",
        "Speedster":"jQuery/pattern/js/factory/mainFactory-Speedster",
        "BicycleShop":"jQuery/pattern/js/factory/mainFactory-BicycleShop"
    }
});
define([
    "jquery",
    "ExtendUtil",
    "InterfaceUtil",
    "BicycleInterface",
    "Speedster",
    "BicycleShop"
],function($,extend,Interface,BicycleInterface,Speedster,BicycleShop){
    /**
     * simple factory for creating bicycle
     * @param model
     * @returns {*}
     * @private
     */
    var _BicycleFactory = function(model){
        var bicycle = null;
        /*
            factory for bicycle build
        */
        switch(model){
            case "the Speedster":
                bicycle = new Speedster();
                break;
            case "the Lowrider":
                bicycle = new Lowrider();
                break;
            case "the Comfort Cruiser":
            default:
                bicycle = new ComfortCruiser();
                break;
        }
        Interface.ensureImplements(bicycle,BicycleInterface);
        return bicycle;
    };
    var AceBicycleShop = function(){
        console.info("AceBicycleShop constructor");
    };
    extend(AceBicycleShop,BicycleShop);
    AceBicycleShop.prototype.createBicycle = function(model){
        return _BicycleFactory(model);
    };
    return AceBicycleShop;
});