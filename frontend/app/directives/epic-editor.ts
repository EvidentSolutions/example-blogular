var EpicEditor = require('epiceditor');
var marked = require('marked');

function EpicEditorDirective() {
    return {
        restrict: 'E',
        replace: true,
        template: '<div class="epiceditor"></div>',
        require: 'ngModel',
        link($scope: ng.IScope, $element: JQuery, attrs: ng.IAttributes, ngModel: ng.INgModelController) {
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
                    $scope.$apply(() => ngModel.$setViewValue(editor.exportFile()));
            });
        }
    };
}

export = EpicEditorDirective;
