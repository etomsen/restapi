package me.tomsen.restapi.eib.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created with IntelliJ IDEA.
 * User: ebaranov
 * Date: 9/16/13
 * Time: 9:50 PM
 * To change this template use File | Settings | File Templates.
 */

@Entity
@Table(name = "EIBLOGIN")
public class EibUser {
    @Id
    @Column(name = "USERNM", length = 80)
    private String name;

    @Column(name = "PASSWD", length = 80)
    private String password;

    @Column(name = "CODICE_CLIENTE", length = 5)
    private int customerId;

    @Column(name = "CLASSE", length = 12)
    private String userClass;

    @Column(name = "CODICE", length = 20)
    private String code;

    @Column(name = "LINGUA", length = 1)
    private int language;

    @Column(name = "EMAIL", length = 160)
    private String email;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getCustomerId() {
        return customerId;
    }

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }

    public String getUserClass() {
        return userClass;
    }

    public void setUserClass(String userClass) {
        this.userClass = userClass;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public int getLanguage() {
        return language;
    }

    public void setLanguage(int language) {
        this.language = language;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
