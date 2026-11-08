"""Public, credential-free tests for deterministic Android release versions."""
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2] / 'scripts' / 'ci'))
from versioning import version_for_run, verify_apk_version


class VersioningTests(unittest.TestCase):
    def test_workflow_runs_change_both_version_fields(self):
        first = version_for_run({'GITHUB_RUN_NUMBER': '15', 'GITHUB_RUN_ATTEMPT': '1'})
        second = version_for_run({'GITHUB_RUN_NUMBER': '16', 'GITHUB_RUN_ATTEMPT': '1'})
        self.assertEqual(first, (1504, '1.0.15.1'))
        self.assertEqual(second, (1604, '1.0.16.1'))
        self.assertGreater(second[0], first[0])
        self.assertNotEqual(first[1], second[1])

    def test_reruns_change_both_version_fields(self):
        first = version_for_run({'GITHUB_RUN_NUMBER': '15', 'GITHUB_RUN_ATTEMPT': '1'})
        rerun = version_for_run({'GITHUB_RUN_NUMBER': '15', 'GITHUB_RUN_ATTEMPT': '2'})
        self.assertEqual(rerun, (1505, '1.0.15.2'))
        self.assertGreater(rerun[0], first[0])

    def test_reject_missing_invalid_or_exhausted_metadata(self):
        invalid = [
            {}, {'GITHUB_RUN_NUMBER': '', 'GITHUB_RUN_ATTEMPT': '1'},
            {'GITHUB_RUN_NUMBER': '10', 'GITHUB_RUN_ATTEMPT': '0'},
            {'GITHUB_RUN_NUMBER': '-1', 'GITHUB_RUN_ATTEMPT': '1'},
            {'GITHUB_RUN_NUMBER': 'abc', 'GITHUB_RUN_ATTEMPT': '1'},
            {'GITHUB_RUN_NUMBER': '10', 'GITHUB_RUN_ATTEMPT': '100'},
            {'GITHUB_RUN_NUMBER': '21000000', 'GITHUB_RUN_ATTEMPT': '1'},
        ]
        for metadata in invalid:
            with self.subTest(metadata=metadata), self.assertRaises(ValueError):
                version_for_run(metadata)

    def test_apk_must_match_derived_code_and_name_before_upload(self):
        badging = "package: name='com.advertio.development' versionCode='1504' versionName='1.0.15.1' compileSdkVersion='36'\n"
        verify_apk_version(badging, 1504, '1.0.15.1')
        for code, name, output in [
            (1505, '1.0.15.1', badging),
            (1504, '1.0.15.2', badging),
            (1504, '1.0.15.1', "package: name='com.advertio.development'\n"),
        ]:
            with self.subTest(code=code, name=name, output=output), self.assertRaises(ValueError):
                verify_apk_version(output, code, name)


if __name__ == '__main__':
    unittest.main()