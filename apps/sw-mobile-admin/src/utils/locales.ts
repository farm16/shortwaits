import * as RNLocalize from "react-native-localize";
import { useMobileAdmin } from "../store";
import copies from "../i18n/copies.json";
import { useMemo } from "react";
import { AvailableLanguagesType } from "@shortwaits/shared-lib";

export const getDeviceLocales = () => {
  const locales = RNLocalize.getLocales();
  return locales;
};

export const getDeviceCountry = () => {
  const locales = RNLocalize.getLocales();
  return locales[0].languageCode || "en";
};

export const getSupportedLanguageCode = () => {
  const regex = /es/;
  const supportedLanguages = Object.keys(JSON.parse(JSON.stringify(copies))) as AvailableLanguagesType[];
  let deviceLanguageCode = RNLocalize.getLocales()[0].languageCode as AvailableLanguagesType;
  if (regex.test(deviceLanguageCode)) {
    deviceLanguageCode = "es";
  }
  const languageCode = supportedLanguages.includes(deviceLanguageCode) ? deviceLanguageCode : "en";
  console.log("LANGUAGE CODE >>> ", languageCode);

  return languageCode;
};

export const languageCode = RNLocalize.getLocales()[0].languageCode;

export const usePreferredLanguage = () => {
  const { preferredLanguage } = useMobileAdmin();
  console.log("PREFERRED_LANGUAGE >>> ", preferredLanguage);
  return useMemo(() => preferredLanguage, [preferredLanguage]);
};
