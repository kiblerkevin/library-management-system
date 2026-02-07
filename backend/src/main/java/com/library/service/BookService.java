package com.library.service;

import com.library.entity.Book;
import com.library.repository.BookRepository;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class BookService {
    private final BookRepository bookRepository;
    
    @CircuitBreaker(name = "database", fallbackMethod = "searchFallback")
    @Retry(name = "database")
    public List<Book> searchByTitle(String title) {
        log.debug("Searching books by title: {}", title);
        return bookRepository.findByTitleContainingIgnoreCase(title);
    }
    
    @CircuitBreaker(name = "database", fallbackMethod = "searchFallback")
    @Retry(name = "database")
    public List<Book> findByAuthor(Integer authorId) {
        return bookRepository.findByAuthor_AuthorId(authorId);
    }
    
    private List<Book> searchFallback(Exception e) {
        log.error("Fallback triggered: {}", e.getMessage());
        return List.of();
    }
}
