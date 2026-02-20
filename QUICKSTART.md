# Quick Start Guide

## Prerequisites
- Java 17+
- Node.js 18+
- PostgreSQL 14+
- Redis 7+

## Backend Setup

1. **Start PostgreSQL and Redis**
```bash
# PostgreSQL
psql -U postgres
CREATE DATABASE library_db;
CREATE USER library_user WITH PASSWORD 'library_pass';
GRANT ALL PRIVILEGES ON DATABASE library_db TO library_user;
\c library_db
\i db/Library\ DB\ Design.sql

# Redis
redis-server
```

2. **Set Environment Variables**
```bash
export DB_USERNAME=library_user
export DB_PASSWORD=library_pass
export JWT_SECRET=your-256-bit-secret-key
```

3. **Run Backend**
```bash
cd backend
mvn spring-boot:run
```

Backend will start on `http://localhost:8080`

## Frontend Setup

1. **Install Dependencies**
```bash
cd frontend
npm install
```

2. **Start Development Server**
```bash
npm start
```

Frontend will start on `http://localhost:4200`

The proxy configuration will automatically forward `/api` requests to `http://localhost:8080`

## Testing the Application

1. **Access the Frontend**: http://localhost:4200
2. **Navigate to Catalog**: Search for books (requires backend data)
3. **Admin Dashboard**: http://localhost:4200/admin
4. **User Account**: http://localhost:4200/account

## Important Notes

### Backend API Endpoints
The frontend is ready, but the backend needs additional endpoints. See `frontend/BACKEND_REQUIREMENTS.md` for:
- Missing CRUD operations for books, items, loans
- CORS configuration
- Service layer methods

### Current Limitations
- No authentication (hardcoded user ID = 1 in account view)
- Some features require backend endpoints that don't exist yet
- No error handling interceptor
- No loading indicators on all components

### Next Steps
1. Implement missing backend endpoints (see BACKEND_REQUIREMENTS.md)
2. Add CORS configuration to backend
3. Test all features end-to-end
4. Add authentication system
5. Add comprehensive error handling
6. Add unit tests

## Troubleshooting

### CORS Errors
If you see CORS errors, the proxy might not be working. Check:
1. Backend is running on port 8080
2. Frontend proxy.conf.json is configured correctly
3. Angular dev server was started with proxy config

### Backend Connection Refused
Ensure:
1. PostgreSQL is running and database exists
2. Redis is running
3. Environment variables are set
4. Backend started successfully without errors

### Module Not Found
Run `npm install` in the frontend directory
