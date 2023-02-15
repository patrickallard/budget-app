package com.example.budgetbe.configuration;

import com.example.budgetbe.repository.AccountRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;

import java.util.List;

public class BudgetConfig {

    @Bean
    CommandLineRunner commandLineRunner(AccountRepository repository) {
        return args -> {
            repository.saveAll(
                    List.of()
            );
        };
    }
}
