package me.tomsen.restapi.user;

import me.tomsen.restapi.user.api.*;

public interface UserService {

    /**
     * Login a User
     *
     * @param request
     * @return AuthenticatedUserToken
     */
    public AuthenticatedUserToken login(LoginRequest request);

    /**
     * Delete all SessionToken objects that have not been accessed within the duration specified by the argument timeSinceLastUpdatedInMinutes
     *
     * @param timeSinceLastUpdatedInMinutes
     * @return the number of sessions removed
     */
    public Integer deleteExpiredSessions(int timeSinceLastUpdatedInMinutes);

}
