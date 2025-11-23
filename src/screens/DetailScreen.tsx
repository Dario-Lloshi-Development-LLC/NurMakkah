import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {HajjRule, Category} from '../types';

interface RouteParams {
  rule?: HajjRule;
  category?: Category;
  title: string;
}

const DetailScreen: React.FC = () => {
  const route = useRoute();
  const {rule, category} = route.params as RouteParams;
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRules, setFilteredRules] = useState<HajjRule[]>([]);

  const rules = rule ? [rule] : category?.rules || [];

  useEffect(() => {
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      const filtered = rules.filter(
        item =>
          item.rule.toLowerCase().includes(lowerQuery) ||
          item.description.toLowerCase().includes(lowerQuery),
      );
      setFilteredRules(filtered);
    } else {
      setFilteredRules(rules);
    }
  }, [searchQuery, rules]);

  const renderRule = ({item}: {item: HajjRule}) => (
    <View style={styles.ruleCard} accessibilityLabel={`Rregulli: ${item.rule}`}>
      <Text style={styles.ruleTitle}>{item.rule}</Text>
      <Text style={styles.ruleDescription}>{item.description}</Text>
    </View>
  );

  const renderHeader = () => (
    <>
      {category && (
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{category.title}</Text>
          <Text style={styles.headerDescription}>{category.description}</Text>
        </View>
      )}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Kërko rregulla..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
    </>
  );

  if (!rules.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>Nuk ka të dhëna për të shfaqur</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
    backgroundColor: '#1a1a1a',
  },
  header: {
    backgroundColor: '#2c2c2c',
    padding: 20,
    margin: 16,
    marginBottom: 0,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d4af37',
    elevation: 3,
    shadowColor: '#d4af37',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  searchContainer: {
    padding: 16,
  },
  searchInput: {
    backgroundColor: '#2c2c2c',
    color: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d4af37',
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#d4af37',
    marginBottom: 8,
    fontFamily: 'serif',
  },
  headerDescription: {
    fontSize: 14,
    color: '#ffffff',
    lineHeight: 20,
  },
  listContainer: {
    padding: 16,
  },
  ruleCard: {
    backgroundColor: '#2c2c2c',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#d4af37',
    elevation: 2,
    shadowColor: '#d4af37',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  ruleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d4af37',
    marginBottom: 8,
    fontFamily: 'serif',
  },
  ruleDescription: {
    fontSize: 14,
    color: '#ffffff',
    lineHeight: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#b0b0b0',
    textAlign: 'center',
    marginTop: 50,
    fontStyle: 'italic',
  },
});

export default DetailScreen;