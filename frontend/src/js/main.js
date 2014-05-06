"use strict";

window._ = require('lodash');
window.jQuery = require('jquery');
var angular = require('angular');

require('angular-route');
require('angular-sanitize');
require('angular-i18n/angular-locale_fi');
require('bootstrap');
require('angular-bootstrap/ui-bootstrap-tpls');
require('templates');

var app = angular.module('blogular', [
    'ngRoute',
    'ngSanitize',
    'ui.bootstrap.modal',
    'ui.bootstrap.tabs',
    'ui.bootstrap.dropdownToggle',
    'ui.bootstrap.tpls',
    'blogular.templates',
    require('./controllers/controllers').name,
    require('./directives/directives').name,
    require('./filters/filters').name,
    require('./services/services').name
]);

app.config(['$locationProvider', '$routeProvider', ($locationProvider, $routeProvider) => {
    $locationProvider.html5Mode(true);

    require('./routes').initializeRoutes($routeProvider);
}]);

module.exports = app;
