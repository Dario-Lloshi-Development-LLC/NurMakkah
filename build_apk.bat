@echo off
echo Building Hajj Rules APK...
echo.

REM Check if Flutter is installed
flutter --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Flutter is not installed or not in PATH.
    echo Please install Flutter from https://flutter.dev/docs/get-started/install
    echo and add it to your PATH environment variable.
    pause
    exit /b 1
)

REM Navigate to Flutter project directory
cd hajj_app_flutter

REM Get dependencies
echo Getting Flutter dependencies...
flutter pub get

REM Build APK
echo Building release APK...
flutter build apk --release

if %errorlevel% equ 0 (
    echo.
    echo ✅ APK built successfully!
    echo APK location: hajj_app_flutter\build\app\outputs\flutter-apk\app-release.apk
) else (
    echo.
    echo ❌ APK build failed!
    echo Please check the error messages above.
)

pause
