package fi.evident.blogular.core.init;

import fi.evident.blogular.core.annotations.ResourceReference;
import fi.evident.blogular.core.model.NewPostData;
import fi.evident.blogular.core.services.PostService;
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

@Lazy(false)
@Component
@Profile("development")
public class DummyDataPopulator {

    @Autowired
    private PostService postService;

    @Autowired
    private ResourceLoader resourceLoader;

    @NotNull
    private static final Logger log = LoggerFactory.getLogger(DummyDataPopulator.class);

    @PostConstruct
    public void populateInitialData() throws IOException {
        log.info("Populating database with dummy data");

        createPost("Exercises", "classpath:initial-data/exercises.md");
        createPost("Dialogs", "classpath:initial-data/dialogs.md");
        createPost("Filters", "classpath:initial-data/filters.md");
        createPost("Directives", "classpath:initial-data/directives.md");
        createPost("Services", "classpath:initial-data/services.md");
        createPost("Controllers", "classpath:initial-data/controllers.md");
        createPost("Project structure", "classpath:initial-data/project-structure.md");
    }

    private void createPost(@NotNull String title, @NotNull @ResourceReference String location) throws IOException {
        NewPostData data = new NewPostData();
        data.title = title;
        data.author = "Juha Komulainen";
        data.body = readResource(location);

        postService.createPost(data);
    }

    @NotNull
    private String readResource(@NotNull @ResourceReference String location) throws IOException {
        try (InputStream inputStream = resourceLoader.getResource(location).getInputStream()) {
            return StreamUtils.copyToString(inputStream, Charset.forName("UTF-8"));
        }
    }
}
