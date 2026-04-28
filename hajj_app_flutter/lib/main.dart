import 'package:flutter/material.dart';
import 'package:hajj_app_flutter/features/content/screens/about_screen.dart';
import 'package:hajj_app_flutter/features/content/screens/categories_screen.dart';
import 'package:hajj_app_flutter/features/content/screens/home_screen.dart';
import 'package:hajj_app_flutter/features/content/screens/map_screen.dart';
import 'package:hajj_app_flutter/features/content/screens/search_screen.dart';
import 'package:hajj_app_flutter/features/settings/screens/settings_screen.dart';

void main() {
  runApp(const NurMakkahApp());
}

class NurMakkahApp extends StatelessWidget {
  const NurMakkahApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Nur Makkah',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFFD4AF37), brightness: Brightness.dark),
        scaffoldBackgroundColor: const Color(0xFF1A1A1A),
        useMaterial3: true,
      ),
      home: const MainScaffold(),
    );
  }
}

class MainScaffold extends StatefulWidget {
  const MainScaffold({super.key});

  @override
  State<MainScaffold> createState() => _MainScaffoldState();
}

class _MainScaffoldState extends State<MainScaffold> {
  int index = 0;

  @override
  Widget build(BuildContext context) {
    final pages = [
      const HomeScreen(),
      const CategoriesScreen(),
      const SearchScreen(),
      const MapScreen(),
      const AboutScreen(),
      const SettingsScreen(),
    ];

    return Scaffold(
      appBar: AppBar(title: const Text('Nur Makkah')),
      body: pages[index],
      bottomNavigationBar: NavigationBar(
        selectedIndex: index,
        onDestinationSelected: (v) => setState(() => index = v),
        destinations: const [
          NavigationDestination(icon: Icon(Icons.home), label: 'Home'),
          NavigationDestination(icon: Icon(Icons.category), label: 'Categories'),
          NavigationDestination(icon: Icon(Icons.search), label: 'Search'),
          NavigationDestination(icon: Icon(Icons.map), label: 'Map'),
          NavigationDestination(icon: Icon(Icons.info), label: 'About'),
          NavigationDestination(icon: Icon(Icons.settings), label: 'Settings'),
        ],
      ),
    );
  }
}
