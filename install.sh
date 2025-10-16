#!/usr/bin/env bash

#############################################################################
# AIOStack Interactive Installer By Aurva Inc
#
# A production-ready interactive installation script for AIOStack Kubernetes
# application that guides users through the complete installation process.
#
# Usage:
#   curl -fsSL https://raw.githubusercontent.com/aurva-io/AIOstack/main/install.sh | bash
#
#   OR download and run locally:
#
#   ./install.sh                    # Interactive mode
#   ./install.sh --config config.yaml    # Load saved config
#   ./install.sh --help             # Show help
#   ./install.sh -v                 # Verbose mode
#
# Requirements:
#   - Helm 3.x
#   - kubectl configured with cluster access
#   - Kubernetes 1.29+ with eBPF support
#   - Linux kernel 5.15+
#
# Author: Aurva (https://aurva.io)
# License: Apache 2.0
#############################################################################

set -euo pipefail

# Script version
VERSION="1.0.0"

# Configuration file path
CONFIG_FILE="${CONFIG_FILE:-}"
VERBOSE="${VERBOSE:-false}"

# Color codes for output (Green, White, Red theme)
RED='\033[0;31m'
GREEN='\033[0;32m'
BRIGHT_GREEN='\033[1;32m'
WHITE='\033[0;37m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Configuration variables
COMPANY_ID=""
VALIDATION_KEY=""
NAMESPACE="aiostack"
RELEASE_NAME="myaiostack"
IS_OUTPOST_URL_SECURE="false"
SKIP_NAMESPACES="kube-system,aiostack-test,aiostack,monitoring,gke-mcs"
COMMANDER_URL="hq.aurva.ai:443"
INSECURE_SKIP_VERIFY="true"
OBSERVER_VERSION="v1.0.5_alpha"
OUTPOST_VERSION="v1.0.5_alpha"
USE_LATEST_VERSION="false"
CREATE_NAMESPACE="true"
HELM_REPO_NAME="aiostack"
HELM_REPO_URL="https://charts.aurva.ai/"
HELM_CHART="${HELM_REPO_NAME}/aiostack"

# State tracking
CURRENT_STEP=0
TOTAL_STEPS=7
HELM_REPO_ADDED=false
NAMESPACE_CREATED=false
INSTALLATION_STARTED=false

#############################################################################
# Helper Functions
#############################################################################

# Print colored output
print_color() {
    local color=$1
    shift
    echo -e "${color}$*${NC}"
}

# Print step header
print_step() {
    CURRENT_STEP=$((CURRENT_STEP + 1))
    echo ""
    print_color "$BOLD$BRIGHT_GREEN" "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    print_color "$BOLD$BRIGHT_GREEN" "Step ${CURRENT_STEP}/${TOTAL_STEPS}: $1"
    print_color "$BOLD$BRIGHT_GREEN" "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
}

# Print success message
print_success() {
    print_color "$GREEN" "✓ $*"
}

# Print error message
print_error() {
    print_color "$RED" "✗ $*"
}

# Print warning message
print_warning() {
    print_color "$BRIGHT_GREEN" "⚠ $*"
}

# Print info message
print_info() {
    print_color "$WHITE" "ℹ $*"
}

# Print verbose message (only if verbose mode is enabled)
print_verbose() {
    if [[ "$VERBOSE" == "true" ]]; then
        print_color "$WHITE" "[VERBOSE] $*"
    fi
}

# Show loading animation
show_loading() {
    local pid=$1
    local message=$2
    local spin='-\|/'
    local i=0

    while kill -0 "$pid" 2>/dev/null; do
        i=$(( (i+1) %4 ))
        printf "\r${GREEN}${message} ${spin:$i:1}${NC}"
        sleep 0.1
    done
    printf "\r"
}

