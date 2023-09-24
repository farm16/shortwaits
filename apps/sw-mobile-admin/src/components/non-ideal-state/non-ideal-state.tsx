import React, { Children } from "react";
import { Image, Dimensions, View } from "react-native";
import { SvgProps } from "react-native-svg";
import { useTheme } from "../../theme";
import { ThemeColorName } from "../../theme/Colors";
import { Space, Text } from "../common";
import { NoClients, NoEvents, NoTransactions } from "../../assets";

export type NonIdealStateTypes = keyof typeof images;

interface NonIdealStateProps {
  image: NonIdealStateTypes;
  buttons?: React.ReactNode | React.ReactNode[];
  imageProps?: SvgProps;
}

const images = {
  noTransactions: {
    Image: props => <NoTransactions {...props} />,
    message: "No transactions found",
    messageColor: "brandAccent" as ThemeColorName,
  },
  noServices: {
    Image: props => <NoClients {...props} />,
    message: "No clients found",
    messageColor: "brandAccent" as ThemeColorName,
  },
  noClients: {
    Image: props => <NoClients {...props} />,
    message: "No clients found",
    messageColor: "brandAccent" as ThemeColorName,
  },
  noStaff: {
    Image: props => <NoClients {...props} />,
    message: "No staff found",
    messageColor: "brandAccent" as ThemeColorName,
  },
  noClientsInEvent: {
    Image: props => <NoClients {...props} />,
    message: "",
    messageColor: "brandAccent" as ThemeColorName,
  },
  noStaffInEvent: {
    Image: props => <NoClients {...props} />,
    message: "",
    messageColor: "brandAccent" as ThemeColorName,
  },
  noEvents: {
    Image: props => <NoEvents {...props} />,
    message: "No events found",
    messageColor: "brandAccent" as ThemeColorName,
  },
};

export const NonIdealState = (props: NonIdealStateProps) => {
  const {
    image = "noClients",
    buttons,
    imageProps = {
      width: Dimensions.get("window").width * 0.5,
      height: Dimensions.get("window").width * 0.5,
    },
  } = props;

  const arrayChildren = Children.toArray(buttons);

  const { Colors } = useTheme();

  const Image = images[image].Image;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: Colors.transparent,
        marginTop: 16,
        marginBottom: 20,
      }}
    >
      <Image {...imageProps} />

      {images[image].message ? (
        <Text
          text={images[image].message}
          preset="text"
          style={[
            {
              color: Colors[images[image].messageColor],
              textTransform: "uppercase",
              padding: 16,
            },
          ]}
        />
      ) : null}
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
