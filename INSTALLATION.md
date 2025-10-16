# AIOStack Interactive Installation Guide

This document provides comprehensive instructions for using the interactive installation script for AIOStack.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Installation Methods](#installation-methods)
- [Configuration Options](#configuration-options)
- [Advanced Usage](#advanced-usage)
- [Troubleshooting](#troubleshooting)
- [Uninstallation](#uninstallation)

## Overview

The `install.sh` script provides an interactive, user-friendly way to install AIOStack on your Kubernetes cluster. It guides you through:

1. Checking prerequisites (Helm, kubectl, cluster connectivity)
2. Setting up the Helm repository
3. Collecting your Aurva credentials
4. Configuring namespace and settings
5. Installing the application
6. Verifying the deployment

## Prerequisites

Before running the installation script, ensure you have:

### Required

- **Helm 3.x** - Install from [helm.sh](https://helm.sh/docs/intro/install/)
- **kubectl** - Install from [kubernetes.io](https://kubernetes.io/docs/tasks/tools/)
- **Kubernetes Cluster Access** - kubectl must be configured to access your cluster
- **Aurva Account** - Sign up at [app.aurva.ai](https://app.aurva.ai) to get credentials

### Cluster Requirements

- Kubernetes 1.29+ with eBPF support (EKS, GKE, AKS automatically satisfy this)
- Linux kernel 5.15+ on cluster nodes

## Quick Start

### Method 1: Direct Download and Run

```bash
# Download the script
curl -fsSL https://raw.githubusercontent.com/aurva-io/AIOstack/main/install.sh -o install.sh

# Make it executable
chmod +x install.sh

# Run the interactive installer
./install.sh
```

### Method 2: One-Liner (curl to bash)

```bash
curl -fsSL https://raw.githubusercontent.com/aurva-io/AIOstack/main/install.sh | bash
```

### Method 3: Clone Repository

```bash
# Clone the repository
git clone https://github.com/aurva-io/AIOstack.git
cd AIOstack

# Run the installer
./install.sh
```

## Installation Methods

### Interactive Mode (Recommended)

The default mode guides you through each step with prompts:

```bash
./install.sh
```

**What you'll be asked:**

1. Confirm prerequisites are met
2. Enter your Aurva credentials (Company ID and Validation Key)
3. Choose or create a namespace
4. Configure optional settings (versions, security, namespace filtering)
5. Review configuration before installation
6. Save configuration for future use (optional)

### Using Saved Configuration

If you've previously saved a configuration, you can reuse it:

```bash
./install.sh --config aiostack-config-20240101-120000.yaml
```

This will:
- Load all settings from the config file
- Skip credential prompts
- Still allow you to review and modify settings

### Verbose Mode

For debugging or detailed output:

```bash
./install.sh --verbose
```

This shows additional information like:
- Tool paths (helm, kubectl locations)
- Full cluster information
- Detailed command execution

## Configuration Options

### Essential Configuration

These are required for installation:

| Setting | Description | Example |
|---------|-------------|---------|
| Company ID | Your Aurva company identifier | `company-abc123` |
| Validation Key | Authentication key from Aurva | `key-xyz789...` |

### Namespace Configuration

| Setting | Default | Description |
|---------|---------|-------------|
| Namespace | `aiostack` | Kubernetes namespace for installation |
| Release Name | `myaiostack` | Helm release name |
| Create Namespace | `true` | Create namespace if it doesn't exist |

### Component Configuration

| Setting | Default | Description |
|---------|---------|-------------|
| Observer Version | `v1.0.5_alpha` | Observer component version |
| Outpost Version | `v1.0.5_alpha` | Outpost component version |
| Use Latest | `false` | Use latest versions instead of stable |

### Security & Network

| Setting | Default | Description |
|---------|---------|-------------|
| Outpost URL Secure | `false` | Use HTTPS for Outpost communication |
| Skip Namespaces | `kube-system,aiostack-test,aiostack,monitoring,gke-mcs` | Namespaces to exclude from monitoring |

## Advanced Usage

### Custom Configuration File

You can create a configuration file manually:

```yaml
# aiostack-custom.yaml
namespace: production-aiostack
releaseName: aiostack-prod
companyId: your-company-id
validationKey: your-validation-key
observerVersion: latest
outpostVersion: latest
isOutpostUrlSecure: true
skipNamespaces: kube-system,aiostack,monitoring
createNamespace: true
```

Then use it:

```bash
./install.sh --config aiostack-custom.yaml
```

### Environment Variables

Override defaults with environment variables:

```bash
# Use verbose mode by default
export VERBOSE=true
./install.sh

# Specify config file via environment
export CONFIG_FILE=my-config.yaml
./install.sh
```

### Non-Interactive Installation

For CI/CD or automation, prepare a config file and use it:

```bash
# Prepare config file with all required values
cat > auto-config.yaml << EOF
namespace: aiostack
releaseName: myaiostack
companyId: ${COMPANY_ID}
validationKey: ${VALIDATION_KEY}
observerVersion: v1.0.5_alpha
outpostVersion: v1.0.5_alpha
isOutpostUrlSecure: false
skipNamespaces: kube-system,aiostack-test,aiostack,monitoring,gke-mcs
createNamespace: true
EOF

# Run with config (will still prompt for confirmation)
./install.sh --config auto-config.yaml
```

### Installation Script Options

```bash
./install.sh [OPTIONS]

OPTIONS:
  -h, --help              Show help message
  -v, --verbose           Enable verbose output
  -c, --config FILE       Load configuration from file
  --version               Show script version
```

## Post-Installation

### Verify Installation

Check that all pods are running:

```bash
kubectl get pods -n aiostack
```

Expected output:
```
NAME                              READY   STATUS    RESTARTS   AGE
aiostack-observer-xxxxx           1/1     Running   0          2m
aiostack-outpost-xxxxx            1/1     Running   0          2m
```

### View Logs

Observer logs:
```bash
kubectl logs -n aiostack -l app.kubernetes.io/name=observer --tail=100
```

Outpost logs:
```bash
kubectl logs -n aiostack -l app.kubernetes.io/name=outpost --tail=100
```

All components:
```bash
kubectl logs -n aiostack -l app.kubernetes.io/instance=myaiostack --all-containers --tail=50
```

### Access Dashboard

1. Visit [app.aurva.ai](https://app.aurva.ai)
2. Login with your email (used during signup)
3. View your Shadow AI inventory and analytics

## Troubleshooting

### Prerequisites Check Fails

**Issue**: Helm not found
```bash
# macOS
brew install helm

# Linux
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

# Windows
choco install kubernetes-helm
```

**Issue**: kubectl not found or cluster connection fails
```bash
# Verify kubectl configuration
kubectl config current-context

# List available contexts
kubectl config get-contexts

# Switch context
kubectl config use-context <context-name>
```

### Installation Fails

**Issue**: Namespace already exists with resources
```bash
# Use a different namespace
./install.sh
# When prompted, enter a different namespace name

# Or use a different release name for the same namespace
# The script will prompt you if it detects existing resources
```

**Issue**: Helm repository errors
```bash
# Manually add repository
helm repo add aiostack https://charts.aurva.ai/
helm repo update

# Verify repository
helm search repo aiostack
```

**Issue**: Permission denied errors
```bash
# Verify cluster permissions
kubectl auth can-i create deployments -n aiostack

# Check if you have cluster-admin or sufficient permissions
kubectl get clusterrolebindings -o wide | grep $(kubectl config current-context)
```

### Pods Not Starting

**Issue**: Pods in Pending state
```bash
# Check pod events
kubectl describe pods -n aiostack

# Common causes:
# 1. Insufficient resources - check node capacity
kubectl top nodes

# 2. Image pull errors - check image pull secrets
kubectl get events -n aiostack --sort-by='.lastTimestamp'
```

**Issue**: Pods in CrashLoopBackOff
```bash
# Check logs for errors
kubectl logs -n aiostack <pod-name> --previous

# Check resource limits
kubectl describe pod -n aiostack <pod-name>
```

### Script Issues

**Issue**: Script hangs or freezes
```bash
# Run with verbose mode to see where it's stuck
./install.sh --verbose

# If hanging on kubectl commands, check cluster connectivity
kubectl get nodes
```

**Issue**: Invalid credentials
- Double-check your credentials at [app.aurva.ai](https://app.aurva.ai)
- Ensure no extra spaces when copying
- Use the saved config file to avoid re-entering

### Getting Help

If you encounter issues:

1. **Check logs**:
   ```bash
   kubectl logs -n aiostack --all-containers=true -l app.kubernetes.io/instance=myaiostack
   ```

2. **Check events**:
   ```bash
   kubectl get events -n aiostack --sort-by='.lastTimestamp'
   ```

3. **Review configuration**:
   ```bash
   helm get values myaiostack -n aiostack
   ```

4. **Get support**:
   - Documentation: [aurva.ai/docs](https://aurva.ai/docs/home)
   - GitHub Issues: [github.com/aurva-io/ai-observability-stack/issues](https://github.com/aurva-io/ai-observability-stack/issues)
   - Email: support@aurva.io

## Uninstallation

### Complete Removal

Remove AIOStack and all resources:

```bash
# Uninstall helm release
helm uninstall myaiostack -n aiostack

# Delete namespace (if you want to remove everything)
kubectl delete namespace aiostack

# Remove helm repository (optional)
helm repo remove aiostack
```

### Keep Configuration

If you want to reinstall later, save your configuration first:

```bash
# Export current values
helm get values myaiostack -n aiostack > my-saved-values.yaml

# Then uninstall
helm uninstall myaiostack -n aiostack
```

### Reinstall with Same Configuration

```bash
# Use saved configuration file
./install.sh --config aiostack-config-XXXXXX.yaml
```

## Best Practices

### For Production Environments

1. **Use stable versions**: Don't select "latest" for production
2. **Custom namespace**: Use environment-specific namespaces
3. **Save configuration**: Always save your config for disaster recovery
4. **Resource limits**: Monitor resource usage and adjust if needed
5. **Network policies**: Configure appropriate network policies for your cluster

### For Development Environments

1. **Use latest versions**: Stay up-to-date with new features
2. **Verbose mode**: Enable for debugging
3. **Test namespace**: Use separate namespace like `aiostack-dev`

### Security Recommendations

1. **Protect config files**: Saved configs contain credentials
   ```bash
   chmod 600 aiostack-config-*.yaml
   ```

2. **Don't commit credentials**: Add config files to `.gitignore`
   ```bash
   echo "aiostack-config-*.yaml" >> .gitignore
   ```

3. **Rotate keys**: Periodically rotate your validation keys

4. **RBAC**: Use least-privilege service accounts

## Script Features

The installation script includes:

- **Color-coded output**: Easy to read status messages
- **Progress indicators**: Shows current step out of total
- **Error handling**: Graceful failure with cleanup option
- **Input validation**: Checks for valid credentials and settings
- **Confirmation prompts**: Review before proceeding
- **Configuration save/load**: Reuse settings across installations
- **Verbose mode**: Detailed logging for troubleshooting
- **Signal handling**: Clean interrupt with Ctrl+C
- **Cleanup on failure**: Automatic rollback option

## Examples

### Basic Installation

```bash
# Download and run
curl -fsSL https://raw.githubusercontent.com/aurva-io/AIOstack/main/install.sh | bash
```

### Development Environment

```bash
./install.sh \
  --verbose

# During prompts:
# - Namespace: aiostack-dev
# - Use latest versions: Yes
# - Save configuration: Yes
```

### Production Environment

```bash
./install.sh \
  --config production-config.yaml

# Pre-created config with:
# - Stable versions
# - Production namespace
# - HTTPS enabled
# - Custom namespace exclusions
```

### Multiple Clusters

```bash
# Switch context
kubectl config use-context production-cluster

# Install with specific config
./install.sh --config prod-config.yaml

# Switch to staging
kubectl config use-context staging-cluster
./install.sh --config staging-config.yaml
```

## Support & Resources

- **Documentation**: https://aurva.ai/docs/home
- **Installation Guide**: https://aurva.ai/docs/installation/steps
- **GitHub Repository**: https://github.com/aurva-io/ai-observability-stack
- **Issue Tracker**: https://github.com/aurva-io/ai-observability-stack/issues
- **Email Support**: support@aurva.io
- **Dashboard**: https://app.aurva.ai

---

**Made with ❤️ by [Aurva](https://aurva.io)**

*"See what others can't. Secure what others miss."*
