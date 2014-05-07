package fi.evident.blogular.web.controllers;

import fi.evident.blogular.core.config.RootConfig;
import fi.evident.blogular.web.config.DispatcherServletConfig;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabase;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;

@Configuration
@Import({DispatcherServletConfig.class, RootConfig.class})
public class ControllerTestConfiguration {

    @Bean(destroyMethod = "shutdown")
    public EmbeddedDatabase dataSource() {
        return new EmbeddedDatabaseBuilder().setType(EmbeddedDatabaseType.HSQL).addScript("db/misc/hsql-pg-mode.sql").build();
    }
}
