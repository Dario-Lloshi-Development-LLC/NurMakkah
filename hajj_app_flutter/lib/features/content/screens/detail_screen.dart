import 'package:flutter/material.dart';
import 'package:hajj_app_flutter/features/content/models/hajj_content_models.dart';

class DetailScreen extends StatefulWidget {
  const DetailScreen({super.key, required this.category});

  final Category category;

  @override
  State<DetailScreen> createState() => _DetailScreenState();
}

class _DetailScreenState extends State<DetailScreen> {
  String query = '';

  @override
  Widget build(BuildContext context) {
    final filtered = widget.category.rules
        .where(
          (rule) => rule.rule.toLowerCase().contains(query.toLowerCase()) ||
              rule.description.toLowerCase().contains(query.toLowerCase()),
        )
        .toList();

    return Scaffold(
      appBar: AppBar(title: Text(widget.category.title)),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16),
            child: TextField(
              decoration: const InputDecoration(labelText: 'Kërko rregulla...'),
              onChanged: (value) => setState(() => query = value),
            ),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: filtered.length,
              itemBuilder: (context, index) {
                final rule = filtered[index];
                return Card(
                  margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  child: ListTile(title: Text(rule.rule), subtitle: Text(rule.description)),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
