package com.library.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "books")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Book {
    @Id
    private Integer isbn;
    
    private String title;
    
    @ManyToOne
    @JoinColumn(name = "author_id")
    private Author author;
    
    @Column(name = "publish_date")
    private LocalDateTime publishDate;
    
    @ManyToOne
    @JoinColumn(name = "genre_id")
    private Genre genre;
}
