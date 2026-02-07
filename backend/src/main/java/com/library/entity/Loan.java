package com.library.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "loans")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Loan {
    @Id
    @Column(name = "loan_id")
    private Integer loanId;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    
    @ManyToOne
    @JoinColumn(name = "item_id")
    private Item item;
    
    @Column(name = "loan_date")
    private LocalDateTime loanDate;
    
    @Column(name = "due_date")
    private LocalDateTime dueDate;
    
    @Column(name = "return_date")
    private LocalDateTime returnDate;
    
    @Column(name = "loan_state")
    private String loanState;
}
