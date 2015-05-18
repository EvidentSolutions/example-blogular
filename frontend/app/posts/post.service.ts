import angular = require('angular');
import MessagingService = require('../messaging/messaging.service');

class PostService {

    static $inject = ['$resource', '$rootScope', 'messagingService'];

    private Post

    constructor($resource, $rootScope: Blogular.IBlogularRootScope, messagingService: MessagingService) {
        this.Post = $resource('/api/posts/:slug', null, {
            'update': { method:'PUT' }
        });

        // When server tells that messages have been updated, broadcast an event to the application
        messagingService.subscribe('/topic/posts/updated', () => $rootScope.$broadcast("postsChanged"));
    }

    loadPost(slug: string): ng.IPromise<Blogular.IPostInfo> {
        return this.Post.get({slug: slug}).$promise;
    }

    loadPosts(): ng.IPromise<Blogular.IPostInfo[]> {
        return this.Post.query().$promise;
    }

    savePost(post: Blogular.IPostInfo): ng.IPromise<{}> {
        var newPost = angular.copy(post);

        return this.Post.save(newPost).$promise;
    }

    updatePost(post: Blogular.IPostInfo): ng.IPromise<{}> {
        return this.Post.update({slug: post.slug}, post).$promise;
    }

    deletePost(slug: string): ng.IPromise<{}> {
        return this.Post.delete({slug: slug}).$promise;
    }
}

export = PostService;
