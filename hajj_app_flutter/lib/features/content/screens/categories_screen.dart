import 'package:flutter/material.dart';
import 'package:hajj_app_flutter/features/content/models/hajj_content_models.dart';
import 'package:hajj_app_flutter/features/content/screens/detail_screen.dart';
import 'package:hajj_app_flutter/services/content_repository.dart';

class CategoriesScreen extends StatelessWidget {
  const CategoriesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<Category>>(
      future: ContentRepository().loadCategories(),
      builder: (context, snapshot) {
        if (!snapshot.hasData) return const Center(child: CircularProgressIndicator());
        final categories = snapshot.data!;
        return ListView.builder(
          itemCount: categories.length,
          itemBuilder: (context, index) {
            final category = categories[index];
            return Card(
              margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              child: ListTile(
                leading: CircleAvatar(child: Text('${category.rules.length}')),
                title: Text(category.title),
                subtitle: Text(category.description),
                onTap: () => Navigator.of(context).push(
                  MaterialPageRoute(builder: (_) => DetailScreen(category: category)),
                ),
              ),
            );
          },
        );
      },
    );
  }
}
