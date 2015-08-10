/// <reference path="../typescriptDefinitions/libs.d.ts" />
define(["require", "exports", 'Rx'], function (require, exports, Rx) {
    var MembersService = (function () {
        function MembersService($http, BASE_URL) {
            this.$http = $http;
            this.BASE_URL = BASE_URL;
        }
        MembersService.prototype.listMembers = function () {
            var _this = this;
            return Rx.Observable.create(function (observer) {
                _this.$http.get(_this.BASE_URL + "/auth").success(function (result) {
                    observer.onNext(result);
                    observer.onCompleted();
                }).error(function (error) {
                    observer.onError(error);
                    observer.onCompleted();
                });
            });
        };
        MembersService.prototype.saveMember = function (member) {
            if (member._id) {
                return Rx.Observable.fromPromise(this.$http.put(this.BASE_URL + "/auth/" + member._id, member));
            }
            else {
                return Rx.Observable.fromPromise(this.$http.post(this.BASE_URL + "/auth", member));
            }
        };
        MembersService.prototype.getMember = function (memberId) {
            return Rx.Observable.fromPromise(this.$http.get(this.BASE_URL + "/auth/" + memberId)).map(function (result) {
                return result.data;
            });
        };
        MembersService.prototype.deleteMember = function (memberId) {
            return Rx.Observable.fromPromise(this.$http.delete(this.BASE_URL + "/auth/" + memberId));
        };
        MembersService.$inject = ['$http', 'BASE_URL'];
        return MembersService;
    })();
    return MembersService;
});
