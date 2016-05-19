require.config({
    baseUrl: './',
    paths: {
        'angular': 'js/angular-1.3.0',
        'angular-ui-router': 'js/angular-ui-router',
        'angular-async-loader': 'js/angular-async-loader',
        'angular-animate':'js/angular-animate'
    },
    shim: {
        'angular': {exports: 'angular'},
        'angular-ui-router': {deps: ['angular']},
        'angular-animate': {deps: ['angular']}
    }
});

require(['angular', 'config/app-routes'], function (angular) {
    angular.element(document).ready(function () {
        angular.bootstrap(document, ['app']);
        angular.element(document).find('html').addClass('ng-app');
    });
});
