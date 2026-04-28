import 'dart:convert';

import 'package:flutter/services.dart';
import 'package:hajj_app_flutter/features/content/models/hajj_content_models.dart';

class ContentRepository {
  Future<Map<String, dynamic>> _loadRaw() async {
    final jsonString = await rootBundle.loadString('assets/data/hajj_rules.json');
    return json.decode(jsonString) as Map<String, dynamic>;
  }

  Future<List<Category>> loadCategories() async {
    final raw = await _loadRaw();
    final categories = <Category>[];

    void addCategory({
      required int id,
      required String title,
      required String description,
      required List<SimpleRule> rules,
    }) {
      categories.add(
        Category(
          id: id,
          title: title,
          description: description,
          iconPath: 'assets/images/image_${(id % 13) + 1}.png',
          orderIndex: id,
          createdAt: DateTime.now(),
          rules: rules,
        ),
      );
    }

    final pillars = (raw['shtyllat_e_islamit'] as List<dynamic>? ?? []);
    addCategory(
      id: 1,
      title: 'Shtyllat e Islamit',
      description: 'Pesë shtyllat themelore të fesë islame.',
      rules: pillars
          .map(
            (e) => SimpleRule(
              id: e['id'] as int,
              rule: e['name']['albanian'] as String,
              description: e['description']['albanian'] as String,
            ),
          )
          .toList(),
    );

    final travel = (raw['edukata_e_udhetimit'] as List<dynamic>? ?? []);
    addCategory(
      id: 2,
      title: 'Edukata e Udhëtimit',
      description: 'Rregulla para dhe gjatë udhëtimit për Haxh.',
      rules: travel
          .map(
            (e) => SimpleRule(
              id: e['id'] as int,
              rule: e['rule'] as String,
              description: e['description'] as String,
            ),
          )
          .toList(),
    );

    final ihram = (raw['ihrami']?['para_veshjes'] as List<dynamic>? ?? []);
    addCategory(
      id: 3,
      title: 'Ihrami',
      description: raw['ihrami']?['description'] as String? ?? 'Rregullat e ihramit.',
      rules: ihram
          .map(
            (e) => SimpleRule(
              id: e['id'] as int,
              rule: e['veprim'] as String,
              description: e['description'] as String,
            ),
          )
          .toList(),
    );

    final prohibitions = (raw['ndalesat_gjate_ihramit'] as List<dynamic>? ?? []);
    addCategory(
      id: 4,
      title: 'Ndalesat gjatë Ihramit',
      description: 'Gjërat që ndalohen gjatë gjendjes së ihramit.',
      rules: prohibitions
          .map(
            (e) => SimpleRule(
              id: e['id'] as int,
              rule: e['ndalesa'] as String,
              description: e['description'] as String,
            ),
          )
          .toList(),
    );

    final miqats = (raw['vendcaktimet']?['locations'] as List<dynamic>? ?? []);
    addCategory(
      id: 5,
      title: 'Vendcaktimet (Miqat)',
      description: 'Vendndalesat nga ku fillon ihrami.',
      rules: miqats
          .map(
            (e) => SimpleRule(
              id: e['id'] as int,
              rule: e['emri'] as String,
              description: '${e['per_ke']} - ${e['largesia']}',
            ),
          )
          .toList(),
    );

    return categories;
  }

  Future<List<SimpleRule>> search(String query) async {
    final categories = await loadCategories();
    final q = query.toLowerCase().trim();
    if (q.isEmpty) {
      return categories.expand((c) => c.rules).toList();
    }
    return categories
        .expand((c) => c.rules)
        .where(
          (r) => r.rule.toLowerCase().contains(q) || r.description.toLowerCase().contains(q),
        )
        .toList();
  }
}
