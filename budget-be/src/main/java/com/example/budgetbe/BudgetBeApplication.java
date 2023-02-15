package com.example.budgetbe;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BudgetBeApplication {

    // Java needs a dedicated place to 'start' the program
    // It does not just start at the top of a file
    // Java is a compiled language

    // static means that it is totally independent of the number of object instances
    // static means that it is independent of an object
    // main is the first method called
    // if this method was not static, it would mean that there are no objects with the modified attribute/method
    public static void main(String[] args) {
        SpringApplication.run(BudgetBeApplication.class, args);
    }

}
