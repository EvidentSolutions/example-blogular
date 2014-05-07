"use strict";

var angular = require('angular');
var directives = angular.module('blogular.directives');

directives.directive('blogPost', ['$modal', '$location', '$route', 'postService', ($modal, $location, $route, postService) => {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '/templates/directives/blog-post.html',
        scope: {
            post: '='
        },
        link: ($scope) => {
            $scope.editedPost = null;

            $scope.deletePost = () => {
                $modal.open({
                    templateUrl: '/templates/dialogs/delete-post.html',
                    scope: $scope
                }).result.then(() => {
                    postService.deletePost($scope.post.slug).then(() => {
                        $location.path('/');
                        $route.reload();
                    });
                });
            };

            $scope.editPost = () => {
                $scope.editedPost = angular.copy($scope.post);
            };

            $scope.cancelEditing = () => {
                $scope.editedPost = null;
            };

            $scope.save = () => {
                // Update the post optimistically here before server returns a result
                $scope.post = angular.copy($scope.editedPost);
                $scope.editedPost = null;
                postService.updatePost($scope.post);
            }
        }
    };
}]);
