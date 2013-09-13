package me.tomsen.restapi.resource;

import javax.annotation.security.PermitAll;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Path("/healthcheck")
@Component
@Produces({MediaType.TEXT_PLAIN})
@PropertySource("classpath:properties/app.properties")
public class HealthCheckResource {

    @Autowired
    Environment env;

    Logger LOG = LoggerFactory.getLogger(HealthCheckResource.class);

    @PermitAll
    @GET
    public Response ping() {
        LOG.info(HealthCheckResource.class+".ping;");
        return Response.ok().entity("Healthcheck get. Running version " + env.getProperty("application.version")).build();
    }

}
