package com.library.controller;

import com.library.entity.Item;
import com.library.service.ItemService;
import io.github.resilience4j.ratelimiter.annotation.RateLimiter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/items")
@RequiredArgsConstructor
public class ItemController {
    private final ItemService itemService;
    
    @GetMapping("/availability/{isbn}")
    @RateLimiter(name = "api")
    public ResponseEntity<List<Item>> checkAvailability(@PathVariable Integer isbn) {
        return ResponseEntity.ok(itemService.checkAvailability(isbn));
    }
}
