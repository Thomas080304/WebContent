/**
 * Created by Administrator on 2015/10/31.
 */
require.config({
    baseUrl:"../../",
    paths:{
        "jquery":"lib/jQuery/jquery-1.11.3",
        "AceBicycleShop":"jQuery/pattern/js/factory/mainFactory-AceBicycleShop"
    }
});
define([
    "jquery",
    "AceBicycleShop"
],function($,AceBicycleShop){
    var aceBicycleShop = new AceBicycleShop();
    aceBicycleShop.sellBicycle("the Speedster");
});