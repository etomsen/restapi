package me.tomsen.restapi.eib.resource;

import me.tomsen.restapi.eib.service.PolicyService;
import me.tomsen.restapi.eib.api.PolicyList;
import me.tomsen.restapi.user.api.UserPrincipal;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.*;
import javax.ws.rs.core.*;

/**
 * Created with IntelliJ IDEA.
 * User: etomsen
 * Date: 9/15/13
 * Time: 1:55 PM
 * To change this template use File | Settings | File Templates.
 */

@Path("/policy")
@Component
@Produces({MediaType.APPLICATION_JSON})
@Consumes({MediaType.APPLICATION_JSON})
public class PolicyResource {
    Logger LOG = LoggerFactory.getLogger(PolicyResource.class);
    @Context
    protected UriInfo uriInfo;

    @Autowired
    private PolicyService policyService;

    @RolesAllowed({"authenticated"})
    @GET
    public Response getList(@Context SecurityContext sc) {
        UserPrincipal requestingUser = (UserPrincipal)sc.getUserPrincipal();
        LOG.debug(PolicyResource.class+"getList [userId: "+requestingUser.getId()+", role:"+requestingUser.getRole()+"].");
        PolicyList list = policyService.getList(requestingUser);
        return Response.ok(list).build();
    }
}
