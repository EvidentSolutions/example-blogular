import PostService = require('./post.service');

class ViewPostController {

    post;
    error:string;

    static $inject = ['$routeParams', 'postService'];

    constructor($routeParams: ng.route.IRouteParamsService, postService:PostService) {
        var slug = $routeParams['slug'];
        postService.loadPost(slug)
            .then(post => this.post = post)
            .catch(e => {
                if (e.status == 404) {
                    this.error = "Could not find post '" + slug + "'.";
                } else {
                    throw e;
                }
            });
    }
}

export = ViewPostController;
