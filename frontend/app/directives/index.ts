import angular = require('angular');
var directives = angular.module('blogular.directives', []);

import ActiveOnLocation = require('./active-on-location');
import EpicEditor = require('./epic-editor');

directives.directive('activeOnLocation', ActiveOnLocation);
directives.directive('epicEditor', EpicEditor);

export = directives;
