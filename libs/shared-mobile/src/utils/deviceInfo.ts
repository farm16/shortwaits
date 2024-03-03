import type { AvailableLanguagesType } from "@shortwaits/shared-lib";
import { Appearance, ColorSchemeName } from "react-native";
import { Locale } from "react-native-localize";
import { InitialStaticProps, initialStaticProps } from "./initialStaticProps";
import { getDeviceLanguageCode, getDeviceLocale } from "./locales";

/**
 * this state is considered dynamic where the user can      update, opposed to initialStaticProps
 */
export interface MobileAdminStateType {
  locale: Locale | null; // locale is the all the data from device's locale
  language: string | null;
  preferredLanguage: AvailableLanguagesType;
  theme: ColorSchemeName | null;
  preferredTheme: ColorSchemeName;
  /**
   * This is the initial props are statically set in the app at the time of js bundle load.
   */
  deviceStaticProps: InitialStaticProps;
}

/**
 * this state is considered dynamic where the user can      update, opposed to initialStaticProps
 */
export const deviceInfoInitialState: MobileAdminStateType = {
  locale: getDeviceLocale(),
  language: getDeviceLanguageCode(),
  preferredLanguage: null,
  theme: Appearance.getColorScheme() ?? null,
  preferredTheme: null,
  deviceStaticProps: initialStaticProps,
};
