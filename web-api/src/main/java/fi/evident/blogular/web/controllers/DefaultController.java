package fi.evident.blogular.web.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class DefaultController {

    @RequestMapping("/")
    public String defaultPage() {
        //noinspection SpringMVCViewInspection
        return "/index.html";
    }
}
