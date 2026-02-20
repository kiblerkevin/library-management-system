# Library Management System - Frontend

Angular 20+ frontend for the Library Management System with standalone components, signals, and lazy loading.

## Architecture

### Features
- **Public Catalog**: Search and browse books, view availability
- **User Account**: View active loans, loan history, renew items
- **Admin Dashboard**: Manage books, check out/in items, view overdue loans

### Tech Stack
- Angular 20+ with standalone components
- TypeScript with strict mode
- Signals for state management
- Reactive Forms
- Lazy-loaded routes
- SCSS for styling

## Project Structure

```
src/app/
├── core/
│   ├── models/          # TypeScript interfaces matching backend entities
│   └── services/        # API services (book, item, loan)
├── features/
│   ├── catalog/         # Public catalog search and book details
│   ├── account/         # User loan management
│   └── admin/           # Admin dashboard and management
└── shared/              # Shared components (future)
```

## Setup

### Prerequisites
- Node.js 18+
- npm 9+
- Backend running on http://localhost:8080

### Installation

```bash
npm install
```

### Development Server

```bash
npm start
```

Navigate to `http://localhost:4200`

### Build

```bash
npm run build
```

Build artifacts will be in the `dist/` directory.

## API Configuration

Environment files control the API URL:
- **Development**: `src/environments/environment.ts` → `http://localhost:8080/api`
- **Production**: `src/environments/environment.prod.ts` → `/api`

## Features Implementation Status

### ✅ Implemented
- Catalog search by title
- Book details with availability
- User loan viewing
- Loan renewal
- Admin dashboard
- Book CRUD operations
- Item checkout

### 🚧 To Be Implemented (Backend Required)
- User authentication & authorization
- Item check-in
- Item management (CRUD)
- Genre & author management
- Advanced search filters
- Holds/reservations

## Backend API Requirements

The frontend expects these endpoints (some need to be added to backend):

### Books
- `GET /api/books/search?title={title}` ✅
- `GET /api/books/author/{authorId}` ✅
- `GET /api/books` ❌ (needs implementation)
- `GET /api/books/{isbn}` ❌ (needs implementation)
- `POST /api/books` ❌ (needs implementation)
- `PUT /api/books/{isbn}` ❌ (needs implementation)
- `DELETE /api/books/{isbn}` ❌ (needs implementation)

### Items
- `GET /api/items/availability/{isbn}` ✅
- `GET /api/items` ❌ (needs implementation)
- `GET /api/items/{itemId}` ❌ (needs implementation)
- `POST /api/items` ❌ (needs implementation)
- `PUT /api/items/{itemId}` ❌ (needs implementation)
- `DELETE /api/items/{itemId}` ❌ (needs implementation)

### Loans
- `POST /api/loans` ✅
- `GET /api/loans/user/{userId}` ✅
- `GET /api/loans/{loanId}` ❌ (needs implementation)
- `GET /api/loans/overdue` ❌ (needs implementation)
- `PUT /api/loans/{loanId}/return` ❌ (needs implementation)
- `PUT /api/loans/{loanId}/renew` ❌ (needs implementation)

### Authentication (Future)
- `POST /api/auth/login`
- `POST /api/auth/register`
- `POST /api/auth/logout`

## CORS Configuration

Add to backend `SecurityConfig.java`:

```java
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

And update the `filterChain` method:
```java
http.cors(cors -> cors.configurationSource(corsConfigurationSource()))
```

## Best Practices Followed

- ✅ Standalone components (Angular 20+)
- ✅ Signals for state management
- ✅ `inject()` function instead of constructor injection
- ✅ `input()` and `output()` for component communication
- ✅ Native control flow (`@if`, `@for`) instead of directives
- ✅ Lazy loading for feature routes
- ✅ Reactive forms over template-driven
- ✅ Class and style bindings instead of `ngClass`/`ngStyle`
- ✅ Strict TypeScript with type inference
- ✅ Single responsibility components and services
- ✅ `providedIn: 'root'` for singleton services

## Next Steps

1. **Backend**: Implement missing API endpoints
2. **Backend**: Add CORS configuration
3. **Frontend**: Add authentication service and guards
4. **Frontend**: Add item management components
5. **Frontend**: Add advanced search filters
6. **Frontend**: Add error handling interceptor
7. **Frontend**: Add loading states
8. **Frontend**: Add unit tests
