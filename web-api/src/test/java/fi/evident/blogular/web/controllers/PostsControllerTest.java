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
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

import java.util.List;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration(classes = ControllerTestConfiguration.class)
@ActiveProfiles("development")
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
        postDao.savePost("hello-world", postWithTitle("Hello, world!"));
        postDao.savePost("goodbye-world", postWithTitle("Goodbye!"));

        mvc.perform(get("/api/posts"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].slug").value("goodbye-world"))
                .andExpect(jsonPath("$[1].slug").value("hello-world"));
    }

    @Test
    public void postBlogPost() throws Exception {
        String json = objectMapper.writeValueAsString(postWithTitle("My test post"));

        mvc.perform(post("/api/posts").contentType(MediaType.APPLICATION_JSON).content(json))
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", "/api/posts/my-test-post"));

        List<BlogPost> posts = postDao.findAllPosts();
        assertThat(posts.size(), is(1));
        assertThat(posts.get(0).title, is("My test post"));
        assertThat(posts.get(0).slug, is("my-test-post"));
    }

    @Test
    public void getPostBySlug() throws Exception {
        postDao.savePost("my-test-post", postWithTitle("Title of test"));

        mvc.perform(get("/api/posts/my-test-post"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.slug").value("my-test-post"))
                .andExpect(jsonPath("$.title").value("Title of test"));
    }

    @Test
    public void getNonexistentPostBySlugShouldReturn404() throws Exception {
        mvc.perform(get("/api/posts/my-nonexistent-post"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void deletePostBySlug() throws Exception {
        postDao.savePost("my-test-post", postWithTitle("Title of the post"));

        mvc.perform(delete("/api/posts/my-test-post"))
                .andExpect(status().isOk());

        assertThat(postDao.findAllPosts().size(), is(0));
    }

    @NotNull
    private static NewPostData postWithTitle(@NotNull String title) {
        NewPostData post = new NewPostData();
        post.title = title;
        post.body = "Body for post " + title;
        return post;
    }
}
