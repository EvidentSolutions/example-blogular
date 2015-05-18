"use strict";

var controllers = require('angular').module('blogular.posts');

controllers.controller('ListPostsController', ['postService', function (postService) {
    var self = this;
    postService.loadPosts().then(posts => self.posts = posts);
}]);
