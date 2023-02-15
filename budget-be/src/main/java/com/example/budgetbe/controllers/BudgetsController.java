package com.example.budgetbe.controllers;

import com.example.budgetbe.models.Budget;
import com.example.budgetbe.services.BudgetsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Map;

@RestController
@RequestMapping("/budgets")
@CrossOrigin
public class BudgetsController {

        private Long nextBudgetId = 0L;

        private final BudgetsService budgetsService;

        @Autowired
        public BudgetsController(BudgetsService budgetsService) {
                this.budgetsService = budgetsService;
        }

        @GetMapping
        public Iterable<Budget> getBudgets(@RequestParam(required = false) String name) {
                return budgetsService.getBudgets(name);
        }

        @DeleteMapping("/{id}")
        public void deleteBudget(@PathVariable Long id) {
                try {
                        budgetsService.deleteBudget(id);
                } catch (Exception e) {
                        System.out.println(e);
                        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
                }
        }

        @PostMapping
        public void addNewBudget(@RequestBody Budget budget) {
                budgetsService.addNewBudget(budget);
        }

        @PutMapping("/{id}")
        public void updateBudget(@PathVariable Long id, @RequestBody Budget budget) {
                try {
                        budgetsService.updateBudget(id, budget);
                } catch (Exception e) {
                        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
                }
        }
}

