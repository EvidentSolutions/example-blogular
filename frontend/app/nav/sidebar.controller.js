"use strict";

var controllers = require('angular').module('blogular.nav');

controllers.controller('SidebarController', ['$scope', 'postService', ($scope, postService) => {
    var sidebar = $scope.sidebar = { };

    function loadPosts() {
        postService.loadPosts().then(posts => sidebar.posts = posts);
    }

    loadPosts();
    $scope.$on('postsChanged', loadPosts);
}]);
