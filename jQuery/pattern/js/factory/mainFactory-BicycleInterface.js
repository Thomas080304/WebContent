/**
 * Created by Administrator on 2015/10/31.
 */
require.config({
    baseUrl:"../../",
    paths:{
        "jquery":"lib/jQuery/jquery-1.11.3",
        "InterfaceUtil":"web/jQuery/utils/InterfaceUtil"
    }
});
define([
    "jquery",
    "InterfaceUtil"
],function($,Interface){
    var BicycleInterface = new Interface("BicycleInterface",["assemble","wash","ride","repair"]);
    return BicycleInterface;
});