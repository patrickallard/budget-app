package com.example.budgetbe.controllers;

import ch.qos.logback.core.encoder.EchoEncoder;
import com.example.budgetbe.dto.TransactionRequest;
import com.example.budgetbe.models.Transaction;
import com.example.budgetbe.repository.TransactionsRepository;
import com.example.budgetbe.services.TransactionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;

@CrossOrigin
@RequestMapping("/transactions")
@RestController
public class TransactionsController {

    private TransactionsService service;

    @Autowired
    public TransactionsController(TransactionsService service) {
        this.service = service;
    }

    @GetMapping
    public Iterable<Transaction> getTransaction(@RequestParam(required = false) Long id) {
        return service.getTransaction(id);
    }

    @PostMapping
    public void addNewTransaction(@RequestBody Transaction transaction) {
        try {
            service.addNewTransaction(transaction);
        } catch (Exception e) {
            System.out.println(e);
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public void deleteTransaction(@PathVariable Long id) {
        try {
            service.deleteTransaction(id);
        } catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }
}
