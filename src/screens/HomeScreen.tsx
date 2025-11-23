import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getImageSource} from '../utils/image';
import { Image } from 'react-native';
import {Category} from '../types';

const HomeScreen: React.FC = () => {
  const {categories, introduction, isLoading} = useAppContext();
  const navigation = useNavigation();

  const handleCategoryPress = (category: Category) => {
    navigation.navigate('Detail', {
      category,
      title: category.title,
    });
  };

  const renderCategory = ({item}: {item: Category}) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() => handleCategoryPress(item)}>
      <View style={styles.categoryContent}>
        <View style={styles.categoryIcon}>
          <Text style={styles.categoryIconText}>📖</Text>
        </View>
        <View style={styles.categoryTextContainer}>
          <Text style={styles.categoryTitle}>{item.title}</Text>
          <Text style={styles.categoryDescription} numberOfLines={2}>
            {item.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#d4af37" />
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      data={categories}
      renderItem={renderCategory}
      keyExtractor={item => item.id.toString()}
      ListHeaderComponent={
        <>
          {introduction && (
            <View style={styles.introSection}>
              <Text style={styles.introTitle}>Mirë se vini në Haxh App</Text>
              <Text style={styles.introText}>{introduction.description.albanian}</Text>
              <Text style={styles.introSubtext}>{introduction.qabja.albanian}</Text>
            </View>
          )}
          <View style={styles.categoriesSection}>
            <Text style={styles.sectionTitle}>Kategoritë</Text>
          </View>
        </>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  introSection: {
    backgroundColor: '#2c2c2c',
    padding: 20,
    margin: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d4af37',
    elevation: 3,
    shadowColor: '#d4af37',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  introTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d4af37',
    marginBottom: 12,
    textAlign: 'center',
    fontFamily: 'serif',
  },
  introText: {
    fontSize: 16,
    color: '#ffffff',
    lineHeight: 24,
    marginBottom: 10,
    textAlign: 'justify',
  },
  introSubtext: {
    fontSize: 14,
    color: '#b0b0b0',
    lineHeight: 20,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  categoriesSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#d4af37',
    marginBottom: 16,
    fontFamily: 'serif',
  },
  categoryCard: {
    backgroundColor: '#2c2c2c',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#d4af37',
    elevation: 2,
    shadowColor: '#d4af37',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  categoryContent: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  categoryIcon: {
    width: 50,
    height: 50,
    backgroundColor: '#1a1a1a',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderColor: '#d4af37',
    borderWidth: 1,
  },
  categoryIconText: {
    fontSize: 24,
    color: '#d4af37',
  },
  categoryTextContainer: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d4af37',
    marginBottom: 4,
    fontFamily: 'serif',
  },
  categoryDescription: {
    fontSize: 14,
    color: '#b0b0b0',
    lineHeight: 20,
  },
});

export default HomeScreen;