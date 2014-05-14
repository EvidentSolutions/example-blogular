"use strict";

var angular = require('angular');

// Workaround for https://github.com/angular-ui/bootstrap/issues/1696
angular.module('ui.bootstrap.modal').directive('modalWindow', ['$timeout', $timeout => {
    return {
        priority: 1,
        link(scope, element) {
            //noinspection JSCheckFunctionSignatures
            $timeout(() => element.find('[autofocus]').focus());
        }
    };
}]);
