"use strict";

var directives = require('angular').module('blogular.directives');

directives.directive('blogPost', ['$modal', '$location', '$route', 'postService', ($modal, $location, $route, postService) => {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '/templates/directives/blog-post.html',
        scope: {
            post: '='
        },
        link: ($scope) => {
            $scope.deletePost = () => {
                $modal.open({
                    templateUrl: '/templates/dialogs/delete-post.html',
                    scope: $scope
                }).result.then(() => {
                    postService.deletePost($scope.post.slug).then(() => {
                        $location.path('/')
                        $route.reload();
                    });
                });
            };
        }
    };
}]);
