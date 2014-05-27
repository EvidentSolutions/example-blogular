package fi.evident.blogular.web.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import fi.evident.blogular.core.dao.BlogPostDao;
import fi.evident.blogular.core.model.BlogPost;
import fi.evident.blogular.core.model.NewPostData;
import fi.evident.blogular.core.test.TestDataService;
import fi.evident.blogular.web.config.WebTestConfiguration;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.web.FilterChainProxy;
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
@ContextConfiguration(classes = WebTestConfiguration.class)
public class PostsControllerTest {

    @Autowired
    private WebApplicationContext wac;

    @Autowired
    @SuppressWarnings("SpringJavaAutowiringInspection")
    private FilterChainProxy springSecurityFilterChain;

    @Autowired
    private BlogPostDao postDao;

    @Autowired
    private ObjectMapper objectMapper;

    private MockMvc mvc;

    @Autowired
    private TestDataService testDataService;

    @Before
    @SuppressWarnings("SpellCheckingInspection")
    public void setup() {
        mvc = webAppContextSetup(wac)
            .defaultRequest(get("/").header("Authorization", "Basic dXNlcjpwYXNzd29yZA=="))
            .addFilters(springSecurityFilterChain).build();

        testDataService.clearPosts();
    }

    @Test
    public void listBlogPosts() throws Exception {
        testDataService.createArbitraryPostWithSlug("hello-world");
        testDataService.createArbitraryPostWithSlug("goodbye-world");

        mvc.perform(get("/api/posts"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].slug").value("goodbye-world"))
                .andExpect(jsonPath("$[1].slug").value("hello-world"));
    }

    @Test
    public void postBlogPost() throws Exception {
        String json = objectMapper.writeValueAsString(testDataService.arbitraryNewPostDataWithTitleAndBody("My test post", "My post body"));

        mvc.perform(post("/api/posts").contentType(APPLICATION_JSON).content(json))
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", "/api/posts/my-test-post"));

        List<BlogPost> posts = postDao.findAllPosts();
        assertThat(posts.size(), is(1));

        BlogPost post = posts.get(0);
        assertThat(post.title, is("My test post"));
        assertThat(post.slug, is("my-test-post"));
        assertThat(post.author, is("user"));
        assertThat(post.body, is("My post body"));
        assertThat(post.publishTime, is(aboutCurrentLocalDateTime()));
    }

    @Test
    public void getPostBySlug() throws Exception {
        NewPostData post = testDataService.arbitraryNewPostDataWithTitleAndBody("Title of test", "My body");
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
        testDataService.createArbitraryPostWithSlug("my-test-post");

        mvc.perform(delete("/api/posts/my-test-post"))
                .andExpect(status().isOk());

        assertThat(postDao.findAllPosts().size(), is(0));
    }

    @Test
    public void uniqueSlugsAreGeneratedForIdenticalTitles() throws Exception {
        String json = objectMapper.writeValueAsString(testDataService.arbitraryNewPostDataWithTitleAndBody("My test post", "My post body"));

        mvc.perform(post("/api/posts").contentType(APPLICATION_JSON).content(json)).andExpect(status().isCreated());
        mvc.perform(post("/api/posts").contentType(APPLICATION_JSON).content(json)).andExpect(status().isCreated());
        mvc.perform(post("/api/posts").contentType(APPLICATION_JSON).content(json)).andExpect(status().isCreated());

        List<BlogPost> posts = postDao.findAllPosts();
        assertThat(posts.size(), is(3));
        assertThat(posts.get(0).slug, is("my-test-post-3"));
        assertThat(posts.get(1).slug, is("my-test-post-2"));
        assertThat(posts.get(2).slug, is("my-test-post"));
    }
}
