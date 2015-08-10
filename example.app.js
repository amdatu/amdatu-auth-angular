/// <reference path="typescriptDefinitions/libs.d.ts" />
/// <amd-dependency path="angular-route"/>
/// <amd-dependency path="amdatu.auth"/>
define(["require", "exports", 'angular', 'example/ExampleController', "angular-route", "amdatu.auth"], function (require, exports, angular, ExampleController) {
    var ngModule = angular.module('example.app', ['amdatu.auth']);
    ngModule.controller('ExampleController', ExampleController);
    ngModule.constant('BASE_URL', 'http://localhost:8080');
    ngModule.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/main', {
            templateUrl: 'example/views/main.html',
            controller: 'ExampleController',
            controllerAs: 'exampleController'
        });
    }]);
    return ngModule;
});
