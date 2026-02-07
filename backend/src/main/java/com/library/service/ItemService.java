package com.library.service;

import com.library.entity.Item;
import com.library.repository.ItemRepository;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ItemService {
    private final ItemRepository itemRepository;
    
    @CircuitBreaker(name = "database", fallbackMethod = "availabilityFallback")
    @Retry(name = "database")
    public List<Item> checkAvailability(Integer isbn) {
        log.debug("Checking availability for ISBN: {}", isbn);
        return itemRepository.findByBook_Isbn(isbn);
    }
    
    private List<Item> availabilityFallback(Exception e) {
        log.error("Availability check failed: {}", e.getMessage());
        return List.of();
    }
}
