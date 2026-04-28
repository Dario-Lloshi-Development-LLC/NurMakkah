import 'package:flutter/material.dart';
import 'package:hajj_app_flutter/features/content/models/hajj_content_models.dart';
import 'package:hajj_app_flutter/services/content_repository.dart';

class SearchScreen extends StatefulWidget {
  const SearchScreen({super.key});

  @override
  State<SearchScreen> createState() => _SearchScreenState();
}

class _SearchScreenState extends State<SearchScreen> {
  final repository = ContentRepository();
  final controller = TextEditingController();
  List<SimpleRule> results = [];

  Future<void> _search(String value) async {
    final output = await repository.search(value);
    setState(() => results = output);
  }

  @override
  void initState() {
    super.initState();
    _search('');
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.all(16),
          child: TextField(
            controller: controller,
            onChanged: _search,
            decoration: const InputDecoration(
              labelText: 'Kërko në të gjitha kategoritë',
              prefixIcon: Icon(Icons.search_rounded),
            ),
          ),
        ),
        Expanded(
          child: ListView.builder(
            itemCount: results.length,
            itemBuilder: (context, index) => Card(
              margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
              child: ListTile(
                title: Text(results[index].rule),
                subtitle: Text(results[index].description),
              ),
            ),
          ),
        ),
      ],
    );
  }
}
