"use strict";

var angular = require('angular');
var config = require('../config');

var services = angular.module('blogular.services');

services.service('loginService', ['$rootScope', '$http', ($rootScope, $http) => {
    $rootScope.currentUser = null;

    return {
        login(username, password) {
            return $http({method: 'POST', url: config.apiBase + '/account/login', params: { username: username, password: password }}).then((r) => {
                return $rootScope.currentUser = r.data;
            });
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
