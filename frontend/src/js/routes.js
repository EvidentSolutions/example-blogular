"use strict";

// Route definitions for the application.

exports.initializeRoutes = ($routeProvider) => {
    //noinspection JSUnresolvedFunction
    $routeProvider
        .when('/', { controller: 'ListPostsController', templateUrl: '/templates/views/list-posts.html' })
        .when('/post', { controller: 'PostController', templateUrl: '/templates/views/new-post.html' })
        .when('/posts', { controller: 'ListPostsController', templateUrl: '/templates/views/list-posts.html' })
        .when('/posts/:slug', { controller: 'ViewPostController', templateUrl: '/templates/views/view-post.html' })
        .otherwise({templateUrl: '/templates/errors/not-found.html'});
};
