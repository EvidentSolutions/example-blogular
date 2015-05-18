import angular = require('angular');
var SockJS = require("sockjs");
var Stomp = require("stomp");

class MessagingService {

    private stompPromise:any = null;

    //noinspection JSUnusedGlobalSymbols
    static $inject = ['$rootScope', '$q', '$log'];

    constructor(private $rootScope:ng.IScope,
                private $q:ng.IQService,
                private $log:ng.ILogService) {
    }

    subscribe(destination: string, callback: (any) => void) {
        var subscription = this.getStomp().then(stomp =>
            stomp.subscribe(destination, message => {
                this.$rootScope.$apply(() => {
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
    }

    send(destination, message) {
        return this.getStomp().then(stomp => stomp.send(destination, {}, angular.toJson(message)));
    }

    private getStomp() {
        if (!this.stompPromise) {
            var deferred = this.$q.defer();

            var client = new SockJS('/api/stomp');

            var stomp = Stomp.over(client);
            stomp.debug = msg => this.$log.debug(msg);

            stomp.connect({}, () => {
                deferred.resolve(stomp);
            }, () => {
                deferred.reject('failed to connect');
            });

            client.onclose = () => {
                this.stompPromise = null;
                setTimeout(this.getStomp.bind(this), 10000);
            };

            this.stompPromise = deferred.promise;
        }
        return this.stompPromise;
    }
}

export = MessagingService;
