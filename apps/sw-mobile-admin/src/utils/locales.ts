import * as RNLocalize from "react-native-localize";
import { updateSuggestedLanguage, useMobileAdmin } from "../store";
import { useDispatch } from "react-redux";

export const getDeviceLocales = () => {
  const locales = RNLocalize.getLocales();
  return locales;
};

export const getDeviceCountry = () => {
  const locales = RNLocalize.getLocales();
  return locales[0].countryCode;
};

export const usePreferredLanguage = () => {
  const dispatch = useDispatch();
  const { preferredLanguage, suggestedLanguage } = useMobileAdmin();

  if (preferredLanguage) {
    console.log("using preferred language from store");
    return preferredLanguage;
  }

  console.log("getting preferred language from device");
  const locales = RNLocalize.getLocales();
  console.log("device locale at index 0: ", locales[0].languageCode);
  const deviceLanguage = locales[0].languageCode || "en";

  if (deviceLanguage === "es") {
    console.log("detected device language as 'es' ");
    console.log("setting preferred language to es");
    dispatch(updateSuggestedLanguage("es"));
    return "es";
  }

  console.log("returning language as", deviceLanguage);
  return suggestedLanguage;
};
