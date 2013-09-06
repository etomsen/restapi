package me.tomsen.restapi.user.exception;

import me.tomsen.restapi.exception.BaseWebApplicationException;

public class AlreadyVerifiedException extends BaseWebApplicationException {

    /**
     *
     */
    private static final long serialVersionUID = 3158988614906901421L;

    public AlreadyVerifiedException() {
        super(409, "40905", "Already verified", "The token has already been verified");
    }
}
