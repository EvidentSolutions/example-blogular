package fi.evident.blogular.core.test;

import fi.evident.blogular.core.dao.BlogPostDao;
import fi.evident.blogular.core.model.EditedPostData;
import fi.evident.blogular.core.model.NewPostData;
import fi.evident.dalesbred.Database;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TestDataService {

    @Autowired
    private BlogPostDao postDao;

    @Autowired
    private Database db;

    public void createArbitraryPostWithSlug(@NotNull String slug) {
        postDao.savePost(slug, arbitraryNewPostDataWithTitle("Title of test"));
    }

    @NotNull
    public NewPostData arbitraryNewPostData() {
        return arbitraryNewPostDataWithTitle("my title");
    }

    @NotNull
    public NewPostData arbitraryNewPostDataWithTitle(@NotNull String title) {
        return arbitraryNewPostDataWithTitleAndBody(title, "my post body");
    }

    @NotNull
    public NewPostData arbitraryNewPostDataWithTitleAndBody(@NotNull String title, @NotNull String body) {
        NewPostData post = new NewPostData();
        post.title = title;
        post.body = body;
        post.author = "My author";
        return post;
    }

    @NotNull
    public EditedPostData arbitraryEditedData() {
        EditedPostData data = new EditedPostData();
        data.title = "edited title";
        data.body = "edited body";
        return data;
    }

    public void clearPosts() {
        db.update("DELETE FROM blog_post");
    }
}
