"use strict";

var directives = require('angular').module('blogular.directives');
var EpicEditor = require('epiceditor');
var marked = require('marked');

directives.directive('epicEditor', [() => {
    return {
        restrict: 'E',
        replace: true,
        template: '<div class="epiceditor"></div>',
        require: 'ngModel',
        link: ($scope, $element, attrs, ngModel) => {
            var opts = {
                container: $element[0],
                basePath: '/css/epiceditor',
                clientSideStorage: false,
                parser: marked,
                autogrow: {
                    maxHeight: 400
                },
                theme: {
                    preview: '/themes/preview/bartik.css',
                    editor: '/themes/editor/epic-light.css'
                }
            };

            var editor = new EpicEditor(opts).load();

            var valueUpdatingFromModel = false;

            ngModel.$render = () => {
                //noinspection JSUnusedAssignment
                valueUpdatingFromModel = true;
                editor.importFile("newPost", ngModel.$viewValue);
                valueUpdatingFromModel = false;
            };

            editor.on('update', () => {
                if (!valueUpdatingFromModel)
                    $scope.$apply(read)
            });

            read();

            function read() {
                ngModel.$setViewValue(editor.exportFile());
            }
        }
    };
}]);
