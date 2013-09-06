package me.tomsen.restapi.user.exception;

import me.tomsen.restapi.exception.BaseWebApplicationException;

public class AuthenticationException extends BaseWebApplicationException {

    /**
     *
     */
    private static final long serialVersionUID = -6469523292267912644L;

    public AuthenticationException() {
        super(401, "40102", "Authentication Error", "Authentication Error. The username or password were incorrect");
    }


}
