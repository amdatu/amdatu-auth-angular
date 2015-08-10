/// <reference path="../typescriptDefinitions/libs.d.ts" />
define(["require", "exports"], function (require, exports) {
    var MemberEditController = (function () {
        function MemberEditController(membersService, loginService, $routeParams, $location, $modal) {
            var _this = this;
            this.membersService = membersService;
            this.loginService = loginService;
            this.$routeParams = $routeParams;
            this.$location = $location;
            this.$modal = $modal;
            this.loginService.adminCheck();
            var memberId = $routeParams['memberId'];
            this.memberId = memberId;
            if (memberId != 'new') {
                membersService.getMember(memberId).subscribe(function (member) {
                    _this.selected = member;
                    console.log(member);
                });
            }
            else {
                this.selected = {};
            }
        }
        MemberEditController.prototype.save = function () {
            var _this = this;
            this.membersService.saveMember(this.selected).subscribe(function () {
                _this.back();
            });
        };
        MemberEditController.prototype.delete = function () {
            var _this = this;
            var memberToDelete = this.selected;
            var modalInstance = this.$modal.open({
                templateUrl: 'myModalContent.html',
                controller: 'RemoveMemberModalController',
                controllerAs: 'modalController',
                resolve: {
                    member: function () {
                        return memberToDelete;
                    }
                }
            });
            modalInstance.result.then(function () {
                _this.membersService.deleteMember(memberToDelete._id).subscribe(function () { return _this.back(); });
            });
        };
        MemberEditController.prototype.back = function () {
            this.$location.path('admin/members');
        };
        MemberEditController.$inject = ['MembersService', 'LoginService', '$routeParams', '$location', '$modal'];
        return MemberEditController;
    })();
    return MemberEditController;
});
