package me.tomsen.restapi.resource;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

import me.tomsen.restapi.user.UserService;
import me.tomsen.restapi.user.api.UserPrincipal;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Path("/healthcheck")
@Component
@PropertySource("classpath:properties/app.properties")
public class HealthCheckResource {

    @Autowired
    Environment env;

    @Autowired
    protected UserService userService;

    Logger LOG = LoggerFactory.getLogger(HealthCheckResource.class);

    @PermitAll
    @GET
    @Produces({MediaType.TEXT_PLAIN})
    public Response ping() {
        LOG.info(HealthCheckResource.class+".ping;");
        return Response.ok().entity("Healthcheck get. Running version " + env.getProperty("application.version")).build();
    }

    @Path("auth")
    @GET
    @RolesAllowed({"authenticated", "administrator"})
    @Produces({MediaType.APPLICATION_JSON})
    public Response auth(@Context SecurityContext sc) {
        LOG.info(HealthCheckResource.class+".auth []");
        UserPrincipal requestingUser = (UserPrincipal)sc.getUserPrincipal();
        LOG.info("  RequestingUser [Id: "+requestingUser.getId()+" Name: "+requestingUser.getName()+" Role: "+requestingUser.getRole()+"]");
        return Response.ok().entity(requestingUser).build();
    }

}
