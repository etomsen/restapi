package me.tomsen.restapi.user.resource;

import me.tomsen.restapi.config.ApplicationConfig;
import me.tomsen.restapi.user.UserService;
import me.tomsen.restapi.user.VerificationTokenService;
import me.tomsen.restapi.user.api.AuthenticatedUserToken;
import me.tomsen.restapi.user.api.LoginRequest;

import java.net.URI;

import javax.annotation.security.PermitAll;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;
import javax.ws.rs.core.UriInfo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Path("/user")
@Component
@Produces({MediaType.APPLICATION_JSON})
@Consumes({MediaType.APPLICATION_JSON})
public class UserResource {

    Logger LOG = LoggerFactory.getLogger(UserResource.class);

    @Autowired
    protected UserService userService;

    @Autowired
    protected VerificationTokenService verificationTokenService;

    @Context
    protected UriInfo uriInfo;

    @Autowired
    ApplicationConfig config;

    @PermitAll
    @Path("login")
    @POST
    public Response login(LoginRequest request) {
        AuthenticatedUserToken token = userService.login(request);
        return getLoginResponse(token);
    }

    private Response getLoginResponse(AuthenticatedUserToken token) {
        URI location = UriBuilder.fromPath(uriInfo.getBaseUri() + "user/" + token.getUserId()).build();
        return Response.ok().entity(token).contentLocation(location).build();
    }

}
