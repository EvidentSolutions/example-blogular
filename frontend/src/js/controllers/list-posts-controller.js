"use strict";

var controllers = require('angular').module('blogular.controllers');

controllers.controller('ListPostsController', ['$scope', 'postService', ($scope, postService) => {
    postService.loadPosts().then(posts => $scope.posts = posts);
}]);
