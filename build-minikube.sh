#!/bin/bash
set -e

echo "Building Docker image in Minikube..."

# Use Minikube's Docker daemon
eval $(minikube docker-env)

# Build the image
cd backend
docker build -t library-management:1.0.1 .

echo "Image built successfully in Minikube"
docker images | grep library-management
