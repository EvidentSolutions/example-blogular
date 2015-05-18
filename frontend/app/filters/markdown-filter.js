"use strict";

var filters = require('angular').module('blogular.filters');
var marked = require('marked');

filters.filter('markdown', () => marked);
