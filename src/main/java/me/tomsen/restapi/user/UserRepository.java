package me.tomsen.restapi.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import me.tomsen.restapi.user.domain.User;

import java.util.Date;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query("select u from User u where username = ?")
    User findByUsername(String username);

    @Query("select u from User u where uuid = ?")
    User findByUuid(String uuid);

    @Query("select u from User u where u in (select user from SessionToken where lastUpdated < ?)")
    List<User> findByExpiredSession(Date lastUpdated);

    @Query("select u from User u where u = (select user from SessionToken where token = ?)")
    User findBySession(String token);

}
