"use strict";

var controllers = require('angular').module('blogular.controllers');

controllers.controller('PostController', ['$scope', '$location', 'postService', ($scope, $location, postService) => {
    $scope.saving = false;
    var newPost = $scope.newPost = {
        title: '',
        body: ''
    };

    $scope.savePost = () => {
        $scope.saving = true;
        postService.savePost(newPost).then(() => {
            $scope.saving = false;
            $location.path('/')
        });
    }
}]);
