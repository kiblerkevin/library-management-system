package com.library.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "authors")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Author {
    @Id
    @Column(name = "author_id")
    private Integer authorId;
    
    @Column(name = "author_first_name")
    private String firstName;
    
    @Column(name = "author_last_name")
    private String lastName;
}
