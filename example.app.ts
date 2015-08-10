/// <reference path="typescriptDefinitions/libs.d.ts" />
/// <amd-dependency path="angular-route"/>
/// <amd-dependency path="amdatu.auth"/>

import angular = require('angular')
import ExampleController = require('example/ExampleController');


var ngModule: ng.IModule = angular.module('example.app', ['amdatu.auth']);

ngModule.controller('ExampleController', ExampleController);
ngModule.constant('BASE_URL', 'http://localhost:8080');

ngModule.config(['$routeProvider', ($routeProvider : ng.route.IRouteProvider) => {
    $routeProvider.when('/main', {
        templateUrl: 'example/views/main.html',
        controller: 'ExampleController',
        controllerAs: 'exampleController'
    });
}]);

export = ngModule;