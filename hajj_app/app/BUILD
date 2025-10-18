load("@rules_android//android:rules.bzl", "android_binary", "android_library")
load("@io_bazel_rules_kotlin//kotlin:kotlin.bzl", "kt_android_library")

# Android library target for the app
android_library(
    name = "app_lib",
    srcs = glob([
        "src/main/java/**/*.java",
        "src/main/kotlin/**/*.kt",
    ]),
    manifest = "src/main/AndroidManifest.xml",
    resource_files = glob([
        "src/main/res/**/*",
    ]),
    deps = [
        # AndroidX dependencies
        "@maven//:androidx_appcompat_appcompat",
        "@maven//:androidx_core_core_ktx",
        "@maven//:androidx_constraintlayout_constraintlayout",
        "@maven//:com_google_android_material_material",
        
        # Maps
        "@maven//:org_osmdroid_osmdroid_android",
        
        # Performance & Memory Management
        "@maven//:androidx_multidex_multidex",
        
        # Architecture Components
        "@maven//:androidx_lifecycle_lifecycle_viewmodel",
        "@maven//:androidx_lifecycle_lifecycle_livedata",
        "@maven//:androidx_lifecycle_lifecycle_runtime",
        "@maven//:androidx_lifecycle_lifecycle_viewmodel_savedstate",
        
        # Room Database
        "@maven//:androidx_room_room_runtime",
        
        # Navigation Components
        "@maven//:androidx_navigation_navigation_fragment",
        "@maven//:androidx_navigation_navigation_ui",
        
        # Swipe Refresh Layout
        "@maven//:androidx_swiperefreshlayout_swiperefreshlayout",
        
        # Image Loading and Caching
        "@maven//:com_github_bumptech_glide_glide",
        
        # Dependency Injection
        "@maven//:com_google_dagger_hilt_android",
    ],
)

# Android binary target for the app
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
        ":app_lib",
    ],
    # Proguard configuration
    proguard_specs = ["proguard-rules.pro"],
    # Enable minification for release builds
    shrink_resources = True,
    # Enable multidex
    multidex = "native",
)

