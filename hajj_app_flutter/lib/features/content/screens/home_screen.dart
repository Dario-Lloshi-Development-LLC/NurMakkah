import 'package:flutter/material.dart';
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
            const Card(
              child: Padding(
                padding: EdgeInsets.all(16),
                child: Text('Mirë se vini në Nur Makkah — udhëzues i verifikuar për Haxh dhe Umre.'),
              ),
            ),
            ...categories.take(3).map(
              (category) => Card(
                child: ListTile(
                  title: Text(category.title),
                  subtitle: Text(category.description),
                  trailing: const Icon(Icons.chevron_right),
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
