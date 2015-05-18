import angular = require('angular');
var SockJS = require("sockjs");
var Stomp = require("stomp");

var services = angular.module('blogular.messaging');

services.service('messagingService', ['$rootScope', '$q', '$log', ($rootScope: Blogular.IBlogularRootScope, $q: ng.IQService, $log: ng.ILogService) => {
    var stompPromise = null;

    function getStomp() {
        if (!stompPromise) {
            var deferred = $q.defer();

            var client = new SockJS('/api/stomp');

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
                        var body = null;
                        if (message.body)
                            body = angular.fromJson(message.body);
                        callback(body);
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

