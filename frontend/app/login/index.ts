import angular = require('angular');
var loginModule = angular.module('blogular.login', []);

import LoginController = require('./login.controller');
import LoginService = require('./login.service');
import AuthTokenInterceptor = require('./auth-token-interceptor');
import currentUserInitializer = require('./current-user-initializer');

loginModule.controller('LoginController', LoginController);
loginModule.service('loginService', LoginService);
loginModule.config(AuthTokenInterceptor);
loginModule.run(currentUserInitializer);

export = loginModule;
