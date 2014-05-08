"use strict";

var angular = require('angular');
var config = require('../config');
var $ = require('jquery');

var services = angular.module('blogular.services');

services.service('loginService', ['$rootScope', '$http', ($rootScope, $http) => {
    $rootScope.currentUser = null;

    return {
        login(username, password) {
            var url = config.apiBase + '/account/login';
            var data = $.param({ username: username, password: password });
            var headers = {'Content-Type': 'application/x-www-form-urlencoded'};
            return $http({method: 'POST', url: url, data: data, headers: headers}).then((r) => {
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
                    config.headers['Authorization'] = $rootScope.currentUser.authToken;
                return config;
            }
        };
    }]);
}]);
