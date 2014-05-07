package fi.evident.blogular.core.init;

import fi.evident.blogular.core.annotations.ResourceReference;
import fi.evident.dalesbred.Database;
import org.jetbrains.annotations.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Profile;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;
import org.springframework.util.StreamUtils;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.Charset;
import java.time.LocalDateTime;

@Lazy(false)
@Component
@Profile("development")
public class DummyDataPopulator {

    @Autowired
    private Database db;

    @Autowired
    private ResourceLoader resourceLoader;

    @NotNull
    private static final Logger log = LoggerFactory.getLogger(DummyDataPopulator.class);

    @PostConstruct
    public void populateInitialData() {
        log.info("Populating database with dummy data");

        createPost("welcome", "Welcome!", "Juha Komulainen", LocalDateTime.of(2014, 5, 7, 9, 30), "classpath:dummy/welcome.md");
    }

    private void createPost(@NotNull String slug,
                            @NotNull String title,
                            @NotNull String author,
                            @NotNull LocalDateTime publishTime,
                            @NotNull @ResourceReference String location) {
        String body = readResource(location);
        db.update("insert into blog_post (slug, title, author, publish_time, body) values (?, ?, ?, ?, ?)", slug, title, author, publishTime, body);
    }

    @NotNull
    private String readResource(@NotNull @ResourceReference String location) {
        try (InputStream inputStream = resourceLoader.getResource(location).getInputStream()) {
            return StreamUtils.copyToString(inputStream, Charset.forName("UTF-8"));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
