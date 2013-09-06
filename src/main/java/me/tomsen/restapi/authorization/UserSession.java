package me.tomsen.restapi.authorization;

import me.tomsen.restapi.user.domain.SessionToken;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Cacheable;

/**
 * Cacheable Object that holds information on the User and their session status
 */
@Cacheable
public class UserSession implements Serializable {

    /**
     *
     */
    private static final long serialVersionUID = 7623462543234233249L;

    private Date createTime;

    private Date lastUpdated;

    private String sessionToken;

    private boolean authenticationFailure = false;

    public UserSession() {
    }

    public UserSession(SessionToken token) {
        this.createTime = token.getTimeCreated();
        this.lastUpdated = token.getLastUpdated();
        this.sessionToken = token.getToken();
    }

    public Date getCreateTime() {
        return createTime;
    }

    public Date getLastUpdated() {
        return lastUpdated;
    }

    public String getSessionToken() {
        return sessionToken;
    }

    public boolean isAuthenticationFailure() {
        return authenticationFailure;
    }

    public void setAuthenticationFailure(boolean authenticationFailure) {
        this.authenticationFailure = authenticationFailure;
    }
}
