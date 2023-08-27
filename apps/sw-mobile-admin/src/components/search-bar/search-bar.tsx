import React, { ComponentProps } from "react";
import { Searchbar as SearchBarPaper } from "react-native-paper";
import { Dimensions, Platform, StyleProp, TextStyle, ViewStyle } from "react-native";

import { useTheme } from "../../theme";
import { DeepPartial } from "../..";

type SearchBarProps = ComponentProps<typeof SearchBarPaper> & {
  iPlaceholder?: string;
  isAnimated?: boolean;
};

export const SearchBar = (props: SearchBarProps) => {
  const {
    iPlaceholder,
    autoCapitalize = "none",
    clearButtonMode = "while-editing",
    style: styleOverride,
    autoCorrect = false,
    isAnimated = false,
    ...rest
  } = props;
  const { Colors } = useTheme();

  const style: StyleProp<TextStyle> & StyleProp<ViewStyle> = {
    marginVertical: 16,
  };

  const searchBarStyle = [style, styleOverride];
  const SearchBarTheme: DeepPartial<ReactNativePaper.Theme> = {
    colors: {
      primary: Colors.brandSecondary,
      accent: Colors.brandAccent,
      text: Colors.darkGray,
    },
    roundness: 12,
  };
  return (
    <SearchBarPaper
      {...rest}
      theme={SearchBarTheme}
      iconColor="transparent"
      autoCorrect={autoCorrect}
      autoCapitalize={autoCapitalize}
      clearButtonMode={clearButtonMode}
      placeholderTextColor={Colors.subText}
      autoFocus={true}
      placeholder={"Search"}
      style={searchBarStyle}
    />
  );
};
