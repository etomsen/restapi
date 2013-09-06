package me.tomsen.restapi.user;

import me.tomsen.restapi.user.domain.VerificationToken;

public interface VerificationTokenService {
    public VerificationToken verify(String base64EncodedToken);
}
