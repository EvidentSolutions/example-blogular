import angular = require('angular');
var filters = angular.module('blogular.filters', []);

import markdown = require('./markdown-filter');

filters.filter('markdown', markdown);

export = filters;
