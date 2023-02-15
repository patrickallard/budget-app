package com.example.budgetbe.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.Date;
@Entity
@Table
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    public Long id;

    public Date date;

    public String budgetName;

    public String source;

    public String destination;

    public Long withdrawlDebits;

    @ManyToOne // the ownership side of the relationship
    @JsonBackReference (value = "account_association")
    @JoinTable (name = "account_transactions",
            joinColumns = @JoinColumn(name = "transaction_id"),
            inverseJoinColumns = @JoinColumn(name = "account_id"))
    public Account account;

    @ManyToOne
    @JsonBackReference (value = "budget_association")
    @JoinTable (name = "budget_transactions",
            joinColumns = @JoinColumn(name = "transaction_id"),
            inverseJoinColumns = @JoinColumn(name = "budget_id"))
    public Budget budget;

    public Transaction() {
    }

    public Transaction(Long id, Date date, String budgetName, String source, String destination, Long withdrawDebits) {
        this.id = id;
        this.date = date;
        this.budgetName = budgetName;
        this.source = source;
        this.destination = destination;
        this.withdrawlDebits = withdrawlDebits;
    }


    public void setId(Long id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getBudgetName() {
        return budgetName;
    }

    public void setBudgetName(String budgetName) {
        this.budgetName = budgetName;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public Long getWithdrawlDebits() {
        return withdrawlDebits;
    }

    public void setWithdrawlDebits(Long withdrawlDebits) {
        this.withdrawlDebits = withdrawlDebits;
    }

}
