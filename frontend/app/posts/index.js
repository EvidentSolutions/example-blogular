"use strict";

module.exports = require('angular').module('blogular.posts', []);

require('./blog-post.directive');
require('./post.service');
require('./list-posts.controller');
require('./post.controller');
require('./view-post.controller');
