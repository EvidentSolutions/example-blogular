package fi.evident.blogular.web.controllers;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.web.FilterChainProxy;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration(classes = ControllerTestConfiguration.class)
public class AccountControllerTest {

    @Autowired
    private WebApplicationContext wac;

    @Autowired
    @SuppressWarnings("SpringJavaAutowiringInspection")
    private FilterChainProxy springSecurityFilterChain;

    private MockMvc mvc;

    @Before
    public void setup() {
        mvc = webAppContextSetup(wac).addFilters(springSecurityFilterChain).build();
    }

    @Test
    public void loginWithProperCredentials() throws Exception {
        mvc.perform(post("/api/account/login").param("username", "user").param("password", "password"))
                .andExpect(status().isOk());
    }

    @Test
    public void loginWithInvalidCredentials() throws Exception {
        mvc.perform(post("/api/account/login").param("username", "admin").param("password", "invalid"))
                .andExpect(status().isUnauthorized());
    }
}
