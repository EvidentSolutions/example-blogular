"use strict";

var controllers = require('angular').module('blogular.controllers');

controllers.controller('PostController', ['$scope', '$location', ($scope, $location) => {
    $scope.newPost = {
        title: '',
        text: ''
    };

    $scope.savePost = () => {
        $location.path('/');
    }
}]);
