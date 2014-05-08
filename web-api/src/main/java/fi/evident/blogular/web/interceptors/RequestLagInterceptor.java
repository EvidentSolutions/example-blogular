package fi.evident.blogular.web.interceptors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
@Profile("lag")
public class RequestLagInterceptor extends HandlerInterceptorAdapter {

    private static final Logger log = LoggerFactory.getLogger(RequestLagInterceptor.class);
    private static final long LAG_MILLIS = 1000;

    public RequestLagInterceptor() {
        log.warn("Introducing {} ms of artificial lag to every request.", LAG_MILLIS);
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        Thread.sleep(LAG_MILLIS);
        return true;
    }
}
