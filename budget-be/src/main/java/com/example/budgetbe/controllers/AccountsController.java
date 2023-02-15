package com.example.budgetbe.controllers;

import com.example.budgetbe.models.Account;
import com.example.budgetbe.services.AccountsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;

@RestController
@RequestMapping("/accounts")
@CrossOrigin
public class AccountsController {

    private Long nextAccountId = 0L;

    private final AccountsService accountsService;
    private ArrayList<Account> accounts = new ArrayList<>();

    @Autowired
    public AccountsController(AccountsService accountsService) {
        this.accountsService = accountsService;
    }

    @GetMapping
    public Iterable<Account> getAccounts(@RequestParam(required = false) String name) {
        return accountsService.getAccounts(name);
    }

    @DeleteMapping("/{id}")
    public void deleteAccount(@PathVariable Long id) throws Exception {
        try {
            accountsService.deleteAccount(id);
        } catch (Exception e) {
            System.out.println(e);
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public void addNewAccount(@RequestBody Account account) {
        accountsService.addNewAccount(account);
    }

    @PutMapping("/{id}")
    public void updateAccount(@PathVariable Long id, @RequestBody Account account) {
        try {
            accountsService.updateAccount(id, account);
        } catch (Exception e) {
            System.out.println(e);
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }
}
