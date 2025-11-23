const imageMap: { [key: string]: any } = {
  'pillars_of_islam.png': require('../assets/images/pillars_of_islam.png'),
  'travel_etiquette.png': require('../assets/images/travel_etiquette.png'),
  'ihram.png': require('../assets/images/ihram.png'),
  'prohibitions.png': require('../assets/images/prohibitions.png'),
  'miqats.jpg': require('../assets/images/miqats.jpg'),
  'duas.png': require('../assets/images/duas.png'),
  'madhab.png': require('../assets/images/madhab.png'),
  'health.png': require('../assets/images/health.png'),
  'tawaf_visual_guide_v3.png': require('../assets/images/tawaf_visual_guide_v3.png'),
  'sai_visual_guide.png': require('../assets/images/sai_visual_guide.png'),
};

export const getImageSource = (imageName: string) => {
  return imageMap[imageName];
};
