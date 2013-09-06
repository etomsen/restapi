package me.tomsen.restapi.exception;

import javax.ws.rs.WebApplicationException;

/**
 * User: porter
 * Date: 03/05/2012
 * Time: 12:27
 */
public class NotFoundException extends WebApplicationException {

    /**
     *
     */
    private static final long serialVersionUID = 1475950654623226262L;

    public NotFoundException() {
        super(404);
    }
}
