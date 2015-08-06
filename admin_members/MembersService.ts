/// <reference path="../typescriptDefinitions/libs.d.ts" />

import Rx = require('Rx')

class MembersService {
    static $inject = ['$http', 'BASE_URL'];

    constructor(private $http:ng.IHttpService, private BASE_URL) {
    }

    listMembers() : Rx.Observable<Member[]> {
        return Rx.Observable.create((observer : Rx.Observer<Member[]>) => {
           this.$http.get(this.BASE_URL + "/auth").success(result => {
               observer.onNext(result);
               observer.onCompleted();
           }).error(error => {
               observer.onError(error);
               observer.onCompleted();
           });
        });
    }

    saveMember(member : Member) {
        if(member._id) {
            return Rx.Observable.fromPromise(this.$http.put(this.BASE_URL + "/auth/" + member._id, member));
        } else {
            return Rx.Observable.fromPromise(this.$http.post(this.BASE_URL + "/auth", member));
        }
    }

    getMember(memberId:string): Rx.Observable<Member> {
        return Rx.Observable.fromPromise(this.$http.get(this.BASE_URL + "/auth/" + memberId)).map((result) => { return result.data} );
    }

    deleteMember(memberId : string) : Rx.Observable<any> {
        return Rx.Observable.fromPromise(this.$http.delete(this.BASE_URL + "/auth/" + memberId));
    }
}

export = MembersService;
