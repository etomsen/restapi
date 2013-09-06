package me.tomsen.restapi.user.exception;

import me.tomsen.restapi.exception.BaseWebApplicationException;

public class UserNotFoundException extends BaseWebApplicationException {

    /**
     *
     */
    private static final long serialVersionUID = -1461038666999609388L;

    public UserNotFoundException() {
        super(404, "40402", "User Not Found", "No User could be found for that Id");
    }
}
