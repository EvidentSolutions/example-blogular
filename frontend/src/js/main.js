"use strict";

// This is the main entry point of our application. First we'll load some libraries.

// We'll need to load jQuery into global variable or Bootstrap and Angular won't find it.
window.jQuery = require('jquery');

// Next, load all angular components. These will set up some global variables as well.
var angular = require('angular');
require('angular/route');
require('angular/sanitize');
require('angular/resource');
require('angular/animate');
require('angular/i18n/angular-locale_fi');

// Bootstrap and AngularJS integration for it
require('bootstrap');
require('angular-bootstrap/ui-bootstrap-tpls');

require('templates');

var app = angular.module('blogular', [
    'ngRoute',
    'ngSanitize',
    'ngResource',
    'ngAnimate',
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
