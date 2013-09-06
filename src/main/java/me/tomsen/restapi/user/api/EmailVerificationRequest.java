package me.tomsen.restapi.user.api;

import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class EmailVerificationRequest {

    @NotNull
    private String emailAddress;

    public EmailVerificationRequest() {
    }

    public EmailVerificationRequest(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }
}
