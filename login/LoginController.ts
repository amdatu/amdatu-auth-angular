/// <reference path="../typescriptDefinitions/libs.d.ts"/>

import LoginService = require('login/LoginService');

class LoginController {
    email : string;
    password : string;
    error = false;
    accountCreated = false;
    passwordReset = false;

    static $inject = ['LoginService', '$location', '$rootScope'];

    constructor(private loginService : LoginService, private $location : ng.ILocationService, private $rootScope : ng.IRootScopeService) {
        var accountCreated = $location.search()['accountcreated'];
        if(accountCreated) {
            this.accountCreated = true;
        }
        var passwordReset = $location.search()['passwordreset'];
        if (passwordReset) {
            this.passwordReset = true;
        }

    }

    login() {
        this.loginService.loginUsingEmail(this.email, this.password).subscribe((loginResult) => {
            this.$location.path("/");

        }, (e) => {
            this.error = true;
        })
    }
}

export = LoginController;