"use strict";

var controllers = require('angular').module('blogular.nav');

controllers.directive('sidebar', ['postService', function (postService) {
    return {
        restrict: 'E',
        templateUrl: '/nav/sidebar.html',
        replace: true,
        controllerAs: 'sidebar',
        controller: ['$scope', function($scope) {
            var sidebar = this;

            function loadPosts() {
                postService.loadPosts().then(posts => sidebar.posts = posts);
            }

            loadPosts();
            $scope.$on('postsChanged', loadPosts);
        }]
    };
}]);
