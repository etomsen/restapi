package me.tomsen.restapi.authorization;

import me.tomsen.restapi.user.api.UserPrincipal;

public interface AuthorizationService {

    /**
     * Given an AuthorizationRequestContext validate and authorize a User
     *
     * @param authorizationRequestContext the context required to authorize a user for a particular request
     * @return ExternalUser
     */
    public UserPrincipal authorize(AuthorizationRequestContext authorizationRequestContext);
}
