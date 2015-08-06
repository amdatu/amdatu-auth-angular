/// <reference path="typescriptDefinitions/libs.d.ts" />
/// <amd-dependency path="angular-route"/>
/// <amd-dependency path="angular-translate"/>
/// <amd-dependency path="angular-sanitize"/>
/// <amd-dependency path="angular-bootstrap"/>
/// <amd-dependency path="directives/MemberDirectives"/>

import angular = require('angular')
import LoginController = require('login/LoginController');
import LoginService = require('login/LoginService');
import PasswordResetController = require('login/PasswordResetController');
import MembersController = require('admin_members/MembersController');
import MembersService = require('admin_members/MembersService');
import MemberEditController = require('admin_members/MemberEditController');
import RemoveMemberModalController = require('admin_members/RemoveMemberModalController');
import ExampleController = require('example/ExampleController');


var ngModule: ng.IModule = angular.module('example.app', ['ngRoute', 'pascalprecht.translate', 'ngSanitize', 'ui.bootstrap', 'MemberDirectives']);

ngModule.controller('LoginController', LoginController);
ngModule.controller('ExampleController', ExampleController);
ngModule.service('LoginService', LoginService);
ngModule.controller('PasswordResetController', PasswordResetController);
ngModule.controller('MembersController', MembersController);
ngModule.service('MembersService', MembersService);
ngModule.controller('MemberEditController', MemberEditController);
ngModule.controller('RemoveMemberModalController', RemoveMemberModalController);

ngModule.constant('BASE_URL', 'http://localhost:8080');

ngModule.config(['$routeProvider', ($routeProvider : ng.route.IRouteProvider) => {
    $routeProvider.when('/login', {
        templateUrl: 'login/views/login.html',
        controller: 'LoginController',
        controllerAs: 'loginController'
    }).when('/main', {
        templateUrl: 'example/views/main.html',
        controller: 'ExampleController',
        controllerAs: 'exampleController'
    }).when('/passwordreset', {
        templateUrl: 'login/views/passwordreset.html',
        controller: 'PasswordResetController',
        controllerAs: 'passwordResetController'
    }).when('/admin/members', {
        templateUrl: 'admin_members/views/members.html',
        controller: 'MembersController',
        controllerAs: 'membersController'
    }).when('/admin/members/:memberId', {
        templateUrl: 'admin_members/views/edit.html',
        controller: 'MemberEditController',
        controllerAs: 'memberEditController'
    }).otherwise({
        redirectTo: '/login'
    });
}]);

ngModule.config(['$translateProvider', ($translateProvider) => {
    $translateProvider.translations('en', {
        'LOGIN_FACEBOOK': "Login using Facebook",
        'LOGIN_EMAIL': "Login email",
        'LOGIN_PASSWORD': "Login password",
        'LOGIN_BUTTON': "Login",
        'LOGIN_WELCOME_MSG': "Welcome",
        'LOGIN_INVALID': "Invalid login",
        'LOGIN_LOGOUT_BUTTON' : "Logout",
        'LOGIN_SIGNUP_BUTTON' : "Register",
        'LOGIN_ACCOUNT_CREATED' : "Account created, you can now login",
        'LOGIN_NO_ACCOUNT_YET' : "Don't have an account yet?",
        'PASSWORD_RESET' : "Fill in the email address of your account to reset your password. You will receive an email with a link to confirm the reset.",
        'PASSWORD_RESET_RESET_BUTTON' : "Reset",
        'PASSWORD_RESET_PASSWORD' : 'New password',
        'PASSWORD_RESET_PASSWORD_REPEAT' : 'Repeat new password',
        'PASSWORD_RESET_PROCEED' : "An email is sent with a link to reset your password.",
        'PASSWORD_RESET_SUCCEEDED' : "Your new password has been saved, you can login now.",
        'LOGIN_RESET' : "<span>Can't remember your password? Reset it <a href='#/passwordreset'>here</a>.</span>",
        'MEMBERS_NEW_MEMBERS' : "New members",
        'MEMBERS_FIRSTNAME' : "Firstname",
        'MEMBERS_LASTNAME' : "Lastname",
        'MEMBERS_MEMBERS' : "Members",
        'MEMBERS_EMAIL' : "E-mail",
        'MEMBERSEDIT_PERSONAL_DETAILS' : "Member details",
        'SIGNUP_FIRSTNAME': "Firstname",
        'SIGNUP_LASTNAME': "Lastname",
        'SIGNUP_EMAIL': "Email",
        'SIGNUP_PASSWORD': "Password",
        'SIGNUP_PASSWORD2': "Repeat password",
        'SIGNUP_SUBMIT': "Create account"

    });

    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy('sanitize');
}]);

ngModule.config(['$httpProvider', ($httpProvider) => {
    $httpProvider.defaults.withCredentials = true;
}]);


export = ngModule;