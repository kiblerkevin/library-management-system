# Library Management System - Backend

Spring Boot monolith with resilience patterns for Phase 1 deployment.

## Features

- **Connection Pooling**: HikariCP with leak detection
- **Circuit Breakers**: Resilience4j for database/Redis failures
- **Retry Logic**: Automatic retry for transient failures
- **Rate Limiting**: 100 requests/second per endpoint
- **Caching**: Redis for book searches and availability
- **Health Checks**: `/actuator/health` for monitoring
- **Metrics**: Prometheus endpoint at `/actuator/prometheus`

## Prerequisites

- Java 17+
- Maven 3.8+
- PostgreSQL 14+
- Redis 7+

## Setup

1. **Database Setup**
```bash
psql -U postgres
CREATE DATABASE library_db;
CREATE USER library_user WITH PASSWORD 'library_pass';
GRANT ALL PRIVILEGES ON DATABASE library_db TO library_user;
\c library_db
\i ../db/Library\ DB\ Design.sql
```

2. **Environment Variables**
```bash
export DB_USERNAME=library_user
export DB_PASSWORD=library_pass
export JWT_SECRET=your-256-bit-secret-key
```

3. **Build & Run**
```bash
mvn clean install
mvn spring-boot:run
```

## Endpoints

- `GET /api/books/search?title={title}` - Search books (cached)
- `GET /api/items/availability/{isbn}` - Check availability (cached)
- `POST /api/loans` - Create loan
- `GET /actuator/health` - Health check
- `GET /actuator/prometheus` - Metrics

## Resilience Configuration

**Circuit Breaker**: Opens after 50% failure rate over 10 requests
**Retry**: 3 attempts with 1s delay for database operations
**Rate Limit**: 100 requests/second per API endpoint
**Cache TTL**: 10 minutes for book/item queries

## Monitoring

Access metrics at `http://localhost:8080/actuator/prometheus`
Configure Prometheus to scrape this endpoint for monitoring.
