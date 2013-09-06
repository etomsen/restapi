package me.tomsen.restapi.user;


import me.tomsen.restapi.service.BaseService;
import me.tomsen.restapi.user.api.AuthenticatedUserToken;
import me.tomsen.restapi.user.api.LoginRequest;
import me.tomsen.restapi.user.domain.Role;
import me.tomsen.restapi.user.domain.User;
import me.tomsen.restapi.user.exception.AuthenticationException;

import java.util.List;

import javax.validation.Validator;

import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("userService")
public class UserServiceImpl extends BaseService implements UserService {

    Logger LOG = LoggerFactory.getLogger(UserServiceImpl.class);

    private UserRepository userRepository;

    @Transactional
    public AuthenticatedUserToken createUser(Role role) {
        User user = new User();
        user.setRole(role);
        userRepository.save(user);
        return new AuthenticatedUserToken(user.getUuid().toString(), user.addSessionToken().getToken());
    }


    private User createNewUser(String username, String password, Role role) {
        User userToSave = new User();
        userToSave.setUsername(username);
        try {
            userToSave.setHashedPassword(userToSave.hashPassword(password));
        } catch (Exception e) {
            throw new AuthenticationException();
        }
        userToSave.setRole(role);
        return userRepository.save(userToSave);
    }

    @Autowired
    public UserServiceImpl(Validator validator) {
        super(validator);
    }

    @Transactional
    public AuthenticatedUserToken login(LoginRequest request) {
        validate(request);
        User user = null;
        user = userRepository.findByUsername(request.getUsername());
        if (user == null) {
            if (request.getUsername().equals("create")) {
                LOG.debug(request.getUsername());
                user = createNewUser(request.getUsername(), request.getPassword(), Role.authenticated);
                return new AuthenticatedUserToken(user.getUuid().toString(), user.addSessionToken().getToken());
            } else {
                throw new AuthenticationException();
            }
        }
        String hashedPassword = null;
        try {
            hashedPassword = user.hashPassword(request.getPassword());
        } catch (Exception e) {
            throw new AuthenticationException();
        }
        if (hashedPassword.equals(user.getHashedPassword())) {
            return new AuthenticatedUserToken(user.getUuid().toString(), user.addSessionToken().getToken());
        } else {
            throw new AuthenticationException();
        }
    }


    @Transactional
    public Integer deleteExpiredSessions(int timeSinceLastUpdatedInMinutes) {
        DateTime date = new DateTime();
        date = date.minusMinutes(timeSinceLastUpdatedInMinutes);
        List<User> expiredUserSessions = userRepository.findByExpiredSession(date.toDate());
        int count = expiredUserSessions.size();
        for (User user : expiredUserSessions) {
            user.removeExpiredSessions(date.toDate());
        }
        if (count > 0) {
            userRepository.save(expiredUserSessions);
        }
        return count;
    }

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

}
