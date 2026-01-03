import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Rule, Category } from '../core/types';

import { useNavigationContext } from '../shared/navigation/AppNavigator';
import { APP_CONFIG } from '../core/constants';
import { getLocalizedTextWithFallback, shouldUseRTL } from '../core/utils';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface RouteParams {
  rule?: Rule;
  category?: Category;
  title: any;
}

const DetailScreen: React.FC = () => {
  const route = useRoute();
  const { rule, category } = route.params as RouteParams;
  const { settings } = useNavigationContext();
  const isRTL = shouldUseRTL(settings);

  const rules = useMemo<Rule[]>(() => (rule ? [rule] : ((category as any)?.rules as Rule[]) || []), [rule, category]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRules, setFilteredRules] = useState<Rule[]>([]);

  useEffect(() => {
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      const filtered = rules.filter(item => {
        const titleText = getLocalizedTextWithFallback((item as any).title || (item as any).rule, settings);
        const descText = getLocalizedTextWithFallback((item as any).description || (item as any).description, settings);
        return titleText.toLowerCase().includes(lowerQuery) || descText.toLowerCase().includes(lowerQuery);
      });
      setFilteredRules(filtered);
    } else {
      setFilteredRules(rules);
    }
  }, [searchQuery, rules]);

  const renderRule = ({ item }: { item: Rule }) => {
    const titleText = getLocalizedTextWithFallback((item as any).title || (item as any).rule, settings);
    const descText = getLocalizedTextWithFallback((item as any).description || (item as any).description, settings);
    return (
      <View style={[styles.ruleCard, { borderLeftColor: APP_CONFIG.theme.primary }]}>
        <Text style={[styles.ruleTitle, { textAlign: isRTL ? 'right' : 'left' }]}>{titleText}</Text>
        <Text style={[styles.ruleDescription, { textAlign: isRTL ? 'right' : 'left' }]}>{descText}</Text>
      </View>
    );
  };

  const renderHeader = () => (
    <>
      {category && (
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { textAlign: isRTL ? 'right' : 'left' }]}>
            {getLocalizedTextWithFallback(category.title, settings)}
          </Text>
          <Text style={[styles.headerDescription, { textAlign: isRTL ? 'right' : 'left' }]}>
            {getLocalizedTextWithFallback(category.description, settings)}
          </Text>
        </View>
      )}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color={APP_CONFIG.theme.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { textAlign: isRTL ? 'right' : 'left' }]}
            placeholder={getLocalizedTextWithFallback({ albanian: 'Kërko...', arabic: 'بحث...', english: 'Search...' }, settings)}
            placeholderTextColor={APP_CONFIG.theme.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>
    </>
  );

  if (!rules.length) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.emptyText}>
          {getLocalizedTextWithFallback({ albanian: 'Nuk ka të dhëna', arabic: 'لا توجد بيانات', english: 'No data' }, settings)}
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: APP_CONFIG.theme.background }]}>
      <FlatList
        data={filteredRules}
        renderItem={renderRule}
        keyExtractor={item => `${item.category}-${item.id}`}
        ListHeaderComponent={renderHeader}
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
  header: {
    backgroundColor: APP_CONFIG.theme.surface,
    padding: 20,
    margin: 16,
    marginBottom: 0,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchContainer: {
    padding: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: APP_CONFIG.theme.surface,
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: APP_CONFIG.theme.text,
    paddingVertical: 12,
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: APP_CONFIG.theme.primary,
    marginBottom: 8,
  },
  headerDescription: {
    fontSize: 15,
    color: APP_CONFIG.theme.text,
    lineHeight: 22,
  },
  listContainer: {
    padding: 16,
    paddingTop: 0,
  },
  ruleCard: {
    backgroundColor: APP_CONFIG.theme.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  ruleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: APP_CONFIG.theme.primary,
    marginBottom: 8,
  },
  ruleDescription: {
    fontSize: 14,
    color: APP_CONFIG.theme.text,
    lineHeight: 20,
  },
  emptyText: {
    fontSize: 16,
    color: APP_CONFIG.theme.textSecondary,
    fontStyle: 'italic',
  },
});

export default DetailScreen;