# Prompt user with default value
prompt() {
    local prompt_message=$1
    local default_value=$2
    local user_input

    if [[ -n "$default_value" ]]; then
        read -r -p "$(echo -e "${BRIGHT_GREEN}${prompt_message} [${default_value}]:${NC} ")" user_input
        echo "${user_input:-$default_value}"
    else
        read -r -p "$(echo -e "${BRIGHT_GREEN}${prompt_message}:${NC} ")" user_input
        echo "$user_input"
    fi
}

# Prompt for sensitive input (masked)
prompt_secure() {
    local prompt_message=$1
    local user_input

    read -r -s -p "$(echo -e "${BRIGHT_GREEN}${prompt_message}:${NC} ")" user_input
    echo "" # New line after hidden input
    echo "$user_input"
}

# Ask yes/no question
ask_yes_no() {
    local prompt_message=$1
    local default_value=${2:-"y"}
    local response

    if [[ "$default_value" == "y" ]]; then
        read -r -p "$(echo -e "${BRIGHT_GREEN}${prompt_message} [Y/n]:${NC} ")" response
        response=${response:-y}
    else
        read -r -p "$(echo -e "${BRIGHT_GREEN}${prompt_message} [y/N]:${NC} ")" response
        response=${response:-n}
    fi

    [[ "$response" =~ ^[Yy]$ ]]
}

# Open URL in default browser (cross-platform)
open_browser() {
    local url=$1

    print_verbose "Attempting to open URL: ${url}"

    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        open "$url" &>/dev/null || print_warning "Could not open browser automatically"
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        if command -v xdg-open &> /dev/null; then
            xdg-open "$url" &>/dev/null || print_warning "Could not open browser automatically"
        elif command -v gnome-open &> /dev/null; then
            gnome-open "$url" &>/dev/null || print_warning "Could not open browser automatically"
        else
            print_warning "Could not detect browser opener"
        fi
    elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
        # Windows
        start "$url" &>/dev/null || print_warning "Could not open browser automatically"
    else
        print_verbose "Unknown OS type: ${OSTYPE}"
    fi
}

# Print banner
print_banner() {
    # Redirect stdin to terminal for interactive input when piped from curl
    if [ ! -t 0 ]; then
        exec < /dev/tty
    fi

    clear
    print_color "$BOLD$BRIGHT_GREEN" "
    ╔═══════════════════════════════════════════════════════════════╗
    ║                                                               ║
    ║                  AIOStack Agentic Installer                   ║
    ║                                                               ║
    ║           Find Shadow AI in your Kubernetes clusters          ║
    ║                                                               ║
    ║                      Version ${VERSION}                            ║
    ║                                                               ║
    ╚═══════════════════════════════════════════════════════════════╝
    "
    print_info "Discover AI components you didn't know existed!"
    print_info "Website: https://aurva.ai | Docs: https://aurva.ai/docs/home | Home: https://aurva.io"
    echo ""
}

# Show help
show_help() {
    cat << EOF
AIOStack Interactive Installer v${VERSION}

USAGE:
    $0 [OPTIONS]

OPTIONS:
    -h, --help              Show this help message
    -v, --verbose           Enable verbose output
    -c, --config FILE       Load configuration from file
    --version               Show version information

EXAMPLES:
    # Interactive installation (recommended)
    $0

    # Load saved configuration
    $0 --config aiostack-config.yaml

    # Verbose mode for debugging
    $0 --verbose

    # Quick install via curl
    curl -fsSL https://raw.githubusercontent.com/aurva-io/AIOstack/main/install.sh | bash

REQUIREMENTS:
    - Helm 3.x installed
    - kubectl configured with cluster access
    - Kubernetes 1.29+ with eBPF support
    - Linux kernel 5.15+ on cluster nodes

SUPPORT:
    - Documentation: https://aurva.ai/docs/installation/steps
    - Issues: https://github.com/aurva-io/ai-observability-stack/issues
    - Email: support@aurva.io

EOF
    exit 0
}

#############################################################################
# Core Functions
#############################################################################

