package me.tomsen.restapi.exception;

import me.tomsen.restapi.api.ErrorResponse;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

public abstract class BaseWebApplicationException extends WebApplicationException {

    /**
     *
     */
    private static final long serialVersionUID = 8482954839902483176L;
    private final int status;
    private final String errorMessage;
    private final String errorCode;
    private final String developerMessage;

    public BaseWebApplicationException(int httpStatus, String errorCode, String errorMessage, String developerMessage) {
        this.status = httpStatus;
        this.errorMessage = errorMessage;
        this.errorCode = errorCode;
        this.developerMessage = developerMessage;
    }


    @Override
    public Response getResponse() {
        return Response.status(status).type(MediaType.APPLICATION_JSON_TYPE).entity(getErrorResponse()).build();
    }

    public ErrorResponse getErrorResponse() {
        ErrorResponse response = new ErrorResponse();
        response.setErrorCode(errorCode);
        response.setApplicationMessage(developerMessage);
        response.setConsumerMessage(errorMessage);
        return response;
    }

}
