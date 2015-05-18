"use strict";

var angular = require('angular');
var SockJS = require("sockjs");
var Stomp = require("stomp");
var config = require("../config");

var services = angular.module('blogular.messaging');

services.service('messagingService', ['$rootScope', '$q', '$log', ($rootScope, $q, $log) => {
    var stompPromise = null;

    function getStomp() {
        if (!stompPromise) {
            var deferred = $q.defer();

            var client = new SockJS(config.apiBase + '/stomp');

            var stomp = Stomp.over(client);
            stomp.debug = msg => $log.debug(msg);

            stomp.connect({}, () => {
                deferred.resolve(stomp);
            }, () => {
                deferred.reject('failed to connect');
            });

            client.onclose = () => {
                stompPromise = null;
                setTimeout(getStomp, 10000);
            };

            stompPromise = deferred.promise;
        }
        return stompPromise;
    }

    return {
        subscribe(destination, callback) {
            var subscription = getStomp().then(stomp =>
                stomp.subscribe(destination, message => {
                    $rootScope.$apply(() => {
                        callback(angular.fromJson(message.body));
                    });
                }));

            return {
                unsubscribe() {
                    subscription.then(s => s.unsubscribe());
                }
            };
        },

        send(destination, message) {
            return getStomp().then(stomp => stomp.send(destination, {}, angular.toJson(message)));
        }
    };
}]);

