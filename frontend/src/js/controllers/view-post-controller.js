"use strict";

var controllers = require('angular').module('blogular.controllers');

controllers.controller('ViewPostController', ['$scope', '$routeParams', 'postService', ($scope, $routeParams, postService) => {
    var slug = $routeParams.slug;
    postService.loadPost(slug)
        .then(post => $scope.post = post)
        .catch(e => {
            if (e.status == 404) {
                $scope.error = "Could not find post '" + slug + "'.";
            } else {
                throw e;
            }
        });
}]);
