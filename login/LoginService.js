/// <reference path="../typescriptDefinitions/libs.d.ts"/>
define(["require", "exports", 'Rx', 'lodash'], function (require, exports, Rx, _) {
    var LoginService = (function () {
        function LoginService($http, BASE_URL, $location, $rootScope) {
            this.$http = $http;
            this.BASE_URL = BASE_URL;
            this.$location = $location;
            this.$rootScope = $rootScope;
        }
        LoginService.prototype.loginUsingEmail = function (email, password) {
            var _this = this;
            return Rx.Observable.create(function (observer) {
                var login = {
                    email: email,
                    password: password
                };
                _this.$http.post(_this.BASE_URL + "/auth/login", JSON.stringify(login)).success(function (loginResult) {
                    _this.member = loginResult;
                    observer.onNext(loginResult);
                    observer.onCompleted();
                    _this.$rootScope.$broadcast('loginStatusChanged', {});
                }).error(function (e) {
                    observer.onError(e);
                    observer.onCompleted();
                });
            });
        };
        LoginService.prototype.getMember = function () {
            var _this = this;
            if (this.member) {
                return Rx.Observable.of(this.member);
            }
            else {
                return Rx.Observable.create(function (observer) {
                    _this.$http.get(_this.BASE_URL + "/auth/me").success(function (member) {
                        observer.onNext(member);
                        observer.onCompleted();
                        _this.member = member;
                    }).error(function () {
                        var redirectIgnores = ['/login', '/signup', '/passwordreset'];
                        if (!_.contains(redirectIgnores, _this.$location.path())) {
                            _this.$location.path("login");
                        }
                    });
                });
            }
        };
        LoginService.prototype.logout = function () {
            var _this = this;
            this.$http.post(this.BASE_URL + '/auth/logout', {}).success(function () {
                _this.member = null;
                _this.$location.path('login');
                _this.$rootScope.$broadcast('loginStatusChanged', {});
            });
        };
        LoginService.prototype.reset = function (email) {
            return Rx.Observable.fromPromise(this.$http.post(this.BASE_URL + "/auth/passwordreset", { email: email }));
        };
        LoginService.prototype.confirmPasswordReset = function (token, password) {
            return Rx.Observable.fromPromise(this.$http.post(this.BASE_URL + "/auth/passwordreset", { token: token, password: password }));
        };
        LoginService.prototype.adminCheck = function () {
            var _this = this;
            this.$http.get(this.BASE_URL + '/auth/admin').success(function (result) {
                if (!result) {
                    _this.$location.path('login');
                }
            });
        };
        LoginService.prototype.isAdmin = function () {
            return Rx.Observable.fromPromise(this.$http.get(this.BASE_URL + '/auth/admin')).map(function (result) { return result.data; });
        };
        LoginService.$inject = ['$http', 'BASE_URL', '$location', '$rootScope'];
        return LoginService;
    })();
    return LoginService;
});
