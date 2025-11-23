import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import DataService from '../services/DataService';
import {Category} from '../types';

const miqatCoordinates = {
  "DHUL HULEJFEH": {latitude: 24.5247, longitude: 39.5934},
  "XHUHFEH": {latitude: 22.8475, longitude: 39.1553},
  "KARNUL MENAZIL": {latitude: 21.6333, longitude: 40.4167},
  "JELEMLEM": {latitude: 20.6167, longitude: 39.7333},
  "DHATE IRK": {latitude: 21.8, longitude: 40.05},
};

const MapScreen: React.FC = () => {
  const [miqatCategory, setMiqatCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const category = await DataService.getCategoryByName('vendcaktimet');
      if (category) {
        setMiqatCategory(category);
      }
      setIsLoading(false);
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#d4af37" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 21.4225,
          longitude: 39.8262,
          latitudeDelta: 5,
          longitudeDelta: 5,
        }}>
        {miqatCategory?.rules?.map((miqat, index) => {
          const coordinate = miqatCoordinates[miqat.rule.toUpperCase()];
          if (!coordinate) return null;

          return (
            <Marker key={index} coordinate={coordinate}>
              <Callout>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutTitle}>{miqat.rule}</Text>
                  <Text style={styles.calloutDescription}>{miqat.description}</Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#2E7D32',
    padding: 20,
    margin: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  headerDescription: {
    fontSize: 14,
    color: '#E8F5E8',
    lineHeight: 20,
  },
  miqatCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    marginTop: 8,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  miqatName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
  },
  miqatDescription: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  infoSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 12,
    textAlign: 'justify',
  },
});

export default MapScreen;