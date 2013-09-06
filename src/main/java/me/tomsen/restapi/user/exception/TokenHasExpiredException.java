package me.tomsen.restapi.user.exception;

import me.tomsen.restapi.exception.BaseWebApplicationException;

public class TokenHasExpiredException extends BaseWebApplicationException {

    /**
     *
     */
    private static final long serialVersionUID = -6106663124947744140L;

    public TokenHasExpiredException() {
        super(403, "40304", "Token has expired", "An attempt was made to load a token that has expired");
    }
}
