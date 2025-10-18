# Bazel Migration Roadmap and Next Steps

## Executive Summary

The `hajj-app` project has successfully initiated a migration from Gradle to Bazel as its primary build system. Phase 1 of the migration has been completed, establishing the foundational Bazel configuration files and infrastructure. This document outlines the roadmap for completing the migration and provides detailed next steps for the development team.

## Completed Work (Phase 1)

### Infrastructure Setup

*   **Bazel Installation**: Bazel 8.4.2 has been installed in the development environment.
*   **WORKSPACE Configuration**: A comprehensive WORKSPACE file has been created with support for:
    *   Android SDK and NDK repositories
    *   Kotlin compilation rules
    *   Maven dependency management via `rules_jvm_external`
    *   Node.js rules for React Native
    *   Apple rules for future iOS support
*   **BUILD Files**: Initial BUILD files have been created for both React Native and Flutter Android applications.
*   **Configuration Files**: `.bazelrc` and `.bazelignore` files have been configured for optimal performance and workspace management.
*   **Documentation**: Comprehensive implementation guides have been created to support the migration effort.

## Remaining Work

### Phase 2: React Native Android Integration (High Priority)

The React Native Android application requires the following work to be fully integrated with Bazel:

#### 2.1 Custom Bazel Rules for React Native

**Objective**: Create Bazel rules that can invoke the React Native CLI and bundle JavaScript code.

**Tasks**:
1.  Create a new file `react_native.bzl` in the root of the project to define custom Bazel rules for React Native.
2.  Implement a `react_native_bundle` rule that:
    *   Invokes the React Native CLI to bundle JavaScript code.
    *   Manages dependencies from `package.json`.
    *   Outputs bundled JavaScript and source maps.
3.  Implement a `react_native_android_app` rule that:
    *   Combines the bundled JavaScript with native Android code.
    *   Handles asset bundling and resource management.
    *   Produces a final APK or AAB.

**Example Structure**:
```python
# react_native.bzl
def react_native_bundle(name, package_json, entry_point, deps=[], **kwargs):
    # Implementation to bundle React Native JavaScript
    pass

def react_native_android_app(name, android_app, bundle, **kwargs):
    # Implementation to create Android app with bundled JavaScript
    pass
```

#### 2.2 Native Module Integration

**Objective**: Ensure that native modules used by React Native are properly linked and included in the final APK.

**Tasks**:
1.  Identify all native modules used in the React Native application (e.g., react-native-vector-icons, react-native-maps, etc.).
2.  Create Bazel rules or configurations for each native module to ensure they are properly compiled and linked.
3.  Update the BUILD file for the React Native app to include these native module dependencies.

#### 2.3 Testing and Validation

**Objective**: Verify that the React Native application can be successfully built using Bazel.

**Tasks**:
1.  Attempt to build the React Native Android app using Bazel: `bazel build //hajj_app/app:app`.
2.  Resolve any build errors or warnings that arise.
3.  Test the resulting APK on an Android device or emulator to ensure functionality.
4.  Compare build times and performance with the Gradle build.

### Phase 3: Flutter Android Integration (High Priority)

The Flutter Android application requires similar work to be fully integrated with Bazel:

#### 3.1 Custom Bazel Rules for Flutter

**Objective**: Create Bazel rules that can invoke the Flutter build system and compile Dart code.

**Tasks**:
1.  Research and evaluate existing Bazel rules for Flutter (e.g., `rules_flutter`, `tulsi`).
2.  Create a new file `flutter.bzl` to define custom Bazel rules for Flutter.
3.  Implement a `flutter_android_app` rule that:
    *   Invokes the Flutter build system to compile Dart code.
    *   Manages Flutter dependencies from `pubspec.yaml`.
    *   Integrates the Flutter engine with native Android code.
    *   Produces a final APK or AAB.

#### 3.2 Dart Compilation Integration

**Objective**: Ensure that Dart code is properly compiled and integrated with the Android build.

**Tasks**:
1.  Configure Bazel to invoke the Dart compiler for the Flutter application.
2.  Manage Dart package dependencies through Bazel.
3.  Ensure that the Flutter engine and native dependencies are properly linked.

#### 3.3 Testing and Validation

**Objective**: Verify that the Flutter application can be successfully built using Bazel.

**Tasks**:
1.  Attempt to build the Flutter Android app using Bazel: `bazel build //hajj_app_flutter/android/app:app`.
2.  Resolve any build errors or warnings that arise.
3.  Test the resulting APK on an Android device or emulator to ensure functionality.
4.  Compare build times and performance with the Gradle build.

### Phase 4: iOS Integration (Medium Priority)

Once the Android builds are working, iOS builds can be migrated using `rules_apple`:

#### 4.1 React Native iOS

*   Create Bazel rules for React Native iOS builds.
*   Integrate the React Native CLI with Bazel for iOS.
*   Manage CocoaPods dependencies through Bazel.

#### 4.2 Flutter iOS

*   Create Bazel rules for Flutter iOS builds.
*   Integrate the Flutter build system with Bazel for iOS.
*   Manage Swift/Objective-C code compilation.

### Phase 5: CI/CD Integration (Medium Priority)

