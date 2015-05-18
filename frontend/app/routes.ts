import angular = require('angular');
var routes = angular.module('blogular.routes', []);

// Route definitions for the application.
routes.config(['$routeProvider', ($routeProvider: ng.route.IRouteProvider) => {
    $routeProvider
        .when('/', { redirectTo: '/posts' })
        .when('/post', { controller: 'PostController', controllerAs: 'postCtrl', templateUrl: '/posts/post.html', requiresLogin: true })
        .when('/posts', { controller: 'ListPostsController', controllerAs: 'listPostsCtrl', templateUrl: '/posts/list-posts.html' })
        .when('/posts/:slug', { controller: 'ViewPostController', controllerAs: 'viewPostCtrl', templateUrl: '/posts/view-post.html' })
        .when('/login', { templateUrl: '/login/login.html' })
        .otherwise({templateUrl: '/errors/not-found.html'});
}]);

routes.run(['$rootScope', '$location', ($rootScope: Blogular.IBlogularRootScope, $location: ng.ILocationService) => {
    $rootScope.$on("$routeChangeStart", function (event, next) {
        if (!$rootScope.currentUser && next.requiresLogin) {
            $location.path("/login");
        }
    });
}]);

export = routes;
