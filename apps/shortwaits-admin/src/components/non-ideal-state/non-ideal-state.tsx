import React, { Children } from "react";
import { Image, Dimensions, View } from "react-native";
import { useTheme } from "../../theme";
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
  noEvents: {
    source: require("./assets/no-events.png"),
    message: "No events",
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
          width: Dimensions.get("window").width * 0.75,
          height: Dimensions.get("window").width * 0.75,
          resizeMode: "stretch",
        }}
        {...rest}
      />
      <Text
        text={images[image].message}
        preset="text"
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
