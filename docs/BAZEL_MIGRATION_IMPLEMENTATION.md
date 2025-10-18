# Bazel Migration Implementation Guide

## Overview

This document provides a comprehensive guide to the Bazel migration that has been initiated for the `hajj-app` project. The migration aims to replace Gradle with Bazel as the primary build system for both the React Native and Flutter applications.

## What Has Been Done

### 1. Bazel Installation

Bazel version 8.4.2 has been installed in the development environment. This is the latest stable version and provides all necessary features for building Android applications.

### 2. WORKSPACE Configuration

A `WORKSPACE` file has been created at the root of the project. This file defines the external dependencies and repositories required for the Bazel build system, including:

*   **Android SDK and NDK**: Configured to use API level 34 for the SDK and API level 21 for the NDK.
*   **Node.js Rules**: Integrated `rules_nodejs` for managing JavaScript/TypeScript dependencies (React Native).
*   **Kotlin Rules**: Integrated `io_bazel_rules_kotlin` for Kotlin compilation support.
*   **Apple Rules**: Integrated `build_bazel_rules_apple` for future iOS support.

### 3. BUILD Files

BUILD files have been created for the following directories:

*   **Root BUILD**: `/home/ubuntu/hajj-app/BUILD` - Defines project-wide configurations.
*   **React Native App BUILD**: `/home/ubuntu/hajj-app/hajj_app/app/BUILD` - Defines the Android library and binary targets for the React Native application.
*   **Flutter App BUILD**: `/home/ubuntu/hajj-app/hajj_app_flutter/android/app/BUILD` - Defines the Android library and binary targets for the Flutter application.
*   **Directory BUILD Files**: Additional BUILD files in intermediate directories to properly structure the Bazel workspace.

### 4. Bazel Configuration

The `.bazelrc` file has been updated with performance-optimized configurations for building with Bazel.

### 5. Bazel Ignore File

A `.bazelignore` file has been created to exclude unnecessary directories (e.g., `node_modules`, build artifacts, IDE files) from Bazel's workspace view, improving build performance.

## Current Status

The Bazel migration is in its **initial phase**. The foundational configuration files have been created, but the following steps still need to be completed:

### Phase 1: React Native Android Build (In Progress)

**Completed:**
*   WORKSPACE configuration with Android SDK/NDK and Node.js rules.
*   Initial BUILD file for the React Native Android app.

**Remaining:**
*   Integrate React Native CLI with Bazel to bundle JavaScript code.
*   Configure native module linking within Bazel.
*   Create custom Bazel rules for React Native-specific build processes.
*   Test the build and resolve any integration issues.

### Phase 2: Flutter Android Build (Pending)

**Remaining:**
*   Integrate Flutter build system with Bazel.
*   Create Bazel rules for Dart compilation and Flutter-specific build processes.
*   Configure the Flutter engine integration with Bazel.
*   Test the build and resolve any integration issues.

### Phase 3: iOS Builds (Future)

iOS builds for both React Native and Flutter will be migrated in a future phase using `rules_apple` and `rules_ios`.

## Challenges and Considerations

### 1. React Native Integration

React Native's build process is tightly coupled with Gradle and the React Native CLI. Integrating it with Bazel requires:

*   Creating custom Bazel rules to invoke the React Native CLI for JavaScript bundling.
*   Managing native module dependencies and linking.
*   Handling asset bundling and resource management.

### 2. Flutter Integration

Flutter's build system is also complex, with its own Gradle plugin. Integration with Bazel involves:

*   Creating or adapting Bazel rules for Dart compilation.
*   Managing the Flutter engine and native dependencies.
*   Handling asset bundling specific to Flutter.

### 3. Maven Dependency Management

The current BUILD files reference Maven dependencies using the `@maven` repository prefix. This requires setting up a Maven repository rule in the WORKSPACE file. You may need to use tools like `rules_jvm_external` to manage Maven dependencies more effectively.

## Next Steps

To proceed with the Bazel migration, you will need to:

1.  **Set Up Maven Dependency Management**: Integrate `rules_jvm_external` or a similar tool to manage Maven dependencies for Android libraries.

2.  **Create Custom React Native Rules**: Develop Bazel rules that can invoke the React Native CLI and bundle JavaScript code. This may involve creating a custom Bazel rule file (e.g., `react_native.bzl`).

3.  **Integrate Native Modules**: Ensure that native modules used by React Native can be properly linked and included in the final APK/AAB.

4.  **Test the React Native Build**: Attempt to build the React Native application using Bazel and resolve any issues that arise.

5.  **Repeat for Flutter**: Follow a similar process for the Flutter application.

6.  **Update CI/CD Pipelines**: Modify your CI/CD configuration to use Bazel for building and testing.

7.  **Documentation and Training**: Create documentation and conduct training for your development team on using Bazel for this project.

## Bazel Build Commands

Once the migration is complete, you will be able to use the following Bazel commands:

```bash
# Build the React Native Android app
bazel build //hajj_app/app:app

# Build the Flutter Android app
bazel build //hajj_app_flutter/android/app:app

# Run tests
bazel test //...

# Clean build
bazel clean

# Build with specific configuration
bazel build --config=release //hajj_app/app:app

# Build with remote caching
bazel build --remote_cache=https://your-cache-server //...
```

## Troubleshooting

If you encounter issues during the Bazel migration:

1.  **Check Bazel Documentation**: Refer to the official Bazel documentation for Android and Kotlin rules.
2.  **Review BUILD Files**: Ensure that all dependencies and configurations in the BUILD files are correct.
3.  **Examine Error Messages**: Bazel provides detailed error messages that can help identify issues.
4.  **Consult Community Resources**: The Bazel community is active on GitHub and other forums.

## Conclusion

The Bazel migration is a significant undertaking that will provide long-term benefits in terms of build performance, reproducibility, and scalability. While there are challenges ahead, the foundational work has been completed, and the path forward is clear. With continued effort and attention to detail, the `hajj-app` project can successfully transition to Bazel as its primary build system.
