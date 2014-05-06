package fi.evident.blogular.web.controllers;

import fi.evident.blogular.core.config.RootConfig;
import fi.evident.blogular.web.config.DispatcherServletConfig;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import({DispatcherServletConfig.class, RootConfig.class})
public class ControllerTestConfiguration {
}
