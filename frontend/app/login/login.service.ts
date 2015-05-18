import $ = require('jquery');

class LoginService {

    //noinspection JSUnusedGlobalSymbols
    static $inject = ['$http', '$rootScope', '$q'];

    constructor(private $http: ng.IHttpService,
                private $rootScope: Blogular.IBlogularRootScope,
                private $q: ng.IQService) {
    }

    login(username: string, password: string): ng.IPromise<Blogular.IUserInfo> {
        var data = $.param({ username: username, password: password });
        var headers = {'Content-Type': 'application/x-www-form-urlencoded'};
        return this.$http({method: 'POST', url: '/api/account/login', data: data, headers: headers}).then((r: any) => {
            var user: Blogular.IUserInfo = r.data;
            this.$rootScope.currentUser = user;

            localStorage['currentUser.name'] = user.name;
            localStorage['currentUser.authToken'] = user.authToken;

            return user;
        });
    }

    logout(): ng.IPromise<{}> {
        this.$rootScope.currentUser = null;

        delete localStorage['currentUser.name'];
        delete localStorage['currentUser.authToken'];

        var deferred = this.$q.defer();
        deferred.resolve();
        return deferred.promise;
    }
}

export = LoginService;
