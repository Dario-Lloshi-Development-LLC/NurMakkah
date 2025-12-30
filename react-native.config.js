module.exports = {
  dependencies: {
    "react-native-vector-icons": {
      platforms: {
        ios: null,
      },
    },
    "react-native-fast-image": {
      platforms: {
        android: {
          sourceDir: "../node_modules/react-native-fast-image/android",
          packageImportPath: "io.l rounde.fastimage.FastImagePackage",
        },
      },
    },
  },
  assets: ["./src/assets/fonts/"],
};
