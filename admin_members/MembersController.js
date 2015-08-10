/// <reference path="../typescriptDefinitions/libs.d.ts" />
define(["require", "exports"], function (require, exports) {
    var MembersController = (function () {
        function MembersController(membersService, loginService, $location) {
            this.membersService = membersService;
            this.loginService = loginService;
            this.$location = $location;
            loginService.adminCheck();
            this.listMembers();
        }
        MembersController.prototype.listMembers = function () {
            var _this = this;
            this.membersService.listMembers().subscribe(function (members) {
                _this.members = members;
            });
        };
        MembersController.prototype.edit = function (member) {
            this.$location.path('admin/members/' + member._id);
        };
        MembersController.$inject = ['MembersService', 'LoginService', '$location'];
        return MembersController;
    })();
    return MembersController;
});
