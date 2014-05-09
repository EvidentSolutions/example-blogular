package fi.evident.blogular.web.resolvers;

import fi.evident.blogular.core.annotations.CurrentUser;
import org.springframework.core.MethodParameter;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

@Component
public class CurrentUserArgumentResolver implements HandlerMethodArgumentResolver {

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(CurrentUser.class)
            && parameter.getParameterType().isAssignableFrom(User.class);
    }

    @Override
    public User resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        Authentication authentication = (Authentication) webRequest.getUserPrincipal();
        if (authentication != null)
            return (User) authentication.getPrincipal();

        CurrentUser annotation = parameter.getParameterAnnotation(CurrentUser.class);
        if (annotation.required())
            throw new AccessDeniedException("user is not logged in");
        else
            return null;
    }
}
