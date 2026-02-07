package com.library.service;

import com.library.entity.Loan;
import com.library.repository.LoanRepository;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class LoanService {
    private final LoanRepository loanRepository;
    
    @CircuitBreaker(name = "database")
    @Retry(name = "database")
    @Transactional
    public Loan createLoan(Loan loan) {
        log.debug("Creating loan for user: {}", loan.getUser().getUserId());
        return loanRepository.save(loan);
    }
    
    @CircuitBreaker(name = "database")
    @Retry(name = "database")
    public List<Loan> getUserLoans(Integer userId) {
        return loanRepository.findByUser_UserId(userId);
    }
}
