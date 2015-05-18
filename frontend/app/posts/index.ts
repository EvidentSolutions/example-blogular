import angular = require('angular');

var postsModule = angular.module('blogular.posts', []);

require('./blog-post.directive.ts');
require('./post.service.ts');
require('./list-posts.controller.ts');
require('./post.controller.ts');
require('./view-post.controller.ts');

export = postsModule;
