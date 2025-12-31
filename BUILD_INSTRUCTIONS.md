# Nur Makkah - Build Instructions

## Prerequisites

### 1. Install Flutter
1. Download Flutter SDK from: https://flutter.dev/docs/get-started/install
2. Extract to a folder (e.g., `C:\flutter`)
3. Add Flutter to your PATH:
   - Add `C:\flutter\bin` to your system PATH
   - Restart your command prompt/terminal

### 2. Install Android Studio
1. Download and install Android Studio from: https://developer.android.com/studio
2. During installation, make sure to install:
   - Android SDK
   - Android SDK Platform-Tools
   - Android SDK Build-Tools

### 3. Configure Android SDK
1. Open Android Studio
2. Go to File → Settings → Appearance & Behavior → System Settings → Android SDK
3. Install the following:
   - Android 13 (API level 33) or higher
   - Android SDK Build-Tools 33.0.0 or higher
   - Android SDK Platform-Tools

## Build Process

### Option 1: Using the Build Script (Recommended)
1. Double-click `build_apk.bat`
2. The script will automatically:
   - Check Flutter installation
   - Get dependencies
   - Build the release APK

### Option 2: Manual Build
1. Open Command Prompt or PowerShell
2. Navigate to the project directory:
   ```bash
   cd hajj_app_flutter
   ```
3. Get Flutter dependencies:
   ```bash
   flutter pub get
   ```
4. Build the release APK:
   ```bash
   flutter build apk --release
   ```

## APK Output
- **Location**: `hajj_app_flutter\build\app\outputs\flutter-apk\app-release.apk`
- **Size**: Approximately 25-30 MB
- **Target**: Android 5.0 (API level 21) and above

## App Features
The built APK includes all the enhanced features:

### 🌍 Multi-Language Support
- English, Arabic, Urdu, Turkish, French, Spanish
- RTL support for Arabic and Urdu
- Persistent language preferences

### 🧭 Qibla Finder
- GPS-based compass
- Accurate direction to Kaaba
- Distance calculation
- Beautiful animations

### 🕌 Prayer Times
- Accurate prayer time calculations
- Next prayer countdown
- Location-based times

### ⭐ Favorites System
- Save favorite rules
- Quick access to saved content
- Persistent storage

### ⚙️ Settings
- Language selection
- Theme switching (Light/Dark/System)
- App preferences

### 🗺️ Enhanced Navigation
- 8-tab navigation system
- Quick access cards
- Improved user experience

## Troubleshooting

### Flutter Command Not Found
- Ensure Flutter is installed and added to PATH
- Restart your terminal/command prompt
- Run `flutter doctor` to check installation

### Android SDK Issues
- Install Android Studio
- Configure Android SDK paths
- Accept Android SDK licenses: `flutter doctor --android-licenses`

### Build Errors
- Ensure all dependencies are installed: `flutter pub get`
- Clean build cache: `flutter clean`
- Check Flutter version compatibility

### Permission Issues
- Run Command Prompt as Administrator
- Check antivirus software settings
- Ensure sufficient disk space

## Testing the APK
1. Install the APK on an Android device
2. Grant location permissions when prompted
3. Test all features:
   - Language switching
   - Qibla finder
   - Prayer times
   - Favorites system
   - Settings

## Support
If you encounter any issues during the build process, please check:
1. Flutter installation: `flutter doctor`
2. Android SDK configuration
3. Dependencies: `flutter pub get`
4. Build logs for specific error messages

The app is now ready for distribution and use by Nur Makkah pilgrims worldwide! 🕌
