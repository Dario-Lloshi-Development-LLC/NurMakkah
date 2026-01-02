import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DataService from '../services/DataService';
import { Category } from '../types';

import { useNavigationContext } from '../shared/navigation/AppNavigator';
import ContentService from '../features/content/services/ContentService';
import { Category } from '../core/types';
import { APP_CONFIG } from '../core/constants';
import { getLocalizedTextWithFallback, shouldUseRTL } from '../core/utils';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CategoriesScreen: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { settings } = useNavigationContext();
  const isRTL = shouldUseRTL(settings);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await ContentService.getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryPress = (category: Category) => {
    navigation.navigate('Content' as never, {
      category: category.name,
      title: category.title,
    } as never);
  };

  const renderCategory = ({ item }: { item: Category }) => {
    const titleText = getLocalizedTextWithFallback(item.title, settings);
    const descriptionText = getLocalizedTextWithFallback(item.description, settings);

    return (
      <TouchableOpacity
        style={[styles.categoryCard, { borderLeftColor: item.color || APP_CONFIG.theme.primary }]}
        onPress={() => handleCategoryPress(item)}
        activeOpacity={0.7}
      >
        <View style={[styles.categoryHeader, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
          <View style={[styles.categoryIcon, { backgroundColor: `${item.color || APP_CONFIG.theme.primary}15` }]}>
            <Icon name={item.icon || 'category'} size={28} color={item.color || APP_CONFIG.theme.primary} />
          </View>
          <View style={[styles.categoryInfo, { alignItems: isRTL ? 'flex-end' : 'flex-start' }]}>
            <Text style={[styles.categoryTitle, { textAlign: isRTL ? 'right' : 'left' }]}>{titleText}</Text>
            <Text style={[styles.categoryDescription, { textAlign: isRTL ? 'right' : 'left' }]} numberOfLines={2}>
              {descriptionText}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={APP_CONFIG.theme.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: APP_CONFIG.theme.background }]}>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 16,
  },
  categoryCard: {
    backgroundColor: APP_CONFIG.theme.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryHeader: {
    alignItems: 'center',
  },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: APP_CONFIG.theme.text,
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    color: APP_CONFIG.theme.textSecondary,
    lineHeight: 20,
  },
});

export default CategoriesScreen;