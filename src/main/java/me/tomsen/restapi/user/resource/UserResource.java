package me.tomsen.restapi.user.resource;

import me.tomsen.restapi.config.ApplicationConfig;
import me.tomsen.restapi.user.UserService;
import me.tomsen.restapi.user.VerificationTokenService;
import me.tomsen.restapi.user.api.AuthenticatedUserToken;
import me.tomsen.restapi.user.api.LoginRequest;

import java.net.URI;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.*;
import javax.ws.rs.core.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;
import javax.ws.rs.core.UriInfo;

import me.tomsen.restapi.user.api.UserPrincipal;
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
        LOG.debug(UserResource.class+": login request received");
        AuthenticatedUserToken token = userService.login(request);
        return getLoginResponse(token);
    }

    @PermitAll
    @Path("create")
    @POST
    public Response create(LoginRequest request) {
        LOG.debug(UserResource.class+": create request received");
        AuthenticatedUserToken token = userService.create(request);
        return getLoginResponse(token);
    }

    private Response getLoginResponse(AuthenticatedUserToken token) {
        URI location = UriBuilder.fromPath(uriInfo.getBaseUri() + "user/" + token.getUserId()).build();
        return Response.ok().entity(token).contentLocation(location).build();
    }

    @RolesAllowed({"authenticated"})
    @Path("{userId}")
    @GET
    public Response getUser(@Context SecurityContext sc, @PathParam("userId") String userId) {
        LOG.debug(UserResource.class+"getUser [userId: "+userId+"].");
        UserPrincipal requestingUser = (UserPrincipal)sc.getUserPrincipal();
        UserPrincipal user = userService.getUser(requestingUser, userId);
        return Response.ok().entity(user).build();
    }

}
