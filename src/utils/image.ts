const imageMap: { [key: string]: any } = {
  "pillars_of_islam.png": require("../assets/images/rituals_optimized/pillars_of_islam.webp"),
  "travel_etiquette.png": require("../assets/images/rituals_optimized/travel_etiquette.webp"),
  "ihram.png": require("../assets/images/rituals_optimized/ihram.webp"),
  "prohibitions.png": require("../assets/images/rituals_optimized/prohibitions.webp"),
  "miqats.jpg": require("../assets/images/rituals_optimized/miqats.webp"),
  "hajj_obligation.png": require("../assets/images/rituals_optimized/hajj_obligation.webp"),
  "hajj_kaaba_1.jpg": require("../assets/images/rituals_optimized/hajj_kaaba_1.webp"),
};

export const getImageSource = (imageName: string) => {
  return imageMap[imageName];
};