# Check prerequisites
check_prerequisites() {
    print_step "Checking Prerequisites"

    local all_checks_passed=true

    # Check Helm
    print_info "Checking for Helm..."
    if command -v helm &> /dev/null; then
        local helm_version
        helm_version=$(helm version --short 2>/dev/null | grep -oE 'v[0-9]+\.[0-9]+\.[0-9]+' | head -1)
        print_success "Helm is installed: ${helm_version}"
        print_verbose "Helm path: $(which helm)"
    else
        print_error "Helm is not installed"
        print_info "Install from: https://helm.sh/docs/intro/install/"
        all_checks_passed=false
    fi

    # Check kubectl
    print_info "Checking for kubectl..."
    if command -v kubectl &> /dev/null; then
        local kubectl_version
        kubectl_version=$(kubectl version --client --short 2>/dev/null | grep -oE 'v[0-9]+\.[0-9]+\.[0-9]+' || echo "unknown")
        print_success "kubectl is installed: ${kubectl_version}"
        print_verbose "kubectl path: $(which kubectl)"
    else
        print_error "kubectl is not installed"
        print_info "Install from: https://kubernetes.io/docs/tasks/tools/"
        all_checks_passed=false
    fi

    # Check cluster connectivity
    if command -v kubectl &> /dev/null; then
        print_info "Checking cluster connectivity..."
        if kubectl cluster-info &> /dev/null; then
            local context
            context=$(kubectl config current-context 2>/dev/null || echo "unknown")
            print_success "Connected to cluster: ${context}"
            print_verbose "Cluster info: $(kubectl cluster-info | head -1)"

            # Check Kubernetes version
            local k8s_version
            k8s_version=$(kubectl version --short 2>/dev/null | grep "Server Version" | grep -oE 'v[0-9]+\.[0-9]+' || echo "unknown")
            print_info "Kubernetes version: ${k8s_version}"

            # Warn if version is too old
            if [[ "$k8s_version" != "unknown" ]]; then
                local major minor
                major=$(echo "$k8s_version" | cut -d'.' -f1 | tr -d 'v')
                minor=$(echo "$k8s_version" | cut -d'.' -f2)

                if [[ $major -eq 1 && $minor -lt 29 ]]; then
                    print_warning "Kubernetes 1.29+ is recommended. Your version: ${k8s_version}"
                fi
            fi
        else
            print_error "Cannot connect to Kubernetes cluster"
            print_info "Configure kubectl with: kubectl config use-context <context-name>"
            all_checks_passed=false
        fi
    fi

    if [[ "$all_checks_passed" == "false" ]]; then
        echo ""
        print_error "Prerequisites check failed. Please install missing components and try again."
        exit 1
    fi

    echo ""
    print_success "All prerequisites are met!"
}

# Setup Helm repository
setup_helm_repo() {
    print_step "Setting Up Helm Repository"

    print_info "Adding Aurva Helm repository..."
    print_verbose "Repo URL: ${HELM_REPO_URL}"

    if helm repo add "$HELM_REPO_NAME" "$HELM_REPO_URL" &> /dev/null; then
        print_success "Repository added successfully"
        HELM_REPO_ADDED=true
    else
        # Repository might already exist, try to update
        print_info "Repository already exists, updating..."
    fi

    print_info "Updating Helm repositories..."
    if helm repo update &> /dev/null; then
        print_success "Repositories updated successfully"
    else
        print_error "Failed to update repositories"
        exit 1
    fi

    # Verify chart is available
    print_info "Verifying chart availability..."
    if helm search repo "${HELM_CHART}" &> /dev/null; then
        local chart_version
        chart_version=$(helm search repo "${HELM_CHART}" --output json 2>/dev/null | grep -oE '"version":"[^"]*"' | head -1 | cut -d'"' -f4 || echo "unknown")
        print_success "Chart is available: ${HELM_CHART} (latest: ${chart_version})"
    else
        print_error "Chart not found: ${HELM_CHART}"
        exit 1
    fi
}

