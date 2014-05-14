"use strict";

// This is the main entry point of our application. Lets import some modules:
var config = require('./config');
var routes = require('./routes');

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

// Workaround for bugs
require('./hacks/angular-bootstrap-autofocus-hack');

var angularModules = [
    'ngRoute',
    'ngSanitize',
    'ngResource',
    'ngAnimate',
    'ui.bootstrap.modal',
    'ui.bootstrap.tabs',
    'ui.bootstrap.dropdown',
    'ui.bootstrap.tpls',
    require('./controllers/controllers').name,
    require('./directives/directives').name,
    require('./filters/filters').name,
    require('./services/services').name
];

// During development, we don't want to generate template-cache, but serve the templates
// directly from file system, but in production we wish to bundle all the templates in
// the same JavaScript file as the code. The built 'templates' module contains an angular
// module which will populate Angular's template-cache during startup.
if (config.useTemplateCache) {
    require('templates');
    angularModules.push('blogular.templates');
}

// Finally we are ready to initialize our Angular application
var app = angular.module('blogular', angularModules);

// Use the HTML5 History API
app.config(['$locationProvider', $locationProvider => $locationProvider.html5Mode(true)]);

// Initialize our routes
app.config(['$routeProvider', routes.initializeRoutes]);

app.config(['$logProvider', $logProvider => $logProvider.debugEnabled(config.debugLogging)]);

module.exports = app;
