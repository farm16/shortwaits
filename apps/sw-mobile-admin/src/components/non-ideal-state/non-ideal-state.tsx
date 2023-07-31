import React, { Children } from "react";
import { Image, Dimensions, View } from "react-native";
import { useTheme } from "../../theme";
import { ThemeColorName } from "../../theme/Colors";
import { Space, Text } from "../common";
import { NoClients } from "../../assets/images/svg-components/no-clients";
import { NoEvents } from "../../assets/images/svg-components/no-events";
import { SvgProps } from "react-native-svg";

interface NonIdealStateProps {
  image: keyof typeof images;
  buttons?: React.ReactNode | React.ReactNode[];
  imageProps?: SvgProps;
}

const images = {
  noClients: {
    Image: props => <NoClients {...props} />,
    message: "No clients",
    messageColor: "brandAccent" as ThemeColorName,
  },
  noStaff: {
    Image: props => <NoClients {...props} />,
    message: "No staff",
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
    message: "No events",
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
      <Image {...imageProps} />
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
