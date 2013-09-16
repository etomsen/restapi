package me.tomsen.restapi.eib.service;

import me.tomsen.restapi.eib.api.PolicyList;
import me.tomsen.restapi.user.api.UserPrincipal;

/**
 * Created with IntelliJ IDEA.
 * User: etomsen
 * Date: 9/15/13
 * Time: 8:05 PM
 * To change this template use File | Settings | File Templates.
 */
public interface PolicyService {
    PolicyList getList(UserPrincipal requestingUser);
}
