package com.library.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "genres")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Genre {
    @Id
    @Column(name = "genre_id")
    private Integer genreId;
    
    @Column(name = "genre_title")
    private String title;
}
