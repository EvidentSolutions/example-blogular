package fi.evident.blogular.web.controllers;

import fi.evident.blogular.core.model.LoginResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import java.nio.charset.Charset;
import java.util.Base64;

@RestController
@RequestMapping("/api/account")
public class AccountController {

    private static final Charset UTF8 = Charset.forName("UTF-8");

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<LoginResponse> login(@RequestParam String username, @RequestParam String password, HttpServletRequest request) {
        try {
            request.login(username, password);

            LoginResponse response = new LoginResponse();
            response.name = "J. Random Hacker";
            response.authToken = "Basic " + Base64.getEncoder().encodeToString((username + ":" + password).getBytes(UTF8));

            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (ServletException e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
}
