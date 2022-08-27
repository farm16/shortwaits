import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

import { useTheme } from "../../../theme";
import { Button, ButtonProps, Text } from "../../common";

interface AuthorizedScreenHeaderProps {
  title: string;
  iconName1?: string;
  props1?: ButtonProps;
  iconName2?: string;
  props2?: ButtonProps;
  iconName3?: string;
  props3?: ButtonProps;
  children?: ReactNode;
}
export const AuthorizedScreenHeader: FC<AuthorizedScreenHeaderProps> = (
  props
) => {
  const {
    title = "",
    iconName1,
    iconName2,
    iconName3,
    props1,
    props2,
    props3,
    children = null,
  } = props;
  const { Colors } = useTheme();

  const Icon = ({ name, ...rest }) => (
    <Button preset="none" {...rest}>
      <MaterialCommunityIcon
        name={name}
        size={25}
        color={Colors.brandAccent}
        style={{ marginRight: 17 }}
      />
    </Button>
  );
  const renderIcons = () => {
    return (
      <>
        {iconName3 ? <Icon name={iconName3} {...props3} /> : null}
        {iconName2 ? <Icon name={iconName2} {...props2} /> : null}
        {iconName1 ? <Icon name={iconName1} {...props1} /> : null}
      </>
    );
  };
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: Colors.white,
        },
      ]}
    >
      <Text
        text={title}
        style={[
          styles.title,
          {
            color: Colors.brandAccent,
          },
        ]}
      />
      {children ?? renderIcons()}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingRight: 12,
    paddingLeft: 25,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  title: {
    marginRight: "auto",
    fontSize: 23,
    fontWeight: "bold",
  },
});