# Collect credentials
collect_credentials() {
    print_step "Collecting Credentials"

    echo ""
    print_color "$BOLD$BRIGHT_GREEN" "Before proceeding, you need credentials from Aurva:"
    echo ""
    print_info "1. Sign up for a free account (takes 30 seconds)"
    print_info "2. Check your registered email for your credentials:"
    print_info "   - Company ID"
    print_info "   - AIOStack Validation Key"
    echo ""

    # Ask if they want to open the signup page
    if ask_yes_no "Open signup page in your browser?" "y"; then
        print_info "Opening https://app.aurva.ai/signup in your browser..."
        open_browser "https://app.aurva.ai/signup"
        sleep 2  # Give the browser time to open
        echo ""
    else
        print_info "Please visit: https://app.aurva.ai/signup"
        echo ""
    fi

    if ! ask_yes_no "Have you received your credentials via email?"; then
        echo ""
        print_warning "Please complete signup at https://app.aurva.ai/signup"
        print_info "Your credentials will be sent to your registered email address"
        print_info "Once you receive them, run this script again"
        exit 0
    fi

    echo ""
    print_info "Please enter your credentials:"
    echo ""

    # Collect Company ID
    while [[ -z "$COMPANY_ID" ]]; do
        COMPANY_ID=$(prompt "Company ID" "")
        # Trim leading and trailing whitespace
        COMPANY_ID=$(echo "$COMPANY_ID" | xargs)

        if [[ -z "$COMPANY_ID" ]]; then
            print_error "Company ID cannot be empty"
        elif [[ ! "$COMPANY_ID" =~ ^[a-zA-Z0-9_-]+$ ]]; then
            print_warning "Company ID contains unusual characters. Continue anyway? (y/n)"
            if ! ask_yes_no "Continue with this Company ID?" "n"; then
                COMPANY_ID=""
            fi
        fi
    done

    # Collect Validation Key
    while [[ -z "$VALIDATION_KEY" ]]; do
        VALIDATION_KEY=$(prompt_secure "AIOStack Validation Key (input hidden)")
        # Trim leading and trailing whitespace
        VALIDATION_KEY=$(echo "$VALIDATION_KEY" | xargs)

        if [[ -z "$VALIDATION_KEY" ]]; then
            print_error "Validation Key cannot be empty"
        fi
    done

    echo ""
    print_success "Credentials collected successfully"
    print_info "Whitespace automatically trimmed from inputs"
    print_verbose "Company ID: ${COMPANY_ID}"
    print_verbose "Validation Key: [HIDDEN]"

    echo ""
    print_info "Press Enter to continue to namespace configuration..."
    read -r -p ""
}

# Configure namespace
configure_namespace() {
    print_step "Configuring Namespace"

    echo ""
    NAMESPACE=$(prompt "Enter namespace for AIOStack" "$NAMESPACE")

    # Check if namespace exists
    if kubectl get namespace "$NAMESPACE" &> /dev/null; then
        print_info "Namespace '${NAMESPACE}' already exists"

        # Check if there are existing AIOStack resources
        local existing_pods
        existing_pods=$(kubectl get pods -n "$NAMESPACE" -l "app.kubernetes.io/instance=${RELEASE_NAME}" 2>/dev/null | grep -c "^" || echo "0")

        if [[ $existing_pods -gt 1 ]]; then
            print_warning "Found existing AIOStack installation in this namespace"
            if ask_yes_no "Do you want to use a different release name?" "y"; then
                RELEASE_NAME=$(prompt "Enter release name" "myaiostack-$(date +%s)")
            fi
        fi

        CREATE_NAMESPACE="false"
    else
        print_info "Namespace '${NAMESPACE}' does not exist"
        if ask_yes_no "Create namespace '${NAMESPACE}'?" "y"; then
            CREATE_NAMESPACE="true"
            print_success "Will create namespace during installation"
        else
            print_error "Cannot proceed without a namespace"
            exit 1
        fi
    fi

    print_verbose "Namespace: ${NAMESPACE}"
    print_verbose "Create namespace: ${CREATE_NAMESPACE}"
}

