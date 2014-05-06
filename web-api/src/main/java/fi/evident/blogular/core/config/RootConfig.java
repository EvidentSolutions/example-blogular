package fi.evident.blogular.core.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import fi.evident.blogular.core.config.profiles.ProfilesConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import({ProfilesConfiguration.class, DatabaseConfiguration.class})
@ComponentScan(basePackages = "fi.evident.blogular.core")
public class RootConfig {

    @Bean
    public ObjectMapper objectMapper() {
        return new ObjectMapper();
    }
}
