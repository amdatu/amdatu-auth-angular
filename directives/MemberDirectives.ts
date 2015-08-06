/// <reference path="../typescriptDefinitions/libs.d.ts" />

import angular = require("angular");
import LoginService = require("login/LoginService");

var directiveModule = angular.module('MemberDirectives',[]);

directiveModule.directive("admin", ['LoginService', (loginService : LoginService) => {
    return {
        restrict: "E",
        transclude: true,
        template: "<div ng-if='isAdmin'><ng-transclude></ng-transclude></div>",
        link: function($scope, element, attrs) {
            loginService.isAdmin().subscribe((isAdmin) => {
                $scope['isAdmin'] = isAdmin;
                console.log(isAdmin);
            });
        }
    }
}]);