# Collect environment configuration
collect_env_config() {
    print_step "Configuring Environment Settings"

    echo ""
    print_info "Configuring optional settings (press Enter to use defaults)..."
    echo ""

    # Release name
    RELEASE_NAME=$(prompt "Helm release name" "$RELEASE_NAME")

    # Version selection
    if ask_yes_no "Use latest component versions? (default: v1.0.5_alpha)" "n"; then
        USE_LATEST_VERSION="true"
        OBSERVER_VERSION="latest"
        OUTPOST_VERSION="latest"
        print_info "Will use latest versions for all components"
    else
        print_info "Using stable versions: ${OBSERVER_VERSION}"
    fi

    # Outpost URL security
    echo ""
    print_info "Outpost URL Security Configuration:"
    print_info "  - Set to 'false' if Outpost is accessed via HTTP (default)"
    print_info "  - Set to 'true' if Outpost is accessed via HTTPS"
    if ask_yes_no "Is Outpost URL secure (HTTPS)?" "n"; then
        IS_OUTPOST_URL_SECURE="true"
    fi

    # Skip namespaces
    echo ""
    print_info "Configure which namespaces to skip during monitoring:"
    print_info "  Current: ${SKIP_NAMESPACES}"
    if ask_yes_no "Customize skipped namespaces?" "n"; then
        SKIP_NAMESPACES=$(prompt "Enter comma-separated namespaces to skip" "$SKIP_NAMESPACES")
    fi

    echo ""
    print_success "Configuration completed"
}

# Review configuration
review_config() {
    print_step "Reviewing Configuration"

    echo ""
    print_color "$BOLD$BRIGHT_GREEN" "Please review your configuration:"
    echo ""

    print_color "$BOLD" "Credentials:"
    echo "  Company ID:              ${COMPANY_ID}"
    echo "  Validation Key:          [HIDDEN - ${#VALIDATION_KEY} characters]"
    echo ""

    print_color "$BOLD" "Installation:"
    echo "  Namespace:               ${NAMESPACE}"
    echo "  Release Name:            ${RELEASE_NAME}"
    echo "  Chart:                   ${HELM_CHART}"
    echo ""

    print_color "$BOLD" "Component Versions:"
    echo "  Observer:                ${OBSERVER_VERSION}"
    echo "  Outpost:                 ${OUTPOST_VERSION}"
    echo ""

    print_color "$BOLD" "Configuration:"
    echo "  Outpost URL Secure:      ${IS_OUTPOST_URL_SECURE}"
    echo "  Skip Namespaces:         ${SKIP_NAMESPACES}"
    echo "  Commander URL:           ${COMMANDER_URL}"
    echo "  Insecure Skip Verify:    ${INSECURE_SKIP_VERIFY}"
    echo ""

    # Show the helm command
    print_color "$BOLD$BRIGHT_GREEN" "Helm command that will be executed:"
    print_color "$GREEN" "helm install ${RELEASE_NAME} ${HELM_CHART} \\"
    print_color "$GREEN" "  --namespace ${NAMESPACE} \\"
    if [[ "$CREATE_NAMESPACE" == "true" ]]; then
        print_color "$GREEN" "  --create-namespace \\"
    fi
    print_color "$GREEN" "  --set outpost.env[0].name=COMPANY_ID \\"
    print_color "$GREEN" "  --set outpost.env[0].value=${COMPANY_ID} \\"
    print_color "$GREEN" "  --set outpost.env[1].name=AIOSTACK_VALIDATION_KEY \\"
    print_color "$GREEN" "  --set outpost.env[1].value=[HIDDEN] \\"
    print_color "$GREEN" "  --set observer.env[0].name=IS_OUTPOST_URL_SECURE \\"
    print_color "$GREEN" "  --set observer.env[0].value=${IS_OUTPOST_URL_SECURE} \\"
    print_color "$GREEN" "  --set observer.version=${OBSERVER_VERSION} \\"
    print_color "$GREEN" "  --set outpost.version=${OUTPOST_VERSION}"
    echo ""

    # Ask if user wants to save configuration
    if ask_yes_no "Save this configuration for future use?" "y"; then
        save_config
    fi

    echo ""
    if ! ask_yes_no "Proceed with installation?" "y"; then
        print_warning "Installation cancelled by user"
        exit 0
    fi
}

