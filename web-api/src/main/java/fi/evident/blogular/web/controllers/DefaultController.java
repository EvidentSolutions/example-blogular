package fi.evident.blogular.web.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class DefaultController {

    @RequestMapping({"/", "/post", "/posts/**", "/login"})
    public String defaultPage() {
        return "/index.html";
    }
}
