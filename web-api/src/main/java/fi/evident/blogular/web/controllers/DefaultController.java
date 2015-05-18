package fi.evident.blogular.web.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class DefaultController {

    // The paths here match the routes in frontend/app/routes.js.
    // It's annoying to have to define these in two places, but it works for now.
    @SuppressWarnings("MVCPathVariableInspection")
    @RequestMapping({
            "/",
            "/post",
            "/posts",
            "/posts/{slug:[a-zA-Z0-9-]+}",
            "/login"}
    )
    public String defaultPage() {
        return "/index.html";
    }
}
