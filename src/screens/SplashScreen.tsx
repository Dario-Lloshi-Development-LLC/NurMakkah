import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const SplashScreen: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Main" as never);
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/rituals_optimized/app_icon.webp")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Nur Makkah</Text>
      <Text style={styles.subtitle}>Complete Guide for Nur Makkah</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#2E7D32",
    flex: 1,
    justifyContent: "center",
  },
  logo: {
    height: width * 0.3,
    marginBottom: 20,
    width: width * 0.3,
  },
  subtitle: {
    color: "#E8F5E8",
    fontSize: 16,
    textAlign: "center",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default SplashScreen;
