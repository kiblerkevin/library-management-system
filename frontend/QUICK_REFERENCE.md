# Quick Reference Guide

## 🚀 Common Commands

### Frontend
```bash
# Install dependencies
cd frontend && npm install

# Start dev server (with proxy)
npm start

# Build for production
npm run build

# Run tests
npm test

# Lint code
npm run lint
```

### Backend
```bash
# Build
cd backend && mvn clean install

# Run
mvn spring-boot:run

# Run tests
mvn test

# Package
mvn package
```

## 📍 Important URLs

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:4200 | Angular app |
| Backend API | http://localhost:8080/api | REST API |
| Health Check | http://localhost:8080/actuator/health | Backend health |
| Metrics | http://localhost:8080/actuator/prometheus | Prometheus metrics |

## 🗂️ File Locations

### Frontend
```
Models:           src/app/core/models/library.models.ts
Services:         src/app/core/services/*.service.ts
Components:       src/app/features/**/*.component.ts
Routes:           src/app/app.routes.ts
Config:           src/app/app.config.ts
Environment:      src/environments/environment*.ts
Proxy:            proxy.conf.json
Styles:           src/styles.scss
```

### Backend
```
Controllers:      backend/src/main/java/com/library/controller/
Services:         backend/src/main/java/com/library/service/
Entities:         backend/src/main/java/com/library/entity/
Repositories:     backend/src/main/java/com/library/repository/
Config:           backend/src/main/java/com/library/config/
Application:      backend/src/main/resources/application.yml
```

## 🔧 Configuration

### API URL Configuration
```typescript
// Development (src/environments/environment.ts)
apiUrl: '/api'  // Uses proxy to localhost:8080

// Production (src/environments/environment.prod.ts)
apiUrl: '/api'  // Relative path for same-origin
```

### Proxy Configuration
```json
// proxy.conf.json
{
  "/api": {
    "target": "http://localhost:8080",
    "secure": false,
    "changeOrigin": true
  }
}
```

## 📊 Data Models

### Book
```typescript
{
  isbn: number;
  title: string;
  author: { authorId, firstName, lastName };
  publishDate: string;
  genre: { genreId, title };
}
```

### Item
```typescript
{
  itemId: number;
  itemType: 'hardcover' | 'paperback' | 'ebook' | 'audiobook';
  book: Book;
  acquireDate: string;
  loanStatus: 'available' | 'checked_out';
}
```

### Loan
```typescript
{
  loanId: number;
  user: User;
  item: Item;
  loanDate: string;
  dueDate: string;
  returnDate: string | null;
  loanState: 'active' | 'overdue' | 'returned';
}
```

## 🛣️ Routes

| Path | Component | Access |
|------|-----------|--------|
| `/` | Redirect to /catalog | Public |
| `/catalog` | CatalogSearchComponent | Public |
| `/catalog/:isbn` | BookDetailsComponent | Public |
| `/account` | AccountLoansComponent | User |
| `/admin` | AdminDashboardComponent | Admin |
| `/admin/books` | AdminBooksComponent | Admin |
| `/admin/items` | AdminItemsComponent | Admin |
| `/admin/checkout` | AdminCheckoutComponent | Admin |

## 🔌 API Endpoints

### Books
```
GET    /api/books/search?title={title}
GET    /api/books/author/{authorId}
GET    /api/books
GET    /api/books/{isbn}
POST   /api/books
PUT    /api/books/{isbn}
DELETE /api/books/{isbn}
```

### Items
```
GET    /api/items/availability/{isbn}
GET    /api/items
GET    /api/items/{itemId}
POST   /api/items
PUT    /api/items/{itemId}
DELETE /api/items/{itemId}
```

### Loans
```
POST   /api/loans
GET    /api/loans/user/{userId}
GET    /api/loans/{loanId}
GET    /api/loans/overdue
PUT    /api/loans/{loanId}/return
PUT    /api/loans/{loanId}/renew
```

## 🎨 Styling

### Color Palette
```scss
Primary:      #1a1a2e  // Dark blue
Secondary:    #16213e  // Darker blue
Background:   #f5f5f5  // Light gray
Success:      #2e7d32  // Green
Error:        #c62828  // Red
Warning:      #f57c00  // Orange
```

### Common Classes
```scss
.container        // Max-width: 1200px, centered
.card            // White background, rounded, shadow
.btn-primary     // Primary button style
.btn-secondary   // Secondary button style
.loading         // Loading indicator
.error           // Error message
```

## 🐛 Debugging

### Frontend Issues
```bash
# Check console for errors
Open DevTools → Console

# Check network requests
Open DevTools → Network → Filter: XHR

# Check Angular version
ng version

# Clear cache
rm -rf node_modules package-lock.json
npm install
```

### Backend Issues
```bash
# Check logs
tail -f backend/logs/library-service.log

# Check if running
curl http://localhost:8080/actuator/health

# Check database connection
psql -U library_user -d library_db -c "SELECT 1;"

# Check Redis
redis-cli ping
```

### CORS Issues
```bash
# Check response headers
curl -I http://localhost:8080/api/books

# Should see:
Access-Control-Allow-Origin: http://localhost:4200
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
```

## 📝 Code Snippets

### Create New Service
```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/endpoint`;

  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
```

### Create New Component
```typescript
import { Component, signal, inject } from '@angular/core';

@Component({
  selector: 'app-my-component',
  imports: [],
  template: `
    <div>
      @if (data()) {
        <p>{{ data() }}</p>
      }
    </div>
  `,
  styles: [`
    div { padding: 1rem; }
  `]
})
export class MyComponent {
  data = signal<string>('');
}
```

### Add New Route
```typescript
// app.routes.ts
{
  path: 'my-route',
  loadComponent: () => import('./features/my-component').then(m => m.MyComponent)
}
```

## 🔍 Testing Checklist

### Manual Testing Flow
1. ✅ Start backend and frontend
2. ✅ Navigate to catalog
3. ✅ Search for a book
4. ✅ Click book to view details
5. ✅ Check availability
6. ✅ Navigate to admin
7. ✅ Add a new book
8. ✅ Edit the book
9. ✅ Add an item for the book
10. ✅ Check out the item
11. ✅ Navigate to account
12. ✅ View active loans
13. ✅ Renew a loan

## 📚 Resources

### Angular
- [Angular Docs](https://angular.dev)
- [Angular Signals](https://angular.dev/guide/signals)
- [Standalone Components](https://angular.dev/guide/components/importing)

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)

### Spring Boot
- [Spring Boot Docs](https://spring.io/projects/spring-boot)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)

## 🆘 Common Issues

### Issue: CORS Error
**Solution**: Ensure backend CORS is configured and proxy.conf.json is correct

### Issue: 404 on API calls
**Solution**: Check backend is running on port 8080 and endpoints exist

### Issue: Module not found
**Solution**: Run `npm install` in frontend directory

### Issue: Database connection failed
**Solution**: Check PostgreSQL is running and credentials are correct

### Issue: Compilation errors
**Solution**: Check TypeScript version and tsconfig.json settings

---

**Need Help?** Check:
1. PROJECT_SUMMARY.md - Complete overview
2. BACKEND_REQUIREMENTS.md - API specifications
3. IMPLEMENTATION_CHECKLIST.md - Progress tracking
4. README.md - Setup instructions
