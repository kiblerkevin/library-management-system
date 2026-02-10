# Kubernetes Deployment Guide

## Prerequisites

- Kubernetes cluster (v1.25+)
- kubectl configured
- Local storage provisioner or NFS for PersistentVolumes

## Setup Local Storage (On-Prem)

**For Minikube:**
```bash
# Minikube has 'standard' storage class by default
kubectl get storageclass
```

**For other on-prem clusters:**
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

# Create PersistentVolume
kubectl apply -f k8s/postgres-pv.yaml
```

## Build Application Image

**For Minikube:**
```bash
# Build image in Minikube's Docker daemon
./build-minikube.sh
```

**For other Kubernetes clusters:**
```bash
cd backend
docker build -t library-management:1.0.0 .
# Push to your registry
docker tag library-management:1.0.0 your-registry/library-management:1.0.0
docker push your-registry/library-management:1.0.0
# Update k8s/library-app.yaml with your registry image
```

## Deploy to Kubernetes

```bash
# Apply all manifests
kubectl apply -f k8s/

# Wait for database to be ready
kubectl wait --for=condition=ready pod -l app=postgres -n library-system --timeout=120s

# Initialize database schema
kubectl cp db/Library\ DB\ Design.sql library-system/postgres-0:/tmp/schema.sql
kubectl exec -it postgres-0 -n library-system -- psql -U library_user -d library_db -f /tmp/schema.sql
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
# Deploy Prometheus (optional)
kubectl apply -f k8s/prometheus.yaml

# Access Prometheus UI
kubectl port-forward svc/prometheus -n library-system 9090:9090
# Open http://localhost:9090

# Or access metrics directly
kubectl port-forward svc/library-service -n library-system 8080:80
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