# Save configuration
save_config() {
    local config_file="aiostack-config-$(date +%Y%m%d-%H%M%S).yaml"

    cat > "$config_file" << EOF
# AIOStack Configuration
# Generated: $(date)
# DO NOT SHARE THIS FILE - IT CONTAINS SENSITIVE CREDENTIALS

namespace: ${NAMESPACE}
releaseName: ${RELEASE_NAME}
companyId: ${COMPANY_ID}
validationKey: ${VALIDATION_KEY}
observerVersion: ${OBSERVER_VERSION}
outpostVersion: ${OUTPOST_VERSION}
isOutpostUrlSecure: ${IS_OUTPOST_URL_SECURE}
skipNamespaces: ${SKIP_NAMESPACES}
commanderUrl: ${COMMANDER_URL}
insecureSkipVerify: ${INSECURE_SKIP_VERIFY}
createNamespace: ${CREATE_NAMESPACE}
EOF

    chmod 600 "$config_file"
    print_success "Configuration saved to: ${config_file}"
    print_warning "Keep this file secure - it contains sensitive credentials!"
}

# Load configuration
load_config() {
    local config_file=$1

    if [[ ! -f "$config_file" ]]; then
        print_error "Configuration file not found: ${config_file}"
        exit 1
    fi

    print_info "Loading configuration from: ${config_file}"

    # Source the config file
    while IFS=': ' read -r key value; do
        # Skip comments and empty lines
        [[ "$key" =~ ^#.*$ ]] && continue
        [[ -z "$key" ]] && continue

        case "$key" in
            namespace) NAMESPACE="$value" ;;
            releaseName) RELEASE_NAME="$value" ;;
            companyId) COMPANY_ID="$value" ;;
            validationKey) VALIDATION_KEY="$value" ;;
            observerVersion) OBSERVER_VERSION="$value" ;;
            outpostVersion) OUTPOST_VERSION="$value" ;;
            isOutpostUrlSecure) IS_OUTPOST_URL_SECURE="$value" ;;
            skipNamespaces) SKIP_NAMESPACES="$value" ;;
            commanderUrl) COMMANDER_URL="$value" ;;
            insecureSkipVerify) INSECURE_SKIP_VERIFY="$value" ;;
            createNamespace) CREATE_NAMESPACE="$value" ;;
        esac
    done < "$config_file"

    print_success "Configuration loaded successfully"
}

