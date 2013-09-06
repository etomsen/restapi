package me.tomsen.restapi.user;

import me.tomsen.restapi.config.ApplicationConfig;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

public class SessionReaper {

    Logger LOG = LoggerFactory.getLogger(SessionReaper.class);

    private UserService userService;

    ApplicationConfig config;

    public void cleanUpExpiredSessions() {
        Integer sessionCount = userService.deleteExpiredSessions(config.getSessionExpiryTimeInMinutes());
        LOG.debug("Session reaper has removed {} expired sessions", sessionCount);
    }

    @Autowired
    public void setConfig(ApplicationConfig config) {
        this.config = config;
    }

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }
}
