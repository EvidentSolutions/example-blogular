package fi.evident.blogular.web.controllers;

import fi.evident.blogular.core.dao.BlogPostDao;
import fi.evident.blogular.core.model.BlogPost;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostsController {

    @Autowired
    private BlogPostDao blogPostDao;

    @RequestMapping(method = RequestMethod.GET)
    public List<BlogPost> listBlogPosts() {
        return blogPostDao.findAllPosts();
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> postBlogPost(@RequestBody BlogPost post) {
        blogPostDao.savePost(post);

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create("/api/posts/" + post.slug));
        return new ResponseEntity<Object>(headers, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/{slug}", method = RequestMethod.GET)
    public BlogPost getPostBySlog(@PathVariable String slug) {
        return blogPostDao.findBySlug(slug);
    }

    @RequestMapping(value = "/{slug}", method = RequestMethod.DELETE)
    public void deletePostBySlog(@PathVariable String slug) {
        blogPostDao.deleteBySlug(slug);
    }
}
