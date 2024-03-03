import { AvailableLanguagesType } from "@shortwaits/shared-lib";
import * as RNLocalize from "react-native-localize";
import copies from "../i18n/copies.json";

export const getDeviceLocales = () => {
  const locales = RNLocalize.getLocales();
  return locales;
};

export const getDeviceLocale = () => {
  const locales = RNLocalize.getLocales();
  return locales[0].languageCode || "en";
};

export const getSupportedDeviceLocale = () => {
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
