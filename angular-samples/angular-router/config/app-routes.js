define([
    "config/app"
],function (app) {
    //cache
    app.run(['$state', '$stateParams', '$rootScope', function ($state, $stateParams, $rootScope) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }]);

    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/index');

        $stateProvider
            .state('index', {
                url: '/index',
                views: {
                    '': {
                        templateUrl: 'app/index/index.html'
                    },
                    'topbar@index': {
                        templateUrl: 'app/toolbar/topbar.html'
                    },
                    'main@index': {
                        templateUrl: 'app/home/home.html'
                    }
                }
            })
            .state('index.usermng', {
                url: '/usermng',
                views: {
                    'main@index': {
                        templateUrl: 'app/users/usermng.html',
                        controllerUrl: 'app/users/addUserTypeCtrl',
                        controller: 'addUserTypeCtrl'
                    }
                }
            })
            .state('index.usermng.highendusers', {
                url: '/highendusers',
                templateUrl: 'app/users/highendusers.html'
            })
            .state('index.usermng.normalusers', {
                url: '/normalusers',
                templateUrl: 'app/users/normalusers.html',
                controllerUrl: 'app/users/normalUsersCtrl',
                controller: 'normalUsersCtrl'
            })
            .state('index.usermng.lowusers', {
                url: '/lowusers',
                templateUrl: 'app/users/lowusers.html'
            })
            .state('index.usermng.addusertype', {
                url: '/addusertype',
                templateUrl: 'app/users/addusertypeform.html',
                controllerUrl: 'app/users/backToPreviousCtrl',
                controller: 'backToPreviousCtrl'
//                controller: function($scope, $state) {
//                    $scope.backToPrevious = function() {
//                        window.history.back();
//                    }
//                }
            })
            .state('index.permission', {
                url: '/permission',
                views: {
                    'main@index': {
                        template: '这里是权限管理'
                    }
                }
            })
            .state('index.report', {
                url: '/report',
                views: {
                    'main@index': {
                        template: '这里是报表管理'
                    }
                }
            })
            .state('index.settings', {
                url: '/settings',
                views: {
                    'main@index': {
                        template: '这里是系统设置'
                    }
                }
            });
//            .state('users', {
//                url: '/users',
//                templateUrl: 'app/users/users.html',
//                 // new attribute for ajax load controller
//                controllerUrl: 'app/users/usersCtrl',
//                controller: 'usersCtrl'//,
//                // load more controllers, services, filters, ...
//                //dependencies: ['app/services/usersService']
//            });
    }]);
});
