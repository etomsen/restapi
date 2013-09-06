package me.tomsen.restapi.authorization.impl;

import me.tomsen.restapi.authorization.AuthorizationRequestContext;
import me.tomsen.restapi.authorization.AuthorizationService;
import me.tomsen.restapi.user.UserRepository;
import me.tomsen.restapi.user.api.UserPrincipal;
import me.tomsen.restapi.user.domain.SessionToken;
import me.tomsen.restapi.user.domain.User;
import me.tomsen.restapi.user.exception.AuthorizationException;

import java.util.Date;

/**
 * Simple authorization service that requires a session token in the Authorization header
 * This is then matched to a user
 */
public class SessionTokenAuthorizationService implements AuthorizationService {

    /**
     * directly access user objects
     */
    private final UserRepository userRepository;

    public SessionTokenAuthorizationService(UserRepository repository) {
        this.userRepository = repository;
    }

    public UserPrincipal authorize(AuthorizationRequestContext securityContext) {
        String token = securityContext.getAuthorizationToken();
        UserPrincipal p = null;
        if (token == null) {
            return p;
        }
        User user = userRepository.findBySession(token);
        if (user == null) {
            throw new AuthorizationException("Session token not valid");
        }
        for (SessionToken sessionToken : user.getSessions()) {
            if (sessionToken.getToken().equals(token)) {
                sessionToken.setLastUpdated(new Date());
                userRepository.save(user);
                p = new UserPrincipal(user);
            }
        }
        return p;
    }
}
