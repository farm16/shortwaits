import * as RNLocalize from "react-native-localize";
import { useMobileAdmin } from "../store";
import copies from "../i18n/copies.json";
import { useMemo } from "react";

export const getDeviceLocales = () => {
  const locales = RNLocalize.getLocales();
  return locales;
};

export const getDeviceCountry = () => {
  const locales = RNLocalize.getLocales();
  return locales[0].languageCode || "en";
};

export const getDeviceLanguageCode = () => {
  const regex = /es/;
  const supportedLanguages = Object.keys(JSON.parse(JSON.stringify(copies)));
  let deviceLanguageCode = RNLocalize.getLocales()[0].languageCode;
  if (regex.test(deviceLanguageCode)) {
    deviceLanguageCode = "es";
  }
  const languageCode = supportedLanguages.includes(deviceLanguageCode) ? deviceLanguageCode : "en";
  console.log("LOCALE >>> ", languageCode);

  return languageCode;
};

export const usePreferredLanguage = () => {
  const { preferredLanguage } = useMobileAdmin();
  console.log("PREFERRED_LANGUAGE >>> ", preferredLanguage);
  return useMemo(() => preferredLanguage, [preferredLanguage]);
};
