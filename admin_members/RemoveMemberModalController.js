/// <reference path="../typescriptDefinitions/libs.d.ts" />
define(["require", "exports"], function (require, exports) {
    var RemoveMemberModalController = (function () {
        function RemoveMemberModalController($modalInstance, member) {
            this.$modalInstance = $modalInstance;
            this.member = member;
        }
        RemoveMemberModalController.prototype.ok = function () {
            this.$modalInstance.close(true);
        };
        RemoveMemberModalController.prototype.cancel = function () {
            this.$modalInstance.dismiss(false);
        };
        RemoveMemberModalController.$inject = ['$modalInstance', 'member'];
        return RemoveMemberModalController;
    })();
    return RemoveMemberModalController;
});
