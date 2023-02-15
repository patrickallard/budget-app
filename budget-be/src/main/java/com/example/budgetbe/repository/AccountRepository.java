package com.example.budgetbe.repository;

import com.example.budgetbe.models.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

// a repo is an interface?
// for the data access layer
// what does the repository
@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

    // constructs a SQL SELECT query
    @Query("SELECT a from Account a WHERE a.name = ?1")
    Optional<Account> findAccountByName(String name);

//    @Query("UPDATE Student SET name = '', email = '' WHERE Student.id = ?1")
//    Optional<Student> updateStudentById(Long id);
}
