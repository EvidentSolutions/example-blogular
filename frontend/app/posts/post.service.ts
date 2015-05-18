import angular = require('angular');
var services = angular.module('blogular.posts');

services.service('postService', ['$resource', '$rootScope', 'messagingService', ($resource, $rootScope, messagingService) => {

    var Post = $resource('/api/posts/:slug', null,  {
        'update': { method:'PUT' }
    });

    // When server tells that messages have been updated, broadcast an event to the application
    messagingService.subscribe('/topic/posts/updated', () => $rootScope.$broadcast("postsChanged"));

    return {
        loadPost(slug) {
            return Post.get({slug: slug}).$promise;
        },

        loadPosts() {
            return Post.query().$promise;
        },

        savePost(post) {
            var newPost = angular.copy(post);

            return Post.save(newPost).$promise;
        },

        updatePost(post) {
            Post.update({slug: post.slug}, post).$promise;
        },

        deletePost(slug) {
            return Post.delete({slug: slug}).$promise;
        }
    }
}]);
