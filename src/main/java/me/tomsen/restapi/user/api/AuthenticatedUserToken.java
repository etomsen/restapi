package me.tomsen.restapi.user.api;

import me.tomsen.restapi.user.domain.Role;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class AuthenticatedUserToken {

    private String userId;
    private String token;
    private Role role;

    public AuthenticatedUserToken() {
    }

    public AuthenticatedUserToken(String userId, String sessionToken, Role role) {
        this.userId = userId;
        this.token = sessionToken;
        this.role = role;
    }

    public String getUserId() {
        return userId;
    }

    public String getToken() {
        return token;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
