package fi.evident.blogular.web.controllers;

import fi.evident.blogular.core.model.LoginResponse;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Base64;

import static java.nio.charset.StandardCharsets.UTF_8;

@RestController
@RequestMapping("/api/account")
public class AccountController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<LoginResponse> login(@RequestParam String username, @RequestParam String password) {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));

            UserDetails user = (UserDetails) authentication.getPrincipal();

            LoginResponse response = new LoginResponse();
            response.name = user.getUsername();
            response.authToken = createAuthenticationToken(username, password);

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (AuthenticationException e) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    @NotNull
    private static String createAuthenticationToken(@NotNull String username, @NotNull String password) {
        String token = username + ":" + password;
        Base64.Encoder encoder = Base64.getEncoder();

        return "Basic " + encoder.encodeToString(token.getBytes(UTF_8));
    }
}
