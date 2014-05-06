package fi.evident.blogular.core.config.profiles;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import(DevelopmentConfiguration.class)
public class ProfilesConfiguration {
}
