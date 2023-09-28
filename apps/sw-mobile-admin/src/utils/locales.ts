import * as RNLocalize from "react-native-localize";
import { updateSuggestedLanguage, useMobileAdmin } from "../store";
import { useDispatch } from "react-redux";
import copies from "../i18n/copies.json";

export const getDeviceLocales = () => {
  const locales = RNLocalize.getLocales();
  return locales;
};

export const getDeviceCountry = () => {
  const locales = RNLocalize.getLocales();
  return locales[0].languageCode || "en";
};

export const getDeviceLanguageCode = () => {
  const supportedLanguages = Object.keys(JSON.parse(JSON.stringify(copies)));
  const locales = RNLocalize.getLocales()[0].languageCode;

  if (supportedLanguages.includes(locales)) {
    return locales;
  } else {
    return "en";
  }
};

export const usePreferredLanguage = () => {
  const { preferredLanguage, suggestedLanguage } = useMobileAdmin();

  if (preferredLanguage) {
    console.log("using preferred language from store");
    return preferredLanguage;
  } else {
    return suggestedLanguage;
  }
};
