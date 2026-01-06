export const APP_CONFIG = {
  name: "Nur Makkah",
  version: "1.0.0",
  theme: {
    primary: "#2E7D32",
    secondary: "#4CAF50",
    accent: "#81C784",
    background: "#F5F5F5",
    surface: "#FFFFFF",
    text: "#333333",
    textSecondary: "#666666",
  },
  animation: {
    duration: {
      short: 200,
      medium: 300,
      long: 500,
    },
  },
  storage: {
    hajjDataKey: "@nur_makkah_data",
    settingsKey: "@nur_makkah_settings",
    languageKey: "@nur_makkah_language",
  },
} as const;

export const SUPPORTED_LANGUAGES = {
  albanian: "sq",
  arabic: "ar",
  english: "en",
} as const;

export type SupportedLanguage = keyof typeof SUPPORTED_LANGUAGES;

export const CATEGORIES = {
  PILLARS_OF_ISLAM: "shtyllat_e_islamit",
  TRAVEL_ETIQUETTE: "edukata_e_udhetimit",
  IHRAM: "ihrami",
  IHRAM_PROHIBITIONS: "ndalesat_gjate_ihramit",
  MIQAT: "vendcaktimet",
} as const;

export type CategoryType = keyof typeof CATEGORIES;

export const SCREENS = {
  SPLASH: "Splash",
  MAIN: "Main",
  DETAIL: "Detail",
  SEARCH: "Search",
  SETTINGS: "Settings",
  CONTENT: "Content",
  QIBLA: "Qibla",
  TRACKER: "Tracker",
} as const;

export type ScreenName = keyof typeof SCREENS;
