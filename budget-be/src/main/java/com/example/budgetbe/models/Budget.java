package com.example.budgetbe.models;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "budget")
public class Budget {

    @Id
    @SequenceGenerator(
            name = "budget_name",
            sequenceName = "budget_name",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "budget_sequence"
    )

    public Long id;

    public String name;

    public Long total;

    @OneToMany (mappedBy = "budget")
    @JsonManagedReference (value = "budget_association")
    public List<Transaction> transactions;

    public Budget() {
    }

    public Budget(Long id, String name, Long total) {
        this.id = id;
        this.name = name;
        this.total = total;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // getters and setters allow you to write validation logic to further protect
    // the system from malicious user input
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }
}
