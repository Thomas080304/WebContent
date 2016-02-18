define(function (require) {
    var app = require('config/app');

    app.controller('homeCtrl', ['$scope', function($scope) {
        $scope.name = 'Home';
    }]);
});
