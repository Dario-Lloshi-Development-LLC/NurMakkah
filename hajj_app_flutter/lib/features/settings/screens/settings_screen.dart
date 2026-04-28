import 'package:flutter/material.dart';

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({super.key});

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  bool showArabic = true;
  bool highContrast = false;

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: [
        SwitchListTile(
          title: const Text('Shfaq tekstin Arabisht'),
          value: showArabic,
          onChanged: (v) => setState(() => showArabic = v),
        ),
        SwitchListTile(
          title: const Text('High contrast mode'),
          value: highContrast,
          onChanged: (v) => setState(() => highContrast = v),
        ),
      ],
    );
  }
}
