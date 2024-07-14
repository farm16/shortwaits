import React, { Children, useMemo } from "react";
import { useIntl } from "react-intl";
import { Dimensions, View } from "react-native";
import { SvgProps } from "react-native-svg";
import { NoClients, NoData, NoEvents, NoTransactions } from "../../assets";
import { useTheme } from "../../theme";
import { ThemeColorName } from "../../theme/Colors";
import { Space, Text } from "../common";

const _NonIdealProps = {
  noData: {
    Image: (props: React.JSX.IntrinsicAttributes & SvgProps) => <NoData {...props} />,
    message: "NonIdealState.noData.message",
    intlMessageCode: "NonIdealState.noData.message",
    messageColor: "brandAccent" as ThemeColorName,
  },
  noTransactions: {
    Image: (props: React.JSX.IntrinsicAttributes & SvgProps) => <NoTransactions {...props} />,
    message: "NonIdealState.noTransactions.message",
    intlMessageCode: "NonIdealState.noTransactions.message",
    messageColor: "brandAccent" as ThemeColorName,
  },
  noServices: {
    Image: (props: React.JSX.IntrinsicAttributes & SvgProps) => <NoClients {...props} />,
    message: "NonIdealState.noServices.message",
    intlMessageCode: "NonIdealState.noServices.message",
    messageColor: "brandAccent" as ThemeColorName,
  },
  noClients: {
    Image: (props: React.JSX.IntrinsicAttributes & SvgProps) => <NoClients {...props} />,
    message: "NonIdealState.noClients.message",
    intlMessageCode: "NonIdealState.noClients.message",
    messageColor: "brandAccent" as ThemeColorName,
  },
  noStaff: {
    Image: (props: React.JSX.IntrinsicAttributes & SvgProps) => <NoClients {...props} />,
    message: "NonIdealState.noStaff.message",
    intlMessageCode: "NonIdealState.noStaff.message",
    messageColor: "brandAccent" as ThemeColorName,
  },
  noClientsInEvent: {
    Image: (props: React.JSX.IntrinsicAttributes & SvgProps) => <NoClients {...props} />,
    message: "NonIdealState.noClientsInEvent.message",
    intlMessageCode: "NonIdealState.noClientsInEvent.message",
    messageColor: "brandAccent" as ThemeColorName,
  },
  noStaffInEvent: {
    Image: (props: React.JSX.IntrinsicAttributes & SvgProps) => <NoClients {...props} />,
    message: "NonIdealState.noStaffInEvent.message",
    intlMessageCode: "NonIdealState.noStaffInEvent.message",
    messageColor: "brandAccent" as ThemeColorName,
  },
  noEvents: {
    Image: (props: React.JSX.IntrinsicAttributes & SvgProps) => <NoEvents {...props} />,
    message: "NonIdealState.noEvents.message",
    intlMessageCode: "NonIdealState.noEvents.message",
    messageColor: "brandAccent" as ThemeColorName,
  },
  noFavorites: {
    Image: (props: React.JSX.IntrinsicAttributes & SvgProps) => <NoClients {...props} />,
    message: "NonIdealState.noFavorites.message",
    intlMessageCode: "NonIdealState.noFavorites.message",
    messageColor: "brandAccent" as ThemeColorName,
  },
  noHistory: {
    Image: (props: React.JSX.IntrinsicAttributes & SvgProps) => <NoData {...props} />,
    message: "NonIdealState.noHistory.message",
    intlMessageCode: "NonIdealState.noHistory.message",
    messageColor: "brandAccent" as ThemeColorName,
  },
} as const;

export type NonIdealStateTypes = keyof typeof _NonIdealProps;

interface NonIdealStateProps {
  type: NonIdealStateTypes;
  buttons?: React.ReactNode | React.ReactNode[];
  imageProps?: SvgProps;
  customMessage?: string;
}

export const NonIdealState = (props: NonIdealStateProps) => {
  const {
    type = "noClients",
    customMessage,
    buttons,
    imageProps = {
      width: Dimensions.get("window").width * 0.5,
      height: Dimensions.get("window").width * 0.5,
    },
  } = props;
  const { Colors } = useTheme();
  const intl = useIntl();
  const nonIdealTypes = useMemo(() => {
    return _NonIdealProps;
  }, []);

  const arrayChildren = Children.toArray(buttons);
  const Image = nonIdealTypes[type].Image;
  const message = customMessage || intl.formatMessage({ id: nonIdealTypes[type].intlMessageCode });

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
          text={message}
          preset="text"
          style={[
            {
              color: Colors[nonIdealTypes[type].messageColor],
              textTransform: "uppercase",
              padding: 16,
              textAlign: "center",
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
