"use strict";

var controllers = require('angular').module('blogular.posts');

controllers.controller('PostController', ['$location', 'postService', function ($location, postService) {
    var ctrl = this;

    ctrl.saving = false;
    var newPost = ctrl.newPost = {
        title: '',
        body: ''
    };

    ctrl.savePost = () => {
        ctrl.saving = true;
        postService.savePost(newPost).then(() => {
            ctrl.saving = false;
            $location.path('/posts');
        });
    };
}]);
