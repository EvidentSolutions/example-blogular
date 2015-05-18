"use strict";

var directives = require('angular').module('blogular.directives');

/**
 * A directive which toggles 'active' class of its containing element if current location
 * matches the href of the element.
 */
directives.directive('activeOnLocation', ['$location', ($location) => {
    return ($scope, $element) => {
        function updateActiveState() {
            $element.toggleClass("active", $location.path() == $element.attr('href'));
        }

        updateActiveState();
        $scope.$on('$locationChangeSuccess', updateActiveState);
    };
}]);
