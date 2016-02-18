/**
 * Created by Administrator on 2016/1/11.
 */
var myModule = angular.module("MyModule",[]);
myModule.controller("MyCtrl",["$scope",function($scope){
    $scope.loadData = function(){
        console.log("data1111");
    };
}]);
myModule.controller("MyCtrl2",["$scope",function($scope){
    $scope.loadData2 = function(){
        console.log("data222");
    };
}]);
myModule.directive("hello",function(){
    return {
        restrict:"AE",
        link:function(scope,element,attrs){
            scope.$apply(attrs.howtoload);
        }
    };
});
