"use strict";

var controllers = require('angular').module('blogular.controllers');

controllers.controller('ViewPostController', ['$scope', '$routeParams', 'postService', ($scope, $routeParams, postService) => {
    postService.loadPost($routeParams.slug).then(post => $scope.post = post);
}]);
