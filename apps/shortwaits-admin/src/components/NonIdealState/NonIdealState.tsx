import React, { Children, cloneElement } from "react";
import { Image, ImageStyle, Dimensions, View, TextStyle } from "react-native";
import { Colors, useTheme } from "../../theme";
import { ThemeColorName } from "../../theme/Colors";
import { Space, Text } from "../common";

interface NonIdealStateProps {
  image: keyof typeof images;
  buttons?: React.ReactNode | React.ReactNode[];
}

const images = {
  noClients: {
    source: require("./assets/no-clients.png"),
    message: "No registered clients",
    messageColor: "brandAccent" as ThemeColorName,
  },
};
export const NonIdealState = (props: NonIdealStateProps) => {
  const { image = "noClients", buttons, ...rest } = props;

  const arrayChildren = Children.toArray(buttons);

  const { Colors } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        //backgroundColor: "red",
      }}
    >
      <Image
        source={images[image].source}
        style={{
          width: Dimensions.get("screen").width * 0.8,
          height: Dimensions.get("screen").width * 0.8,
          resizeMode: "stretch",
        }}
        {...rest}
      />
      <Text
        text={images[image].message}
        preset="title3"
        style={[
          {
            color: Colors[images[image].messageColor],
            textTransform: "uppercase",
          },
        ]}
      />
      {Children.map(arrayChildren, (child, _index) => {
        return (
          <>
            <Space />
            {child}
            <Space />
          </>
        );
      })}
    </View>
  );
};
