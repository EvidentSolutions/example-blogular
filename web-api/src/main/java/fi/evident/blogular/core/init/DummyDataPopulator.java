package fi.evident.blogular.core.init;

import fi.evident.dalesbred.Database;
import org.jetbrains.annotations.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;

@Lazy(false)
@Component
@Profile("development")
public class DummyDataPopulator {

    @Autowired
    private Database db;

    @NotNull
    private static final Logger log = LoggerFactory.getLogger(DummyDataPopulator.class);

    @SuppressWarnings("SpellCheckingInspection")
    @PostConstruct
    public void populateInitialData() {
        log.info("Populating database with dummy data");

        createPost("sample-blog-post", "Sample blog post", "Mark", LocalDateTime.of(2014, 1, 1, 12, 40), "<p>This blog post shows a few different types of content that\'s supported and styled with Bootstrap. Basic typography, images, and code are all supported.</p>\n    <hr>\n    <p>Cum sociis natoque penatibus et magnis <a href='#'>dis parturient montes</a>, nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>\n    <blockquote>\n        <p>Curabitur blandit tempus porttitor. <strong>Nullam quis risus eget urna mollis</strong> ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>\n    </blockquote>\n    <p>Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>\n    <h2>Heading</h2>\n    <p>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>\n    <h3>Sub-heading</h3>\n    <p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>\n    <pre><code>Example code block</code></pre>\n    <p>Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa.</p>\n    <h3>Sub-heading</h3>\n    <p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>\n    <ul>\n        <li>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</li>\n        <li>Donec id elit non mi porta gravida at eget metus.</li>\n        <li>Nulla vitae elit libero, a pharetra augue.</li>\n    </ul>\n    <p>Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.</p>\n    <ol>\n        <li>Vestibulum id ligula porta felis euismod semper.</li>\n        <li>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</li>\n        <li>Maecenas sed diam eget risus varius blandit sit amet non magna.</li>\n    </ol>\n    <p>Cras mattis consectetur purus sit amet fermentum. Sed posuere consectetur est at lobortis.</p>");
        createPost("another-blog-post", "Another blog post", "Jacob", LocalDateTime.of(2013, 12, 23, 4, 24), "<p>Cum sociis natoque penatibus et magnis <a href='#'>dis parturient montes</a>, nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>\n<blockquote>\n    <p>Curabitur blandit tempus porttitor. <strong>Nullam quis risus eget urna mollis</strong> ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>\n</blockquote>\n<p>Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>\n<p>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>\n");
        createPost("new-feature", "New feature", "Chris", LocalDateTime.of(2013, 12, 14, 19, 2), "<p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>\n<ul>\n    <li>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</li>\n    <li>Donec id elit non mi porta gravida at eget metus.</li>\n    <li>Nulla vitae elit libero, a pharetra augue.</li>\n</ul>\n<p>Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>\n<p>Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.</p>\n");
    }


    private void createPost(@NotNull String slug, @NotNull String title, @NotNull String author, @NotNull LocalDateTime publishTime, @NotNull String body) {
        db.update("insert into blog_post (slug, title, author, publish_time, body) values (?, ?, ?, ?, ?)", slug, title, author, publishTime, body);
    }
}
