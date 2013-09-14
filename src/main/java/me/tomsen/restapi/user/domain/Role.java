package me.tomsen.restapi.user.domain;

import javax.xml.bind.annotation.XmlEnum;

@XmlEnum(String.class)
public enum Role {
    authenticated, administrator, anonymous
}

