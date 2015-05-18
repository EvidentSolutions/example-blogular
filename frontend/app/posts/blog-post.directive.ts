import angular = require('angular');
import PostService = require('./post.service');
var directives = angular.module('blogular.posts');

class BlogPostController {

    post;
    editedPost;

    //noinspection JSUnusedGlobalSymbols
    static $inject = ['postService', '$modal', '$route', '$location'];

    constructor(private postService:PostService,
                private $modal:ng.ui.bootstrap.IModalService,
                private $route:ng.route.IRouteService,
                private $location:ng.ILocationService) {
    }

    deletePost() {
        var post = this.post;
        this.$modal.open({
            templateUrl: '/posts/delete-post-modal.html',
            controllerAs: 'deletePostCtrl',
            controller: function () {
                this.postTitle = post.title;
            }
        }).result.then(() => {
            this.postService.deletePost(this.post.slug).then(() => {
                this.$location.path('/posts');
                this.$route.reload();
            });
        });
    }

    editPost() {
        this.editedPost = angular.copy(this.post);
    }

    cancelEditing() {
        this.editedPost = null;
    }

    save() {
        // Update the post optimistically here before server returns a result
        this.post = angular.copy(this.editedPost);
        this.editedPost = null;
        this.postService.updatePost(this.post);
    }
}

function BlogPostDirective() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '/posts/blog-post.html',
        scope: {
            post: '='
        },
        bindToController: true,
        controllerAs: 'blogPostCtrl',
        controller: BlogPostController
    };
}

export = BlogPostDirective;
