load("@rules_android//android:rules.bzl", "android_binary", "android_library")
load("@io_bazel_rules_kotlin//kotlin:kotlin.bzl", "kt_android_library")

# Android library target for the Flutter app
android_library(
    name = "flutter_app_lib",
    srcs = glob([
        "src/main/java/**/*.java",
        "src/main/kotlin/**/*.kt",
    ]),
    manifest = "src/main/AndroidManifest.xml",
    resource_files = glob([
        "src/main/res/**/*",
    ]),
    deps = [
        # Kotlin stdlib
        "@maven//:org_jetbrains_kotlin_kotlin_stdlib_jdk7",
        
        # Multidex
        "@maven//:androidx_multidex_multidex",
    ],
)

# Android binary target for the Flutter app
android_binary(
    name = "app",
    srcs = glob([
        "src/main/java/**/*.java",
        "src/main/kotlin/**/*.kt",
    ]),
    manifest = "src/main/AndroidManifest.xml",
    resource_files = glob([
        "src/main/res/**/*",
    ]),
    deps = [
        ":flutter_app_lib",
    ],
    # Enable multidex
    multidex = "native",
    # Minification for release builds
    shrink_resources = True,
)

