package me.tomsen.restapi.model;

import org.springframework.data.jpa.domain.AbstractPersistable;
import org.springframework.util.Assert;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.Version;
import java.util.Date;
import java.util.UUID;

@MappedSuperclass
public abstract class BaseEntity extends AbstractPersistable<Long> {

    /**
     *
     */
    private static final long serialVersionUID = 7542791045304232721L;

    @Version
    private int version;

    /**
     * All objects will have a unique UUID which allows for the decoupling from DB generated ids
     */
    @Column(length = 36)
    private String uuid;

    private Date timeCreated;

    public BaseEntity() {
        this(UUID.randomUUID());
    }

    public BaseEntity(UUID guid) {
        Assert.notNull(guid, "UUID is required");
        setUuid(guid.toString());
        this.timeCreated = new Date();
    }

    public UUID getUuid() {
        return UUID.fromString(uuid);
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public int hashCode() {
        return getUuid().hashCode();
    }

    /**
     * In most instances we can rely on the UUID to identify the object.
     * Subclasses may want a user friendly identifier for constructing easy to read urls
     * <p/>
     * <code>
     * /user/1883c578-76be-47fb-a5c1-7bbea3bf7fd0 using uuid as the identifier
     * <p/>
     * /user/jsmith using the username as the identifier
     * <p/>
     * </code>
     *
     * @return Object unique identifier for the object
     */
    public Object getIdentifier() {
        return getUuid().toString();
    }

    public int getVersion() {
        return version;
    }

    public Date getTimeCreated() {
        return timeCreated;
    }

}
