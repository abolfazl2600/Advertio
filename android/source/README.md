# Android-owned source

`android-source.enc` is the complete frozen React application source plus its Node workspace/dependency lock required by this Android app, encrypted with AES-256-GCM. It is an Android-owned fork, not a pointer to a GitLab branch. The build does not contact GitLab, need a GitLab token, or update this fork when GitLab changes. Ordinary pinned npm/Gradle/SDK dependencies and the application's existing runtime API remain external dependencies.

The repository is public. Raw source was private, so it is retained here only as authenticated ciphertext. The owner-only decryption key is supplied through `ADVERTIO_ANDROID_SOURCE_KEY`; it is separate from the owner's Mac-generated app signing key. Never commit the source key, decoded source, key recovery file or signing credentials.

To edit the fork on a trusted local machine, install the pinned tools in a private Python virtual environment using `android/scripts/ci/source-requirements.txt`, set ADVERTIO_ANDROID_SOURCE_KEY privately, and run:

```bash
python android/scripts/android_source.py unpack android/source/android-source.enc /secure/advertio-android-source
# Edit that external source tree. Keep dependencies and lockfile synchronized.
python android/scripts/android_source.py seal /secure/advertio-android-source /secure/android-source.enc
```

Review/build the modified fork privately, then replace only the encrypted source file in Git and open a reviewed PR. Keep the source key backed up privately. Public Android overlays remain authoritative and are applied over the vendored base during CI with payload hashes verified. Source files inside the sealed bundle carry an authenticated SHA256 inventory. Archive traversal/links/duplicates, invalid authentication and changed content are rejected before writing source.

The bundle contains no node_modules, built dist, .git, dotenv files, app signing key or token. Its original upstream provenance stays private; no raw private revision/lock metadata is published.
