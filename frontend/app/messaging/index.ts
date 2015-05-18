import angular = require('angular');
var services = angular.module('blogular.messaging', []);

import MessagingService = require('./messaging.service');

services.service('messagingService', MessagingService);

export = services;
