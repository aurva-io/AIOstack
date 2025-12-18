#!/bin/bash

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
NAMESPACE="aibender"
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Helper functions
print_header() {
    echo ""
    echo -e "${BLUE}════════════════════════════════════════════════════════════${NC}"
    echo -e "${BLUE}  $1${NC}"
    echo -e "${BLUE}════════════════════════════════════════════════════════════${NC}"
    echo ""
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

# Check prerequisites
check_prerequisites() {
    print_header "Checking Prerequisites"

    if ! command -v kubectl &> /dev/null; then
        print_error "kubectl is not installed. Please install kubectl first."
        exit 1
    fi
    print_success "kubectl is installed"

    if ! command -v helm &> /dev/null; then
        print_error "helm is not installed. Please install helm first."
        exit 1
    fi
    print_success "helm is installed"

    if ! kubectl cluster-info &> /dev/null; then
        print_error "Cannot connect to Kubernetes cluster. Please check your kubeconfig."
        exit 1
    fi
    print_success "Connected to Kubernetes cluster"
}

# Create namespace
create_namespace() {
    print_header "Creating Namespace"

    if kubectl get namespace "$NAMESPACE" &> /dev/null; then
        print_warning "Namespace '$NAMESPACE' already exists"
    else
        kubectl apply -f "$SCRIPT_DIR/00-namespace.yaml"
        print_success "Namespace '$NAMESPACE' created"
    fi
}

# Add Helm repositories
add_helm_repos() {
    print_header "Adding Helm Repositories"

    helm repo add bitnami https://charts.bitnami.com/bitnami 2>/dev/null || true
    print_success "Added bitnami repo"

    helm repo update
    print_success "Updated Helm repositories"
}

# Deploy infrastructure layer
deploy_infrastructure() {
    print_header "Deploying Infrastructure Layer"

    print_info "Deploying MinIO (S3-compatible storage)..."
    if kubectl get deployment minio -n "$NAMESPACE" &> /dev/null; then
        print_warning "MinIO already deployed, skipping..."
    else
        kubectl apply -f "$SCRIPT_DIR/infrastructure/01-minio.yaml" -n "$NAMESPACE"
        kubectl wait --for=condition=available deployment/minio -n "$NAMESPACE" --timeout=5m
        print_success "MinIO deployed"

        print_info "Initializing MinIO buckets..."
        kubectl delete job minio-init-buckets -n "$NAMESPACE" --ignore-not-found
        kubectl apply -f "$SCRIPT_DIR/infrastructure/01-minio-init-job.yaml" -n "$NAMESPACE"
        kubectl wait --for=condition=complete job/minio-init-buckets -n "$NAMESPACE" --timeout=2m 2>/dev/null || true
        print_success "MinIO buckets initialized"
    fi

    print_info "Deploying PostgreSQL (shared database)..."
    if helm list -n "$NAMESPACE" | grep -q "^postgresql"; then
        print_warning "PostgreSQL already deployed, skipping..."
    else
        helm install postgresql bitnami/postgresql \
            -f "$SCRIPT_DIR/infrastructure/02-postgresql-values.yaml" \
            -n "$NAMESPACE" \
            --wait \
            --timeout 5m
        print_success "PostgreSQL deployed"
    fi

    print_info "Deploying Redis (cache and feature store)..."
    if helm list -n "$NAMESPACE" | grep -q "^redis"; then
        print_warning "Redis already deployed, skipping..."
    else
        helm install redis bitnami/redis \
            -f "$SCRIPT_DIR/infrastructure/03-redis-values.yaml" \
            -n "$NAMESPACE" \
            --wait \
            --timeout 5m
        print_success "Redis deployed"
    fi

    print_info "Deploying etcd (Milvus metadata)..."
    if kubectl get statefulset etcd -n "$NAMESPACE" &> /dev/null; then
        print_warning "etcd already deployed, skipping..."
    else
        kubectl apply -f "$SCRIPT_DIR/infrastructure/04-etcd.yaml" -n "$NAMESPACE"
        kubectl wait --for=condition=ready pod/etcd-0 -n "$NAMESPACE" --timeout=5m
        print_success "etcd deployed"
    fi

    print_success "Infrastructure layer deployment complete"
}

# Deploy ML services
deploy_ml_services() {
    print_header "Deploying ML Services Layer"

    print_info "Applying ML service manifests..."
    kubectl apply -f "$SCRIPT_DIR/ml-services/" -n "$NAMESPACE"
    print_success "ML services manifests applied"

    print_info "Waiting for ML services to be ready (this may take a few minutes)..."
    sleep 10

    # Wait for key services
    kubectl wait --for=condition=ready pod \
        -l app=lakefs \
        -n "$NAMESPACE" \
        --timeout=300s 2>/dev/null || print_warning "LakeFS pods not ready yet"

    kubectl wait --for=condition=ready pod \
        -l app=mlflow \
        -n "$NAMESPACE" \
        --timeout=300s 2>/dev/null || print_warning "MLFlow pods not ready yet"

    kubectl wait --for=condition=ready pod \
        -l app=qdrant \
        -n "$NAMESPACE" \
        --timeout=300s 2>/dev/null || print_warning "Qdrant pods not ready yet"

    print_success "ML services layer deployment complete"
}

# Check deployment status
check_status() {
    print_header "Deployment Status"

    print_info "Pods in namespace '$NAMESPACE':"
    kubectl get pods -n "$NAMESPACE"

    echo ""
    print_info "Services in namespace '$NAMESPACE':"
    kubectl get svc -n "$NAMESPACE"

    echo ""
    print_info "PVCs in namespace '$NAMESPACE':"
    kubectl get pvc -n "$NAMESPACE"

    echo ""
    NOT_READY=$(kubectl get pods -n "$NAMESPACE" --field-selector=status.phase!=Running --no-headers 2>/dev/null | wc -l)
    if [ "$NOT_READY" -gt 0 ]; then
        print_warning "$NOT_READY pods are not in Running state"
        print_info "Run 'kubectl get pods -n $NAMESPACE' to check status"
    else
        print_success "All pods are running!"
    fi
}

# Print access instructions
print_access_instructions() {
    print_header "Access Instructions"

    echo "To access the services, use kubectl port-forward:"
    echo ""
    echo -e "${GREEN}# MinIO Console (S3 Storage)${NC}"
    echo "  kubectl port-forward svc/minio -n $NAMESPACE 9001:9001"
    echo "  URL: http://localhost:9001"
    echo "  Credentials: minioadmin / minioadmin123"
    echo ""
    echo -e "${GREEN}# MLFlow (Experiment Tracking)${NC}"
    echo "  kubectl port-forward svc/mlflow -n $NAMESPACE 5000:5000"
    echo "  URL: http://localhost:5000"
    echo ""
    echo -e "${GREEN}# Airflow (Orchestration UI)${NC}"
    echo "  kubectl port-forward svc/airflow -n $NAMESPACE 8080:8080"
    echo "  URL: http://localhost:8080"
    echo "  Credentials: admin / admin123"
    echo ""
    echo -e "${GREEN}# Jupyter Lab (Development)${NC}"
    echo "  kubectl port-forward svc/jupyter -n $NAMESPACE 8888:8888"
    echo "  URL: http://localhost:8888"
    echo "  Token: aibender123"
    echo ""
    echo -e "${GREEN}# LakeFS (Data Version Control)${NC}"
    echo "  kubectl port-forward svc/lakefs -n $NAMESPACE 8000:8000"
    echo "  URL: http://localhost:8000"
    echo ""
    echo -e "${GREEN}# Qdrant (Vector Database)${NC}"
    echo "  kubectl port-forward svc/qdrant -n $NAMESPACE 6333:6333"
    echo "  URL: http://localhost:6333/dashboard"
    echo ""
}

# Run training job
run_training_job() {
    print_header "Running Sample Training Job"

    print_info "Submitting training job..."
    kubectl apply -f "$SCRIPT_DIR/training-job/12-sample-training-job.yaml" -n "$NAMESPACE"

    print_info "Waiting for job to start..."
    sleep 5

    print_info "Following job logs (Ctrl+C to stop)..."
    kubectl logs -f -n "$NAMESPACE" -l app=training-job --tail=-1 2>/dev/null || true

    print_success "Training job submitted"
}

# Main deployment flow
main() {
    print_header "AI ML Pipeline Deployment - Project AIBender"

    check_prerequisites
    create_namespace
    add_helm_repos
    deploy_infrastructure
    deploy_ml_services
    check_status
    print_access_instructions

    echo ""
    read -p "Do you want to run the sample training job now? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        run_training_job
    else
        print_info "You can run the training job later with:"
        echo "  kubectl apply -f $SCRIPT_DIR/training-job/12-sample-training-job.yaml -n $NAMESPACE"
    fi

    print_header "Deployment Complete!"
    print_success "Your ML pipeline is ready to use!"
    echo ""
    print_info "For cleanup, run: kubectl delete namespace $NAMESPACE"
}

# Run main function
main
