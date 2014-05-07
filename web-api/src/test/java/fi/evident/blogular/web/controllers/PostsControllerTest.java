package fi.evident.blogular.web.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import fi.evident.blogular.core.dao.BlogPostDao;
import fi.evident.blogular.core.model.BlogPost;
import fi.evident.blogular.core.model.NewPostData;
import fi.evident.dalesbred.Database;
import org.jetbrains.annotations.NotNull;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

import java.util.List;

import static fi.evident.blogular.testutils.Matchers.aboutCurrentLocalDateTime;
import static fi.evident.blogular.testutils.Matchers.localDateTimeStringFor;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration(classes = ControllerTestConfiguration.class)
public class PostsControllerTest {

    @Autowired
    private WebApplicationContext wac;

    @Autowired
    private BlogPostDao postDao;

    @Autowired
    private Database db;

    @Autowired
    private ObjectMapper objectMapper;

    private MockMvc mvc;

    @Before
    public void setup() {
        mvc = webAppContextSetup(wac).build();
        db.update("delete from blog_post");
    }

    @Test
    public void listBlogPosts() throws Exception {
        createArbitraryPostWithSlug("hello-world");
        createArbitraryPostWithSlug("goodbye-world");

        mvc.perform(get("/api/posts"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].slug").value("goodbye-world"))
                .andExpect(jsonPath("$[1].slug").value("hello-world"));
    }

    @Test
    public void postBlogPost() throws Exception {
        String json = objectMapper.writeValueAsString(postWithTitleAndBody("My test post", "My post body"));

        mvc.perform(post("/api/posts").contentType(APPLICATION_JSON).content(json))
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", "/api/posts/my-test-post"));

        List<BlogPost> posts = postDao.findAllPosts();
        assertThat(posts.size(), is(1));

        BlogPost post = posts.get(0);
        assertThat(post.title, is("My test post"));
        assertThat(post.slug, is("my-test-post"));
        assertThat(post.author, is("J. Random Hacker"));
        assertThat(post.body, is("My post body"));
        assertThat(post.publishTime, is(aboutCurrentLocalDateTime()));
    }

    @Test
    public void getPostBySlug() throws Exception {
        NewPostData post = postWithTitleAndBody("Title of test", "My body");
        postDao.savePost("my-test-post", post);

        mvc.perform(get("/api/posts/my-test-post"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.slug").value("my-test-post"))
                .andExpect(jsonPath("$.title").value(post.title))
                .andExpect(jsonPath("$.author").value(post.author))
                .andExpect(jsonPath("$.body").value(post.body))
                .andExpect(jsonPath("$.publishTime").value(is(localDateTimeStringFor(aboutCurrentLocalDateTime()))));
    }

    @Test
    public void getNonexistentPostBySlugShouldReturn404() throws Exception {
        mvc.perform(get("/api/posts/my-nonexistent-post"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void deletePostBySlug() throws Exception {
        createArbitraryPostWithSlug("my-test-post");

        mvc.perform(delete("/api/posts/my-test-post"))
                .andExpect(status().isOk());

        assertThat(postDao.findAllPosts().size(), is(0));
    }

    @Test
    public void uniqueSlugsAreGeneratedForIdenticalTitles() throws Exception {
        String json = objectMapper.writeValueAsString(postWithTitleAndBody("My test post", "My post body"));

        mvc.perform(post("/api/posts").contentType(APPLICATION_JSON).content(json)).andExpect(status().isCreated());
        mvc.perform(post("/api/posts").contentType(APPLICATION_JSON).content(json)).andExpect(status().isCreated());
        mvc.perform(post("/api/posts").contentType(APPLICATION_JSON).content(json)).andExpect(status().isCreated());

        List<BlogPost> posts = postDao.findAllPosts();
        assertThat(posts.size(), is(3));
        assertThat(posts.get(0).slug, is("my-test-post-3"));
        assertThat(posts.get(1).slug, is("my-test-post-2"));
        assertThat(posts.get(2).slug, is("my-test-post"));
    }

    private void createArbitraryPostWithSlug(@NotNull String slug) {
        postDao.savePost(slug, postWithTitle("Title of test"));
    }

    @NotNull
    private static NewPostData postWithTitle(@NotNull String title) {
        return postWithTitleAndBody(title, "Body for post " + title);
    }

    @NotNull
    private static NewPostData postWithTitleAndBody(@NotNull String title, @NotNull String body) {
        NewPostData post = new NewPostData();
        post.title = title;
        post.body = body;
        post.author = "My author";
        return post;
    }
}
