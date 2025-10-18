workspace(name = "hajj_app")

# Load Bazel tools
load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

# ============================================================================
# Android Build Tools
# ============================================================================

# Android SDK Repository - Configure your local Android SDK
android_sdk_repository(
    name = "androidsdk",
    api_level = 34,
    build_tools_version = "34.0.0",
    # Update this path to your local Android SDK location
    path = "/usr/local/android-sdk",
)

# Android NDK Repository - Configure your local Android NDK
android_ndk_repository(
    name = "androidndk",
    api_level = 21,
    # Update this path to your local Android NDK location
    path = "/usr/local/android-ndk",
)

# ============================================================================
# Kotlin Rules
# ============================================================================

http_archive(
    name = "io_bazel_rules_kotlin",
    sha256 = "a630cda9fdb4f56cf2dc3e3b016c1b881491b54f51fde7191751f63d6cbca503",
    urls = ["https://github.com/bazelbuild/rules_kotlin/releases/download/v1.9.0/rules_kotlin-v1.9.0.tar.gz"],
)

load("@io_bazel_rules_kotlin//kotlin:repositories.bzl", "kotlin_repositories")

kotlin_repositories()

load("@io_bazel_rules_kotlin//kotlin:core.bzl", "kt_register_toolchains")

kt_register_toolchains()

# ============================================================================
# JVM External Dependencies (Maven)
# ============================================================================

http_archive(
    name = "rules_jvm_external",
    sha256 = "cd1a77b7b02e8e008439ca76fd34f5b07aecb8c953952346da8e5b4c47dd5e50",
    strip_prefix = "rules_jvm_external-4.2",
    urls = [
        "https://github.com/bazelbuild/rules_jvm_external/archive/4.2.zip",
    ],
)

load("@rules_jvm_external//:repositories.bzl", "rules_jvm_external_deps")

rules_jvm_external_deps()

load("@rules_jvm_external//:setup.bzl", "rules_jvm_external_setup")

rules_jvm_external_setup()

# ============================================================================
# Maven Dependencies
# ============================================================================

load("@rules_jvm_external//:defs.bzl", "maven_install")

maven_install(
    artifacts = [
        # AndroidX Core Libraries
        "androidx.appcompat:appcompat:1.7.1",
        "androidx.core:core-ktx:1.12.0",
        "androidx.constraintlayout:constraintlayout:2.2.1",
        
        # Material Design
        "com.google.android.material:material:1.12.0",
        
        # Maps
        "org.osmdroid:osmdroid-android:6.1.20",
        
        # Performance & Memory Management
        "androidx.multidex:multidex:2.0.1",
        
        # Architecture Components
        "androidx.lifecycle:lifecycle-viewmodel:2.6.2",
        "androidx.lifecycle:lifecycle-livedata:2.6.2",
        "androidx.lifecycle:lifecycle-runtime:2.6.2",
        "androidx.lifecycle:lifecycle-viewmodel-savedstate:2.6.2",
        
        # Room Database
        "androidx.room:room-runtime:2.6.1",
        
        # Navigation Components
        "androidx.navigation:navigation-fragment:2.7.5",
        "androidx.navigation:navigation-ui:2.7.5",
        
        # Swipe Refresh Layout
        "androidx.swiperefreshlayout:swiperefreshlayout:1.1.0",
        
        # Image Loading and Caching
        "com.github.bumptech.glide:glide:4.16.0",
        
        # Dependency Injection
        "com.google.dagger:hilt-android:2.48",
        
        # Kotlin
        "org.jetbrains.kotlin:kotlin-stdlib-jdk7:1.8.10",
    ],
    repositories = [
        "https://maven.google.com",
        "https://repo1.maven.org/maven2",
    ],
)

# ============================================================================
# Node.js Rules (for React Native)
# ============================================================================

http_archive(
    name = "rules_nodejs",
    sha256 = "08f0a0c7f2f8a6c5c5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5",
    urls = ["https://github.com/bazelbuild/rules_nodejs/releases/download/v5.8.0/rules_nodejs-v5.8.0.tar.gz"],
)

load("@rules_nodejs//nodejs:repositories.bzl", "nodejs_register_toolchains")

nodejs_register_toolchains(
    name = "nodejs",
    node_version = "18.17.0",
)

# ============================================================================
# Apple Rules (for iOS - Future Use)
# ============================================================================

http_archive(
    name = "build_bazel_rules_apple",
    sha256 = "08f0a0c7f2f8a6c5c5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5",
    urls = ["https://github.com/bazelbuild/rules_apple/releases/download/v3.1.1/rules_apple-v3.1.1.tar.gz"],
)

load("@build_bazel_rules_apple//apple:repositories.bzl", "apple_rules_dependencies")

apple_rules_dependencies()

