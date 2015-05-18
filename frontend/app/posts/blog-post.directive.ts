import angular = require('angular');
var directives = angular.module('blogular.posts');

directives.directive('blogPost', ['$modal', '$location', '$route', 'postService', ($modal, $location, $route, postService) => {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '/posts/blog-post.html',
        scope: {
            post: '='
        },
        bindToController: true,
        controllerAs: 'blogPostCtrl',
        controller: function () {
            var ctrl: any = this;

            ctrl.editedPost = null;

            ctrl.deletePost = () => {
                $modal.open({
                    templateUrl: '/posts/delete-post-modal.html',
                    controllerAs: 'deletePostCtrl',
                    controller: function() {
                        this.postTitle = ctrl.post.title;
                    }
                }).result.then(() => {
                        postService.deletePost(ctrl.post.slug).then(() => {
                            $location.path('/posts');
                            $route.reload();
                        });
                    });
            };

            ctrl.editPost = () => {
                ctrl.editedPost = angular.copy(ctrl.post);
            };

            ctrl.cancelEditing = () => {
                ctrl.editedPost = null;
            };

            ctrl.save = () => {
                // Update the post optimistically here before server returns a result
                ctrl.post = angular.copy(ctrl.editedPost);
                ctrl.editedPost = null;
                postService.updatePost(ctrl.post);
            };
        }
    };
}]);
