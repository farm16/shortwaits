import { useTheme } from "../../../theme";
import { Button, Text } from "../../../components";
import { truncate } from "lodash";
import React from "react";
import { View, StyleSheet } from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

export const EventsScreenHeader = ({ user, business }) => {
  const { Colors } = useTheme();
  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: Colors.white,
        },
      ]}
    >
      <Button
        preset="none"
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <MaterialCommunityIcon
          name={"account-box"}
          size={21}
          color={Colors.brandSecondary}
          style={{ marginRight: 5 }}
        />
        <Text
          text={truncate(user.username, { length: 16, separator: "." })}
          style={[
            styles.title,
            {
              color: Colors.brandAccent,
            },
          ]}
        />
      </Button>
      <Button
        preset="none"
        // withShadow
        style={{
          flexDirection: "row",
          borderRadius: 15,
          paddingVertical: 2,
          paddingHorizontal: 10,
          alignItems: "center",
          backgroundColor: Colors.white,
        }}
      >
        <MaterialCommunityIcon
          name={"account-box-multiple"}
          size={21}
          color={Colors.brandSecondary}
          style={{ marginRight: 5 }}
        />
        <Text
          preset="none"
          style={[
            styles.title,
            {
              color: Colors.brandAccent,
            },
          ]}
          text="Staff"
        />
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    paddingRight: 12,
    paddingLeft: 25,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    marginRight: "auto",
    fontSize: 17,
    fontWeight: "600",
  },
});
