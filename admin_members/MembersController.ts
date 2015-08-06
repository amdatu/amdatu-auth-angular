/// <reference path="../typescriptDefinitions/libs.d.ts" />

import MembersService = require('MembersService');
import LoginService = require('login/LoginService');

class MembersController {
    static $inject = ['MembersService', 'LoginService', '$location'];

    members : Member[];
    selected : Member;

    constructor(private membersService : MembersService, private loginService : LoginService, private $location : ng.ILocationService) {

        loginService.adminCheck();

        this.listMembers();
    }

    private listMembers() {
        this.membersService.listMembers().subscribe(members => {
           this.members = members;
        });
    }

    edit(member : Member) {
        this.$location.path('admin/members/' + member._id);
    }
}

export = MembersController
