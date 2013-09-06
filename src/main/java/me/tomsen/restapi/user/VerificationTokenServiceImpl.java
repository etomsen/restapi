package me.tomsen.restapi.user;

import me.tomsen.restapi.config.ApplicationConfig;
import me.tomsen.restapi.service.BaseService;
import me.tomsen.restapi.user.domain.VerificationToken;
import me.tomsen.restapi.user.exception.AlreadyVerifiedException;
import me.tomsen.restapi.user.exception.TokenHasExpiredException;
import me.tomsen.restapi.user.exception.TokenNotFoundException;

import javax.validation.Validator;

import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;


@Service("verificationTokenService")
public class VerificationTokenServiceImpl extends BaseService implements VerificationTokenService {

    private VerificationTokenRepository tokenRepository;

    private UserRepository userRepository;

    ApplicationConfig config;

    public VerificationTokenServiceImpl(Validator validator) {
        super(validator);
    }

    @Autowired
    public VerificationTokenServiceImpl(UserRepository userRepository, VerificationTokenRepository tokenRepository, Validator validator) {
        this(validator);
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
    }

    @Transactional
    public VerificationToken verify(String base64EncodedToken) {
        VerificationToken token = loadToken(base64EncodedToken);
        if (token.isVerified() || token.getUser().isVerified()) {
            throw new AlreadyVerifiedException();
        }
        token.setVerified(true);
        token.getUser().setVerified(true);
        userRepository.save(token.getUser());
        return token;
    }

    private VerificationToken loadToken(String base64EncodedToken) {
        Assert.notNull(base64EncodedToken);
        String rawToken = new String(Base64.decodeBase64(base64EncodedToken));
        VerificationToken token = tokenRepository.findByToken(rawToken);
        if (token == null) {
            throw new TokenNotFoundException();
        }
        if (token.hasExpired()) {
            throw new TokenHasExpiredException();
        }
        return token;
    }

    @Autowired
    public void setConfig(ApplicationConfig config) {
        this.config = config;
    }

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public ApplicationConfig getConfig() {
        return this.config;
    }
}
