# Build System Optimization and Migration Guide

## Overview

This guide provides a comprehensive overview of the optimizations applied to the `hajj-app` project's build system, as well as guidance on potential migration to Bazel for improved performance and scalability.

## Part 1: Gradle Build Optimizations

The `hajj-app` project has been optimized to leverage Gradle's built-in performance features. The following optimizations have been implemented:

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

## Part 2: Bazel Migration (Optional)

For projects that require even greater performance improvements, especially in large monorepos or with complex build graphs, migrating to Bazel is a viable option. A `.bazelrc` configuration file has been created as a starting point for this migration.

### 2.1 When to Consider Bazel Migration

Consider migrating to Bazel if:

*   Your project has multiple interdependent modules with complex build dependencies.
*   Build times are a significant bottleneck in your development workflow.
*   You require hermetic builds for maximum reproducibility.
*   You plan to scale the project significantly in the future.
*   Your team has the resources to invest in learning Bazel and adapting existing build configurations.

### 2.2 Bazel Advantages

*   **Performance**: Bazel can offer 5-10x faster builds for large projects compared to Gradle, especially with remote caching.
*   **Hermeticity**: Bazel ensures builds are hermetic, producing identical outputs regardless of the environment.
*   **Scalability**: Bazel is designed for large, complex monorepos with thousands of targets.
*   **Multi-language Support**: Bazel supports multiple programming languages and build systems out of the box.

### 2.3 Bazel Challenges

*   **Learning Curve**: Bazel has a steep learning curve and requires understanding of its build philosophy.
*   **Ecosystem Maturity**: While improving, the ecosystem for React Native and Flutter on Bazel is less mature than for Gradle.
*   **Migration Effort**: Migrating an existing Gradle project to Bazel is a significant undertaking requiring substantial development time.
*   **Tooling Integration**: IDEs and CI/CD tools may require reconfiguration for Bazel.

### 2.4 Migration Strategy

If you decide to migrate to Bazel, follow the phased approach outlined in `bazel_migration_plan.md`:

1.  **Phase 1**: Migrate the React Native application to Bazel.
2.  **Phase 2**: Migrate the Flutter application to Bazel.
3.  **Phase 3**: Migrate iOS builds to Bazel (future phase).

## Part 3: Recommended Build Commands

### Using Gradle

```bash
# Clean build
./gradlew clean build

# Build with optimizations enabled
./gradlew build --build-cache --parallel

# Build specific module
./gradlew :hajj_app:app:build

# Run linting
./gradlew lint

# Run tests
./gradlew test
```

### Using Bazel (if migrated)

```bash
# Build the React Native Android app
bazel build //hajj_app/android:app

# Build the Flutter Android app
bazel build //hajj_app_flutter/android:app

# Run tests
bazel test //...

# Build with remote caching
bazel build --remote_cache=https://your-cache-server //...
```

## Part 4: Performance Monitoring

To monitor build performance and identify bottlenecks:

### Gradle Profiling

```bash
# Generate a build profile
./gradlew build --profile

# View the profile in a browser
open build/reports/profile/profile-{timestamp}.html
```

### Bazel Profiling

```bash
# Generate a build profile
bazel build --profile=profile.json //...

# Analyze the profile
bazel analyze-profile profile.json
```

## Conclusion

The optimizations applied to the Gradle build system should provide noticeable improvements in build times and consistency. If further performance improvements are needed, or if the project grows significantly in complexity, migrating to Bazel is a viable long-term strategy. The decision should be made based on the specific needs and constraints of your project and team.
