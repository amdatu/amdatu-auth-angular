// <reference path="typeScriptDefenitions/libs.d.ts" />

import LoginService = require('LoginService')

class PasswordResetController {

    static $inject = ['LoginService', '$location', '$routeParams'];

    email : string;
    showProceed : boolean;
    showSucceeded : boolean;
    token : string;
    password : string;
    password2 : string;

    constructor(private loginService : LoginService, private $location : ng.ILocationService, private $routeParams : ng.route.IRouteService) {
        if($routeParams['token']) {
            this.token = $routeParams['token'];
        }
    }

    reset() {
        this.loginService.reset(this.email).subscribe(() => {
            this.email = null;
            this.showProceed = true;
        });
    }

    confirm() {
        this.loginService.confirmPasswordReset(this.token, this.password).subscribe(() => {
            this.showSucceeded = true;
        });
    }
}

export = PasswordResetController

