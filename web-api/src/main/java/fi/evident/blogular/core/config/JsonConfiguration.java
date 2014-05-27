package fi.evident.blogular.core.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import fi.evident.blogular.core.json.JavaTimeSerializationModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JsonConfiguration {

    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeSerializationModule());
        return mapper;
    }
}
