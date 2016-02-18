/**
 * Created by Administrator on 2016/1/11.
 */
var myModule = angular.module("MyModule",[]);
myModule.directive("hello",function(){
    return {
        restrict:"AE",
        transclude:true,
        template:"<div>Hello Thomas<div ng-transclude></div></div>"
    };
});