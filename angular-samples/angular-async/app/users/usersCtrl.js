define([
    "config/app",
    "app/services/usersService"
],function (app) {
    // dynamic load services here or add into dependencies of state config
    // require('../services/usersService');
    app.controller('usersCtrl', ['$scope', function ($scope) {
        $scope.userList = app.get('usersService').list();
    }]);

});
