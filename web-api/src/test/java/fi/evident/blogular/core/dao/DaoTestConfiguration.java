package fi.evident.blogular.core.dao;

import fi.evident.blogular.core.config.RootConfig;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabase;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;

@Configuration
@Import(RootConfig.class)
public class DaoTestConfiguration {

    @Bean(destroyMethod = "shutdown")
    public EmbeddedDatabase dataSource() {
        return new EmbeddedDatabaseBuilder().setName("database-tests").setType(EmbeddedDatabaseType.HSQL).addScript("db/misc/hsql-pg-mode.sql").build();
    }
}
