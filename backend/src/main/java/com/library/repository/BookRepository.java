package com.library.repository;

import com.library.entity.Book;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface BookRepository extends JpaRepository<Book, Integer> {
    @Cacheable("books")
    List<Book> findByTitleContainingIgnoreCase(String title);
    
    @Cacheable("books")
    List<Book> findByAuthor_AuthorId(Integer authorId);
    
    @Cacheable("books")
    List<Book> findByGenre_GenreId(Integer genreId);
}
