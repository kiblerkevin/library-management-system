package com.library.repository;

import com.library.entity.Item;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Integer> {
    @Cacheable("items")
    List<Item> findByBook_Isbn(Integer isbn);
    
    @Cacheable("items")
    List<Item> findByLoanStatus(String status);
}
