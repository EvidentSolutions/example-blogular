package fi.evident.blogular.core.services;

import fi.evident.blogular.core.dao.BlogPostDao;
import fi.evident.blogular.core.model.NewPostData;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostService {

    @Autowired
    private BlogPostDao blogPostDao;

    @NotNull
    public String createPost(@NotNull NewPostData post) {
        String slug = createSlug(post.title);
        blogPostDao.savePost(slug, post);
        return slug;
    }

    @NotNull
    private String createSlug(@NotNull String title) {
        String normalized = slugify(title);

        if (!blogPostDao.containsPostBySlug(normalized))
            return normalized;

        for (int i = 2; ; i++) {
            String slug = normalized + "-" + i;
            if (!blogPostDao.containsPostBySlug(slug))
                return slug;
        }
    }

    @NotNull
    private static String slugify(@NotNull String title) {
        return title.replaceAll("\\s", "-").replaceAll("[^a-zA-Z0-9-]+", "").toLowerCase();
    }
}
