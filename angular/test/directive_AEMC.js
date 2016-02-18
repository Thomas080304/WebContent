/**
 * Created by Administrator on 2016/1/11.
 */
var myModule = angular.module("MyModule",[]);
myModule.directive("hello",function(){
    return {
        restrict:"AEMC",
        template:"<div>Hi everyone!</div>",
        replace:true
    };
});