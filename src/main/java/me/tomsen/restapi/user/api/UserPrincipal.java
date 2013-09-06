package me.tomsen.restapi.user.api;

import me.tomsen.restapi.user.domain.User;

import java.security.Principal;

import javax.xml.bind.annotation.XmlRootElement;

import org.codehaus.jackson.annotate.JsonIgnore;

@XmlRootElement
public class UserPrincipal implements Principal {

    private String id;
    private String username;
    private boolean isVerified;
    @JsonIgnore
    private String role;

    public UserPrincipal() {
    }

    public UserPrincipal(String userId) {
        this.setId(userId);
    }

    @Override
    public String getName() {
        return username;
    }

    public UserPrincipal(User user) {
        this.setId(user.getUuid().toString());
        this.username = user.getUsername();
        this.setVerified(user.isVerified());
        role = user.getRole().toString();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRole() {
        return this.role;
    }

    public boolean isVerified() {
        return isVerified;
    }

    public void setVerified(boolean isVerified) {
        this.isVerified = isVerified;
    }


}
