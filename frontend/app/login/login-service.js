"use strict";

var angular = require('angular');
var config = require('../config');
var $ = require('jquery');

var services = angular.module('blogular.login');

services.service('loginService', ['$rootScope', '$http', '$q', ($rootScope, $http, $q) => {
    return {
        login(username, password) {
            var url = config.apiBase + '/account/login';
            var data = $.param({ username: username, password: password });
            var headers = {'Content-Type': 'application/x-www-form-urlencoded'};
            return $http({method: 'POST', url: url, data: data, headers: headers}).then((r) => {
                var user = r.data;
                $rootScope.currentUser = user;

                localStorage['currentUser.name'] = user.name;
                localStorage['currentUser.authToken'] = user.authToken;

                return user;
            });
        },

        logout() {
            $rootScope.currentUser = null;

            delete localStorage['currentUser.name'];
            delete localStorage['currentUser.authToken'];

            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
        }
    };
}]);

services.run(['$rootScope', ($rootScope) => {
    // If we have already logged in, use the credentials from local-storage.
    if (localStorage['currentUser.name']) {
        $rootScope.currentUser = {
            name: localStorage['currentUser.name'],
            authToken: localStorage['currentUser.authToken']
        };
    } else {
        $rootScope.currentUser = null;
    }
}]);

// Adds a HTTP interceptor that adds auth-token to every
services.config(['$httpProvider', ($httpProvider) => {
    $httpProvider.interceptors.push(['$q', '$rootScope', ($q, $rootScope) => {
        return {
            'request': config => {
                if ($rootScope.currentUser)
                    config.headers.Authorization = $rootScope.currentUser.authToken;
                return config;
            }
        };
    }]);
}]);
