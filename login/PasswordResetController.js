/// <reference path="../typescriptDefinitions/libs.d.ts" />
define(["require", "exports"], function (require, exports) {
    var PasswordResetController = (function () {
        function PasswordResetController(loginService, $location, $routeParams) {
            this.loginService = loginService;
            this.$location = $location;
            this.$routeParams = $routeParams;
            if ($routeParams['token']) {
                this.token = $routeParams['token'];
            }
        }
        PasswordResetController.prototype.reset = function () {
            var _this = this;
            this.loginService.reset(this.email).subscribe(function () {
                _this.email = null;
                _this.showProceed = true;
            });
        };
        PasswordResetController.prototype.confirm = function () {
            var _this = this;
            this.loginService.confirmPasswordReset(this.token, this.password).subscribe(function () {
                _this.showSucceeded = true;
            });
        };
        PasswordResetController.$inject = ['LoginService', '$location', '$routeParams'];
        return PasswordResetController;
    })();
    return PasswordResetController;
});
