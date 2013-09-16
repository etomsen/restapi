package me.tomsen.restapi.user.api;

import me.tomsen.restapi.user.domain.Role;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Created with IntelliJ IDEA.
 * User: etomsen
 * Date: 9/16/13
 * Time: 10:42 PM
 * To change this template use File | Settings | File Templates.
 */
@XmlRootElement
public class CreateUserRequest {
    @NotNull
    private String username;

    @Length(min = 8, max = 30)
    @NotNull
    private String password;

    @NotNull
    private String eibUserName;

    @NotNull
    private Role role;

    public CreateUserRequest() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEibUserName() {
        return eibUserName;
    }

    public void setEibUserName(String eibUserName) {
        this.eibUserName = eibUserName;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}

