package me.tomsen.restapi.eib.domain;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

/**
 * Created with IntelliJ IDEA.
 * User: ebaranov
 * Date: 9/16/13
 * Time: 8:02 PM
 * To change this template use File | Settings | File Templates.
 */

@Entity
@Table(name = "DOCUMENTI")
public class EibDocument implements Comparable<EibDocument> {

    @Id
    @Column(name = "DOC_UID", length = 36)
    private String id;

    @Column(name="COD_CLIENTE", length = 5)
    private String customerId;

    @Column(name="COD_COMPAGNIA", length = 24)
    private String companyId;

    @Column(name="FILENAME", length = 200)
    private String fileName;

    @Column(name="DATA_CREAZIONE")
    private Date dateCreated;

    @Column(name="VALIDO_DAL")
    private Date validFrom;

    @Column(name="VALIDO_AL")
    private Date validTo;

    @Column(name="TIPO_DOC", length = 5)
    private String docType;

    @Column(name="NUMERO_RIF_POLIZZA", length = 7)
    private String policyRefNumber;

    @Column(name="NUMERO_RIF_SINISTRO", length = 7)
    private String claimRefNumber;

    @Column(name="COD_CATEGORIA", length = 8)
    private String categoryId;

    @Column(name="COD_RAMO", length = 48)
    private String branchId;

    @Column(name="TITOLO_DOC", length = 400)
    private String title;

    public EibDocument() {
        this.id = UUID.randomUUID().toString();
        this.dateCreated = new Date();
    }

    @Override
    public int compareTo(EibDocument document) {
        return this.id.compareTo(document.id);
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getId() {
        return id;
    }

    public String getCategory() {
        return categoryId;
    }

    public void setCategory(String categoryId) {
        this.categoryId = categoryId;
    }

    public String getBranchId() {
        return branchId;
    }

    public void setBranchId(String branchId) {
        this.branchId = branchId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Date getValidTo() {
        return validTo;
    }

    public void setValidTo(Date validTo) {
        this.validTo = validTo;
    }

    public Date getValidFrom() {
        return validFrom;
    }

    public void setValidFrom(Date validFrom) {
        this.validFrom = validFrom;
    }

    public String getCompanyId() {
        return companyId;
    }

    public void setCompanyId(String companyId) {
        this.companyId = companyId;
    }

    public String getDocType() {
        return docType;
    }

    public void setDocType(String docType) {
        this.docType = docType;
    }

    public String getClaimRefNumber() {
        return claimRefNumber;
    }

    public void setClaimRefNumber(String claimRefNumber) {
        this.claimRefNumber = claimRefNumber;
    }

    public String getPolicyRefNumber() {
        return policyRefNumber;
    }

    public void setPolicyRefNumber(String policyRefNumber) {
        this.policyRefNumber = policyRefNumber;
    }
}
