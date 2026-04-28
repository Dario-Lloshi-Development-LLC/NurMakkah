import 'package:flutter/material.dart';
import 'package:hajj_app_flutter/app/nur_theme.dart';
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
      debugShowCheckedModeBanner: false,
      theme: NurTheme.dark,
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
      body: AnimatedSwitcher(
        duration: const Duration(milliseconds: 250),
        child: KeyedSubtree(key: ValueKey(index), child: pages[index]),
      ),
      bottomNavigationBar: Container(
        decoration: const BoxDecoration(
          border: Border(top: BorderSide(color: Color(0x22D4AF37))),
        ),
        child: BottomNavigationBar(
          currentIndex: index,
          onTap: (v) => setState(() => index = v),
          items: const [
            BottomNavigationBarItem(icon: Icon(Icons.home_rounded), label: 'Home'),
            BottomNavigationBarItem(icon: Icon(Icons.category_rounded), label: 'Categories'),
            BottomNavigationBarItem(icon: Icon(Icons.search_rounded), label: 'Search'),
            BottomNavigationBarItem(icon: Icon(Icons.map_rounded), label: 'Map'),
            BottomNavigationBarItem(icon: Icon(Icons.info_outline_rounded), label: 'About'),
            BottomNavigationBarItem(icon: Icon(Icons.settings_rounded), label: 'Settings'),
          ],
        ),
      ),
    );
  }
}
