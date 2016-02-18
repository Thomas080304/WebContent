/**
 * Created by Administrator on 2015/12/13.
 */
define([
    "config/app",
    "app/services/normalUsersService"
],function (app) {
    // dynamic load services here or add into dependencies of state config
    // require('../services/usersService');
    app.controller('normalUsersCtrl', [
        '$scope',
        'normalUsersService',
        function ($scope,normalUsersService) {
        $scope.userList = normalUsersService.list();
    }]);

});