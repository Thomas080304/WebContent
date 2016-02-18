/**
 * Created by Administrator on 2015/12/13.
 */
define([
    "config/app"
],function(app){
    //var $state = app.get("$state");
    app.controller("addUserTypeCtrl",["$scope","$state",function($scope,$state){
        $scope.addUserType = function() {
            $state.go("index.usermng.addusertype");
        }
    }]);
});