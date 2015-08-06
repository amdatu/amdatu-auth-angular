/// <reference path="../typescriptDefinitions/libs.d.ts"/>
import LoginService = require('login/LoginService');

class ExampleController {
    static $inject = ['LoginService', '$location', '$rootScope'];

    member : Member;

    constructor(private loginService : LoginService) {
        loginService.getMember().subscribe(member => this.member = member);

    }
}

export = ExampleController;