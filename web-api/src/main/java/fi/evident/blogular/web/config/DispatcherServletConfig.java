package fi.evident.blogular.web.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.jetbrains.annotations.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.core.env.Environment;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;
import org.springframework.web.servlet.resource.GzipResourceResolver;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

import java.io.File;
import java.util.List;

@Configuration
@ComponentScan(basePackages = "fi.evident.blogular.web")
@Import(WebSocketConfiguration.class)
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class DispatcherServletConfig extends WebMvcConfigurationSupport {

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired(required = false)
    @SuppressWarnings("MismatchedQueryAndUpdateOfCollection")
    private List<HandlerInterceptor> handlerInterceptors;

    @Autowired
    @SuppressWarnings("MismatchedQueryAndUpdateOfCollection")
    private List<HandlerMethodArgumentResolver> argumentResolvers;

    @Autowired
    private Environment env;

    @NotNull
    private static final Logger log = LoggerFactory.getLogger(DispatcherServletConfig.class);

    @Override
    protected void addResourceHandlers(ResourceHandlerRegistry registry) {
        if (env.acceptsProfiles("development")) {
            File projectRoot = env.getRequiredProperty("project.root.directory", File.class);

            String builtResources = directoryResourceUri(new File(projectRoot, "frontend/build/egb/static/"));
            String frontendSources = directoryResourceUri(new File(projectRoot, "frontend/app/"));

            log.info("Serving static resources from {} and {}", builtResources, frontendSources);

            registry.addResourceHandler("/**")
                    .addResourceLocations(builtResources, frontendSources)
                    .setCachePeriod(0)
                    .resourceChain(false);

        } else {
            registry.addResourceHandler("/**")
                    .addResourceLocations("classpath:blogular-frontend/")
                    .setCachePeriod(null)
                    .resourceChain(true)
                    .addResolver(new GzipResourceResolver());
        }
    }

    @NotNull
    private static String directoryResourceUri(@NotNull File dir) {
        return ensureSuffix(dir.toURI().toString(), "/");
    }

    @NotNull
    private static String ensureSuffix(@NotNull String s, @NotNull String suffix) {
        return s.endsWith(suffix) ? s : s + suffix;
    }

    @Override
    protected void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
        argumentResolvers.addAll(this.argumentResolvers);
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

    @Override
    public void configurePathMatch(PathMatchConfigurer configurer) {
        configurer.setUseSuffixPatternMatch(false);
    }
}
