"use strict";

exports.initializeRoutes = ($routeProvider) => {
    $routeProvider
        .when('/', { controller: 'MainController', templateUrl: '/templates/views/main.html' })
        .when('/post', { controller: 'PostController', templateUrl: '/templates/views/post.html' });
};
