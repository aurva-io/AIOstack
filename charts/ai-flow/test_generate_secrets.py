"""Regression checks for credential generation (no Kubernetes access)."""
import importlib.util
import json
from pathlib import Path
import stat
import subprocess
import sys
import tempfile
import unittest

SCRIPT = Path(__file__).with_name("generate-secrets.py")
spec = importlib.util.spec_from_file_location("generate_secrets", SCRIPT)
generator = importlib.util.module_from_spec(spec)
spec.loader.exec_module(generator)


class CredentialsTest(unittest.TestCase):
    def test_independent_environments_and_shared_connections(self):
        first = generator.manifest()["stringData"]
        second = generator.manifest()["stringData"]
        for key in ("password", "minio-password", "redis-password", "jupyter-token",
                    "airflow-admin-password", "airflow-webserver-key", "lakefs-encryption-key"):
            self.assertGreaterEqual(len(first[key]), 64)
            self.assertNotEqual(first[key], second[key])
        for key in ("lakefs-database-url", "mlflow-database-url", "airflow-database-url"):
            self.assertIn(":" + first["password"] + "@postgresql:", first[key])
        self.assertIn(first["redis-password"], first["feature_store.yaml"])

    def test_private_file_and_no_overwrite(self):
        with tempfile.TemporaryDirectory() as directory:
            target = Path(directory) / "credentials.json"
            args = [sys.executable, str(SCRIPT), "--output", str(target)]
            result = subprocess.run(args, capture_output=True, check=True)
            self.assertEqual(result.stdout, b"")
            self.assertEqual(stat.S_IMODE(target.stat().st_mode), 0o600)
            original = target.read_bytes()
            self.assertEqual(json.loads(original)["kind"], "Secret")
            self.assertNotEqual(subprocess.run(args, capture_output=True).returncode, 0)
            self.assertEqual(target.read_bytes(), original)

    def test_refuses_symlink(self):
        with tempfile.TemporaryDirectory() as directory:
            target = Path(directory) / "existing"
            target.write_text("preserve")
            link = Path(directory) / "link"
            link.symlink_to(target)
            result = subprocess.run([sys.executable, str(SCRIPT), "--output", str(link)], capture_output=True)
            self.assertNotEqual(result.returncode, 0)
            self.assertEqual(target.read_text(), "preserve")


if __name__ == "__main__":
    unittest.main()
