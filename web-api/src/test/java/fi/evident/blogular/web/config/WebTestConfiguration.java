package fi.evident.blogular.web.config;

import fi.evident.blogular.core.config.RootConfig;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabase;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;

@Configuration
@Import({DispatcherServletConfig.class, RootConfig.class})
public class WebTestConfiguration {

    @Bean(destroyMethod = "shutdown")
    public EmbeddedDatabase dataSource() {
        return new EmbeddedDatabaseBuilder().setName("web-tests").setType(EmbeddedDatabaseType.HSQL).addScript("db/misc/hsql-pg-mode.sql").build();
    }
}
