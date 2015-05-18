import angular = require('angular');
var directives = angular.module('blogular.directives');

/**
 * A directive which toggles 'active' class of its containing element if current location
 * matches the href of the element.
 */
directives.directive('activeOnLocation', ['$location', ($location: ng.ILocationService) => {
    return ($scope: ng.IScope, $element: JQuery) => {
        function updateActiveState() {
            $element.toggleClass("active", $location.path() == $element.attr('href'));
        }

        updateActiveState();
        $scope.$on('$locationChangeSuccess', updateActiveState);
    };
}]);
