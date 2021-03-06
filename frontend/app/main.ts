/// <reference path="./blogular.d.ts" />

require('traceur-runtime');

// This is the main entry point of our application. Lets import some modules:
import config = require('./config');

// We'll need to load jQuery into global variable or Bootstrap and Angular won't find it.
window.jQuery = require('jquery');

// Next, load all angular components. These will set up some global variables as well.
import angular = require('angular');
require('angular-route');
require('angular-sanitize');
require('angular-resource');
require('angular-animate');
require('angular-i18n/angular-locale_fi');

// AngularJS integration for Bootstrap
require('angular-bootstrap/dist/ui-bootstrap-tpls');

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
    require('./directives').name,
    require('./filters').name,
    require('./login').name,
    require('./messaging').name,
    require('./nav').name,
    require('./posts').name,
    require('./routes').name
];

// During development, we don't want to generate template-cache, but serve the templates
// directly from file system, but in production we wish to bundle all the templates in
// the same JavaScript file as the code. The built 'templates' module contains an angular
// module which will populate Angular's template-cache during startup.
try {
    require('angular-templates');
    angularModules.push('angular-templates');
} catch (ignored) {
    console.log("use local templates");
}

// Finally we are ready to initialize our Angular application
var app = angular.module('blogular', angularModules);

// Use the HTML5 History API
app.config(['$locationProvider', ($locationProvider: ng.ILocationProvider) => $locationProvider.html5Mode(true)]);

app.config(['$logProvider', ($logProvider: ng.ILogProvider) => $logProvider.debugEnabled(config.debugLogging)]);
