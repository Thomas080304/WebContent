define([
    "config/app"
],function (app) {
 
    app.controller('homeCtrl', ['$scope', function($scope) {
        $scope.name = 'Home';
    }]);
});
