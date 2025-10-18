'''
# Gradle to Bazel Migration Plan for Hajj-App

This document outlines a detailed plan for migrating the `hajj-app` project from Gradle to Bazel. This plan acknowledges the presence of both a React Native and a Flutter application within the repository and proposes a phased approach to manage the complexity.

## 1. Prerequisites and Setup

*   **Install Bazel**: Ensure Bazel is installed in the development and CI/CD environments.
*   **Create `WORKSPACE` file**: Initialize a Bazel workspace by creating a `WORKSPACE` file at the root of the repository. This file will define external dependencies and workspace-wide configurations.
*   **Configure `.bazelrc`**: Create a `.bazelrc` file to define common build flags and options for the project, such as Android SDK paths and other toolchain configurations.
*   **Add `.bazelignore`**: Create a `.bazelignore` file to exclude unnecessary files and directories from Bazel's view, such as `node_modules`, build outputs, and IDE-specific files.

## 2. Phased Migration Strategy

Given the dual-framework nature of the project, a phased migration is recommended. We will start with the React Native application, as it has a more mature set of community-driven Bazel rules.

### Phase 1: Migrate the React Native Application

1.  **Integrate `rules_nodejs`**: Configure `rules_nodejs` in the `WORKSPACE` file to manage Node.js dependencies (from `package.json`) within Bazel.
2.  **Create `BUILD` files for JavaScript/TypeScript sources**: Write `BUILD` files for the React Native JavaScript/TypeScript source code, defining `ts_library` or `js_library` targets. This will allow Bazel to manage the bundling of the JavaScript code.
3.  **Integrate `rules_android`**: Configure `rules_android` in the `WORKSPACE` file to define the Android toolchain (SDK, NDK).
4.  **Create `BUILD` file for the Android app**: Write a `BUILD` file for the Android part of the React Native application (`/hajj-app/hajj_app/app`). This will involve:
    *   Defining an `android_library` target for the native Android source code.
    *   Defining an `android_binary` target to build the final `.apk` or `.aab` file.
    *   Translating dependencies from `build.gradle` to Bazel's dependency format (e.g., `maven_jar`, `aar_import`).
    *   Configuring the `AndroidManifest.xml` and resource files.
5.  **Integrate React Native with Bazel**: This is the most complex step. It involves creating custom Bazel rules or using community-provided rules to:
    *   Invoke the React Native CLI to bundle the JavaScript code.
    *   Package the bundled JavaScript and assets into the Android application.
    *   Handle native module linking within the Bazel build process.
6.  **Test the React Native Android build**: Iteratively build and test the React Native application using Bazel until it achieves functional parity with the Gradle build.

### Phase 2: Migrate the Flutter Application

1.  **Integrate `rules_flutter` (or equivalent)**: Research and integrate community-driven Bazel rules for Flutter, such as `rules_flutter` or `tulsi`. These rules are generally less mature than their React Native counterparts, so this may require more custom development.
2.  **Create `BUILD` files for Dart sources**: Write `BUILD` files for the Flutter Dart source code, defining `dart_library` targets.
3.  **Create `BUILD` file for the Flutter Android app**: Write a `BUILD` file for the Android part of the Flutter application (`/hajj-app/hajj_app_flutter/android/app`). This will be similar to the React Native Android app but will use Flutter-specific rules to integrate the Dart code and Flutter engine.
4.  **Test the Flutter Android build**: Build and test the Flutter application using Bazel until it functions correctly.

### Phase 3: iOS Migration (Future Phase)

Migrating the iOS builds for both React Native and Flutter would follow a similar pattern, but using `rules_apple` and `rules_ios` for Bazel. This would involve creating `BUILD` files for the iOS native code, managing CocoaPods dependencies, and configuring Xcode projects through Bazel.

## 3. Testing and Validation

*   **Unit and Integration Tests**: Ensure that all existing unit and integration tests can be run using Bazel's `test` command.
*   **End-to-End (E2E) Testing**: Perform thorough E2E testing on the applications built with Bazel to ensure all features work as expected.
*   **Build Performance Benchmarking**: Compare build times (clean and incremental) between the Gradle and Bazel builds to validate the performance improvements.

## 4. CI/CD Integration

*   **Update CI/CD Pipelines**: Modify the CI/CD pipelines to use Bazel for building, testing, and deploying the applications.
*   **Leverage Remote Caching**: Configure Bazel to use a remote cache (e.g., a shared server or a cloud storage bucket) to speed up CI/CD builds by sharing build artifacts across different runs and developers.

## 5. Documentation and Training

*   **Document the New Build Process**: Create comprehensive documentation for developers on how to build, test, and run the applications using Bazel.
*   **Team Training**: Conduct training sessions to familiarize the development team with Bazel's concepts, commands, and workflows.

## Conclusion

This migration is a major engineering effort that will require significant time and expertise. The phased approach helps to mitigate risk and allows the team to gain experience with Bazel incrementally. The long-term benefits of a successful migration include faster builds, improved reliability, and better scalability for the `hajj-app` project.
'''
