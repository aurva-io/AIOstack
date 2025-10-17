#!/usr/bin/env bash

#############################################################################
# AIOStack Uninstaller
#
# A safe and interactive uninstallation script for AIOStack Kubernetes
# application that guides users through the complete removal process.
#
# Usage:
#   ./uninstall.sh                    # Interactive mode
#   ./uninstall.sh --help             # Show help
#   ./uninstall.sh -v                 # Verbose mode
#   ./uninstall.sh --force            # Skip confirmations (dangerous!)
#
# Requirements:
#   - Helm 3.x
#   - kubectl configured with cluster access
#
# Author: Aurva (https://aurva.io)
# License: Apache 2.0
#############################################################################

set -euo pipefail

# Script version
VERSION="1.0.0"

# Configuration
VERBOSE="${VERBOSE:-false}"
FORCE="${FORCE:-false}"
NAMESPACE=""
RELEASE_NAME=""
DELETE_NAMESPACE="false"
REMOVE_HELM_REPO="false"

# Color codes for output (Green, White, Red theme)
RED='\033[0;31m'
GREEN='\033[0;32m'
BRIGHT_GREEN='\033[1;32m'
WHITE='\033[0;37m'
BOLD='\033[1m'
NC='\033[0m' # No Color

#############################################################################
# Helper Functions
#############################################################################

