"use strict";

var angular = require('angular');
var services = angular.module('blogular.services');

services.service('loginService', ['$resource', '$rootScope', '$q', '$timeout', ($resource, $rootScope, $q, $timeout) => {
    $rootScope.currentUser = null;

    return {
        login(username, password) {
            var deferred = $q.defer();

            $timeout(() => {
                if (username == 'komu' && password == 'pass') {
                    var user = $rootScope.currentUser = {
                        name: 'Juha Komulainen',
                        authToken: 'komu'
                    };
                    deferred.resolve(user);
                } else {
                    deferred.reject();
                }
            }, 1000);

            return deferred.promise;
        },

        logout() {
            $rootScope.currentUser = null;
        }
    }
}]);

// Adds a HTTP interceptor that adds auth-token to every
services.config(['$httpProvider', ($httpProvider) => {
    $httpProvider.interceptors.push(['$q', '$rootScope', ($q, $rootScope) => {
        return {
            'request': config => {
                if ($rootScope.currentUser)
                    config.headers['X-Auth-Token'] = $rootScope.currentUser.authToken;
                return config;
            }
        };
    }]);
}]);
