package fi.evident.blogular.core.config;

import fi.evident.blogular.security.SecurityConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import(SecurityConfiguration.class)
@ComponentScan(basePackages = "fi.evident.blogular.core")
public class RootConfig {
}
