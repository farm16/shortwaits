import React, { ComponentProps } from "react";
import { Searchbar as SearchBarPaper } from "react-native-paper";
import { StyleProp, TextStyle, ViewStyle } from "react-native";

import { useTheme } from "../../theme";
import { DeepPartial } from "../..";

type SearchBarProps = ComponentProps<typeof SearchBarPaper> & {
  iPlaceholder?: string;
};

export const SearchBar = (props: SearchBarProps) => {
  const {
    iPlaceholder,
    autoCapitalize = "none",
    clearButtonMode = "always",
    style: styleOverride,
    autoCorrect = false,
    ...rest
  } = props;
  const { Colors } = useTheme();

  const style: StyleProp<TextStyle> & StyleProp<ViewStyle> = {
    width: "100%",
    // elevation: 0,
    backgroundColor: Colors.white,
  };

  const searchBarStyle = [style, styleOverride];
  const SearchBarTheme: DeepPartial<ReactNativePaper.Theme> = {
    colors: {
      primary: Colors.brandSecondary,
      accent: Colors.brandAccent,
      text: Colors.darkGray,
    },
    roundness: 0,
  };
  return (
    <SearchBarPaper
      theme={SearchBarTheme}
      iconColor={Colors.white}
      style={searchBarStyle}
      autoCorrect={autoCorrect}
      autoCapitalize={autoCapitalize}
      clearButtonMode={clearButtonMode}
      placeholderTextColor={Colors.subText}
      autoFocus={true}
      placeholder={"Search"}
      {...rest}
    />
  );
};
