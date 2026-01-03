import React, { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useNavigationContext } from '../shared/navigation/AppNavigator';
import ContentService from '../features/content/services/ContentService';
import { Rule } from '../core/types';
import { APP_CONFIG } from '../core/constants';
import { getLocalizedTextWithFallback, shouldUseRTL } from '../core/utils';
import Icon from 'react-native-vector-icons/MaterialIcons';
import debounce from 'lodash/debounce';

const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Rule[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const { settings } = useNavigationContext();
  const isRTL = shouldUseRTL(settings);

  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (query.trim().length > 1) {
        setIsLoading(true);
        try {
          await ContentService.initialize(settings);
          const results = await ContentService.searchRules(query.trim());
          setSearchResults(results);
        } catch (error) {
          console.error('Search failed:', error);
          setSearchResults([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 500),
    [settings],
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleRulePress = (rule: Rule) => {
    navigation.navigate('Content' as never, {
      category: rule.category,
      title: rule.title,
    } as never);
  };

  const renderRule = ({ item }: { item: Rule }) => {
    const titleText = getLocalizedTextWithFallback(item.title, settings);
    const descriptionText = getLocalizedTextWithFallback(item.description, settings);

    return (
      <TouchableOpacity
        style={styles.ruleCard}
        onPress={() => handleRulePress(item)}
        activeOpacity={0.7}
      >
        <Text style={[styles.ruleTitle, { textAlign: isRTL ? 'right' : 'left' }]}>{titleText}</Text>
        <Text style={[styles.ruleDescription, { textAlign: isRTL ? 'right' : 'left' }]} numberOfLines={2}>
          {descriptionText}
        </Text>
        <View style={[styles.tagContainer, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
          <Text style={styles.categoryTag}>{item.category.replace(/_/g, ' ')}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: APP_CONFIG.theme.background }]}>
      <View style={[styles.searchContainer, { borderBottomColor: APP_CONFIG.theme.primary }]}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color={APP_CONFIG.theme.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { textAlign: isRTL ? 'right' : 'left' }]}
            placeholder={getLocalizedTextWithFallback(
              { albanian: 'Kërkoni...', arabic: 'بحث...', english: 'Search...' },
              settings
            )}
            placeholderTextColor={APP_CONFIG.theme.textSecondary}
            value={searchQuery}
            onChangeText={handleSearch}
            autoFocus
          />
        </View>
      </View>

      {isLoading ? (
        <ActivityIndicator style={styles.loader} size="large" color={APP_CONFIG.theme.primary} />
      ) : searchQuery.length < 2 ? (
        <View style={styles.emptyContainer}>
          <Icon name="search" size={64} color={APP_CONFIG.theme.textSecondary} />
          <Text style={styles.emptyText}>
            {getLocalizedTextWithFallback(
              {
                albanian: 'Shkruani të paktën 2 shkronja për të kërkuar',
                arabic: 'اكتب حرفين على الأقل للبحث',
                english: 'Type at least 2 characters to search'
              },
              settings
            )}
          </Text>
        </View>
      ) : searchResults.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="search-off" size={64} color={APP_CONFIG.theme.textSecondary} />
          <Text style={styles.emptyText}>
            {getLocalizedTextWithFallback(
              {
                albanian: `Nuk u gjet asgjë për "${searchQuery}"`,
                arabic: `لم يتم العثور على نتائج لـ "${searchQuery}"`,
                english: `No results found for "${searchQuery}"`
              },
              settings
            )}
          </Text>
        </View>
      ) : (
        <FlatList
          data={searchResults}
          renderItem={renderRule}
          keyExtractor={item => `${item.category}-${item.id}`}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: 16,
    borderBottomWidth: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: APP_CONFIG.theme.surface,
    borderRadius: 12,
    paddingHorizontal: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
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
  listContainer: {
    padding: 16,
  },
  ruleCard: {
    backgroundColor: APP_CONFIG.theme.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
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
    marginBottom: 8,
  },
  tagContainer: {
    marginTop: 4,
  },
  categoryTag: {
    fontSize: 11,
    fontWeight: '600',
    color: APP_CONFIG.theme.primary,
    backgroundColor: `${APP_CONFIG.theme.primary}15`,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    textTransform: 'capitalize',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    color: APP_CONFIG.theme.textSecondary,
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 24,
  },
  loader: {
    marginTop: 20,
  },
});

export default SearchScreen;