package com.example.budgetbe.repository;

import com.example.budgetbe.models.Account;
import com.example.budgetbe.models.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.Optional;

@Repository
public interface BudgetRepository extends JpaRepository<Budget, Long> {

    // constructs a SQL SELECT query
    @Query("SELECT b from Budget b WHERE b.name = ?1")
    Optional<Budget> findBudgetByName(String name);

    Optional<Budget> findBudgetById(Long id);
}
