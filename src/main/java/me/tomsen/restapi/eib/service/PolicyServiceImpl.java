package me.tomsen.restapi.eib.service;

import me.tomsen.restapi.eib.api.PolicyList;
import me.tomsen.restapi.eib.api.PolicyListItem;
import me.tomsen.restapi.service.BaseService;
import me.tomsen.restapi.user.UserRepository;
import me.tomsen.restapi.user.api.UserPrincipal;
import me.tomsen.restapi.user.domain.Role;
import me.tomsen.restapi.user.domain.User;
import me.tomsen.restapi.user.exception.UserNotFoundException;
import me.tomsen.restapi.util.StringUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import javax.validation.Validator;
import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: etomsen
 * Date: 9/15/13
 * Time: 8:07 PM
 * To change this template use File | Settings | File Templates.
 */

@Service("policyService")
public class PolicyServiceImpl extends BaseService implements PolicyService {
    Logger LOG = LoggerFactory.getLogger(PolicyServiceImpl.class);

    private UserRepository userRepository;

    @Autowired
    public PolicyServiceImpl(Validator validator) {
        super(validator);
    }

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
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

    @Override
    @Transactional
    public PolicyList getList(UserPrincipal requestingUser) {
        LOG.debug("PolicyList.getList [Id: "+requestingUser.getId()+" Role: "+requestingUser.getRole()+"].");
        Assert.notNull(requestingUser);
        if (requestingUser.getRole().equals(Role.administrator)) {
            // load all policies
        } else {
            // load policies of the user
        }

        PolicyList lst = new PolicyList();
        // debug
        PolicyListItem i = new PolicyListItem();
        i.setId("LIPIT0000000021");
        i.setCustomer("9REN ASSET SRL");
        i.setCompany("ACEVIT");
        i.setBranch("VITA");
        i.setDeadline(new Date());
        i.setDesc("VITA CCNL DIRIGENTI");
        i.setAward(0.01);
        i.setClaimsCount(1);
        i.setPaymentsCount(1);
        lst.getList().add(i);
        return lst;
    }
}
