package fi.evident.blogular.web.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

import java.util.List;

@Configuration
@ComponentScan(basePackages = "fi.evident.blogular.web")
@Import(WebSocketConfiguration.class)
public class DispatcherServletConfig extends WebMvcConfigurationSupport {

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired(required = false)
    @SuppressWarnings("MismatchedQueryAndUpdateOfCollection")
    private List<HandlerInterceptor> handlerInterceptors;

    @Override
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
        configurer.enable();
    }

    @Bean
    public ViewResolver viewResolver() {
        InternalResourceViewResolver resolver = new InternalResourceViewResolver();
        // We'll add explicit charset because the static HTML files will lack them otherwise.
        resolver.setContentType("text/html;charset=UTF-8");
        return resolver;
    }

    @Override
    protected void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        addDefaultHttpMessageConverters(converters);

        // Make sure that Spring uses our configured ObjectMapper to perform JSON-conversions.
        for (HttpMessageConverter<?> converter : converters) {
            if (converter instanceof MappingJackson2HttpMessageConverter) {
                ((MappingJackson2HttpMessageConverter) converter).setObjectMapper(objectMapper);
            }
        }
    }

    @Override
    protected void addInterceptors(InterceptorRegistry registry) {
        if (handlerInterceptors != null)
            handlerInterceptors.forEach(registry::addInterceptor);
    }
}
