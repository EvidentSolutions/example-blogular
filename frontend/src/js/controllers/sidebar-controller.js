"use strict";

var controllers = require('angular').module('blogular.controllers');

var externalLinks = [
    {
        title: 'Bitbucket',
        href: 'https://bitbucket.org/evidentsolutions',
        icon: 'twitter'
    },
    {
        title: 'GitHub',
        href: 'https://bitbucket.org/evidentsolutions',
        icon: 'github'
    },
    {
        title: 'Twitter',
        href: 'https://twitter.com/EvidentSolution',
        icon: 'twitter'
    },
    {
        title: 'Facebook',
        href: 'https://www.facebook.com/evidentsolutions',
        icon: 'facebook'
    }
];

controllers.controller('SidebarController', ['$scope', 'postService', ($scope, postService) => {
    var sidebar = $scope.sidebar = {
        about: '<p>Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>',
        externalLinks: externalLinks
    };

    function loadPosts() {
        postService.loadPosts().then(posts => sidebar.archivePosts = posts);
    }

    loadPosts();
    $scope.$on('postAdded', loadPosts);
}]);
