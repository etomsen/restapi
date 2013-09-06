package me.tomsen.restapi.exception;

public class ApplicationRuntimeException extends BaseWebApplicationException {

    /**
     *
     */
    private static final long serialVersionUID = 7648635840180411559L;

    public ApplicationRuntimeException(String applicationMessage) {
        super(500, "50002", "Internal System error", applicationMessage);
    }
}
