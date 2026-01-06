import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { Category } from "../core/types";

import { useNavigationContext } from "../shared/navigation/AppNavigator";
import ContentService from "../features/content/services/ContentService";
import { Rule } from "../core/types";
import { APP_CONFIG, CATEGORIES } from "../core/constants";
import { getLocalizedTextWithFallback } from "../core/utils";

const miqatCoordinates: Record<
  string,
  { latitude: number; longitude: number }
> = {
  "DHUL HULEJFEH": { latitude: 24.4124, longitude: 39.5447 },
  XHUHFEH: { latitude: 22.7058, longitude: 39.1458 },
  "KARNUL MENAZIL": { latitude: 21.6333, longitude: 40.4167 },
  JELEMLEM: { latitude: 20.25, longitude: 39.8667 },
  "DHATE IRK": { latitude: 21.9333, longitude: 40.4333 },
};

const MapScreen: React.FC = () => {
  const [miqatRules, setMiqatRules] = useState<Rule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { settings } = useNavigationContext();

  useEffect(() => {
    const loadData = async () => {
      try {
        await ContentService.initialize(settings);
        const rules = await ContentService.getRulesByCategory(CATEGORIES.MIQAT);
        setMiqatRules(rules);
      } catch (error) {
        console.error("Map data load failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [settings]);

  if (isLoading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={APP_CONFIG.theme.primary} />
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
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 21.4225,
          longitude: 39.8262,
          latitudeDelta: 8,
          longitudeDelta: 8,
        }}
      >
        {miqatRules.map((miqat, index) => {
          const title = getLocalizedTextWithFallback(miqat.title, settings);
          const coordinate = miqatCoordinates[title.toUpperCase()];
          if (!coordinate) return null;

          return (
            <Marker
              key={index}
              coordinate={coordinate}
              pinColor={APP_CONFIG.theme.primary}
            >
              <Callout tooltip>
                <View style={styles.calloutContainer}>
                  <Text
                    style={[
                      styles.calloutTitle,
                      { color: APP_CONFIG.theme.primary },
                    ]}
                  >
                    {title}
                  </Text>
                  <Text style={styles.calloutDescription}>
                    {getLocalizedTextWithFallback(miqat.description, settings)}
                  </Text>
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
  calloutContainer: {
    backgroundColor: APP_CONFIG.theme.surface,
    borderColor: "#eee",
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: 220,
  },
  calloutDescription: {
    color: APP_CONFIG.theme.text,
    fontSize: 13,
    lineHeight: 18,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;
