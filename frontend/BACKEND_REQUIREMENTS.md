# Backend API Requirements

This document lists all API endpoints needed by the frontend. Endpoints marked with ✅ exist, ❌ need implementation.

## Books API

### ✅ Existing
- `GET /api/books/search?title={title}` - Search books by title
- `GET /api/books/author/{authorId}` - Get books by author

### ❌ Required Additions

```java
@GetMapping
public ResponseEntity<List<Book>> getAllBooks() {
    return ResponseEntity.ok(bookService.findAll());
}

@GetMapping("/{isbn}")
public ResponseEntity<Book> getBookByIsbn(@PathVariable Integer isbn) {
    return ResponseEntity.ok(bookService.findByIsbn(isbn));
}

@PostMapping
public ResponseEntity<Book> createBook(@RequestBody Book book) {
    return ResponseEntity.ok(bookService.create(book));
}

@PutMapping("/{isbn}")
public ResponseEntity<Book> updateBook(@PathVariable Integer isbn, @RequestBody Book book) {
    return ResponseEntity.ok(bookService.update(isbn, book));
}

@DeleteMapping("/{isbn}")
public ResponseEntity<Void> deleteBook(@PathVariable Integer isbn) {
    bookService.delete(isbn);
    return ResponseEntity.noContent().build();
}
```

## Items API

### ✅ Existing
- `GET /api/items/availability/{isbn}` - Check availability by ISBN

### ❌ Required Additions

```java
@GetMapping
public ResponseEntity<List<Item>> getAllItems() {
    return ResponseEntity.ok(itemService.findAll());
}

@GetMapping("/{itemId}")
public ResponseEntity<Item> getItemById(@PathVariable Integer itemId) {
    return ResponseEntity.ok(itemService.findById(itemId));
}

@PostMapping
public ResponseEntity<Item> createItem(@RequestBody Item item) {
    return ResponseEntity.ok(itemService.create(item));
}

@PutMapping("/{itemId}")
public ResponseEntity<Item> updateItem(@PathVariable Integer itemId, @RequestBody Item item) {
    return ResponseEntity.ok(itemService.update(itemId, item));
}

@DeleteMapping("/{itemId}")
public ResponseEntity<Void> deleteItem(@PathVariable Integer itemId) {
    itemService.delete(itemId);
    return ResponseEntity.noContent().build();
}
```

## Loans API

### ✅ Existing
- `POST /api/loans` - Create loan
- `GET /api/loans/user/{userId}` - Get user loans

### ❌ Required Additions

```java
@GetMapping("/{loanId}")
public ResponseEntity<Loan> getLoanById(@PathVariable Integer loanId) {
    return ResponseEntity.ok(loanService.findById(loanId));
}

@GetMapping("/overdue")
public ResponseEntity<List<Loan>> getOverdueLoans() {
    return ResponseEntity.ok(loanService.findOverdue());
}

@PutMapping("/{loanId}/return")
public ResponseEntity<Loan> returnItem(@PathVariable Integer loanId) {
    return ResponseEntity.ok(loanService.returnItem(loanId));
}

@PutMapping("/{loanId}/renew")
public ResponseEntity<Loan> renewLoan(@PathVariable Integer loanId) {
    return ResponseEntity.ok(loanService.renewLoan(loanId));
}
```

## CORS Configuration

Add to `SecurityConfig.java`:

```java
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.Arrays;

@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(Arrays.asList("*"));
    configuration.setAllowCredentials(true);
    
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/api/**", configuration);
    return source;
}
```

Update `filterChain` method:
```java
@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .cors(cors -> cors.configurationSource(corsConfigurationSource()))
        .csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/actuator/**").permitAll()
            .requestMatchers("/api/**").permitAll() // Update to allow all API endpoints
            .anyRequest().authenticated()
        )
        .sessionManagement(session -> 
            session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        );
    return http.build();
}
```

## Service Layer Methods Needed

### BookService
```java
List<Book> findAll();
Book findByIsbn(Integer isbn);
Book create(Book book);
Book update(Integer isbn, Book book);
void delete(Integer isbn);
```

### ItemService
```java
List<Item> findAll();
Item findById(Integer itemId);
Item create(Item item);
Item update(Integer itemId, Item item);
void delete(Integer itemId);
```

### LoanService
```java
Loan findById(Integer loanId);
List<Loan> findOverdue();
Loan returnItem(Integer loanId);
Loan renewLoan(Integer loanId);
```

## Business Logic Notes

### Loan Creation
- Set `loanDate` to current timestamp
- Set `dueDate` to 14 days from loan date
- Set `loanState` to 'active'
- Update item `loanStatus` to 'checked_out'

### Return Item
- Set `returnDate` to current timestamp
- Set `loanState` to 'returned'
- Update item `loanStatus` to 'available'

### Renew Loan
- Extend `dueDate` by 14 days
- Keep `loanState` as 'active'

### Overdue Check
- Query loans where `dueDate < current_date` AND `loanState = 'active'`
- Update `loanState` to 'overdue' (can be done via scheduled job)
