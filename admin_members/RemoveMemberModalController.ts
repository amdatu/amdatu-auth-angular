/// <reference path="../typescriptDefinitions/libs.d.ts" />

class RemoveMemberModalController {
    static $inject = ['$modalInstance', 'member'];

    member : Member;

    constructor(private $modalInstance : ng.ui.bootstrap.IModalServiceInstance, member) {

        this.member = member;
    }

    ok() {
        this.$modalInstance.close(true);
    }

    cancel() {
        this.$modalInstance.dismiss(false);
    }

}

export = RemoveMemberModalController
