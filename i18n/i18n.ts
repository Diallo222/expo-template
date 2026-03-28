import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      loginTitle: 'Sign in',
      email: 'Email',
      password: 'Password',
      signIn: 'Sign in',
      openSheet: 'Open bottom sheet',
      sheetTitle: 'Example sheet',
      home: 'Home',
      tabTwo: 'Tab Two',
    },
  },
} as const;

void i18n.use(initReactI18next).init({
  resources,
  lng: Localization.getLocales()[0]?.languageCode ?? 'en',
  fallbackLng: 'en',
  compatibilityJSON: 'v4',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
