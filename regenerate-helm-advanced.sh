#!/bin/bash

# Advanced script to regenerate Helm chart tarballs and index file
# Not really using this for now
# Usage: ./regenerate-helm-advanced.sh [chart-name] [version] [--all]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Configuration
CHARTS_DIR="charts"
OUTPUT_DIR="."
INDEX_FILE="index.yaml"
REPO_URL="https://charts.aurva.ai/"

# Function to print usage
usage() {
    echo "Usage: $0 [chart-name] [version] [--all]"
    echo ""
    echo "Options:"
    echo "  chart-name    Name of the chart to package (e.g., aiostack, aiostack-docs)"
    echo "  version       Version to use (optional, defaults to Chart.yaml version)"
    echo "  --all         Package all charts in the charts/ directory"
    echo ""
    echo "Examples:"
    echo "  $0 aiostack 0.3.0"
    echo "  $0 aiostack"
    echo "  $0 --all"
    exit 1
}

# Function to validate prerequisites
validate_prerequisites() {
    echo -e "${BLUE}Validating prerequisites...${NC}"
    
    # Check if Helm is installed
    if ! command -v helm &> /dev/null; then
        echo -e "${RED}Error: Helm is not installed or not in PATH${NC}"
        echo "Please install Helm first: https://helm.sh/docs/intro/install/"
        exit 1
    fi
    
    # Check if charts directory exists
    if [ ! -d "$CHARTS_DIR" ]; then
        echo -e "${RED}Error: Charts directory '$CHARTS_DIR' not found${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}Prerequisites validated successfully${NC}"
}

# Function to get chart version
get_chart_version() {
    local chart_dir="$1"
    local version="$2"
    
    if [ -n "$version" ]; then
        echo "$version"
    else
        if [ -f "$chart_dir/Chart.yaml" ]; then
            grep '^version:' "$chart_dir/Chart.yaml" | awk '{print $2}' | tr -d '"'
        else
            echo -e "${RED}Error: Chart.yaml not found in $chart_dir${NC}"
            exit 1
        fi
    fi
}

# Function to package a single chart
package_chart() {
    local chart_name="$1"
    local chart_dir="$2"
    local version="$3"
    
    echo -e "${YELLOW}Packaging chart: $chart_name${NC}"
    
    # Validate chart directory
    if [ ! -d "$chart_dir" ]; then
        echo -e "${RED}Error: Chart directory '$chart_dir' not found${NC}"
        return 1
    fi
    
    # Get version
    local chart_version=$(get_chart_version "$chart_dir" "$version")
    echo -e "${BLUE}Using version: $chart_version${NC}"
    
    # Package the chart
    echo -e "${BLUE}Packaging $chart_name...${NC}"
    helm package "$chart_dir" --destination "$OUTPUT_DIR" --version "$chart_version"
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}Successfully packaged $chart_name-$chart_version.tgz${NC}"
        return 0
    else
        echo -e "${RED}Failed to package $chart_name${NC}"
        return 1
    fi
}

# Function to find all charts
find_charts() {
    find "$CHARTS_DIR" -name "Chart.yaml" -type f | while read -r chart_file; do
        local chart_dir=$(dirname "$chart_file")
        local chart_name=$(basename "$chart_dir")
        echo "$chart_name:$chart_dir"
    done
}

# Function to clean up old files
cleanup_old_files() {
    echo -e "${BLUE}Cleaning up old files...${NC}"
    rm -f *.tgz
    rm -f "$INDEX_FILE"
}

# Function to generate index
generate_index() {
    echo -e "${BLUE}Generating index file...${NC}"
    helm repo index "$OUTPUT_DIR" --url "$REPO_URL"
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}Successfully generated $INDEX_FILE${NC}"
    else
        echo -e "${RED}Failed to generate index file${NC}"
        exit 1
    fi
}

# Function to show results
show_results() {
    echo -e "\n${PURPLE}=== REGENERATION RESULTS ===${NC}"
    
    # List generated tarballs
    local tarballs=(*.tgz)
    if [ ${#tarballs[@]} -gt 0 ] && [ -f "${tarballs[0]}" ]; then
        echo -e "\n${GREEN}Generated tarballs:${NC}"
        for tarball in "${tarballs[@]}"; do
            if [ -f "$tarball" ]; then
                echo -e "  - ${GREEN}$tarball${NC} ($(du -h "$tarball" | cut -f1))"
            fi
        done
    fi
    
    # Show index file
    if [ -f "$INDEX_FILE" ]; then
        echo -e "\n${GREEN}Index file:${NC}"
        echo -e "  - ${GREEN}$INDEX_FILE${NC} ($(du -h "$INDEX_FILE" | cut -f1))"
        
        echo -e "\n${BLUE}Index contents:${NC}"
        cat "$INDEX_FILE"
    fi
    
    echo -e "\n${GREEN}Helm chart regeneration completed successfully!${NC}"
    echo -e "\n${YELLOW}Next steps:${NC}"
    echo "1. Review the generated files"
    echo "2. Commit changes to git: git add *.tgz $INDEX_FILE"
    echo "3. Upload to your Helm repository server"
    echo "4. Update Helm repositories: helm repo update"
}

# Main execution
main() {
    echo -e "${PURPLE}=== Helm Chart Regenerator ===${NC}"
    
    # Parse arguments
    if [ "$1" = "--all" ]; then
        MODE="all"
    elif [ -n "$1" ]; then
        MODE="single"
        CHART_NAME="$1"
        VERSION="$2"
    else
        usage
    fi
    
    # Validate prerequisites
    validate_prerequisites
    
    # Clean up old files
    cleanup_old_files
    
    # Package charts
    if [ "$MODE" = "all" ]; then
        echo -e "${YELLOW}Packaging all charts...${NC}"
        local success_count=0
        local total_count=0
        
        while IFS=':' read -r chart_name chart_dir; do
            total_count=$((total_count + 1))
            if package_chart "$chart_name" "$chart_dir" ""; then
                success_count=$((success_count + 1))
            fi
        done < <(find_charts)
        
        echo -e "${BLUE}Packaged $success_count/$total_count charts successfully${NC}"
    else
        # Single chart mode
        local chart_dir="$CHARTS_DIR/$CHART_NAME"
        if package_chart "$CHART_NAME" "$chart_dir" "$VERSION"; then
            echo -e "${GREEN}Chart packaged successfully${NC}"
        else
            exit 1
        fi
    fi
    
    # Generate index
    generate_index
    
    # Show results
    show_results
}

# Run main function
main "$@"
