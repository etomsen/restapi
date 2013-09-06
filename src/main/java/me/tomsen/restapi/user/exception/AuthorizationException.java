package me.tomsen.restapi.user.exception;


import me.tomsen.restapi.exception.BaseWebApplicationException;

public class AuthorizationException extends BaseWebApplicationException {

    /**
     *
     */
    private static final long serialVersionUID = -4139089000788058964L;

    public AuthorizationException(String applicationMessage) {
        super(403, "40301", "Not authorized", applicationMessage);
    }

}
