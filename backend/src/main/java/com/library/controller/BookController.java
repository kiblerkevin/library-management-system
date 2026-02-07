package com.library.controller;

import com.library.entity.Book;
import com.library.service.BookService;
import io.github.resilience4j.ratelimiter.annotation.RateLimiter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class BookController {
    private final BookService bookService;
    
    @GetMapping("/search")
    @RateLimiter(name = "api")
    public ResponseEntity<List<Book>> searchBooks(@RequestParam String title) {
        return ResponseEntity.ok(bookService.searchByTitle(title));
    }
    
    @GetMapping("/author/{authorId}")
    @RateLimiter(name = "api")
    public ResponseEntity<List<Book>> getBooksByAuthor(@PathVariable Integer authorId) {
        return ResponseEntity.ok(bookService.findByAuthor(authorId));
    }
}
