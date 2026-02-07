package com.library.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "items")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Item {
    @Id
    @Column(name = "item_id")
    private Integer itemId;
    
    @Column(name = "item_type")
    private String itemType;
    
    @ManyToOne
    @JoinColumn(name = "isbn")
    private Book book;
    
    @Column(name = "acquire_date")
    private LocalDateTime acquireDate;
    
    @Column(name = "loan_status")
    private String loanStatus;
}
