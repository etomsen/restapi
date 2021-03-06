package me.tomsen.restapi.user;


import me.tomsen.restapi.eib.domain.EibUser;
import me.tomsen.restapi.eib.repository.EibUserRepository;
import me.tomsen.restapi.service.BaseService;
import me.tomsen.restapi.user.api.AuthenticatedUserToken;
import me.tomsen.restapi.user.api.CreateUserRequest;
import me.tomsen.restapi.user.api.LoginRequest;
import me.tomsen.restapi.user.api.UserPrincipal;
import me.tomsen.restapi.user.domain.Role;
import me.tomsen.restapi.user.domain.User;
import me.tomsen.restapi.user.exception.AuthenticationException;
import me.tomsen.restapi.user.exception.AuthorizationException;
import me.tomsen.restapi.user.exception.UserNotFoundException;
import me.tomsen.restapi.util.StringUtil;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import javax.validation.Validator;
import java.util.List;

@Service("userService")
public class UserServiceImpl extends BaseService implements UserService {

    Logger LOG = LoggerFactory.getLogger(UserServiceImpl.class);

    private UserRepository userRepository;
    private EibUserRepository eibUserRepository;


    private User createNewUser(EibUser eibUser, Role role) {
        User userToSave = new User(eibUser, role);
        userToSave.setUsername(eibUser.getName());
        try {
            userToSave.setHashedPassword(userToSave.hashPassword(eibUser.getPassword()));
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
        LOG.debug("UserService.login [login: " + request.getUsername() + " password:" + request.getPassword() + " ]");
        validate(request);
        User user = userRepository.findByUsername(request.getUsername());
        if (user == null) {
            throw new AuthenticationException();
        }
        String hashedPassword;
        try {
            hashedPassword = user.hashPassword(request.getPassword());
        } catch (Exception e) {
            throw new AuthenticationException();
        }
        if (hashedPassword.equals(user.getHashedPassword())) {
            return new AuthenticatedUserToken(user.getUuid().toString(), user.addSessionToken().getToken(), user.getRole());
        } else {
            throw new AuthenticationException();
        }
    }

    @Transactional
    public AuthenticatedUserToken create(CreateUserRequest request) {
        LOG.debug("UserService.create [login: " + request.getUsername() + " eibUser:" + request.getEibUserName() + " password:" + request.getPassword() + " ]");
        validate(request);
        User user = userRepository.findByUsername(request.getUsername());
        if (user != null) {
            LOG.debug(" Duplicate user!");
            throw new AuthenticationException();
        }

        EibUser eibUser = eibUserRepository.findByUsername(request.getEibUserName());
        if (eibUser == null) {
            LOG.debug(" No eibUser found with name"+request.getEibUserName());
            throw new AuthenticationException();
        }

        if (!request.getUsername().equals("eibwebappcreate") || !request.getPassword().equals("e1bweb@pp")) {
            LOG.debug(" Authentification failed: "+request.getUsername());
            throw new AuthenticationException();
        }

        LOG.debug("Creating user [Name: "+ request.getUsername() + "Role: "+request.getRole().toString() + "]");
        user = createNewUser(eibUser, request.getRole());
        return new AuthenticatedUserToken(user.getUuid().toString(), user.addSessionToken().getToken(), user.getRole());
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

    @Override
    public UserPrincipal getUser(UserPrincipal requestingUser, String userIdentifier) {
        Assert.notNull(requestingUser);
        Assert.notNull(userIdentifier);
        User user = ensureUserIsLoaded(userIdentifier);
        if (!requestingUser.getId().equals(user.getUuid().toString()) && !requestingUser.getRole().equalsIgnoreCase(Role.administrator.toString())) {
            throw new AuthorizationException("User not authorized to load profile");
        }
        return new UserPrincipal(user);
    }

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Autowired
    public void setEibUserRepository(EibUserRepository r) {
        this.eibUserRepository = r;
    }

    private User ensureUserIsLoaded(String userIdentifier) {
        User user = null;
        if (StringUtil.isValidUuid(userIdentifier)) {
            user = userRepository.findByUuid(userIdentifier);
        }
        if (user == null) {
            throw new UserNotFoundException();
        }
        return user;
    }


}
