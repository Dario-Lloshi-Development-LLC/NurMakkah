import 'package:flutter/material.dart';
import 'package:hajj_app_flutter/app/nur_theme.dart';
import 'package:hajj_app_flutter/features/content/models/hajj_content_models.dart';
import 'package:hajj_app_flutter/features/content/screens/detail_screen.dart';
import 'package:hajj_app_flutter/services/content_repository.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<Category>>(
      future: ContentRepository().loadCategories(),
      builder: (context, snapshot) {
        if (!snapshot.hasData) {
          return const Center(child: CircularProgressIndicator());
        }
        final categories = snapshot.data!;
        return ListView(
          padding: const EdgeInsets.all(16),
          children: [
            Container(
              padding: const EdgeInsets.all(18),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [Color(0xFF1E7D5B), Color(0xFF14533D)],
                ),
                borderRadius: BorderRadius.circular(18),
              ),
              child: const Text(
                'Mirë se vini në Nur Makkah — udhëzues i verifikuar për Haxh dhe Umre.',
                style: TextStyle(color: Colors.white, height: 1.4),
              ),
            ),
            const SizedBox(height: 14),
            ...categories.take(3).map(
              (category) => Card(
                child: ListTile(
                  contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                  leading: const CircleAvatar(
                    backgroundColor: Color(0x332B7A56),
                    child: Icon(Icons.menu_book_rounded, color: NurColors.gold),
                  ),
                  title: Text(category.title, style: Theme.of(context).textTheme.titleLarge),
                  subtitle: Text(category.description),
                  trailing: const Icon(Icons.chevron_right_rounded),
                  onTap: () => Navigator.of(context).push(
                    MaterialPageRoute(
                      builder: (_) => DetailScreen(category: category),
                    ),
                  ),
                ),
              ),
            ),
          ],
        );
      },
    );
  }
}
