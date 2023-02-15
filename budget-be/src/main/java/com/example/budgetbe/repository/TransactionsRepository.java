package com.example.budgetbe.repository;

import com.example.budgetbe.models.Account;
import com.example.budgetbe.models.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.Optional;

@Repository
public interface TransactionsRepository extends JpaRepository<Transaction, Long> {

    public Optional<Transaction> findTransactionById(Long id);

    public Optional<Transaction> findTransactionByAccount_Id(Long id);

    public Optional<Transaction> findTransactionByBudget_Id(Long id);
}
