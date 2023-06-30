import React from "react";
import { View, Image as RNImage } from "react-native";

import { AutoImage as Image } from "../common";
import { getDimensions } from "../../theme";
import logo from "../../assets/images/logo.png";

const MAX_LOGO_HEIGHT = 100;

interface LogoProps {
  withMargin?: boolean;
  center?: boolean;
}
export function Logo({ withMargin = true, center = true }: LogoProps) {
  const [currentHeight, setCurrentHeight] = React.useState(MAX_LOGO_HEIGHT);
  const { height: SCREEN_HEIGHT } = getDimensions();

  const minViewHeight = SCREEN_HEIGHT * 0.25;
  const maxViewHeight = SCREEN_HEIGHT * 0.4;

  const fromCurrentViewHeight = currentHeight * 0.5;

  const logoSide = Math.min(fromCurrentViewHeight, MAX_LOGO_HEIGHT);
  return withMargin ? (
    <View
      style={{
        alignItems: "center",
        backgroundColor: "transparent",
        minHeight: minViewHeight,
        maxHeight: maxViewHeight,
        justifyContent: center ? "center" : "flex-start",
      }}
      onLayout={e => setCurrentHeight(e.nativeEvent.layout.height)}
    >
      <Image
        source={logo}
        style={{
          width: logoSide,
          height: logoSide,
        }}
      />
    </View>
  ) : (
    <RNImage
      source={logo}
      style={{
        width: logoSide,
        height: logoSide,
      }}
    />
  );
}
