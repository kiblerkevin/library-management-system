package com.library.repository;

import com.library.entity.Loan;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LoanRepository extends JpaRepository<Loan, Integer> {
    List<Loan> findByUser_UserId(Integer userId);
    List<Loan> findByLoanState(String state);
}