# Print colored output
print_color() {
    local color=$1
    shift
    echo -e "${color}$*${NC}"
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

# Prompt user with default value
prompt() {
    # Redirect stdin to terminal for interactive input when piped from curl
    if [ ! -t 0 ]; then
        exec < /dev/tty
    fi

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

# Ask yes/no question
ask_yes_no() {
    # Redirect stdin to terminal for interactive input when piped from curl
    if [ ! -t 0 ]; then
        exec < /dev/tty
    fi

    local prompt_message=$1
    local default_value=${2:-"n"}
    local response

    if [[ "$FORCE" == "true" ]]; then
        print_verbose "Force mode: answering 'yes' to: ${prompt_message}"
        return 0
    fi

    if [[ "$default_value" == "y" ]]; then
        read -r -p "$(echo -e "${BRIGHT_GREEN}${prompt_message} [Y/n]:${NC} ")" response
        response=${response:-y}
    else
        read -r -p "$(echo -e "${BRIGHT_GREEN}${prompt_message} [y/N]:${NC} ")" response
        response=${response:-n}
    fi

    [[ "$response" =~ ^[Yy]$ ]]
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
    ║                    AIOStack Uninstaller                       ║
    ║                                                               ║
    ║              Safe removal of AIOStack components              ║
    ║                                                               ║
    ║                      Version ${VERSION}                            ║
    ║                                                               ║
    ╚═══════════════════════════════════════════════════════════════╝
    "
    print_warning "This will remove AIOStack from your cluster"
    echo ""
}

# Show help
show_help() {
    cat << EOF
AIOStack Uninstaller v${VERSION}

USAGE:
    $0 [OPTIONS]

OPTIONS:
    -h, --help              Show this help message
    -v, --verbose           Enable verbose output
    -f, --force             Skip all confirmations (use with caution!)
    --version               Show version information

EXAMPLES:
    # Interactive uninstallation (recommended)
    $0

    # Verbose mode for debugging
    $0 --verbose

    # Force mode (dangerous - no confirmations!)
    $0 --force

WHAT GETS REMOVED:
    - Helm release (deployment, pods, services, etc.)
    - Optionally: Kubernetes namespace
    - Optionally: Helm repository

WHAT IS PRESERVED:
    - Configuration files on local system
    - Data in Aurva cloud dashboard

REQUIREMENTS:
    - Helm 3.x installed
    - kubectl configured with cluster access

SUPPORT:
    - Documentation: https://aurva.ai/docs/home
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
    print_info "Checking prerequisites..."
    echo ""

    local all_checks_passed=true

    # Check Helm
    if command -v helm &> /dev/null; then
        local helm_version
        helm_version=$(helm version --short 2>/dev/null | grep -oE 'v[0-9]+\.[0-9]+\.[0-9]+' | head -1)
        print_success "Helm is installed: ${helm_version}"
        print_verbose "Helm path: $(which helm)"
    else
        print_error "Helm is not installed"
        all_checks_passed=false
    fi

    # Check kubectl
    if command -v kubectl &> /dev/null; then
        local kubectl_version
        kubectl_version=$(kubectl version --client --short 2>/dev/null | grep -oE 'v[0-9]+\.[0-9]+\.[0-9]+' || echo "unknown")
        print_success "kubectl is installed: ${kubectl_version}"
        print_verbose "kubectl path: $(which kubectl)"
    else
        print_error "kubectl is not installed"
        all_checks_passed=false
    fi

    # Check cluster connectivity
    if command -v kubectl &> /dev/null; then
        if kubectl cluster-info &> /dev/null; then
            local context
            context=$(kubectl config current-context 2>/dev/null || echo "unknown")
            print_success "Connected to cluster: ${context}"
            print_verbose "Cluster info: $(kubectl cluster-info | head -1)"
        else
            print_error "Cannot connect to Kubernetes cluster"
            all_checks_passed=false
        fi
    fi

    if [[ "$all_checks_passed" == "false" ]]; then
        echo ""
        print_error "Prerequisites check failed"
        exit 1
    fi

    echo ""
}

# Find AIOStack installations
find_installations() {
    print_info "Searching for AIOStack installations..."
    echo ""

    # Get all helm releases across all namespaces
    local releases
    releases=$(helm list --all-namespaces -o json 2>/dev/null | \
        grep -E '"name"|"namespace"|"chart"' | \
        grep -B1 -A1 "aiostack" || echo "")

    if [[ -z "$releases" ]]; then
        print_warning "No AIOStack installations found"
        echo ""
        print_info "If you believe this is incorrect, you can:"
        print_info "  - Check specific namespace: helm list -n <namespace>"
        print_info "  - List all releases: helm list --all-namespaces"
        exit 0
    fi

    # List all AIOStack releases
    print_success "Found AIOStack installation(s):"
    echo ""
    helm list --all-namespaces | head -1  # Header
    helm list --all-namespaces | grep aiostack
    echo ""
}

# Select installation to remove
select_installation() {
    # Get list of AIOStack releases
    local releases
    releases=$(helm list --all-namespaces -o json 2>/dev/null | \
        jq -r '.[] | select(.chart | contains("aiostack")) | "\(.name)|\(.namespace)"' 2>/dev/null || echo "")

    if [[ -z "$releases" ]]; then
        print_error "No AIOStack installations found to remove"
        exit 1
    fi

    # Count installations
    local count
    count=$(echo "$releases" | wc -l | tr -d '[:space:]')

    if [[ "$count" -eq 1 ]]; then
        # Only one installation found
        RELEASE_NAME=$(echo "$releases" | cut -d'|' -f1)
        NAMESPACE=$(echo "$releases" | cut -d'|' -f2)
        print_info "Found installation: ${RELEASE_NAME} in namespace ${NAMESPACE}"
    else
        # Multiple installations found
        print_info "Found ${count} AIOStack installation(s)"
        echo ""

        # If force mode, error out
        if [[ "$FORCE" == "true" ]]; then
            print_error "Force mode cannot be used with multiple installations"
            print_info "Please specify namespace manually or run in interactive mode"
            exit 1
        fi

        # Interactive selection
        echo "Please select which installation to remove:"
        echo ""

        local i=1
        while IFS='|' read -r name ns; do
            echo "  ${i}) ${name} (namespace: ${ns})"
            i=$((i + 1))
        done <<< "$releases"
        echo ""

        local selection
        selection=$(prompt "Enter selection number" "1")

        RELEASE_NAME=$(echo "$releases" | sed -n "${selection}p" | cut -d'|' -f1)
        NAMESPACE=$(echo "$releases" | sed -n "${selection}p" | cut -d'|' -f2)
    fi

    print_verbose "Selected release: ${RELEASE_NAME}"
    print_verbose "Selected namespace: ${NAMESPACE}"
}

# Show what will be removed
show_removal_plan() {
    print_color "$BOLD$BRIGHT_GREEN" "Removal Plan:"
    echo ""

    print_color "$BOLD" "The following will be removed:"
    echo ""

    # Show helm release info
    print_info "Helm Release: ${RELEASE_NAME}"
    print_info "Namespace: ${NAMESPACE}"
    echo ""

    # Get resource counts
    print_info "Resources to be removed:"
    local pods services deployments daemonsets
    pods=$(kubectl get pods -n "$NAMESPACE" -l "app.kubernetes.io/instance=${RELEASE_NAME}" --no-headers 2>/dev/null | wc -l | tr -d '[:space:]')
    services=$(kubectl get svc -n "$NAMESPACE" -l "app.kubernetes.io/instance=${RELEASE_NAME}" --no-headers 2>/dev/null | wc -l | tr -d '[:space:]')
    deployments=$(kubectl get deployments -n "$NAMESPACE" -l "app.kubernetes.io/instance=${RELEASE_NAME}" --no-headers 2>/dev/null | wc -l | tr -d '[:space:]')
    daemonsets=$(kubectl get daemonsets -n "$NAMESPACE" -l "app.kubernetes.io/instance=${RELEASE_NAME}" --no-headers 2>/dev/null | wc -l | tr -d '[:space:]')

    echo "  - Pods: ${pods}"
    echo "  - Services: ${services}"
    echo "  - Deployments: ${deployments}"
    echo "  - DaemonSets: ${daemonsets}"
    echo ""

    # Show current pods
    if [[ "$pods" -gt 0 ]]; then
        print_info "Current pods:"
        kubectl get pods -n "$NAMESPACE" -l "app.kubernetes.io/instance=${RELEASE_NAME}" 2>/dev/null | head -10
        echo ""
    fi

    # Ask about namespace deletion
    if ask_yes_no "Also delete namespace '${NAMESPACE}'?" "n"; then
        DELETE_NAMESPACE="true"
        print_warning "Namespace '${NAMESPACE}' will be deleted (including ALL resources in it)"
        echo ""
    fi

    # Ask about helm repo removal
    if helm repo list 2>/dev/null | grep -q "aiostack"; then
        if ask_yes_no "Remove Aurva Helm repository?" "n"; then
            REMOVE_HELM_REPO="true"
        fi
    fi

    echo ""
    print_color "$BOLD" "Summary:"
    echo "  Release to remove: ${RELEASE_NAME}"
    echo "  Namespace: ${NAMESPACE}"
    echo "  Delete namespace: ${DELETE_NAMESPACE}"
    echo "  Remove Helm repo: ${REMOVE_HELM_REPO}"
    echo ""
}

# Perform uninstallation
perform_uninstall() {
    print_color "$BOLD$BRIGHT_GREEN" "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    print_color "$BOLD$BRIGHT_GREEN" "Starting Uninstallation"
    print_color "$BOLD$BRIGHT_GREEN" "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""

    # Final confirmation
    if ! ask_yes_no "Are you sure you want to proceed?" "n"; then
        print_info "Uninstallation cancelled"
        exit 0
    fi

    echo ""
    print_info "Removing Helm release: ${RELEASE_NAME}..."

    if helm uninstall "$RELEASE_NAME" -n "$NAMESPACE" 2>&1; then
        print_success "Helm release removed successfully"
    else
        print_error "Failed to remove Helm release"
        print_info "You can try manually: helm uninstall ${RELEASE_NAME} -n ${NAMESPACE}"
        exit 1
    fi

    # Wait a moment for resources to be cleaned up
    echo ""
    print_info "Waiting for resources to be cleaned up..."
    sleep 5

    # Check if resources are gone
    local remaining_pods
    remaining_pods=$(kubectl get pods -n "$NAMESPACE" -l "app.kubernetes.io/instance=${RELEASE_NAME}" --no-headers 2>/dev/null | wc -l | tr -d '[:space:]')

    if [[ "$remaining_pods" -gt 0 ]]; then
        print_warning "${remaining_pods} pod(s) still terminating..."
        print_info "This is normal. They will be removed shortly."
    else
        print_success "All pods have been removed"
    fi

    # Delete namespace if requested
    if [[ "$DELETE_NAMESPACE" == "true" ]]; then
        echo ""
        print_warning "Deleting namespace: ${NAMESPACE}..."

        if kubectl delete namespace "$NAMESPACE" 2>&1; then
            print_success "Namespace deleted successfully"
        else
            print_error "Failed to delete namespace"
            print_info "You can try manually: kubectl delete namespace ${NAMESPACE}"
        fi
    fi

    # Remove helm repo if requested
    if [[ "$REMOVE_HELM_REPO" == "true" ]]; then
        echo ""
        print_info "Removing Helm repository..."

        if helm repo remove aiostack 2>&1; then
            print_success "Helm repository removed successfully"
        else
            print_warning "Failed to remove Helm repository (may not exist)"
        fi
    fi
}

# Show completion message
show_completion() {
    echo ""
    print_color "$BOLD$BRIGHT_GREEN" "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    print_color "$BOLD$BRIGHT_GREEN" "Uninstallation Complete!"
    print_color "$BOLD$BRIGHT_GREEN" "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""

    print_success "AIOStack has been removed from your cluster"
    echo ""

    print_info "What was removed:"
    echo "  ✓ Helm release: ${RELEASE_NAME}"
    if [[ "$DELETE_NAMESPACE" == "true" ]]; then
        echo "  ✓ Namespace: ${NAMESPACE}"
    fi
    if [[ "$REMOVE_HELM_REPO" == "true" ]]; then
        echo "  ✓ Helm repository: aiostack"
    fi
    echo ""

    print_info "What is preserved:"
    echo "  • Your data on Aurva dashboard (app.aurva.ai)"
    echo "  • Configuration files on this machine"
    if [[ "$DELETE_NAMESPACE" != "true" ]]; then
        echo "  • Namespace: ${NAMESPACE}"
    fi
    echo ""

    print_info "To reinstall AIOStack:"
    echo "  ./install.sh"
    echo ""

    print_info "Need help?"
    echo "  • Documentation: https://aurva.ai/docs/home"
    echo "  • Support: support@aurva.io"
    echo ""
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
            -f|--force)
                FORCE="true"
                print_warning "Force mode enabled - confirmations will be skipped!"
                shift
                ;;
            --version)
                echo "AIOStack Uninstaller v${VERSION}"
                exit 0
                ;;
            *)
                print_error "Unknown option: $1"
                echo "Use --help for usage information"
                exit 1
                ;;
        esac
    done

    # Show banner
    print_banner

    # Check prerequisites
    check_prerequisites

    # Find installations
    find_installations

    # Select installation to remove
    select_installation

    # Show what will be removed and get confirmation
    show_removal_plan

    # Perform uninstallation
    perform_uninstall

    # Show completion message
    show_completion
}

# Run main function
main "$@"
