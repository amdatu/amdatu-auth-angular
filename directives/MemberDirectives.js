/// <reference path="../typescriptDefinitions/libs.d.ts" />
define(["require", "exports", "angular"], function (require, exports, angular) {
    var directiveModule = angular.module('MemberDirectives', []);
    directiveModule.directive("admin", ['LoginService', function (loginService) {
        return {
            restrict: "E",
            transclude: true,
            template: "<div ng-if='isAdmin'><ng-transclude></ng-transclude></div>",
            link: function ($scope, element, attrs) {
                loginService.isAdmin().subscribe(function (isAdmin) {
                    $scope['isAdmin'] = isAdmin;
                    console.log(isAdmin);
                });
            }
        };
    }]);
});
