import PostService = require('./post.service');

class PostController {

    saving = false;
    newPost = {
        title: '',
        body: ''
    };

    //noinspection JSUnusedGlobalSymbols
    static $inject = ['$location', 'postService'];

    constructor(private $location: ng.ILocationService, private postService: PostService) {
    }

    savePost() {
        this.saving = true;
        this.postService.savePost(this.newPost).then(() => {
            this.saving = false;
            this.$location.path('/posts');
        });
    }
}

export = PostController;
