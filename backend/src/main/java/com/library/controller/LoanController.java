package com.library.controller;

import com.library.entity.Loan;
import com.library.service.LoanService;
import io.github.resilience4j.ratelimiter.annotation.RateLimiter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/loans")
@RequiredArgsConstructor
public class LoanController {
    private final LoanService loanService;
    
    @PostMapping
    @RateLimiter(name = "api")
    public ResponseEntity<Loan> createLoan(@RequestBody Loan loan) {
        return ResponseEntity.ok(loanService.createLoan(loan));
    }
    
    @GetMapping("/user/{userId}")
    @RateLimiter(name = "api")
    public ResponseEntity<List<Loan>> getUserLoans(@PathVariable Integer userId) {
        return ResponseEntity.ok(loanService.getUserLoans(userId));
    }
}
