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
    backgroundColor: '#1a1a1a',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  calloutContainer: {
    width: 200,
    padding: 10,
    backgroundColor: '#2c2c2c',
    borderRadius: 10,
    borderColor: '#d4af37',
    borderWidth: 1,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d4af37',
    marginBottom: 5,
  },
  calloutDescription: {
    fontSize: 12,
    color: '#ffffff',
  },
});

export default MapScreen;