# Install AIOStack
install_aurva() {
    print_step "Installing AIOStack"

    INSTALLATION_STARTED=true

    # Create namespace if needed
    if [[ "$CREATE_NAMESPACE" == "true" ]]; then
        print_info "Creating namespace: ${NAMESPACE}"
        if kubectl create namespace "$NAMESPACE" &> /dev/null; then
            print_success "Namespace created"
            NAMESPACE_CREATED=true
        else
            print_error "Failed to create namespace"
            exit 1
        fi
    fi

    echo ""
    print_info "Starting Helm installation..."
    print_info "This may take a few minutes..."
    echo ""

    # Build helm command with proper value overrides
    local helm_cmd=(
        helm install "$RELEASE_NAME" "$HELM_CHART"
        --namespace "$NAMESPACE"
    )

    # Escape commas in SKIP_NAMESPACES for Helm (Helm treats commas as array separators)
    local skip_namespaces_escaped="${SKIP_NAMESPACES//,/\\,}"

    # Add values - we need to set ALL env variables for outpost because --set replaces the entire array
    helm_cmd+=(
        --set "outpost.env[0].name=SKIP_NAMESPACES"
        --set "outpost.env[0].value=${skip_namespaces_escaped}"
        --set "outpost.env[1].name=INSECURE_SKIP_VERIFY"
        --set "outpost.env[1].value=${INSECURE_SKIP_VERIFY}"
        --set "outpost.env[2].name=COMMANDER_URL"
        --set "outpost.env[2].value=${COMMANDER_URL}"
        --set "outpost.env[3].name=COMPANY_ID"
        --set "outpost.env[3].value=${COMPANY_ID}"
        --set "outpost.env[4].name=AIOSTACK_VALIDATION_KEY"
        --set "outpost.env[4].value=${VALIDATION_KEY}"
        --set "observer.env[0].name=IS_OUTPOST_URL_SECURE"
        --set "observer.env[0].value=${IS_OUTPOST_URL_SECURE}"
        --set "observer.version=${OBSERVER_VERSION}"
        --set "outpost.version=${OUTPOST_VERSION}"
    )

    print_verbose "Running: ${helm_cmd[*]}"

    # Execute helm install
    if "${helm_cmd[@]}"; then
        echo ""
        print_success "Helm installation completed successfully!"
    else
        echo ""
        print_error "Helm installation failed"
        print_info "Run 'helm list -n ${NAMESPACE}' to check installation status"
        exit 1
    fi
}

# Verify deployment
verify_deployment() {
    print_step "Verifying Deployment"

    echo ""
    print_info "Checking pod status..."
    echo ""

    # Wait a bit for pods to start
    sleep 3

    # Show pod status
    kubectl get pods -n "$NAMESPACE" -l "app.kubernetes.io/instance=${RELEASE_NAME}" || true

    echo ""
    print_info "Waiting for pods to be ready (timeout: 5 minutes)..."

    # Wait for pods with timeout
    local timeout=300
    local elapsed=0
    local all_ready=false

    while [[ $elapsed -lt $timeout ]]; do
        local ready_count
        local total_count

        # Use jsonpath to reliably count ready pods
        ready_count=$(kubectl get pods -n "$NAMESPACE" -l "app.kubernetes.io/instance=${RELEASE_NAME}" \
            -o jsonpath='{range .items[*]}{.status.conditions[?(@.type=="Ready")].status}{"\n"}{end}' 2>/dev/null | \
            grep -c "True" 2>/dev/null || echo "0")

        total_count=$(kubectl get pods -n "$NAMESPACE" -l "app.kubernetes.io/instance=${RELEASE_NAME}" \
            --no-headers 2>/dev/null | wc -l 2>/dev/null | tr -d '[:space:]' || echo "0")

        # Default to 0 if empty and trim any whitespace
        ready_count=$(echo "$ready_count" | tr -d '[:space:]')
        total_count=$(echo "$total_count" | tr -d '[:space:]')
        ready_count=${ready_count:-0}
        total_count=${total_count:-0}

        if [[ $ready_count -gt 0 ]] && [[ $ready_count -eq $total_count ]]; then
            all_ready=true
            break
        fi

        printf "\r${GREEN}Pods ready: ${ready_count}/${total_count} (${elapsed}s elapsed)${NC}"
        sleep 5
        elapsed=$((elapsed + 5))
    done

    echo ""
    echo ""

    if [[ "$all_ready" == "true" ]]; then
        print_success "All pods are ready!"
    else
        print_warning "Some pods are not ready yet. This is normal and they may need more time."
        print_info "Monitor progress with: kubectl get pods -n ${NAMESPACE} -w"
    fi

    echo ""
    print_color "$BOLD$BRIGHT_GREEN" "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    print_color "$BOLD$BRIGHT_GREEN" "Installation Complete!"
    print_color "$BOLD$BRIGHT_GREEN" "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""

    print_info "Next Steps:"
    echo ""
    print_color "$BOLD" "1. Access the dashboard:"
    echo "   Visit: https://app.aurva.ai"
    echo "   Login with your email and credentials"
    echo ""

    print_color "$BOLD" "2. Monitor your installation:"
    echo "   kubectl get pods -n ${NAMESPACE}"
    echo "   kubectl logs -n ${NAMESPACE} -l app.kubernetes.io/instance=${RELEASE_NAME} --all-containers --tail=50"
    echo ""

    print_color "$BOLD" "3. Check service status:"
    echo "   kubectl get svc -n ${NAMESPACE}"
    echo ""

    print_color "$BOLD" "Useful commands:"
    echo "   # View all resources"
    echo "   kubectl get all -n ${NAMESPACE}"
    echo ""
    echo "   # View logs"
    echo "   kubectl logs -n ${NAMESPACE} -l app.kubernetes.io/name=observer --tail=100"
    echo "   kubectl logs -n ${NAMESPACE} -l app.kubernetes.io/name=outpost --tail=100"
    echo ""
    echo "   # Uninstall"
    echo "   helm uninstall ${RELEASE_NAME} -n ${NAMESPACE}"
    echo ""

    print_success "Thank you for installing AIOStack!"
    print_info "Documentation: https://aurva.ai/docs/home"
    print_info "Support: support@aurva.io"
}

