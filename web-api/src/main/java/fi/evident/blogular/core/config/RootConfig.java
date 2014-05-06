package fi.evident.blogular.core.config;

import fi.evident.blogular.core.config.profiles.ProfilesConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import({ProfilesConfiguration.class, DatabaseConfiguration.class, JsonConfiguration.class})
@ComponentScan(basePackages = "fi.evident.blogular.core")
public class RootConfig {
}
