package me.tomsen.restapi.eib.repository;

import me.tomsen.restapi.eib.domain.EibUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


/**
 * Created with IntelliJ IDEA.
 * User: ebaranov
 * Date: 9/16/13
 * Time: 10:49 PM
 * To change this template use File | Settings | File Templates.
 */
public interface EibUserRepository extends JpaRepository<EibUser, String> {
    @Query("select u from EibUser u where name = ?")
    EibUser findByUsername(String username);

}

