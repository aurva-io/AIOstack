# Helm Chart Regeneration Scripts

This directory contains scripts to regenerate Helm chart tarballs and index files for the AIOStack repository.

## Scripts

### 1. `regenerate-helm.sh` (Simple)
Basic script to regenerate a single chart.

**Usage:**
```bash
# Use version from Chart.yaml
./regenerate-helm.sh

# Use specific version
./regenerate-helm.sh 0.3.0
```

**Features:**
- Packages the `aiostack` chart
- Generates index.yaml
- Colorized output
- Error handling

### 2. `regenerate-helm-advanced.sh` (Advanced)
Advanced script with support for multiple charts and better error handling.

**Usage:**
```bash
# Package all charts
./regenerate-helm-advanced.sh --all

# Package specific chart with version from Chart.yaml
./regenerate-helm-advanced.sh aiostack

# Package specific chart with custom version
./regenerate-helm-advanced.sh aiostack 0.3.0

# Package docs chart
./regenerate-helm-advanced.sh aiostack-docs
```

**Features:**
- Support for multiple charts
- Automatic chart discovery
- Better error handling and validation
- Detailed output and results
- Flexible version handling

## Prerequisites

- Helm 3.x installed
- Charts directory structure:
  ```
  charts/
  ├── aiostack/
  │   └── Chart.yaml
  └── aiostack-docs/
      └── Chart.yaml
  ```

## Generated Files

Both scripts generate:
- `*.tgz` - Helm chart tarballs
- `index.yaml` - Helm repository index file

## Examples

### Regenerate all charts
```bash
./regenerate-helm-advanced.sh --all
```

### Regenerate specific chart
```bash
./regenerate-helm-advanced.sh aiostack 0.3.0
```

### Quick regeneration (simple script)
```bash
./regenerate-helm.sh
```

## Troubleshooting

**Error: Helm not found**
- Install Helm: https://helm.sh/docs/intro/install/

**Error: Chart directory not found**
- Ensure you're running from the repository root
- Check that charts/ directory exists

**Error: Chart.yaml not found**
- Verify the chart directory structure
- Check that Chart.yaml exists in the chart directory

## Next Steps

After running the scripts:
1. Review the generated files
2. Commit changes to git
3. Upload to your Helm repository server
4. Update Helm repositories: `helm repo update`
