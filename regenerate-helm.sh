#!/bin/bash

# Script to regenerate Helm chart tarball and index file
# Usage: ./regenerate-helm.sh [version]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default values
CHART_NAME="aiostack"
CHART_DIR="charts/aiostack"
OUTPUT_DIR="."
INDEX_FILE="index.yaml"

# Get version from command line or Chart.yaml
if [ -n "$1" ]; then
    VERSION="$1"
    echo -e "${BLUE}Using version from command line: $VERSION${NC}"
else
    VERSION=$(grep '^version:' "$CHART_DIR/Chart.yaml" | awk '{print $2}')
    echo -e "${BLUE}Using version from Chart.yaml: $VERSION${NC}"
fi

# Validate Helm is installed
if ! command -v helm &> /dev/null; then
    echo -e "${RED}Error: Helm is not installed or not in PATH${NC}"
    echo "Please install Helm first: https://helm.sh/docs/intro/install/"
    exit 1
fi

# Validate chart directory exists
if [ ! -d "$CHART_DIR" ]; then
    echo -e "${RED}Error: Chart directory '$CHART_DIR' not found${NC}"
    exit 1
fi

echo -e "${YELLOW}Regenerating Helm chart for $CHART_NAME version $VERSION...${NC}"

# Clean up old files
echo -e "${BLUE}Cleaning up old files...${NC}"
rm -f "$CHART_NAME-$VERSION.tgz"
rm -f "$INDEX_FILE"

# Package the chart
echo -e "${BLUE}Packaging chart...${NC}"
helm package "$CHART_DIR" --destination "$OUTPUT_DIR" --version "$VERSION"

if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Failed to package chart${NC}"
    exit 1
fi

# Generate index file
echo -e "${BLUE}Generating index file...${NC}"
helm repo index "$OUTPUT_DIR" --url "https://charts.aurva.ai/"

if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Failed to generate index file${NC}"
    exit 1
fi

# Verify files were created
TARBALL="$CHART_NAME-$VERSION.tgz"
if [ -f "$TARBALL" ] && [ -f "$INDEX_FILE" ]; then
    echo -e "${GREEN}Success! Generated files:${NC}"
    echo -e "  - ${GREEN}$TARBALL${NC} ($(du -h "$TARBALL" | cut -f1))"
    echo -e "  - ${GREEN}$INDEX_FILE${NC} ($(du -h "$INDEX_FILE" | cut -f1))"
    
    # Show chart info
    echo -e "\n${BLUE}Chart information:${NC}"
    helm show chart "$TARBALL"
    
    # Show index contents
    echo -e "\n${BLUE}Index file contents:${NC}"
    cat "$INDEX_FILE"
    
else
    echo -e "${RED}Error: Failed to create required files${NC}"
    exit 1
fi

echo -e "\n${GREEN}Helm chart regeneration completed successfully!${NC}"
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Commit the new files to git"
echo "2. Our existing config will take care of the rest"
