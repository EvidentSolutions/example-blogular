"use strict";

var controllers = require('angular').module('blogular.controllers');

controllers.controller('SidebarController', ['$scope', 'postService', ($scope, postService) => {
    var sidebar = $scope.sidebar = {
        about: '<p>Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>'
    };

    function loadPosts() {
        postService.loadPosts().then(posts => sidebar.archivePosts = posts);
    }

    loadPosts();
    $scope.$on('postsChanged', loadPosts);
}]);
