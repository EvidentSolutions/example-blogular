package fi.evident.blogular.core.services;

import fi.evident.blogular.core.config.CoreTestConfiguration;
import fi.evident.blogular.core.dao.BlogPostDao;
import fi.evident.blogular.core.model.NewPostData;
import fi.evident.blogular.core.test.TestDataService;
import fi.evident.dalesbred.Database;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = CoreTestConfiguration.class)
public class PostServiceTest {

    @Autowired
    private PostService postService;

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
    public void slugIsAutomaticallyGeneratedFromTitle() {
        NewPostData data = testDataService.arbitraryNewPostDataWithTitle("my title");
        String slug = postService.createPost(data);

        assertThat(slug, is("my-title"));

        assertThat(blogPostDao.containsPostBySlug("my-title"), is(true));
    }
}
