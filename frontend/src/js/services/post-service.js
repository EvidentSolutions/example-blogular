"use strict";

var angular = require('angular');
var services = angular.module('blogular.services');
var config = require('../config');

services.service('postService', ['$resource', '$rootScope', ($resource, $rootScope) => {

    var Post = $resource(config.apiBase + "/posts/:slug", null,  {
        'update': { method:'PUT' }
    });

    return {
        loadPost(slug) {
            return Post.get({slug: slug}).$promise;
        },

        loadPosts() {
            return Post.query().$promise;
        },

        savePost(post) {
            var newPost = angular.copy(post);

            return Post.save(newPost).$promise.then(() => $rootScope.$broadcast("postsChanged"));
        },

        updatePost(post) {
            Post.update({slug: post.slug}, post).$promise.then(() => $rootScope.$broadcast("postsChanged"));
        },

        deletePost(slug) {
            return Post.delete({slug: slug}).$promise.then(() => $rootScope.$broadcast("postsChanged"));
        }
    }
}]);
