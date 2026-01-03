#!/usr/bin/env bash
set -euo pipefail

# Android SDK/NDK setup for CI
# This script is intended to run on CI runners that have Android SDK tools installed.
# It will install required packages and accept licenses.

echo "Installing Android SDK components..."
if ! command -v sdkmanager >/dev/null 2>&1; then
  echo "sdkmanager not found in PATH. Ensure Android SDK tools are installed and ANDROID_HOME/ANDROID_SDK_ROOT are set."
  exit 1
fi

# Packages required by the project
REQUIRED=("platforms;android-34" "build-tools;34.0.0" "ndk;25.1.8937393")
for pkg in "${REQUIRED[@]}"; do
  echo "Installing $pkg"
  yes | sdkmanager --install "$pkg"
done

# Accept licenses
yes | sdkmanager --licenses || true

echo "Android SDK setup complete."
