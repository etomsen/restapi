package me.tomsen.restapi.user.resource;

import me.tomsen.restapi.user.VerificationTokenService;

import javax.annotation.security.PermitAll;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Path("verify")
@Component
@Produces({MediaType.APPLICATION_JSON})
@Consumes({MediaType.APPLICATION_JSON})
public class VerificationResource {
    Logger LOG = LoggerFactory.getLogger(VerificationResource.class);

    @Autowired
    protected VerificationTokenService verificationTokenService;

    @PermitAll
    @Path("tokens/{token}")
    @POST
    public Response verifyToken(@PathParam("token") String token) {
        LOG.debug(VerificationResource.class+".verifyToken [token: "+token+"].");
        verificationTokenService.verify(token);
        return Response.ok().build();
    }
}
