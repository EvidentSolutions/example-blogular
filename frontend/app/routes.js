"use strict";

var angular = require('angular');
var routes = angular.module('blogular.routes', []);

// Route definitions for the application.
routes.config(['$routeProvider', $routeProvider => {
    $routeProvider
        .when('/', { redirectTo: '/posts' })
        .when('/post', { controller: 'PostController', templateUrl: '/controllers/new-post.html', requiresLogin: true })
        .when('/posts', { controller: 'ListPostsController', templateUrl: '/controllers/list-posts.html' })
        .when('/posts/:slug', { controller: 'ViewPostController', templateUrl: '/controllers/view-post.html' })
        .when('/login', { templateUrl: '/controllers/login.html' })
        .otherwise({templateUrl: '/errors/not-found.html'});
}]);

routes.run(['$rootScope', '$location', ($rootScope, $location) => {
    $rootScope.$on("$routeChangeStart", function (event, next) {
        if (!$rootScope.currentUser && next.requiresLogin) {
            $location.path("/login");
        }
    });
}]);

module.exports = routes;

