package com.example.budgetbe.services;

import com.example.budgetbe.models.Budget;
import com.example.budgetbe.models.Transaction;
import com.example.budgetbe.repository.BudgetRepository;
import com.example.budgetbe.repository.TransactionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.Map;
import java.util.Optional;

@Service
public class BudgetsService {

    private final BudgetRepository budgetRepository;

    private final TransactionsRepository transactionsRepository;

    @Autowired
    public BudgetsService(BudgetRepository budgetRepository, TransactionsRepository transactionsRepository) {
        this.budgetRepository = budgetRepository;
        this.transactionsRepository = transactionsRepository;
    }

    public Iterable<Budget> getBudgets(@RequestParam(required = false) String name) {
        
        // type List because budTmp is not an Optional
        // all I am trying to do is manipulate the data to where the associate field is an array of String
        // with elements of type string -- the elements being the names of the associated accounts
        final ArrayList<String> accountNames = new ArrayList<String>();

        if (name != null) {
            final ArrayList<Budget> matching = new ArrayList<Budget>();

            for (Budget budget : budgetRepository.findAll())
                if (name.equals(budget.name)) {
                    matching.add(budget);
                }

            return matching;
        }

        return budgetRepository.findAll();
    }

    public void addNewBudget(Budget budget) {
        budgetRepository.save(budget);
    }

    public void deleteBudget(Long id) throws Exception {
        boolean exists = budgetRepository.existsById(id);
        if (!exists) {
            throw new Exception();
        }

        Optional<Budget> budgetOptional = budgetRepository.findById(id);
        Budget budgetTmp = budgetOptional.get();
        Optional<Transaction> transactionsRepositoryOptional = transactionsRepository.findTransactionByBudget_Id(budgetTmp.id);

        if(transactionsRepositoryOptional.isPresent()) {
            // for each transaction in the account transaction list...
            for (Transaction transaction : budgetTmp.transactions) {
                // find a transaction Optional that possess a matching account id in its Account_Id field
                // assign that value to the transactionsRepoOptional var
                transaction.budget = null;
                transactionsRepository.save(transaction);
            }
        }

        budgetRepository.delete(budgetTmp);
    }

    public void updateBudget(Long id, Budget budget) throws Exception {

        for (var existingAccount: budgetRepository.findAll()) {
            if (id.equals(budget.id)) {
                budgetRepository.findAll().remove(existingAccount);
                budgetRepository.save(budget);
                return;
            }
            else {
                throw new Exception();
            }
        }
    }


//    public void editBudget(Long id, Budget update) throws Exception {
//
//        Optional<Budget> budgetOptional = budgetRepository.findBudgetById(id);
//        if (!budgetOptional.isPresent()) {
//            throw new Exception();
//        }
//
//        budgetRepository.save(update);
//    }
}

