import angular = require('angular');
var directives = angular.module('blogular.directives', []);

require('./active-on-location');
require('./epic-editor');

export = directives;
