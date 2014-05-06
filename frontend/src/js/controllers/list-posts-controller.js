"use strict";

var controllers = require('angular').module('blogular.controllers');

controllers.controller('ListPostsController', ['$scope', '$routeParams', 'postService', ($scope, $routeParams, postService) => {
    var slug = $routeParams.slug;

    if (slug)
        postService.loadPost(slug).then(post => $scope.posts = [post]);
    else
        postService.loadPosts().then(posts => $scope.posts = posts);
}]);
