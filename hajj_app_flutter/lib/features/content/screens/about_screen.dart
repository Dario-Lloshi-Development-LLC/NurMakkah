import 'package:flutter/material.dart';

class AboutScreen extends StatelessWidget {
  const AboutScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: const [
        ListTile(
          title: Text('Nur Makkah'),
          subtitle: Text('Flutter migration complete: app now runs on Dart/Flutter architecture.'),
        ),
        ListTile(
          title: Text('Content Sources'),
          subtitle: Text('Quran, authentic hadith collections, and reviewed scholarly summaries.'),
        ),
      ],
    );
  }
}
