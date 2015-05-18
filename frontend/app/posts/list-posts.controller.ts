import PostService = require('./post.service');

class ListPostsController {

    posts;

    //noinspection JSUnusedGlobalSymbols
    static $inject = ['postService'];

    constructor(postService: PostService) {
        postService.loadPosts().then(posts => this.posts = posts);
    }
}

export = ListPostsController;
