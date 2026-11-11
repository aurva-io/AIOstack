#!/usr/bin/env python3
"""Write credentials for a new disposable AI-flow environment; never rotate in place."""
import argparse
import json
import os
import secrets


def manifest():
    password = secrets.token_hex(32)
    redis = secrets.token_hex(32)
    data = {
        "minio-user": "aibender",
        "minio-password": secrets.token_hex(32),
        "postgres-password": secrets.token_hex(32),
        "password": password,
        "redis-password": redis,
        "lakefs-database-url": f"postgres://mluser:{password}@postgresql:5432/lakefs?sslmode=disable",
        "mlflow-database-url": f"postgresql://mluser:{password}@postgresql:5432/mlflow",
        "airflow-database-url": f"postgresql+psycopg2://mluser:{password}@postgresql:5432/airflow",
        "lakefs-encryption-key": secrets.token_hex(32),
        "airflow-webserver-key": secrets.token_hex(32),
        "airflow-admin-password": secrets.token_hex(32),
        "jupyter-token": secrets.token_hex(32),
        "feature_store.yaml": (
            "project: aibender\nprovider: local\nonline_store:\n  type: redis\n"
            f'  connection_string: "redis://:{redis}@redis-master:6379"\n'
            "offline_store:\n  type: file\nregistry:\n  path: s3://feast/registry.db\n"
            '  s3_endpoint_override: "http://minio:9000"\n'
        ),
    }
    return {"apiVersion": "v1", "kind": "Secret", "metadata": {
        "name": "aibender-credentials", "namespace": "aibender"
    }, "type": "Opaque", "stringData": data}


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", required=True, help="New file outside the repository (mode 0600)")
    args = parser.parse_args()
    fd = os.open(args.output, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600)
    with os.fdopen(fd, "w") as output:
        json.dump(manifest(), output, indent=2)
        output.write("\n")
