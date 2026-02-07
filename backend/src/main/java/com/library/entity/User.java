package com.library.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @Column(name = "user_id")
    private Integer userId;
    
    @Column(name = "first_name")
    private String firstName;
    
    private String username;
    private String role;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
