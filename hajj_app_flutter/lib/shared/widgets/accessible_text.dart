import 'package:flutter/material.dart';

class AccessibilityUtils {
  static bool isArabicText(String text) {
    final arabicRegExp = RegExp(r'[\u0600-\u06FF]');
    return arabicRegExp.hasMatch(text);
  }

  static String formatArabicNumbers(String text) {
    const western = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const arabic = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    var output = text;
    for (var i = 0; i < western.length; i++) {
      output = output.replaceAll(western[i], arabic[i]);
    }
    return output;
  }

  static String removeArabicDiacritics(String text) {
    return text.replaceAll(RegExp(r'[\u064B-\u065F\u0670]'), '');
  }

  static TextDirection getTextDirection(String text, Locale locale) {
    if (locale.languageCode == 'ar' || isArabicText(text)) {
      return TextDirection.rtl;
    }
    return TextDirection.ltr;
  }

  static TextAlign getTextAlignment(String text, Locale locale) {
    return getTextDirection(text, locale) == TextDirection.rtl
        ? TextAlign.right
        : TextAlign.left;
  }
}

class AccessibleText extends StatelessWidget {
  const AccessibleText({
    super.key,
    required this.text,
    this.isArabic = false,
    this.isHeading = false,
  });

  final String text;
  final bool isArabic;
  final bool isHeading;

  @override
  Widget build(BuildContext context) {
    final locale = Localizations.maybeLocaleOf(context) ?? const Locale('en');
    final direction = isArabic
        ? TextDirection.rtl
        : AccessibilityUtils.getTextDirection(text, locale);

    return Semantics(
      label: text,
      header: isHeading,
      child: Text(
        text,
        textDirection: direction,
        textAlign: direction == TextDirection.rtl ? TextAlign.right : TextAlign.left,
      ),
    );
  }
}

class AccessibleHeading extends StatelessWidget {
  const AccessibleHeading({super.key, required this.text, this.level = 1});

  final String text;
  final int level;

  @override
  Widget build(BuildContext context) {
    final fontSize = switch (level) {
      1 => 24.0,
      2 => 20.0,
      3 => 18.0,
      _ => 16.0,
    };
    return Semantics(
      label: text,
      header: true,
      child: Text(text, style: TextStyle(fontWeight: FontWeight.bold, fontSize: fontSize)),
    );
  }
}

class QuranicVerse extends StatelessWidget {
  const QuranicVerse({super.key, required this.verseText, required this.translation});

  final String verseText;
  final String translation;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Semantics(
          label: 'Quranic verse',
          child: Text(
            verseText,
            textDirection: TextDirection.rtl,
            textAlign: TextAlign.right,
            style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          ),
        ),
        const SizedBox(height: 8),
        Semantics(
          label: 'Translation of Quranic verse',
          child: Text(translation),
        ),
      ],
    );
  }
}

class HadithText extends StatelessWidget {
  const HadithText({
    super.key,
    required this.hadithText,
    required this.narrator,
    required this.translation,
  });

  final String hadithText;
  final String narrator;
  final String translation;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Semantics(label: 'Hadith narrator', child: Text(narrator)),
        const SizedBox(height: 8),
        Semantics(
          label: 'Hadith text',
          child: Text(hadithText, textDirection: TextDirection.rtl, textAlign: TextAlign.right),
        ),
        const SizedBox(height: 8),
        Semantics(label: 'Hadith translation', child: Text(translation)),
      ],
    );
  }
}
