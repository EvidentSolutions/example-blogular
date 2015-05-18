/**
 * A directive which toggles 'active' class of its containing element if current location
 * matches the href of the element.
 */
function ActiveOnLocation($location: ng.ILocationService) {
    return ($scope: ng.IScope, $element: JQuery) => {
        function updateActiveState() {
            $element.toggleClass("active", $location.path() == $element.attr('href'));
        }

        updateActiveState();
        $scope.$on('$locationChangeSuccess', updateActiveState);
    };
}

ActiveOnLocation.$inject = ['$location'];

export = ActiveOnLocation;
