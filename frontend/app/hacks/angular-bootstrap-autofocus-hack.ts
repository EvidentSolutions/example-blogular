import angular = require('angular');

// Workaround for https://github.com/angular-ui/bootstrap/issues/1696
angular.module('ui.bootstrap.modal').directive('modalWindow', ['$timeout', ($timeout: ng.ITimeoutService) => {
    return {
        priority: 1,
        link(scope: ng.IScope, element: JQuery) {
            //noinspection JSCheckFunctionSignatures
            $timeout(() => element.find('[autofocus]').focus());
        }
    };
}]);
