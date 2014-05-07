"use strict";

var directives = require('angular').module('blogular.directives');

directives.directive('blogPost', [() => {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '/templates/directives/blog-post.html',
        scope: {
            post: '='
        }
    };
}]);
