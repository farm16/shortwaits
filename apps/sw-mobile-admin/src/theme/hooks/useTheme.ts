import { useColorScheme } from "react-native";
import { useSelector } from "react-redux";
import { useMemo } from "react";

import Fonts from "../Fonts";
import Gutters from "../Gutters";
import Images from "../Images";
import Layout from "../Layout";
import Common from "../Common";
import * as DefaultVariables from "../Variables";
import themes from "../themes";
import { Theme, ThemeCommon, ThemeVariables } from "../theme.type";
import ReactNavigationDefaultTheme from "../themes/react-navigation/default";
import ReactNavigationDarkTheme from "../themes/react-navigation/dark-theme";

export const useTheme = () => {
  const colorScheme = useColorScheme();

  // Get current theme from the store
  // const currentTheme = useSelector(
  //   (state: { theme: IThemeState }) => state.theme.theme || "default"
  // )
  const isDark = useSelector((state: { theme }) => state.theme.darkMode);
  const currentTheme = "default";

  const darkMode = isDark === null ? colorScheme === "dark" : isDark;

  const {
    Variables: themeConfigVars = {} as Partial<ThemeVariables>,
    ...themeConfig
  } = themes[currentTheme] || {};

  const { Variables: darkThemeConfigVars = {}, ...darkThemeConfig } = darkMode
    ? themes[`${currentTheme}_dark`] || {}
    : {};

  const themeVariables = useMemo(
    () =>
      mergeVariables(
        DefaultVariables as ThemeVariables,
        themeConfigVars,
        darkThemeConfigVars
      ),
    [themeConfigVars, darkThemeConfigVars]
  );

  const baseTheme = useMemo(
    () => ({
      Fonts: Fonts(themeVariables),
      Gutters: Gutters(themeVariables),
      Images: Images(themeVariables),
      Layout: Layout(themeVariables),
      Common: Common({
        ...themeVariables,
        Layout: Layout(themeVariables),
        Gutters: Gutters(themeVariables),
        Fonts: Fonts(themeVariables),
        Images: Images(themeVariables),
      }) as ThemeCommon,
      ...themeVariables,
    }),
    [themeVariables]
  );

  const formattedTheme = useMemo(
    () => formatTheme(themeVariables, themeConfig || {}),
    [themeVariables, themeConfig]
  );

  const formattedDarkTheme = useMemo(
    () => formatTheme(themeVariables, darkThemeConfig || {}),
    [themeVariables, darkThemeConfig]
  );

  const generatedTheme = useMemo(
    () => buildTheme(darkMode, baseTheme, formattedTheme, formattedDarkTheme),
    [darkMode, baseTheme, formattedTheme, formattedDarkTheme]
  );

  return generatedTheme;
};

const formatTheme = (
  variables: ThemeVariables,
  theme: Partial<Theme>
): Partial<Theme> => {
  return Object.entries(theme).reduce((acc, [name, generate]) => {
    return {
      ...acc,
      [name]: (generate as any)(variables),
    };
  }, {});
};

const mergeVariables = (
  variables: ThemeVariables,
  themeConfig: Partial<ThemeVariables>,
  darkThemeConfig: Partial<ThemeVariables>
): ThemeVariables =>
  Object.entries(variables).reduce((acc, [group, vars]) => {
    return {
      ...acc,
      [group]: {
        ...vars,
        ...((themeConfig as any)[group] || {}),
        ...((darkThemeConfig as any)[group] || {}),
      },
    };
  }, {} as ThemeVariables);

const buildTheme = (
  darkMode: boolean,
  baseTheme: Theme,
  themeConfig: Partial<Theme>,
  darkThemeConfig: Partial<Theme>
) => {
  return {
    ...mergeTheme(baseTheme, themeConfig, darkThemeConfig),
    darkMode,
    NavigationTheme: darkMode
      ? ReactNavigationDarkTheme
      : ReactNavigationDefaultTheme,
  };
};

const mergeTheme = (
  baseTheme: Theme,
  theme: Partial<Theme>,
  darkTheme: Partial<Theme>
): Theme =>
  Object.entries(baseTheme).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: {
        ...value,
        ...((theme as any)[key] || {}),
        ...((darkTheme as any)[key] || {}),
      },
    }),
    {} as Theme
  );
