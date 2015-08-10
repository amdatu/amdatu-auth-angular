define(["require", "exports"], function (require, exports) {
    var ExampleController = (function () {
        function ExampleController(loginService) {
            var _this = this;
            this.loginService = loginService;
            loginService.getMember().subscribe(function (member) { return _this.member = member; });
        }
        ExampleController.$inject = ['LoginService', '$location', '$rootScope'];
        return ExampleController;
    })();
    return ExampleController;
});