Update your CI/CD pipelines to use Bazel for building and testing:

#### 5.1 GitHub Actions Integration

*   Update GitHub Actions workflows to use Bazel commands instead of Gradle/Flutter.
*   Configure remote caching for faster CI/CD builds.
*   Set up build artifact storage and distribution.

#### 5.2 Local Development Workflow

*   Create scripts and documentation for developers to build using Bazel.
*   Set up IDE integration (Android Studio, VS Code) for Bazel builds.
*   Create developer-friendly build commands and aliases.

### Phase 6: Documentation and Training (Low Priority)

*   Create comprehensive documentation on using Bazel for this project.
*   Conduct training sessions for the development team.
*   Create troubleshooting guides and FAQs.

## Detailed Next Steps

### Immediate Actions (Week 1-2)

1.  **Review Bazel Documentation**: Familiarize yourself with Bazel's Android and Kotlin rules.
   *   [Bazel Android Rules](https://bazel.build/reference/be/android)
   *   [Bazel Kotlin Rules](https://github.com/bazelbuild/rules_kotlin)

2.  **Analyze React Native Build Process**: Understand how React Native bundles JavaScript code and integrates with Android.
   *   Review the React Native CLI documentation.
   *   Examine the existing Gradle build configuration.

3.  **Create Custom React Native Rules**: Implement the `react_native.bzl` file with basic rules for bundling JavaScript.

4.  **Test Initial Build**: Attempt to build the React Native app with Bazel and document any issues.

### Short-term Actions (Week 3-4)

1.  **Resolve React Native Build Issues**: Fix any errors encountered during the initial build attempt.

2.  **Integrate Native Modules**: Add support for native modules in the Bazel build.

3.  **Performance Analysis**: Compare build times between Gradle and Bazel.

4.  **Document Findings**: Create a summary of challenges encountered and solutions implemented.

### Medium-term Actions (Month 2)

1.  **Flutter Integration**: Repeat the process for the Flutter application.

2.  **iOS Integration**: Begin work on iOS builds if needed.

3.  **CI/CD Updates**: Update CI/CD pipelines to use Bazel.

### Long-term Actions (Month 3+)

1.  **Full Migration**: Complete the migration of all build processes to Bazel.

2.  **Team Training**: Conduct comprehensive training for the development team.

3.  **Optimization**: Fine-tune Bazel configurations for optimal performance.

4.  **Deprecation**: Gradually deprecate Gradle configuration files once Bazel is fully functional.

## Resources and References

### Official Documentation

*   [Bazel Official Documentation](https://bazel.build/)
*   [Bazel Android Rules](https://bazel.build/reference/be/android)
*   [Bazel Kotlin Rules](https://github.com/bazelbuild/rules_kotlin)
*   [Bazel Apple Rules](https://github.com/bazelbuild/rules_apple)

### Community Resources

*   [Bazel GitHub Issues](https://github.com/bazelbuild/bazel/issues)
*   [Bazel Slack Community](https://bazel-slack.herokuapp.com/)
*   [Stack Overflow - Bazel Tag](https://stackoverflow.com/questions/tagged/bazel)

### React Native and Flutter Resources

*   [React Native Official Documentation](https://reactnative.dev/)
*   [Flutter Official Documentation](https://flutter.dev/)
*   [React Native Android Build Documentation](https://reactnative.dev/docs/android-native-modules-android)
*   [Flutter Android Build Documentation](https://flutter.dev/docs/deployment/android)

## Success Criteria

The Bazel migration will be considered successful when:

1.  Both React Native and Flutter applications can be built using Bazel without errors.
2.  Build times are comparable to or faster than Gradle builds.
3.  All features and functionality of the applications work correctly.
4.  CI/CD pipelines are updated and functioning with Bazel.
5.  Development team is trained and comfortable using Bazel for daily development.
6.  Documentation is comprehensive and accessible to all team members.

## Risk Mitigation

### Identified Risks

1.  **Complexity of React Native Integration**: React Native's tight coupling with Gradle may make Bazel integration challenging.
2.  **Limited Bazel Ecosystem for Mobile**: The Bazel ecosystem for React Native and Flutter is less mature than for Java/Kotlin projects.
3.  **Team Learning Curve**: The development team may require significant time to become proficient with Bazel.
4.  **Build Reproducibility Issues**: Ensuring hermetic builds with native modules can be complex.

### Mitigation Strategies

1.  **Phased Approach**: Migrate incrementally, starting with Android and moving to iOS.
2.  **Community Engagement**: Leverage the Bazel community for support and best practices.
3.  **Comprehensive Documentation**: Create detailed guides and examples for the team.
4.  **Fallback Plan**: Maintain Gradle configuration as a fallback during the migration.
5.  **Regular Testing**: Continuously test builds and validate functionality.

## Conclusion

The Bazel migration is a significant undertaking that will provide long-term benefits in terms of build performance, reproducibility, and scalability. With careful planning, phased implementation, and comprehensive documentation, the `hajj-app` project can successfully transition to Bazel as its primary build system. The roadmap outlined in this document provides a clear path forward, with realistic timelines and success criteria.
