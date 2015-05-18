import angular = require('angular');

var filters = angular.module('blogular.filters');
var marked = require('marked');

filters.filter('markdown', () => marked);
