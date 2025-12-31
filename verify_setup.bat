@echo off
echo ========================================
echo Nur Makkah - Setup Verification
echo ========================================
echo.

REM Check Flutter installation
echo [1/4] Checking Flutter installation...
flutter --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Flutter is installed
    flutter --version
) else (
    echo ❌ Flutter is not installed or not in PATH
    echo Please install Flutter from https://flutter.dev/docs/get-started/install
)
echo.

REM Check Android SDK
echo [2/4] Checking Android SDK...
flutter doctor >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Android SDK configuration looks good
    flutter doctor
) else (
    echo ❌ Android SDK issues detected
    echo Please run 'flutter doctor' for details
)
echo.

REM Check project dependencies
echo [3/4] Checking project dependencies...
cd hajj_app_flutter
flutter pub get >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Dependencies are up to date
) else (
    echo ❌ Dependency issues detected
    echo Please run 'flutter pub get' manually
)
echo.

REM Check project structure
echo [4/4] Checking project structure...
if exist "lib\main.dart" (
    echo ✅ Main app file exists
) else (
    echo ❌ Main app file missing
)

if exist "pubspec.yaml" (
    echo ✅ Project configuration exists
) else (
    echo ❌ Project configuration missing
)

if exist "android\app\src\main\AndroidManifest.xml" (
    echo ✅ Android manifest exists
) else (
    echo ❌ Android manifest missing
)

echo.
echo ========================================
echo Verification complete!
echo ========================================
echo.
echo If all checks passed, you can now build the APK using:
echo   build_apk.bat
echo.
echo Or manually with:
echo   flutter build apk --release
echo.
pause
