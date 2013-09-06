package me.tomsen.restapi.filter;

import me.tomsen.restapi.authorization.AuthorizationRequestContext;
import me.tomsen.restapi.authorization.AuthorizationService;
import me.tomsen.restapi.authorization.impl.RequestSigningAuthorizationService;
import me.tomsen.restapi.authorization.impl.SecurityContextImpl;
import me.tomsen.restapi.authorization.impl.SessionTokenAuthorizationService;
import me.tomsen.restapi.config.ApplicationConfig;
import me.tomsen.restapi.user.UserRepository;
import me.tomsen.restapi.user.UserService;
import me.tomsen.restapi.user.api.UserPrincipal;

import javax.ws.rs.ext.Provider;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.sun.jersey.spi.container.ContainerRequest;
import com.sun.jersey.spi.container.ContainerRequestFilter;
import com.sun.jersey.spi.container.ContainerResponseFilter;
import com.sun.jersey.spi.container.ResourceFilter;

@Component
@Provider
public class SecurityContextFilter implements ResourceFilter, ContainerRequestFilter {

//    private static final Logger LOG = LoggerFactory.getLogger(SecurityContextFilter.class);

    protected static final String HEADER_AUTHORIZATION = "Authorization";

    protected static final String HEADER_DATE = "x-me-tomsen-restapi-date";

    protected static final String HEADER_NONCE = "nonce";

    private AuthorizationService authorizationService;

    ApplicationConfig config;

    @Autowired
    public SecurityContextFilter(UserRepository userRepository, UserService userService, ApplicationConfig config) {
        delegateAuthorizationService(userRepository, userService, config);
        this.config = config;

    }

    /**
     * If there is an Authorisation header in the request extract the session token and retrieve the user
     * <p/>
     * Delegate to the AuthorizationService to validate the request
     * <p/>
     * If the request has a valid session token and the user is validated then a user object will be added to the security context
     * <p/>
     * Any Resource Controllers can assume the user has been validated and can merely authorize based on the role
     * <p/>
     * Resources with @PermitAll annotation do not require an Authorization header but will still be filtered
     *
     * @param request the ContainerRequest to filter
     * @return the ContainerRequest with a SecurityContext added
     */
    public ContainerRequest filter(ContainerRequest request) {
        String authToken = request.getHeaderValue(HEADER_AUTHORIZATION);
        String requestDateString = request.getHeaderValue(HEADER_DATE);
        String nonce = request.getHeaderValue(HEADER_NONCE);
        AuthorizationRequestContext context = new AuthorizationRequestContext(request.getPath(), request.getMethod(),
                requestDateString, nonce, authToken);
        UserPrincipal p = authorizationService.authorize(context);
        request.setSecurityContext(new SecurityContextImpl(p));
        return request;
    }

    /**
     * Specify the AuthorizationService that the application should use
     *
     * @param userRepository
     * @param userService
     * @param config
     */
    private void delegateAuthorizationService(UserRepository userRepository, UserService userService, ApplicationConfig config) {
        if (config.requireSignedRequests()) {
            this.authorizationService = new RequestSigningAuthorizationService(userRepository, config);
        } else {
            this.authorizationService = new SessionTokenAuthorizationService(userRepository);
        }
    }


    public ContainerRequestFilter getRequestFilter() {
        return this;
    }

    public ContainerResponseFilter getResponseFilter() {
        return null;
    }

    @Autowired
    public void setConfig(ApplicationConfig config) {
        this.config = config;
    }

}
