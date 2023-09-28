import React, { Children, useMemo } from "react";
import { Image, Dimensions, View } from "react-native";
import { SvgProps } from "react-native-svg";
import { useTheme } from "../../theme";
import { ThemeColorName } from "../../theme/Colors";
import { Space, Text } from "../common";
import { NoClients, NoEvents, NoTransactions, NoData } from "../../assets";
import { useIntl } from "react-intl";

export type NonIdealStateTypes =
  | "noData"
  | "noTransactions"
  | "noServices"
  | "noClients"
  | "noStaff"
  | "noEvents"
  | "noClientsInEvent"
  | "noStaffInEvent";

interface NonIdealStateProps {
  type: NonIdealStateTypes;
  buttons?: React.ReactNode | React.ReactNode[];
  imageProps?: SvgProps;
}

export const NonIdealState = (props: NonIdealStateProps) => {
  const {
    type = "noClients",
    buttons,
    imageProps = {
      width: Dimensions.get("window").width * 0.5,
      height: Dimensions.get("window").width * 0.5,
    },
  } = props;

  const intl = useIntl();

  const nonIdealTypes = useMemo(() => {
    return {
      noData: {
        Image: props => <NoData {...props} />,
        message: intl.formatMessage({ id: "NonIdealState.noData.message" }),
        messageColor: "brandAccent" as ThemeColorName,
      },
      noTransactions: {
        Image: props => <NoTransactions {...props} />,
        message: intl.formatMessage({ id: "NonIdealState.noTransactions.message" }),
        messageColor: "brandAccent" as ThemeColorName,
      },
      noServices: {
        Image: props => <NoClients {...props} />,
        message: intl.formatMessage({ id: "NonIdealState.noServices.message" }),
        messageColor: "brandAccent" as ThemeColorName,
      },
      noClients: {
        Image: props => <NoClients {...props} />,
        message: intl.formatMessage({ id: "NonIdealState.noClients.message" }),
        messageColor: "brandAccent" as ThemeColorName,
      },
      noStaff: {
        Image: props => <NoClients {...props} />,
        message: intl.formatMessage({ id: "NonIdealState.noStaff.message" }),
        messageColor: "brandAccent" as ThemeColorName,
      },
      noClientsInEvent: {
        Image: props => <NoClients {...props} />,
        message: intl.formatMessage({ id: "NonIdealState.noClientsInEvent.message" }),
        messageColor: "brandAccent" as ThemeColorName,
      },
      noStaffInEvent: {
        Image: props => <NoClients {...props} />,
        message: intl.formatMessage({ id: "NonIdealState.noStaffInEvent.message" }),
        messageColor: "brandAccent" as ThemeColorName,
      },
      noEvents: {
        Image: props => <NoEvents {...props} />,
        message: intl.formatMessage({ id: "NonIdealState.noEvents.message" }),
        messageColor: "brandAccent" as ThemeColorName,
      },
    };
  }, [intl]);

  const arrayChildren = Children.toArray(buttons);

  const { Colors } = useTheme();

  const Image = nonIdealTypes[type].Image;
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

      {nonIdealTypes[type].message ? (
        <Text
          text={nonIdealTypes[type].message}
          preset="text"
          style={[
            {
              color: Colors[nonIdealTypes[type].messageColor],
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
