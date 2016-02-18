define(function (require) {
    // dynamic load services here or add into dependencies of state config
    // require('../services/usersService');
    var app = require('config/app');

    app.controller('usersCtrl', ['$scope', function ($scope) {
        $scope.userList = app.get('usersService').list();
    }]);

});
