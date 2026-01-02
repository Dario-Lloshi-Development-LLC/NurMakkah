import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList, useNavigationContext } from '../shared/navigation/AppNavigator';
import { HajjData, Category } from '../core/types';
import { getLocalizedTextWithFallback, shouldUseRTL } from '../core/utils';
import { APP_CONFIG } from '../core/constants';
import ContentService from '../features/content/services/ContentService';
import { FeatureCard } from '../features/content/components/FeatureCard';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { settings } = useNavigationContext();
  const [hajjData, setHajjData] = useState<HajjData | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const contentService = useMemo(() => ContentService.getInstance(), []);
  const isRTL = shouldUseRTL(settings);

  const loadData = useCallback(async () => {
    try {
      setError(null);
      await contentService.initialize(settings);
      const [data, cats] = await Promise.all([
        contentService.getHajjData(),
        contentService.getCategories(),
      ]);
      setHajjData(data);
      setCategories(cats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [contentService, settings]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    contentService.clearCache();
    loadData();
  }, [contentService, loadData]);

  const handleCategoryPress = useCallback((category: Category) => {
    navigation.navigate('Content', {
      category: category.name,
      title: category.title,
    });
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Icon name="mosque" size={48} color={APP_CONFIG.theme.primary} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Icon name="error" size={48} color={APP_CONFIG.theme.primary} />
        <Text style={styles.errorText}>Error loading content</Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: APP_CONFIG.theme.background }]}>
      <View style={[styles.header, { backgroundColor: APP_CONFIG.theme.primary }]}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.welcomeText}>
              {getLocalizedTextWithFallback({ albanian: 'Mirësevini', arabic: 'أهلاً بك', english: 'Welcome' }, settings)}
            </Text>
            <Text style={styles.appTitle}>Nur Makkah</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('Search')}>
              <Icon name="search" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('Settings')}>
              <Icon name="settings" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={[APP_CONFIG.theme.primary]} />}
        showsVerticalScrollIndicator={false}
      >
        {hajjData && (
          <View style={styles.card}>
            <Text style={[styles.introText, { textAlign: isRTL ? 'right' : 'left' }]}>
              {getLocalizedTextWithFallback(hajjData.introduction.description, settings)}
            </Text>
          </View>
        )}

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { textAlign: isRTL ? 'right' : 'left' }]}>
            {getLocalizedTextWithFallback({ albanian: 'Kategoritë', arabic: 'الفئات', english: 'Categories' }, settings)}
          </Text>
          {categories.map((category) => (
            <FeatureCard
              key={category.id}
              icon={category.icon || 'category'}
              title={category.title}
              description={category.description}
              onPress={() => handleCategoryPress(category)}
              color={category.color}
              settings={settings}
            />
          ))}
        </View>

        <View style={[styles.section, { marginBottom: 32 }]}>
          <Text style={[styles.sectionTitle, { textAlign: isRTL ? 'right' : 'left' }]}>
            {getLocalizedTextWithFallback({ albanian: 'Mjetet', arabic: 'أدوات', english: 'Tools' }, settings)}
          </Text>
          <View style={styles.toolsRow}>
            <TouchableOpacity style={styles.toolItem} onPress={() => navigation.navigate('Map')}>
              <Icon name="map" size={28} color={APP_CONFIG.theme.primary} />
              <Text style={styles.toolLabel}>{getLocalizedTextWithFallback({ albanian: 'Harta', arabic: 'الخريطة', english: 'Map' }, settings)}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.toolItem} onPress={() => navigation.navigate('About')}>
              <Icon name="info" size={28} color={APP_CONFIG.theme.primary} />
              <Text style={styles.toolLabel}>{getLocalizedTextWithFallback({ albanian: 'Rreth', arabic: 'حول', english: 'About' }, settings)}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: APP_CONFIG.theme.textSecondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: 18,
    color: APP_CONFIG.theme.text,
    marginVertical: 16,
    textAlign: 'center',
  },
  retryButton: {
    padding: 12,
    backgroundColor: APP_CONFIG.theme.primary,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  appTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#fff',
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: 8,
    marginLeft: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
  },
  scrollView: {
    flex: 1,
  },
  card: {
    backgroundColor: APP_CONFIG.theme.surface,
    margin: 16,
    padding: 16,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  introText: {
    fontSize: 15,
    lineHeight: 22,
    color: APP_CONFIG.theme.text,
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: APP_CONFIG.theme.text,
    marginBottom: 16,
  },
  toolsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  toolItem: {
    backgroundColor: APP_CONFIG.theme.surface,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    width: '45%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  toolLabel: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: APP_CONFIG.theme.text,
  },
  footer: {
    padding: 32,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: APP_CONFIG.theme.textSecondary,
  },
});

export default HomeScreen;

export default HomeScreen;