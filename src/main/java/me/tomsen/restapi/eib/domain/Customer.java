package me.tomsen.restapi.eib.domain;

import me.tomsen.restapi.model.BaseEntity;
import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.*;

/**
 * Created with IntelliJ IDEA.
 * User: ebaranov
 * Date: 9/16/13
 * Time: 8:21 PM
 * To change this template use File | Settings | File Templates.
 */

@Entity
@Table(name = "CLIENTI")
public class Customer extends BaseEntity {
    private static final long serialVersionUID = 1791521333975974810L;

    @Column(name = "CODICE_CLIENTE",  nullable = false)
    private int eibId;

    public int getEibId() {
        return eibId;
    }

    public void setEibId(int eibId) {
        this.eibId = eibId;
    }
}
