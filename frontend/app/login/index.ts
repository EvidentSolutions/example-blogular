import angular = require('angular');
var loginModule = angular.module('blogular.login', []);

require('./login.controller');
require('./login.service');

export = loginModule;
