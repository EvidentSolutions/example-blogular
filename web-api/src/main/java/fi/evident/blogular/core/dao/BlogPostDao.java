package fi.evident.blogular.core.dao;

import fi.evident.blogular.core.model.BlogPost;
import fi.evident.blogular.core.model.NewPostData;
import fi.evident.dalesbred.Database;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BlogPostDao {

    @Autowired
    private Database db;

    public void savePost(@NotNull String slug, @NotNull NewPostData post) {
        db.update("INSERT INTO blog_post (slug, title, body) VALUES (?, ?, ?)", slug, post.title, post.body);
    }

    @NotNull
    public List<BlogPost> findAllPosts() {
        return db.findAll(BlogPost.class, "SELECT slug, title, publish_time, body FROM blog_post ORDER BY id DESC");
    }

    @NotNull
    public BlogPost findBySlug(@NotNull String slug) {
        return db.findUnique(BlogPost.class, "SELECT slug, title, publish_time, body FROM blog_post WHERE slug = ?", slug);
    }

    public void deleteBySlug(@NotNull String slug) {
        db.update("DELETE FROM blog_post WHERE slug=?", slug);
    }
}
