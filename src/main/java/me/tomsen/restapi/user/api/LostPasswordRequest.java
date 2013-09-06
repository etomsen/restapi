package me.tomsen.restapi.user.api;

import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class LostPasswordRequest {

    @NotNull
    private String emailAddress;

    public LostPasswordRequest() {
    }

    public LostPasswordRequest(final String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }
}
