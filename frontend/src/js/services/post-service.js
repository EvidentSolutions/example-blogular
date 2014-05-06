"use strict";

var angular = require('angular');
var services = angular.module('blogular.services');
var config = require('../config');

services.service('postService', ['$resource', ($resource) => {

    var Post = $resource(config.apiBase + "/posts");

    return {
        loadPosts() {
            return Post.query().$promise;
        },

        savePost(post) {
            var newPost = angular.copy(post);
            return Post.save(newPost).$promise;
        }
    }
}]);
