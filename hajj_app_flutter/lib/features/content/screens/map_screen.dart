import 'package:flutter/material.dart';

class MapScreen extends StatelessWidget {
  const MapScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: const [
        Card(
          child: Padding(
            padding: EdgeInsets.all(16),
            child: Text('Harta interaktive mund të integrohet me flutter_map në release-in pasues.'),
          ),
        ),
        ...[
          ListTile(title: Text('Dhul Hulejfeh - 450 km nga Meka')),
          ListTile(title: Text('Xhuhfeh - 183 km nga Meka')),
          ListTile(title: Text('Karnul Menazil - 75 km nga Meka')),
          ListTile(title: Text('Jelemlem - 92 km nga Meka')),
          ListTile(title: Text('Dhate Irk - 94 km nga Meka')),
        ],
      ],
    );
  }
}
