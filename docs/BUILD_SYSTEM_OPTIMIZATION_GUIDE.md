# Build System Optimization and Migration Guide

## Overview

This guide provides a comprehensive overview of the optimizations applied to the `nur_makkah-app` project's build system, as well as guidance on potential migration to Bazel for improved performance and scalability.

## Part 1: Gradle Build Optimizations

The `nur_makkah-app` project has been optimized to leverage Gradle's built-in performance features. The following optimizations have been implemented:

### 1.1 Gradle Properties Optimization

The `gradle.properties` file has been enhanced with the following configurations:

*   **Parallel Execution**: `org.gradle.parallel=true` enables Gradle to build multiple projects in parallel, significantly reducing overall build time for multi-module projects.
*   **Build Caching**: `org.gradle.caching=true` enables Gradle's build cache, which reuses outputs from previous builds, speeding up incremental builds.
*   **Worker Threads**: `org.gradle.workers.max=8` configures Gradle to use up to 8 worker threads, matching typical CPU core counts for optimal parallelization.
*   **Daemon Mode**: `org.gradle.daemon=true` keeps the Gradle daemon running between builds, avoiding the overhead of starting a new JVM for each build.
*   **JVM Memory**: `org.gradle.jvmargs=-Xmx4096m` allocates 4GB of heap memory to the Gradle daemon, preventing out-of-memory errors during large builds.
*   **Configuration on Demand**: `org.gradle.configureondemand=true` configures only the necessary projects, reducing configuration time.

### 1.2 Android Build Optimization

The Android build configurations in both the React Native and Flutter applications have been optimized:

*   **Build Features**: Unused build features (AIDL, RenderScript, resValues, shaders) have been disabled to reduce build time.
*   **Build Types**: Debug and release build types have been explicitly configured with appropriate settings (e.g., minification only for release builds).
*   **Packaging Options**: Conflict resolution for META-INF files has been improved to prevent packaging conflicts.

### 1.3 Kotlin Compilation Optimization

Kotlin incremental compilation has been enabled to speed up Kotlin compilation:

*   `kotlin.incremental=true`
*   `kotlin.incremental.js=true`
*   `kotlin.incremental.multiplatform=true`

### 1.4 Resource Processing Optimization

*   **Parallel Lint**: `android.lintParallel=true` enables parallel processing of lint checks.
*   **Resource Optimization**: `android.enableResourceOptimizations=true` enables resource optimization during the build process.

## Part 2: Build-System Options

This project uses Gradle for Android builds. References to a Bazel migration were removed during the modernization: Bazel is not used in the current build flow. If your team later chooses to explore Bazel, create a separate migration plan and test it in an isolated branch — do not keep live `.bazelrc` or Bazel build instructions in the main documentation unless Bazel is actively maintained.

## Part 3: Recommended Build Commands

### Using Gradle

```bash
# Clean build
./gradlew clean build

# Build with optimizations enabled
./gradlew build --build-cache --parallel

# Build specific module
./gradlew :nur_makkah:app:build

# Run linting
./gradlew lint

# Run tests
./gradlew test
```

### Bazel (removed)

References to Bazel and example Bazel commands have been removed from the active documentation; Bazel is not used in the project's current build flow.

## Part 4: Performance Monitoring

To monitor build performance and identify bottlenecks:

### Gradle Profiling

```bash
# Generate a build profile
./gradlew build --profile

# View the profile in a browser
open build/reports/profile/profile-{timestamp}.html
```

### Bazel Profiling (removed)

Bazel profiling examples removed.

## Conclusion

The optimizations applied to the Gradle build system should provide noticeable improvements in build times and consistency. If further performance improvements are needed, or if the project grows significantly in complexity, migrating to Bazel is a viable long-term strategy. The decision should be made based on the specific needs and constraints of your project and team.
