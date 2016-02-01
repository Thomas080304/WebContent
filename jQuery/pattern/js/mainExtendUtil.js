/**
 * Created by Administrator on 2015/10/31.
 */
require.config({
    baseUrl:"../../",
    paths:{
        "jquery":"lib/jQuery/jquery-1.11.3",
        "ExtendUtil":"web/jQuery/utils/ExtendUtil"
    }
});
define([
    "jquery",
    "ExtendUtil"
],function($,extend){
    function SuperType(name){
        this.superName = name;
        this.colors = ["red","blue","green"];
    }
    function SubType(age,name){
        SubType.SuperClass.constructor.call(this,name);
    }
    extend(SubType,SuperType);
    new SubType(100,"tt");
});