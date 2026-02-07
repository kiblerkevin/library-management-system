# Kubernetes Deployment Guide

## Prerequisites

- Kubernetes cluster (v1.25+)
- kubectl configured
- Local storage provisioner or NFS for PersistentVolumes

## Setup Local Storage (On-Prem)

```bash
# Create StorageClass for local storage
cat <<EOF | kubectl apply -f -
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: local-storage
provisioner: kubernetes.io/no-provisioner
volumeBindingMode: WaitForFirstConsumer
EOF
```

## Build Application Image

```bash
cd backend
docker build -t library-management:1.0.0 .
```

## Deploy to Kubernetes

```bash
# Apply in order
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/secret.yaml
kubectl apply -f k8s/postgres.yaml
kubectl apply -f k8s/redis.yaml

# Wait for database to be ready
kubectl wait --for=condition=ready pod -l app=postgres -n library-system --timeout=120s

# Initialize database schema
kubectl exec -it postgres-0 -n library-system -- psql -U library_user -d library_db -f /path/to/schema.sql

# Deploy application
kubectl apply -f k8s/library-app.yaml
kubectl apply -f k8s/hpa.yaml
kubectl apply -f k8s/monitoring.yaml
```

## Verify Deployment

```bash
# Check all pods
kubectl get pods -n library-system

# Check services
kubectl get svc -n library-system

# View logs
kubectl logs -f deployment/library-app -n library-system

# Check health
kubectl exec -it deployment/library-app -n library-system -- curl localhost:8080/actuator/health
```

## Access Application

```bash
# Get LoadBalancer IP
kubectl get svc library-service -n library-system

# Test endpoint
curl http://<EXTERNAL-IP>/api/books/search?title=test
```

## Scaling

```bash
# Manual scaling
kubectl scale deployment library-app -n library-system --replicas=3

# Check HPA status
kubectl get hpa -n library-system
```

## Database Backup

```bash
# Create backup
kubectl exec postgres-0 -n library-system -- pg_dump -U library_user library_db > backup.sql

# Restore backup
kubectl exec -i postgres-0 -n library-system -- psql -U library_user library_db < backup.sql
```

## Monitoring

```bash
# Port-forward to access metrics
kubectl port-forward svc/library-service -n library-system 8080:80

# Access Prometheus metrics
curl http://localhost:8080/actuator/prometheus
```

## Cleanup

```bash
kubectl delete namespace library-system
```

## Resource Allocation

- **PostgreSQL**: 256Mi-512Mi RAM, 250m-500m CPU
- **Redis**: 128Mi-256Mi RAM, 100m-200m CPU  
- **App**: 512Mi-1Gi RAM, 250m-500m CPU per pod
- **Storage**: 10Gi for PostgreSQL data

## High Availability

- App: 2-5 replicas with HPA
- Database: Single instance (upgrade to StatefulSet with replication for HA)
- Redis: Single instance (upgrade to Redis Sentinel for HA)
