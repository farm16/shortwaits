import { isEmpty } from "lodash";
import * as RNLocalize from "react-native-localize";

export const getDeviceLocales = () => {
  const locales = RNLocalize.getLocales();
  if (isEmpty(locales)) {
    return null;
  }
  return locales;
};

export const getDeviceLocale = () => {
  const locales = getDeviceLocales();
  if (locales) {
    return locales[0];
  }
  return null;
};

export const getDeviceLanguageCode = () => {
  const locales = getDeviceLocales();
  if (locales) {
    return locales[0].languageCode;
  }
  return null;
};
