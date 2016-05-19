define([
    "angular",
    "angular-async-loader",
    "require",
    "exports",
    "module",
    "angular-ui-router"
],function (angular,asyncLoader,require, exports, module) {
//    var angular = require('angular');
//    var asyncLoader = require('angular-async-loader');
//
//    require('angular-ui-router');

    var app = angular.module('app', ['ui.router']);

    asyncLoader.configure(app);

    module.exports = app;
});
