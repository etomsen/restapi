package me.tomsen.restapi.authorization.exception;

import me.tomsen.restapi.exception.BaseWebApplicationException;

public class InvalidAuthorizationHeaderException extends BaseWebApplicationException {


    /**
     *
     */
    private static final long serialVersionUID = -1605729908250569866L;
    public static final String DEVELOPER_MESSAGE = "Authorization failed. This could be due to missing properties in the header or" +
            " the Authorization header may have been incorrectly hashed";

    public InvalidAuthorizationHeaderException() {
        super(401, "40101", "Authorization failed", DEVELOPER_MESSAGE);
    }

}
