# Recommended Build Framework for Nur Makkah-App (React Native & Flutter Monorepo)

## Executive Summary

After evaluating various build system alternatives to Gradle for the `nur_makkah-app` project, which comprises both React Native and Flutter applications within a monorepo, the recommended approach is a **Hybrid Build Orchestration Strategy**. This strategy leverages specialized tools for each framework while providing a unified management layer, offering the best balance of efficiency, maintainability, and reduced complexity compared to a full build system replacement like Bazel.

## Rationale for the Hybrid Approach

Directly replacing Gradle (for Android) and Xcode (for iOS) with a single, simpler build system for both React Native and Flutter is not feasible. Both frameworks are deeply integrated with their respective native build toolchains. Any alternative would need to replicate this complex logic, leading to a tool as complex as, or more complex than, Bazel.

Instead, a build orchestration approach allows for a unified interface to manage and coordinate builds for multiple projects without replacing the underlying native build systems. This approach offers:

*   **Unified CLI**: A single command to trigger builds for both applications.
*   **Simplified CI/CD**: Streamlined CI/CD pipelines.
*   **Centralized Build Logic**: Common build logic managed from a single point.

## Recommended Tools

### 1. Primary Monorepo Orchestrator: Turborepo (or Nx)

**Tool**: [Turborepo](https://turbo.build/repo) (or [Nx](https://nx.dev/))

**Purpose**: To manage the overall monorepo structure, optimize builds for JavaScript/TypeScript projects (React Native), and orchestrate the invocation of Flutter builds.

**Why**: These tools excel in JavaScript/TypeScript monorepos by providing:
*   **High-Performance Caching**: Reuses outputs from previous builds to speed up incremental builds.
*   **Parallel Execution**: Runs tasks in parallel across different projects within the monorepo.
*   **Dependency Graph Awareness**: Understands project dependencies to execute tasks in the correct order and only rebuild what's necessary.
*   **Unified Task Runner**: Provides a single command to run scripts across all projects.

### 2. Flutter-Specific Management: Melos

**Tool**: [Melos](https://melos.invertase.dev/)

**Purpose**: To specifically manage Dart and Flutter packages, run tests, and execute Flutter-specific build commands within the Flutter project directory.

**Why**: Melos is tailor-made for Flutter monorepos, simplifying:
*   **Package Management**: Handles linking and managing local Flutter packages.
*   **Script Execution**: Runs scripts efficiently across multiple Flutter packages.
*   **Dependency Management**: Streamlines Dart package dependencies.

## Implementation Strategy

1.  **Initialize Monorepo with Turborepo (or Nx)**: Set up the root of the `nur_makkah-app` repository as a monorepo managed by Turborepo. This will involve creating a `turbo.json` (for Turborepo) or `workspace.json` (for Nx) configuration file.

2.  **Integrate React Native**: Configure Turborepo to manage the React Native application. This will involve defining tasks for installing dependencies, running development servers, and building Android/iOS artifacts by invoking the React Native CLI and underlying Gradle/Xcode commands.

3.  **Integrate Flutter with Melos**: Within the `hajj_app_flutter` directory, initialize Melos to manage the Flutter project. Define Melos scripts for Flutter-specific tasks (e.g., `flutter build apk`, `flutter build ios`, `flutter test`).

4.  **Orchestrate Flutter from Turborepo**: Configure Turborepo to call the Melos commands for Flutter builds. This creates a unified entry point for all builds.

5.  **CI/CD Integration**: Update CI/CD pipelines to use Turborepo commands for building, testing, and deploying both applications.

## Benefits of this Approach

*   **Reduced Complexity**: Avoids the steep learning curve and extensive custom rule development required for a full Bazel migration.
*   **Optimized Performance**: Leverages caching and parallel execution for faster builds across the monorepo.
*   **Unified Workflow**: Provides a single entry point for managing builds for both React Native and Flutter.
*   **Maintainability**: Each framework is managed by a tool specifically designed for its ecosystem.
*   **Scalability**: Well-suited for monorepos, allowing the project to grow with ease.

## Conclusion

The Hybrid Build Orchestration Strategy, utilizing **Turborepo (or Nx) as the monorepo orchestrator and Melos for Flutter-specific management**, is the most optimal and pragmatic solution for the `nur_makkah-app` project. This approach balances performance benefits with ease of integration and maintainability, providing a robust and efficient build system for your cross-platform mobile applications.
