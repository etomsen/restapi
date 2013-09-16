package me.tomsen.restapi.eib.api;

import me.tomsen.restapi.api.DateAdapter;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: etomsen
 * Date: 9/15/13
 * Time: 2:09 PM
 * To change this template use File | Settings | File Templates.
 */

@XmlRootElement
public class PolicyListItem {
    private String id;
    private String customerId;
    private String customer;
    private String companyId;
    private String company;
    private String  branch;
    @XmlElement(name = "deadline")
    @XmlJavaTypeAdapter(DateAdapter.class)
    private Date deadline;
    private String desc;
    private double award;
    private int paymentsCount;
    private int claimsCount;
    private int statusId;

    public PolicyListItem() {

    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getCustomer() {
        return customer;
    }

    public void setCustomer(String customer) {
        this.customer = customer;
    }

    public String getCompanyId() {
        return companyId;
    }

    public void setCompanyId(String companyId) {
        this.companyId = companyId;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public Date getDeadline() {
        return deadline;
    }

    public void setDeadline(Date deadline) {
        this.deadline = deadline;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public double getAward() {
        return award;
    }

    public void setAward(double award) {
        this.award = award;
    }

    public int getPaymentsCount() {
        return paymentsCount;
    }

    public void setPaymentsCount(int paymentsCount) {
        this.paymentsCount = paymentsCount;
    }

    public int getClaimsCount() {
        return claimsCount;
    }

    public void setClaimsCount(int claimsCount) {
        this.claimsCount = claimsCount;
    }

    public int getStatusId() {
        return statusId;
    }

    public void setStatusId(int statusId) {
        this.statusId = statusId;
    }
}
