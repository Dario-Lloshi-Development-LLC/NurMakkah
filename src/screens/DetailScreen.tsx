import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Rule, Category } from "../core/types";

import { useNavigationContext } from "../shared/navigation/AppNavigator";
import { APP_CONFIG } from "../core/constants";
import { getLocalizedTextWithFallback, shouldUseRTL } from "../core/utils";
import Icon from "react-native-vector-icons/MaterialIcons";

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

  const rules = useMemo<Rule[]>(
    () => (rule ? [rule] : ((category as any)?.rules as Rule[]) || []),
    [rule, category],
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRules, setFilteredRules] = useState<Rule[]>([]);

  useEffect(() => {
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      const filtered = rules.filter((item) => {
        const titleText = getLocalizedTextWithFallback(
          (item as any).title || (item as any).rule,
          settings,
        );
        const descText = getLocalizedTextWithFallback(
          (item as any).description || (item as any).description,
          settings,
        );
        return (
          titleText.toLowerCase().includes(lowerQuery) ||
          descText.toLowerCase().includes(lowerQuery)
        );
      });
      setFilteredRules(filtered);
    } else {
      setFilteredRules(rules);
    }
  }, [searchQuery, rules]);

  const renderRule = ({ item }: { item: Rule }) => {
    const titleText = getLocalizedTextWithFallback(
      (item as any).title || (item as any).rule,
      settings,
    );
    const descText = getLocalizedTextWithFallback(
      (item as any).description || (item as any).description,
      settings,
    );
    return (
      <View
        style={[styles.ruleCard, { borderLeftColor: APP_CONFIG.theme.primary }]}
      >
        <Text
          style={[styles.ruleTitle, { textAlign: isRTL ? "right" : "left" }]}
        >
          {titleText}
        </Text>
        <Text
          style={[
            styles.ruleDescription,
            { textAlign: isRTL ? "right" : "left" },
          ]}
        >
          {descText}
        </Text>
      </View>
    );
  };

  const renderHeader = () => (
    <>
      {category && (
        <View style={styles.header}>
          <Text
            style={[
              styles.headerTitle,
              { textAlign: isRTL ? "right" : "left" },
            ]}
          >
            {getLocalizedTextWithFallback(category.title, settings)}
          </Text>
          <Text
            style={[
              styles.headerDescription,
              { textAlign: isRTL ? "right" : "left" },
            ]}
          >
            {getLocalizedTextWithFallback(category.description, settings)}
          </Text>
        </View>
      )}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon
            name="search"
            size={20}
            color={APP_CONFIG.theme.textSecondary}
            style={styles.searchIcon}
          />
          <TextInput
            style={[
              styles.searchInput,
              { textAlign: isRTL ? "right" : "left" },
            ]}
            placeholder={getLocalizedTextWithFallback(
              { albanian: "Kërko...", arabic: "بحث...", english: "Search..." },
              settings,
            )}
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
          {getLocalizedTextWithFallback(
            {
              albanian: "Nuk ka të dhëna",
              arabic: "لا توجد بيانات",
              english: "No data",
            },
            settings,
          )}
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: APP_CONFIG.theme.background },
      ]}
    >
      <FlatList
        data={filteredRules}
        renderItem={renderRule}
        keyExtractor={(item) => `${item.category}-${item.id}`}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
  },
  emptyText: {
    color: APP_CONFIG.theme.textSecondary,
    fontSize: 16,
    fontStyle: "italic",
  },
  header: {
    backgroundColor: APP_CONFIG.theme.surface,
    borderColor: "#eee",
    borderRadius: 12,
    borderWidth: 1,
    elevation: 3,
    margin: 16,
    marginBottom: 0,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerDescription: {
    color: APP_CONFIG.theme.text,
    fontSize: 15,
    lineHeight: 22,
  },
  headerTitle: {
    color: APP_CONFIG.theme.primary,
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  listContainer: {
    padding: 16,
    paddingTop: 0,
  },
  ruleCard: {
    backgroundColor: APP_CONFIG.theme.surface,
    borderLeftWidth: 4,
    borderRadius: 12,
    elevation: 2,
    marginBottom: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  ruleDescription: {
    color: APP_CONFIG.theme.text,
    fontSize: 14,
    lineHeight: 20,
  },
  ruleTitle: {
    color: APP_CONFIG.theme.primary,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  searchBar: {
    alignItems: "center",
    backgroundColor: APP_CONFIG.theme.surface,
    borderColor: "#eee",
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: "row",
    paddingHorizontal: 12,
  },
  searchContainer: {
    padding: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    color: APP_CONFIG.theme.text,
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
  },
});

export default DetailScreen;
