package fi.evident.blogular.core.dao;

import fi.evident.blogular.core.config.CoreTestConfiguration;
import fi.evident.blogular.core.model.BlogPost;
import fi.evident.blogular.core.model.EditedPostData;
import fi.evident.blogular.core.model.NewPostData;
import fi.evident.blogular.core.test.TestDataService;
import fi.evident.dalesbred.Database;
import fi.evident.dalesbred.NonUniqueResultException;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = CoreTestConfiguration.class)
public class BlogPostDaoTest {

    @Autowired
    private BlogPostDao blogPostDao;

    @Autowired
    private Database db;

    @Autowired
    private TestDataService testDataService;

    @Before
    public void cleanPosts() {
        db.update("DELETE FROM blog_post");
    }

    @Test
    public void savePostAndFindIt() {
        NewPostData data = testDataService.arbitraryNewPostData();
        blogPostDao.savePost("my-slug", data);

        BlogPost post = blogPostDao.findBySlug("my-slug");

        assertThat(post.author, is(data.author));
        assertThat(post.title, is(data.title));
        assertThat(post.body, is(data.body));

        List<BlogPost> posts = blogPostDao.findAllPosts();
        assertThat(posts.size(), is(1));
    }

    @Test
    public void findAllPostsReturnsPostsInReverseOrder() {
        assertThat(blogPostDao.findAllPosts().size(), is(0));

        blogPostDao.savePost("slug1", testDataService.arbitraryNewPostData());
        blogPostDao.savePost("slug2", testDataService.arbitraryNewPostData());
        blogPostDao.savePost("slug3", testDataService.arbitraryNewPostData());

        List<BlogPost> posts = blogPostDao.findAllPosts();
        assertThat(posts.size(), is(3));
        assertThat(posts.get(0).slug, is("slug3"));
        assertThat(posts.get(1).slug, is("slug2"));
        assertThat(posts.get(2).slug, is("slug1"));
    }

    @Test
    public void deletePost() {
        blogPostDao.savePost("my-slug", testDataService.arbitraryNewPostData());
        assertThat(blogPostDao.containsPostBySlug("my-slug"), is(true));

        blogPostDao.deleteBySlug("my-slug");
        assertThat(blogPostDao.containsPostBySlug("my-slug"), is(false));
    }

    @Test
    public void updatePost() {
        blogPostDao.savePost("my-slug", testDataService.arbitraryNewPostData());

        EditedPostData data = testDataService.arbitraryEditedData();
        blogPostDao.updatePost("my-slug", data);

        BlogPost post = blogPostDao.findBySlug("my-slug");

        assertThat(post.title, is(data.title));
        assertThat(post.body, is(data.body));
    }

    @Test(expected = NonUniqueResultException.class)
    public void updateNonexistentPost() {
        blogPostDao.updatePost("unknown", testDataService.arbitraryEditedData());
    }
}
