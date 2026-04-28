import 'package:flutter/material.dart';

class NurColors {
  static const deepNight = Color(0xFF0F1115);
  static const card = Color(0xFF181D24);
  static const gold = Color(0xFFD4AF37);
  static const emerald = Color(0xFF1E7D5B);
  static const textPrimary = Color(0xFFF5F1E8);
  static const textMuted = Color(0xFFB8B4AA);
}

class NurTheme {
  static ThemeData get dark {
    const textTheme = TextTheme(
      headlineSmall: TextStyle(
        color: NurColors.textPrimary,
        fontWeight: FontWeight.w700,
        letterSpacing: .2,
      ),
      titleLarge: TextStyle(
        color: NurColors.textPrimary,
        fontWeight: FontWeight.w700,
      ),
      bodyLarge: TextStyle(color: NurColors.textPrimary, height: 1.4),
      bodyMedium: TextStyle(color: NurColors.textMuted, height: 1.35),
    );

    return ThemeData(
      useMaterial3: false,
      brightness: Brightness.dark,
      scaffoldBackgroundColor: NurColors.deepNight,
      primaryColor: NurColors.gold,
      splashColor: NurColors.gold.withOpacity(0.15),
      highlightColor: Colors.transparent,
      textTheme: textTheme,
      appBarTheme: const AppBarTheme(
        elevation: 0,
        centerTitle: true,
        backgroundColor: NurColors.deepNight,
        foregroundColor: NurColors.textPrimary,
        titleTextStyle: TextStyle(
          color: NurColors.textPrimary,
          fontSize: 18,
          fontWeight: FontWeight.w700,
          letterSpacing: .2,
        ),
      ),
      cardTheme: CardTheme(
        color: NurColors.card,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
          side: const BorderSide(color: Color(0x33D4AF37)),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: NurColors.card,
        hintStyle: const TextStyle(color: NurColors.textMuted),
        labelStyle: const TextStyle(color: NurColors.textMuted),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: const BorderSide(color: Color(0x44D4AF37)),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: const BorderSide(color: NurColors.gold, width: 1.4),
        ),
      ),
      bottomNavigationBarTheme: const BottomNavigationBarThemeData(
        backgroundColor: NurColors.card,
        selectedItemColor: NurColors.gold,
        unselectedItemColor: NurColors.textMuted,
        type: BottomNavigationBarType.fixed,
        showUnselectedLabels: true,
      ),
      listTileTheme: const ListTileThemeData(
        textColor: NurColors.textPrimary,
        iconColor: NurColors.gold,
      ),
      dividerColor: const Color(0x22FFFFFF),
    );
  }
}
