"use strict";

var angular = require('angular');
var services = angular.module('blogular.services');
var config = require('../config');

services.service('postService', ['$resource', '$rootScope', ($resource, $rootScope) => {

    var Post = $resource(config.apiBase + "/posts/:slug");

    return {
        loadPost(slug) {
            return Post.get({slug: slug}).$promise;
        },

        loadPosts() {
            return Post.query().$promise;
        },

        savePost(post) {
            var newPost = angular.copy(post);

            return Post.save(newPost).$promise.then(() => $rootScope.$broadcast("postAdded", newPost));
        }
    }
}]);
