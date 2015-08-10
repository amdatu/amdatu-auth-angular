/// <reference path="../typescriptDefinitions/libs.d.ts"/>
define(["require", "exports"], function (require, exports) {
    var LoginController = (function () {
        function LoginController(loginService, $location, $rootScope) {
            this.loginService = loginService;
            this.$location = $location;
            this.$rootScope = $rootScope;
            this.error = false;
            this.accountCreated = false;
            var accountCreated = $location.search()['accountcreated'];
            if (accountCreated) {
                this.accountCreated = true;
            }
        }
        LoginController.prototype.login = function () {
            var _this = this;
            this.loginService.loginUsingEmail(this.email, this.password).subscribe(function (loginResult) {
                _this.$location.path("main");
            }, function (e) {
                _this.error = true;
            });
        };
        LoginController.$inject = ['LoginService', '$location', '$rootScope'];
        return LoginController;
    })();
    return LoginController;
});
