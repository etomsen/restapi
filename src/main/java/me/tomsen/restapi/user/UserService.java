package me.tomsen.restapi.user;

import me.tomsen.restapi.user.api.*;

public interface UserService {

    public AuthenticatedUserToken login(LoginRequest request);

    public AuthenticatedUserToken create(CreateUserRequest request);

    public Integer deleteExpiredSessions(int timeSinceLastUpdatedInMinutes);

    public UserPrincipal getUser(UserPrincipal requestingUser, String userIdentifier);

}
