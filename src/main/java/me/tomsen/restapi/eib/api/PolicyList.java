package me.tomsen.restapi.eib.api;

import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlElement;
import java.util.ArrayList;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: etomsen
 * Date: 9/15/13
 * Time: 2:05 PM
 * To change this template use File | Settings | File Templates.
 */

@XmlRootElement
@XmlSeeAlso(PolicyListItem.class)
public class PolicyList {

    private List<PolicyListItem> list;

    public PolicyList() {
        list = new ArrayList<PolicyListItem>();
    }

    public void add(PolicyListItem i) {
        list.add(i);
    }

    @XmlElementWrapper(name="result")
    @XmlElement (name="policy")
    public List<PolicyListItem> getList() {
        return list;
    }

    public void setList(List<PolicyListItem> list) {
        this.list = list;
    }

    @XmlElement(name="count")
    public int getListCount() {
        return list.size();
    }
}
