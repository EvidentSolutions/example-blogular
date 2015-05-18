import angular = require('angular');

var postsModule = angular.module('blogular.posts', []);

import BlogPostDirective = require('./blog-post.directive');
import PostService = require('./post.service');
import ListPostsController = require('./list-posts.controller');
import PostController = require('./post.controller');
import ViewPostController = require('./view-post.controller');

postsModule.service('postService', PostService);
postsModule.directive('blogPost', BlogPostDirective);
postsModule.controller('PostController', PostController);
postsModule.controller('ListPostsController', ListPostsController);
postsModule.controller('ViewPostController', ViewPostController);

export = postsModule;
