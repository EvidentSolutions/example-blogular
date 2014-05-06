"use strict";

exports.initializeRoutes = ($routeProvider) => {
    $routeProvider
        .when('/', { controller: 'ListPostsController', templateUrl: '/templates/views/list-posts.html' })
        .when('/post', { controller: 'PostController', templateUrl: '/templates/views/post.html' })
        .when('/posts', { controller: 'ListPostsController', templateUrl: '/templates/views/list-posts.html' })
        .when('/posts/:slug', { controller: 'ListPostsController', templateUrl: '/templates/views/list-posts.html' });
};
