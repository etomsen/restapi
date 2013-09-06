package me.tomsen.restapi.user.exception;

import me.tomsen.restapi.exception.BaseWebApplicationException;

public class TokenNotFoundException extends BaseWebApplicationException {

    /**
     *
     */
    private static final long serialVersionUID = -6271931686136176973L;

    public TokenNotFoundException() {
        super(404, "40407", "Token Not Found", "No token could be found for that Id");
    }
}
