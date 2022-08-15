import React, { ComponentProps } from "react";
import { Searchbar as SearchBarPaper } from "react-native-paper";

import { getDimensions, useTheme } from "../../../theme";
import { DeepPartial } from "../../../index.d";
import { StyleProp, TextStyle, ViewStyle } from "react-native";

type SearchBarProps = ComponentProps<typeof SearchBarPaper> & {
  iPlaceholder?: string;
};

export const SearchBar = (props: SearchBarProps) => {
  const {
    placeholder = "Search",
    iPlaceholder,
    autoCapitalize = "none",
    clearButtonMode = "always",
    style: styleOverride,
    autoCorrect = false,
    ...rest
  } = props;
  const { Colors } = useTheme();
  const { width } = getDimensions();
  const style: StyleProp<TextStyle> & StyleProp<ViewStyle> = {
    width: width * 0.9,
    elevation: 0,
    backgroundColor: Colors.lightGray,
  };

  const searchBarStyle = [style, styleOverride];
  const SearchBarTheme: DeepPartial<ReactNativePaper.Theme> = {
    colors: {
      primary: Colors.brandPrimary,
      accent: Colors.brandAccent,
      text: Colors.text,
    },
    roundness: 5,
  };
  return (
    <SearchBarPaper
      theme={SearchBarTheme}
      iconColor={Colors.gray}
      style={searchBarStyle}
      autoCorrect={autoCorrect}
      autoCapitalize={autoCapitalize}
      clearButtonMode={clearButtonMode}
      placeholder={iPlaceholder || placeholder}
      {...rest}
    />
  );
};
