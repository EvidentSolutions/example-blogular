package fi.evident.blogular.web.controllers;

import fi.evident.blogular.core.annotations.CurrentUser;
import fi.evident.blogular.core.dao.BlogPostDao;
import fi.evident.blogular.core.model.BlogPost;
import fi.evident.blogular.core.model.EditedPostData;
import fi.evident.blogular.core.model.NewPostData;
import fi.evident.blogular.core.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostsController {

    @Autowired
    private BlogPostDao blogPostDao;

    @Autowired
    private PostService postService;

    @Autowired
    @SuppressWarnings("SpringJavaAutowiringInspection")
    private SimpMessagingTemplate messagingTemplate;

    @RequestMapping(method = RequestMethod.GET)
    public List<BlogPost> listBlogPosts() {
        return blogPostDao.findAllPosts();
    }

    @RequestMapping(method = RequestMethod.POST)
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<?> postBlogPost(@RequestBody NewPostData post, @CurrentUser User user) {
        post.author = user.getUsername();

        String slug = postService.createPost(post);
        notifyPostsUpdated();

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create("/api/posts/" + slug));
        return new ResponseEntity<>(headers, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/{slug}", method = RequestMethod.PUT)
    @PreAuthorize("hasRole('ROLE_USER')")
    public void updateBlogPost(@PathVariable String slug, @RequestBody EditedPostData post) {
        blogPostDao.updatePost(slug, post);
        notifyPostsUpdated();
    }

    @RequestMapping(value = "/{slug}", method = RequestMethod.GET)
    public BlogPost getPostBySlog(@PathVariable String slug) {
        return blogPostDao.findBySlug(slug);
    }

    @RequestMapping(value = "/{slug}", method = RequestMethod.DELETE)
    @PreAuthorize("hasRole('ROLE_USER')")
    public void deletePostBySlog(@PathVariable String slug) {
        blogPostDao.deleteBySlug(slug);
        notifyPostsUpdated();
    }

    private void notifyPostsUpdated() {
        messagingTemplate.convertAndSend("/topic/posts/updated", "");
    }
}
