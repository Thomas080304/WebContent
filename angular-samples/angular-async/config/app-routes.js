define([
    "config/app"
],function (app) {
 
    app.run(['$state', '$stateParams', '$rootScope', function ($state, $stateParams, $rootScope) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }]);

    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'app/home/home.html',
                 // new attribute for ajax load controller
                controllerUrl: 'app/home/homeCtrl',
                controller: 'homeCtrl'
            })
            .state('users', {
                url: '/users',
                templateUrl: 'app/users/users.html',
                 // new attribute for ajax load controller
                controllerUrl: 'app/users/usersCtrl',
                controller: 'usersCtrl'//,
                // load more controllers, services, filters, ...
                //dependencies: ['app/services/usersService']
            });
    }]);
});
