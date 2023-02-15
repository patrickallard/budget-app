package com.example.budgetbe.services;

import com.example.budgetbe.dto.TransactionRequest;
import com.example.budgetbe.models.Account;
import com.example.budgetbe.models.Budget;
import com.example.budgetbe.models.Transaction;
import com.example.budgetbe.repository.AccountRepository;
import com.example.budgetbe.repository.BudgetRepository;
import com.example.budgetbe.repository.TransactionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TransactionsService {

    private TransactionsRepository repository;
    private BudgetRepository budgetRepository;

    private AccountRepository accountRepository;

    @Autowired
    public TransactionsService(TransactionsRepository repository, BudgetRepository budgetRepository, AccountRepository accountRepository) {
        this.repository = repository;
        this.budgetRepository = budgetRepository;
        this.accountRepository = accountRepository;
    }

    public Iterable<Transaction> getTransaction(Long id) {
        return repository.findAll();
    }

    public void addNewTransaction(Transaction transactionRequest) throws Exception {
        // perhaps some more validation in the query, but the frontend should handle user input
        // i.e. users cannot submit names that are already in use
        if (transactionRequest == null) {
            throw new Exception();
        }

        Optional<Account> sourceOptional = accountRepository.findAccountByName(transactionRequest.source);
        Optional<Account> destinationOptional = accountRepository.findAccountByName(transactionRequest.destination);

        Optional<Budget> budgetOptional = budgetRepository.findBudgetByName(transactionRequest.budgetName);

        if (transactionRequest.budgetName != "") {
            Budget budget = budgetOptional.get();

            transactionRequest.budget = budget;

            repository.save(transactionRequest);
            budgetRepository.save(budget);
        }
        if (sourceOptional.isPresent()) {
            Account source = sourceOptional.get();

            transactionRequest.account = source;

            repository.save(transactionRequest);

            source.transactions.add(transactionRequest);

            accountRepository.save(source);
        } else if (destinationOptional.isPresent()) {
            Account destination = destinationOptional.get();

            transactionRequest.account = destination;

            repository.save(transactionRequest);

            destination.transactions.add(transactionRequest);

            this.accountRepository.save(destination);
        } else {
            Account source = sourceOptional.get();
            repository.save(transactionRequest);
            source.transactions.add(transactionRequest);

            Account destination = destinationOptional.get();
            repository.save(transactionRequest);
            destination.transactions.add(transactionRequest);
            accountRepository.save(destination);
        }
    }

    public void deleteTransaction(Long id) throws Exception {
        boolean exists = repository.existsById(id);
        if (!exists) {
            throw new Exception();
        }
        repository.deleteById(id);
    }
}
