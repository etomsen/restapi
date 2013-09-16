package me.tomsen.restapi.user.domain;

import me.tomsen.restapi.authorization.UserSession;
import me.tomsen.restapi.eib.domain.EibUser;
import me.tomsen.restapi.model.BaseEntity;
import me.tomsen.restapi.util.HashUtil;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.Sort;
import org.hibernate.annotations.SortType;

import javax.persistence.*;
import java.security.MessageDigest;
import java.util.*;


@Entity
@Table(name = "restapi_user")
public class User extends BaseEntity {

    /**
     *
     */
    private static final long serialVersionUID = 1791521333975974810L;

    /**
     * Add additional salt to password hashing
     */

    private static final String HASH_SALT = "d8a8e885-ecce-42bb-8332-894f20f0d8ed";

    private static final int HASH_ITERATIONS = 1000;

    private String username;
    private String hashedPassword;
    private boolean isVerified;

    @Enumerated(EnumType.STRING)
    private Role role;

    @ManyToOne(targetEntity = EibUser.class,  cascade = CascadeType.DETACH)
    private EibUser eibUser;


    @OneToMany(mappedBy = "user", targetEntity = VerificationToken.class, cascade = CascadeType.ALL)
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<VerificationToken> verificationTokens = new ArrayList<VerificationToken>();

    @OneToMany(mappedBy = "user", targetEntity = SessionToken.class, cascade = CascadeType.ALL, orphanRemoval = true)
    @LazyCollection(LazyCollectionOption.FALSE)
    @Sort(type = SortType.NATURAL)
    private SortedSet<SessionToken> sessions = Collections.synchronizedSortedSet(new TreeSet<SessionToken>(Collections.<SessionToken>reverseOrder()));

    public User() {
        this(UUID.randomUUID());
    }

    public User(EibUser u, Role r) {
        this();
        this.eibUser = u;
        this.role = r;
    }

    public User(UUID uuid) {
        super(uuid);
        setRole(Role.anonymous); //all users are anonymous until credentials are proved
    }

    public void setHashedPassword(String hashedPassword) {
        this.hashedPassword = hashedPassword;
    }

    public String getHashedPassword() {
        return this.hashedPassword;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public boolean hasRole(Role role) {
        return role.equals(this.role);
    }


    public boolean equals(Object otherUser) {
        boolean response = false;

        if (otherUser == null) {
            response = false;
        } else if (!(otherUser instanceof User)) {
            response = false;
        } else {
            if (((User) otherUser).getUuid().equals(this.getUuid())) {
                response = true;
            }
        }

        return response;
    }

    public int hashCode() {
        return getUuid().hashCode();
    }

    public synchronized void addVerificationToken(VerificationToken token) {
        verificationTokens.add(token);
    }

    public synchronized List<VerificationToken> getVerificationTokens() {
        return Collections.unmodifiableList(this.verificationTokens);
    }

    public SessionToken addSessionToken() {
        SessionToken token = new SessionToken(this);
        this.sessions.add(token);
        return token;
    }

    @SuppressWarnings({"rawtypes", "unchecked"})
    public SortedSet<SessionToken> getSessions() {
        SortedSet copySet = new TreeSet<SessionToken>(Collections.<SessionToken>reverseOrder());
        copySet.addAll(this.sessions);
        return Collections.unmodifiableSortedSet(copySet);
    }

    public void removeSession(SessionToken session) {
        this.sessions.remove(session);
    }

    /**
     * If the user has a VerificationToken of type VerificationTokenType.emailVerification
     * that is active return it otherwise return null
     *
     * @return verificationToken
     */
    public VerificationToken getActiveEmailVerificationToken() {
        return getActiveToken(VerificationToken.VerificationTokenType.emailVerification);
    }

    /**
     * If the user has a VerificationToken of type VerificationTokenType.emailRegistration
     * that is active return it otherwise return null
     *
     * @return verificationToken
     */
    public VerificationToken getActiveEmailRegistrationToken() {
        return getActiveToken(VerificationToken.VerificationTokenType.emailRegistration);
    }

    private VerificationToken getActiveToken(VerificationToken.VerificationTokenType tokenType) {
        VerificationToken activeToken = null;
        for (VerificationToken token : getVerificationTokens()) {
            if (token.getTokenType().equals(tokenType)
                    && !token.hasExpired() && !token.isVerified()) {
                activeToken = token;
                break;
            }
        }
        return activeToken;
    }

    public boolean isVerified() {
        return isVerified;
    }

    public void setVerified(boolean verified) {
        isVerified = verified;
    }

    public void setActiveSession(UserSession session) {
        for (SessionToken token : getSessions()) {
            if (token.getToken().equals(session.getSessionToken())) {
                token.setLastUpdated(new Date());
            }
        }
    }

    public void removeExpiredSessions(Date expiryDate) {
        for (SessionToken token : getSessions()) {
            if (token.getLastUpdated().before(expiryDate)) {
                removeSession(token);
            }
        }
    }

    /**
     * Hash the password using salt values
     * See https://www.owasp.org/index.php/Hashing_Java
     *
     * @param passwordToHash
     * @return hashed password
     */
    public String hashPassword(String passwordToHash) throws Exception {
        return hashToken(passwordToHash, getUuid().toString() + HASH_SALT);
    }


    private String hashToken(String token, String salt) throws Exception {
        return HashUtil.byteToBase64(getHash(HASH_ITERATIONS, token, salt.getBytes()));
    }

    public byte[] getHash(int numberOfIterations, String password, byte[] salt) throws Exception {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        digest.reset();
        digest.update(salt);
        byte[] input = digest.digest(password.getBytes("UTF-8"));
        for (int i = 0; i < numberOfIterations; i++) {
            digest.reset();
            input = digest.digest(input);
        }
        return input;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
