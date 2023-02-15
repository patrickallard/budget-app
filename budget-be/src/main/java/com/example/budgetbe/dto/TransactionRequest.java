package com.example.budgetbe.dto;

import java.util.Date;

public class TransactionRequest {

    public Long id;
    public Date date;
    public String account;
    public String budget;
    public String source;
    public String destination;
    public Long withdrawlDebits;
}
