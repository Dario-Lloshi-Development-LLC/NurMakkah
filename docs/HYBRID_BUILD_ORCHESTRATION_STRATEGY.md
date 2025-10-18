# Hybrid Build Orchestration Strategy: Turborepo & Melos Migration Plan

## Overview

This document outlines the detailed strategy for migrating the `hajj-app` project to a hybrid build orchestration system, utilizing **Turborepo** as the primary monorepo orchestrator and **Melos** for Flutter-specific management. This approach aims to streamline the build process for both React Native and Flutter applications within the monorepo, providing a unified workflow and optimized performance without replacing the underlying native build systems (Gradle/Xcode).

## Phase 1: Monorepo Setup with Turborepo

### 1.1 Initialize Turborepo

1.  **Install Turborepo CLI**: If not already installed, install Turborepo globally:
    ```bash
    npm install -g turbo
    ```
2.  **Initialize Monorepo**: In the root of the `hajj-app` repository, initialize Turborepo. This will create a `turbo.json` file.
    ```bash
    turbo init
    ```
3.  **Configure `package.json`**: Update the root `package.json` to define workspaces for `hajj_app` (React Native) and `hajj_app_flutter` (Flutter).
    ```json
    {
      "name": "hajj-app-monorepo",
      "version": "1.0.0",
      "private": true,
      "workspaces": [
        "hajj_app",
        "hajj_app_flutter"
      ],
      "scripts": {
        "build": "turbo run build",
        "dev": "turbo run dev",
        "lint": "turbo run lint",
        "test": "turbo run test"
      },
      "devDependencies": {
        "turbo": "latest"
      }
    }
    ```

### 1.2 Define Turborepo Tasks

Configure `turbo.json` to define tasks for building, developing, linting, and testing projects within the monorepo. This will involve calling the existing `npm` scripts within the `hajj_app` (React Native) and `hajj_app_flutter` (Flutter) directories.

**Example `turbo.json` structure**:
```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**", "build/**", "android/app/build/**", "ios/build/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "test": {
      "dependsOn": ["^test"],
      "outputs": ["coverage/**"]
    }
  }
}
```

## Phase 2: React Native Integration (within Turborepo)

### 2.1 Update `hajj_app/package.json`

Ensure `hajj_app/package.json` contains standard React Native scripts for `build:android`, `build:ios`, `start`, `test`, and `lint`. Turborepo will then invoke these scripts.

**Example `hajj_app/package.json` scripts**:
```json
{
  "name": "hajj_app",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "android": "react-native run-android",
    "ios": "react-native run-ios",
    "start": "react-native start",
    "test": "jest",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "build:android": "react-native build-android --mode=release",
    "build:ios": "react-native build-ios --mode=release"
  },
  "dependencies": {
    "react": "18.2.0",
    "react-native": "0.72.6"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0",
    "@babel/preset-env": "^7.20.0",
    "@babel/runtime": "^7.20.0",
    "@react-native/eslint-config": "^0.72.2",
    "@react-native/babel-preset": "^0.72.6",
    "@react-native/metro-config": "^0.72.11",
    "@tsconfig/react-native": "^3.0.0",
    "@types/react": "^18.0.24",
    "@types/react-native": "^0.72.6",
    "babel-jest": "^29.2.1",
    "eslint": "^8.19.0",
    "jest": "^29.2.1",
    "prettier": "^2.4.1",
    "react-test-renderer": "18.2.0",
    "typescript": "5.1.6"
  }
}
```

### 2.2 Configure Turborepo for React Native

In `turbo.json`, ensure tasks like `build:android` and `build:ios` for `hajj_app` are properly defined to leverage caching and parallelization.

## Phase 3: Flutter Integration with Melos

### 3.1 Initialize Melos

1.  **Install Melos CLI**: If not already installed, install Melos globally:
    ```bash
    flutter pub global activate melos
    ```
2.  **Initialize Melos**: In the `hajj_app_flutter` directory, initialize Melos. This will create a `melos.yaml` file.
    ```bash
    cd hajj_app_flutter
    melos init
    ```
3.  **Configure `melos.yaml`**: Define packages and scripts within `melos.yaml` for Flutter-specific tasks.

**Example `melos.yaml` structure**:
```yaml
name: hajj_app_flutter
packages:
  - 'packages/*'
scripts:
  bootstrap:
    run: flutter pub get
    description: Get dependencies for all packages.
  test:
    run: flutter test --no-pub --coverage
    description: Run tests for all packages.
  build_android:
    run: flutter build apk --release
    description: Build Android release APK.
  build_ios:
    run: flutter build ios --release --no-codesign
    description: Build iOS release app (without codesigning).
```

### 3.2 Update `hajj_app_flutter/package.json` (for Turborepo Orchestration)

Add scripts to `hajj_app_flutter/package.json` that invoke Melos commands. This allows Turborepo to orchestrate Flutter builds via Melos.

**Example `hajj_app_flutter/package.json` scripts**:
```json
{
  "name": "hajj_app_flutter",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "melos:bootstrap": "melos run bootstrap",
    "melos:test": "melos run test",
    "melos:build_android": "melos run build_android",
    "melos:build_ios": "melos run build_ios"
  },
  "devDependencies": {
    "melos": "latest"
  }
}
```

### 3.3 Configure Turborepo for Flutter via Melos

In the root `turbo.json`, define tasks that call the Melos-invoking scripts in `hajj_app_flutter/package.json`.

**Example `turbo.json` update**:
```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**", "build/**", "android/app/build/**", "ios/build/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "test": {
      "dependsOn": ["^test"],
      "outputs": ["coverage/**"]
    },
    "melos:bootstrap": {
      "cache": false
    },
    "melos:build_android": {
      "dependsOn": ["melos:bootstrap"],
      "outputs": ["hajj_app_flutter/build/**"]
    },
    "melos:build_ios": {
      "dependsOn": ["melos:bootstrap"],
      "outputs": ["hajj_app_flutter/build/**"]
    }
  }
}
```

## Phase 4: CI/CD Integration

Update existing CI/CD pipelines (e.g., GitHub Actions) to use Turborepo commands for building, testing, and deploying both applications. This will simplify the pipeline configurations and leverage Turborepo's caching for faster CI builds.

**Example GitHub Actions step**:
```yaml
- name: Build All Projects with Turborepo
  run: npm install && turbo run build
```

## Phase 5: Documentation and Training

*   **Update Documentation**: Create comprehensive documentation for developers on how to use Turborepo and Melos to build, test, and run the applications.
*   **Team Training**: Conduct training sessions to familiarize the development team with the new monorepo workflow and tools.

## Conclusion

This hybrid build orchestration strategy provides a clear path to managing the `hajj-app` monorepo with both React Native and Flutter projects efficiently. By leveraging Turborepo for overall orchestration and React Native builds, and Melos for Flutter-specific tasks, the project can achieve optimized build performance, a unified developer experience, and simplified CI/CD, without the high complexity of a full Bazel migration. The next step is to implement these changes, starting with the Turborepo setup and then integrating each application.
