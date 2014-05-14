"use strict";

var angular = require('angular');
var routes = angular.module('blogular.routes', []);

// Route definitions for the application.
routes.config(['$routeProvider', $routeProvider => {
    $routeProvider
        .when('/', { redirectTo: '/posts' })
        .when('/post', { controller: 'PostController', templateUrl: '/templates/views/new-post.html' })
        .when('/posts', { controller: 'ListPostsController', templateUrl: '/templates/views/list-posts.html' })
        .when('/posts/:slug', { controller: 'ViewPostController', templateUrl: '/templates/views/view-post.html' })
        .otherwise({templateUrl: '/templates/errors/not-found.html'});
}]);

module.exports = routes;

