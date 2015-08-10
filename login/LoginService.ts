/// <reference path="../typescriptDefinitions/libs.d.ts"/>

import Rx = require('Rx')
import _ = require('lodash')

class LoginService {
    static $inject = ['$http', 'BASE_URL', '$location', '$rootScope'];
    private member : Member;

    constructor(private $http:ng.IHttpService, private BASE_URL, private $location : ng.ILocationService, private $rootScope :ng.IRootScopeService) {
    }

    loginUsingEmail(email : string, password : string) : Rx.Observable<Member>{
        return Rx.Observable.create((observer: Rx.Observer<Member>) => {
            var login = {
                email: email,
                password: password

            };

            this.$http.post(this.BASE_URL + "/auth/login", JSON.stringify(login)).success((loginResult) => {
                this.member = loginResult;

                observer.onNext(loginResult);
                observer.onCompleted();

                this.$rootScope.$broadcast('loginStatusChanged', {});
            }).error((e) => {
                observer.onError(e);
                observer.onCompleted();
            });
        })
    }

    getMember() : Rx.Observable<Member> {
        if(this.member) {
            return Rx.Observable.of(this.member);
        } else {
            return Rx.Observable.create((observer : Rx.Observer<Member>) => {
                this.$http.get(this.BASE_URL + "/auth/me").success(member => {
                    observer.onNext(member);
                    observer.onCompleted();

                    this.member = member;
                }).error(() => {
                    var redirectIgnores = ['/login', '/signup', '/passwordreset'];
                    if(!_.contains(redirectIgnores, this.$location.path())) {
                        this.$location.path("login");
                    }
                });
            });
        }
    }

    logout() {
        this.$http.post(this.BASE_URL + '/auth/logout', {}).success(() => {
            this.member = null;
            this.$location.path('login');
            this.$rootScope.$broadcast('loginStatusChanged' ,{});
        });
    }

    reset(email : string) : Rx.Observable<any> {
        return Rx.Observable.fromPromise(this.$http.post(this.BASE_URL + "/auth/passwordreset", {email : email}));
    }

    confirmPasswordReset(token:String, password:String):Rx.Observable<any> {
        return Rx.Observable.fromPromise(this.$http.post(this.BASE_URL + "/auth/passwordreset", {token : token, password: password}));
    }

    adminCheck() {
        this.$http.get(this.BASE_URL + '/auth/admin').success((result) => {
            if(!result) {
                this.$location.path('login')
            }
        });
    }

    isAdmin() : Rx.Observable<boolean> {
        return Rx.Observable.fromPromise(this.$http.get(this.BASE_URL + '/auth/admin')).map((result) => result.data);
    }

    loginCheck() {
        if(!this.member) {
            this.$location.path('login');
        }
    }
}

export = LoginService;