/**
 * Created by Administrator on 2015/12/13.
 */
define([
    "config/app"
],function(app){
    app.controller("backToPreviousCtrl",["$scope",function($scope){
        $scope.backToPrevious = function() {
            window.history.back();
        }
    }]);
});