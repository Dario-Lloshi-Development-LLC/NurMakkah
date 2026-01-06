# Android CI Setup

This repository's Android build requires specific SDK components (Android 34, Build Tools 34.0.0, and NDK 25.1.8937393).

Use the included script to install components and accept licenses on CI runners that have Android SDK tools installed:

```bash
# On CI runner with sdkmanager available
bash scripts/android_ci_setup.sh
```

If your CI provides pre-installed Android images (CircleCI Android, GitHub Actions `react-native-android` images, GitLab shared runners), ensure the following environment variables are set:

- `ANDROID_SDK_ROOT` or `ANDROID_HOME` pointing to the SDK installation
- `PATH` includes `$ANDROID_SDK_ROOT/cmdline-tools/latest/bin` (or equivalent)

Recommended GitHub Actions snippet:

```yaml
- name: Install Android SDK components
  run: bash scripts/android_ci_setup.sh
  env:
    ANDROID_SDK_ROOT: ${{ env.ANDROID_SDK_ROOT }}
```

Notes:

- The script requires `sdkmanager` (part of Android SDK Command-line Tools). If `sdkmanager` isn't available, install the Command-line Tools first or use a CI image that already includes them.
- Accepting licenses must be done on the runner where Gradle will run.
- For local development, follow Android Studio prompts or use the `sdkmanager` tool manually.
