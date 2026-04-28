import 'package:flutter/material.dart';

enum RitualCategory {
  preHajj('Before Hajj'),
  ihram('Ihram'),
  tawaf('Tawaf'),
  sai("Sa'i"),
  hajjDays('Hajj Days');

  const RitualCategory(this.displayName);
  final String displayName;

  static RitualCategory fromString(String value) {
    switch (value) {
      case 'pre_hajj':
        return RitualCategory.preHajj;
      case 'ihram':
        return RitualCategory.ihram;
      case 'tawaf':
        return RitualCategory.tawaf;
      case 'sai':
        return RitualCategory.sai;
      case 'hajj_days':
        return RitualCategory.hajjDays;
      default:
        return RitualCategory.preHajj;
    }
  }
}

enum VerificationStatus {
  verified('Verified by Islamic Scholars'),
  pending('Pending Verification'),
  needsReview('Needs Review');

  const VerificationStatus(this.description);
  final String description;

  static VerificationStatus fromString(String value) {
    switch (value) {
      case 'verified':
        return VerificationStatus.verified;
      case 'pending':
        return VerificationStatus.pending;
      case 'needs_review':
        return VerificationStatus.needsReview;
      default:
        return VerificationStatus.pending;
    }
  }
}

class MultilingualContent {
  const MultilingualContent({
    required this.albanian,
    required this.arabic,
    required this.english,
  });

  final String albanian;
  final String arabic;
  final String english;

  String getContent(String localeCode) {
    switch (localeCode) {
      case 'ar':
        return arabic;
      case 'en':
        return english;
      case 'sq':
      default:
        return albanian;
    }
  }
}

class HajjRule {
  const HajjRule({
    required this.id,
    required this.categoryId,
    required this.title,
    required this.description,
    required this.orderIndex,
    required this.isFavorite,
    required this.createdAt,
  });

  final int id;
  final int categoryId;
  final MultilingualContent title;
  final MultilingualContent description;
  final int orderIndex;
  final bool isFavorite;
  final DateTime createdAt;
}

class Category {
  Category({
    required this.id,
    required this.title,
    required this.description,
    required this.iconPath,
    required this.orderIndex,
    required this.createdAt,
    this.rules = const [],
  });

  final int id;
  final String title;
  final String description;
  final String iconPath;
  final int orderIndex;
  final DateTime createdAt;
  final List<SimpleRule> rules;
}

class SimpleRule {
  SimpleRule({required this.id, required this.rule, required this.description});
  final int id;
  final String rule;
  final String description;
}

class UserProgress {
  UserProgress({
    required this.id,
    required this.ruleId,
    required this.completed,
    required this.completedAt,
    required this.notes,
  });

  final int id;
  final int ruleId;
  final bool completed;
  final DateTime completedAt;
  final String notes;
}
