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
                        name: 'Juha Komulainen'
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
