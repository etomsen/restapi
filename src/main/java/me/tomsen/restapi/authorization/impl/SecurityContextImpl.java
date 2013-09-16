package me.tomsen.restapi.authorization.impl;

import me.tomsen.restapi.authorization.exception.InvalidAuthorizationHeaderException;
import me.tomsen.restapi.user.api.UserPrincipal;
import me.tomsen.restapi.user.domain.Role;

import java.security.Principal;

import javax.ws.rs.core.SecurityContext;

public class SecurityContextImpl implements SecurityContext {

    private final UserPrincipal user;

    public SecurityContextImpl(UserPrincipal user) {
        this.user = user;
    }

    public Principal getUserPrincipal() {
        return user;
    }

    public boolean isUserInRole(String role) {
        if (role.equalsIgnoreCase(Role.anonymous.name())) {
            return true;
        }
        if (user == null) {
            throw new InvalidAuthorizationHeaderException();
        }
        // because there are some resources admin should not see :)
//        if (user.getRole().equalsIgnoreCase(Role.administrator.name())) {
//            return true;
//        }
        return user.getRole().equalsIgnoreCase(role);
    }

    public boolean isSecure() {
        return false;
    }

    public String getAuthenticationScheme() {
        return SecurityContext.BASIC_AUTH;
    }
}
