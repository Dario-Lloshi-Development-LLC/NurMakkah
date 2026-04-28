# 🕌 Nur Makkah (Flutter Edition)

Nur Makkah is now fully migrated to **Flutter**. The canonical mobile app lives in `hajj_app_flutter/` and contains the complete UI, navigation, content loading, search, category detail views, and accessibility-ready Islamic text widgets.

## Project Status

- ✅ React Native implementation is superseded.
- ✅ Flutter is now the primary and maintained runtime.
- ✅ Shared Hajj data is shipped as local JSON assets in the Flutter app.

## Run the Flutter app

```bash
cd hajj_app_flutter
flutter pub get
flutter run
```

## Test

```bash
cd hajj_app_flutter
flutter test
```

## Flutter structure

- `lib/main.dart` – app entry point and main navigation scaffold
- `lib/services/content_repository.dart` – loads and maps `assets/data/hajj_rules.json`
- `lib/features/content/screens/*` – Home, Categories, Detail, Search, Map, About
- `lib/features/settings/screens/settings_screen.dart` – core settings toggles
- `lib/shared/widgets/accessible_text.dart` – accessibility + Arabic text helpers
- `lib/features/content/models/hajj_content_models.dart` – strongly typed content models

