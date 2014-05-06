"use strict";

var controllers = require('angular').module('blogular.controllers');

controllers.controller('SidebarController', ['$scope', ($scope) => {
    $scope.sidebar = {
        about: '<p>Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>',

        archiveLinks: [
            "2014-01-01",
            "2013-12-01",
            "2013-11-01",
            "2013-10-01",
            "2013-09-01",
            "2013-08-01",
            "2013-07-01",
            "2013-06-01",
            "2013-05-01",
            "2013-04-01",
            "2013-03-01",
            "2013-02-01"
        ],

        externalLinks: [
            {
                title: 'Bitbucket',
                href: 'https://bitbucket.org/evidentsolutions',
                icon: 'twitter'
            },
            {
                title: 'GitHub',
                href: 'https://bitbucket.org/evidentsolutions',
                icon: 'github'
            },
            {
                title: 'Twitter',
                href: 'https://twitter.com/EvidentSolution',
                icon: 'twitter'
            },
            {
                title: 'Facebook',
                href: 'https://www.facebook.com/evidentsolutions',
                icon: 'facebook'
            }
        ]
    };
}]);
