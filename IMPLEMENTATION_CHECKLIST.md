# Implementation Checklist

## ✅ Frontend (Complete)

- [x] Project setup with Angular 20+
- [x] TypeScript models matching backend entities
- [x] API services (Book, Item, Loan)
- [x] Public catalog with search
- [x] Book details with availability
- [x] User account with loan management
- [x] Admin dashboard
- [x] Book management (CRUD)
- [x] Item management (CRUD)
- [x] Checkout system
- [x] Routing with lazy loading
- [x] Proxy configuration for CORS
- [x] Environment configuration
- [x] Documentation

## 🔲 Backend (Needs Implementation)

### CORS Configuration
- [ ] Add CorsConfigurationSource bean to SecurityConfig
- [ ] Update filterChain to use CORS configuration
- [ ] Test CORS from frontend

### Book Controller Endpoints
- [ ] `GET /api/books` - Get all books
- [ ] `GET /api/books/{isbn}` - Get book by ISBN
- [ ] `POST /api/books` - Create book
- [ ] `PUT /api/books/{isbn}` - Update book
- [ ] `DELETE /api/books/{isbn}` - Delete book

### Item Controller Endpoints
- [ ] `GET /api/items` - Get all items
- [ ] `GET /api/items/{itemId}` - Get item by ID
- [ ] `POST /api/items` - Create item
- [ ] `PUT /api/items/{itemId}` - Update item
- [ ] `DELETE /api/items/{itemId}` - Delete item

### Loan Controller Endpoints
- [ ] `GET /api/loans/{loanId}` - Get loan by ID
- [ ] `GET /api/loans/overdue` - Get overdue loans
- [ ] `PUT /api/loans/{loanId}/return` - Return item
- [ ] `PUT /api/loans/{loanId}/renew` - Renew loan

### Service Layer Methods
- [ ] BookService: findAll(), findByIsbn(), create(), update(), delete()
- [ ] ItemService: findAll(), findById(), create(), update(), delete()
- [ ] LoanService: findById(), findOverdue(), returnItem(), renewLoan()

### Business Logic
- [ ] Loan creation: Set dates, update item status
- [ ] Return item: Set return date, update item status
- [ ] Renew loan: Extend due date by 14 days
- [ ] Overdue detection: Query or scheduled job

## 🔲 Testing

### Backend Testing
- [ ] Test all new endpoints with Postman/curl
- [ ] Verify CORS headers in responses
- [ ] Test error handling
- [ ] Test business logic (dates, status updates)

### Frontend Testing
- [ ] Test catalog search
- [ ] Test book details and availability
- [ ] Test user loan viewing
- [ ] Test loan renewal
- [ ] Test admin book management
- [ ] Test admin item management
- [ ] Test checkout process
- [ ] Test error scenarios

### Integration Testing
- [ ] End-to-end search to checkout flow
- [ ] End-to-end checkout to return flow
- [ ] Test with multiple users
- [ ] Test overdue scenarios

## 🔲 Data Setup

### Database
- [ ] Create sample authors
- [ ] Create sample genres
- [ ] Create sample books
- [ ] Create sample items (multiple per book)
- [ ] Create sample users
- [ ] Create sample loans (active and returned)

### Sample Data Script
```sql
-- Authors
INSERT INTO authors (author_id, author_first_name, author_last_name) VALUES
(1, 'George', 'Orwell'),
(2, 'Jane', 'Austen'),
(3, 'F. Scott', 'Fitzgerald');

-- Genres
INSERT INTO genres (genre_id, genre_title) VALUES
(1, 'Fiction'),
(2, 'Classic'),
(3, 'Science Fiction');

-- Books
INSERT INTO books (isbn, title, author_id, publish_date, genre_id) VALUES
(9780451524935, '1984', 1, '1949-06-08', 1),
(9780141439518, 'Pride and Prejudice', 2, '1813-01-28', 2),
(9780743273565, 'The Great Gatsby', 3, '1925-04-10', 2);

-- Items
INSERT INTO items (item_id, item_type, isbn, acquire_date, loan_status) VALUES
(1, 'hardcover', 9780451524935, '2024-01-01', 'available'),
(2, 'paperback', 9780451524935, '2024-01-01', 'available'),
(3, 'ebook', 9780451524935, '2024-01-01', 'available'),
(4, 'hardcover', 9780141439518, '2024-01-01', 'checked_out');

-- Users
INSERT INTO users (user_id, first_name, username, role, created_at) VALUES
(1, 'John', 'john.doe', 'patron', '2024-01-01'),
(2, 'Jane', 'jane.smith', 'librarian', '2024-01-01'),
(3, 'Admin', 'admin', 'admin', '2024-01-01');

-- Loans
INSERT INTO loans (loan_id, user_id, item_id, loan_date, due_date, return_date, loan_state) VALUES
(1, 1, 4, '2024-01-15', '2024-01-29', NULL, 'active');
```

## 🔲 Future Enhancements

### Phase 1 (Authentication)
- [ ] Create User entity with password field
- [ ] Implement JWT authentication
- [ ] Add login/register endpoints
- [ ] Create auth service in frontend
- [ ] Add auth guards to routes
- [ ] Add auth interceptor for tokens

### Phase 2 (Advanced Features)
- [ ] Genre management UI
- [ ] Author management UI
- [ ] Advanced search filters
- [ ] Holds/reservations system
- [ ] Email notifications
- [ ] Fine calculation
- [ ] Reports and analytics

### Phase 3 (Polish)
- [ ] Unit tests
- [ ] E2E tests
- [ ] Error handling improvements
- [ ] Loading states
- [ ] Accessibility audit
- [ ] Performance optimization
- [ ] PWA features

## 📝 Notes

### Current Limitations
- User ID is hardcoded (1) in account component
- No authentication/authorization
- No error handling interceptor
- No loading indicators on all components
- No input validation on forms
- No confirmation dialogs on delete

### Known Issues
- None currently - frontend is complete pending backend

### Questions/Decisions Needed
- [ ] Should we implement soft delete or hard delete?
- [ ] What should happen to loans when a book/item is deleted?
- [ ] Should we allow editing of active loans?
- [ ] What's the maximum number of concurrent loans per user?
- [ ] Should we implement late fees?

## 🎯 Priority Order

1. **Critical** (Blocks basic functionality)
   - CORS configuration
   - Missing CRUD endpoints
   - Sample data

2. **High** (Needed for testing)
   - Return/renew endpoints
   - Overdue endpoint
   - Business logic

3. **Medium** (Nice to have)
   - Authentication
   - Error handling
   - Loading states

4. **Low** (Future)
   - Advanced features
   - Testing
   - Polish

---

**Start Here**: 
1. Add CORS to backend
2. Implement missing endpoints
3. Add sample data
4. Test end-to-end