# Cleanup on failure
cleanup_on_failure() {
    echo ""
    print_error "Installation failed. Initiating cleanup..."

    # Remove helm release if installation started
    if [[ "$INSTALLATION_STARTED" == "true" ]]; then
        print_info "Removing helm release: ${RELEASE_NAME}"
        helm uninstall "$RELEASE_NAME" -n "$NAMESPACE" &> /dev/null || true
    fi

    # Delete namespace if we created it
    if [[ "$NAMESPACE_CREATED" == "true" ]]; then
        print_info "Deleting namespace: ${NAMESPACE}"
        kubectl delete namespace "$NAMESPACE" &> /dev/null || true
    fi

    # Remove helm repo if we added it
    if [[ "$HELM_REPO_ADDED" == "true" ]]; then
        print_info "Removing helm repository"
        helm repo remove "$HELM_REPO_NAME" &> /dev/null || true
    fi

    print_success "Cleanup completed"
    echo ""
    print_info "Please check the error messages above and try again."
    print_info "For help, visit: https://aurva.ai/docs/installation/steps"
    exit 1
}

# Signal handler for cleanup
handle_interrupt() {
    echo ""
    print_warning "Installation interrupted by user"

    if ask_yes_no "Do you want to clean up partial installation?" "y"; then
        cleanup_on_failure
    else
        print_info "Partial installation left in place"
        print_info "To clean up manually, run: helm uninstall ${RELEASE_NAME} -n ${NAMESPACE}"
    fi

    exit 130
}

#############################################################################
# Main
#############################################################################

main() {
    # Parse command line arguments
    while [[ $# -gt 0 ]]; do
        case $1 in
            -h|--help)
                show_help
                ;;
            -v|--verbose)
                VERBOSE="true"
                shift
                ;;
            -c|--config)
                CONFIG_FILE="$2"
                shift 2
                ;;
            --version)
                echo "AIOStack Installer v${VERSION}"
                exit 0
                ;;
            *)
                print_error "Unknown option: $1"
                echo "Use --help for usage information"
                exit 1
                ;;
        esac
    done

    # Set up signal handlers
    trap handle_interrupt SIGINT SIGTERM

    # Show banner
    print_banner

    # Load config if provided
    if [[ -n "$CONFIG_FILE" ]]; then
        load_config "$CONFIG_FILE"
        echo ""
    fi

    # Run installation steps
    check_prerequisites
    setup_helm_repo

    # Skip credential collection if loaded from config
    if [[ -z "$COMPANY_ID" ]] || [[ -z "$VALIDATION_KEY" ]]; then
        collect_credentials
    else
        print_info "Using credentials from config file"
    fi

    configure_namespace
    collect_env_config
    review_config
    install_aurva
    verify_deployment
}

# Run main function
main "$@"
