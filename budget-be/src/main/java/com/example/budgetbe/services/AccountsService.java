package com.example.budgetbe.services;
import com.example.budgetbe.models.Budget;
import com.example.budgetbe.models.Transaction;
import com.example.budgetbe.repository.AccountRepository;
import com.example.budgetbe.repository.BudgetRepository;
import com.example.budgetbe.repository.TransactionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.example.budgetbe.models.Account;

@Service // @Service and @Component mean the same thing, but is more specific taxonomically
public class AccountsService {

    private final AccountRepository accountRepository;

    private final BudgetRepository budgetRepository;

    private final TransactionsRepository transactionRepository;


    @Autowired
    public AccountsService(AccountRepository accountRepository, BudgetRepository budgetRepository, TransactionsRepository transactionsRepository) {
        this.accountRepository = accountRepository;
        this.budgetRepository = budgetRepository;
        this.transactionRepository = transactionsRepository;
    }

    public Iterable<Account> getAccounts(@RequestParam(required = false) String name) {
        if (name != null) {
            final ArrayList<Account> matching = new ArrayList<Account>();

            for (Account account : accountRepository.findAll())
                if (name.equals(account.name)) {
                    matching.add(account);
                }

            return matching;
        }
        return accountRepository.findAll();
    }

    public void addNewAccount(Account account) {
        accountRepository.save(account);
    }

    public void deleteAccount(Long id) throws Exception {
        boolean exists = accountRepository.existsById(id);
        if (!exists) {
            throw new Exception();
        }

        Optional<Account> accountOptional = accountRepository.findById(id);
        Account accountTmp = accountOptional.get();

        Optional<Transaction> transactionsRepositoryOptional = transactionRepository.findTransactionByAccount_Id(accountTmp.id);

        if (transactionsRepositoryOptional.isPresent()) {
            // for each transaction in the account transaction list...
            for (Transaction transaction : accountTmp.transactions) {
                // find a transaction Optional that possess a matching account id in its Account_Id field
                // assign that value to the transactionsRepoOptional var
                transaction.account = null;
                transactionRepository.save(transaction);
            }
        }

        accountRepository.delete(accountTmp);
    }

    public void updateAccount(Long id, Account account) throws Exception {
        for (var existingAccount: accountRepository.findAll()) {
            if (id.equals(account.id)) {
                accountRepository.findAll().remove(existingAccount);
                accountRepository.save(account);
                return;
            }
            else {
                throw new Exception();
            }
        }
    }
}
