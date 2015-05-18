import angular = require('angular');
var controllers = angular.module('blogular.posts');

controllers.controller('ViewPostController', ['$routeParams', 'postService', function ($routeParams, postService) {
    var self: any = this;

    var slug = $routeParams.slug;
    postService.loadPost(slug)
        .then(post => self.post = post)
        .catch(e => {
            if (e.status == 404) {
                self.error = "Could not find post '" + slug + "'.";
            } else {
                throw e;
            }
        });
}]);
