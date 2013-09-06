package me.tomsen.restapi.user.resource;

import me.tomsen.restapi.user.VerificationTokenService;

import javax.ws.rs.Consumes;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Path("password")
@Component
@Produces({MediaType.APPLICATION_JSON})
@Consumes({MediaType.APPLICATION_JSON})
public class PasswordResource {

    @Autowired
    protected VerificationTokenService verificationTokenService;

}
