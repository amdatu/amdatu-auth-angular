/// <reference path="../typescriptDefinitions/libs.d.ts" />

import MembersService = require('admin_members/MembersService');
import LoginService = require('login/LoginService');

class MemberEditController {
    static $inject = ['MembersService', 'LoginService','$routeParams', '$location', '$modal'];

    selected : Member;
    memberId : string;

    constructor(private membersService : MembersService, private loginService : LoginService, private $routeParams : ng.route.IRouteParamsService, private $location : ng.ILocationService,  private $modal : ng.ui.bootstrap.IModalService) {
        this.loginService.adminCheck();

        var memberId = $routeParams ['memberId'];
        this.memberId = memberId;

        if(memberId != 'new') {
            membersService.getMember(memberId).subscribe(member => {
                this.selected = member;

                console.log(member);
            });
        } else {
            this.selected = {};
        }
    }

    save() {
        this.membersService.saveMember(this.selected).subscribe(() => {
            this.back();
        });

    }

    delete() {
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

        modalInstance.result.then(() => {
            this.membersService.deleteMember(memberToDelete._id).subscribe(() => this.back());
        });
    }

    private back() {
        this.$location.path('admin/members');
    }

}

export = MemberEditController
