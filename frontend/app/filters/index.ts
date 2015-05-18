import angular = require('angular');
var filters = angular.module('blogular.filters', []);

require('./markdown-filter');

export = filters;
