"use strict";

var directives = require('angular').module('blogular.directives', []);

require('./active-on-location');
require('./blog-post');
require('./epic-editor');

module.exports = directives;
