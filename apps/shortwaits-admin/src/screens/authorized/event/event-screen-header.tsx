import React from "react";
import { View, StyleSheet } from "react-native";
import { Container, Space, Text } from "../../../components";
import { EventDtoType } from "@shortwaits/shared-types";
import { useTheme } from "../../../theme";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  statusDisplayMessages,
  statusDisplayMessagesColor,
} from "../../../utils/status-color";

const IconNames = {
  date: "calendar-month-outline",
  time: "clock-outline",
  status: "alert-box-outline",
  price: "hand-coin-outline",
};

function InfoItem({
  title,
  value,
  iconName,
}: {
  title: string;
  value: string;
  iconName: keyof typeof IconNames;
}) {
  const { Colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Container
        direction="row"
        style={{ alignItems: "center", marginBottom: 4 }}
      >
        <Icon
          name={IconNames[iconName]}
          color={Colors.brandPrimary}
          size={23}
        />
        <Text
          style={{
            color: Colors.disabledText,
            fontWeight: "500",
            fontSize: 14,
            marginLeft: 6,
          }}
        >
          {title}
        </Text>
      </Container>
      <Text
        preset="text"
        style={{
          fontWeight: title === "Status" ? "600" : "500",
          fontSize: 14,
          textTransform: title === "Status" ? "uppercase" : undefined,
          color:
            title === "Status"
              ? statusDisplayMessagesColor[value]
              : Colors.text,
        }}
      >
        {title === "Status" ? statusDisplayMessages[value] : value}
      </Text>
    </View>
  );
}

export function EventScreenHeader({ event }: { event: EventDtoType }) {
  return (
    <View style={styles.root}>
      <Text
        preset="subText"
        style={{
          fontSize: 14,
        }}
      >
        {event.description}
      </Text>
      <Space direction="horizontal" size="regular" extra={8} />
      <Container direction="row">
        <InfoItem
          title="Status"
          iconName="status"
          value={event.status.statusName}
        />
        <InfoItem title="Cost" iconName="price" value={"$ 15.00"} />
      </Container>
      <Space direction="horizontal" size="small" />
      <Container direction="row">
        <InfoItem title="Date" iconName="date" value={"Wednesday, 24 Aug"} />
        <InfoItem title="Time" iconName="time" value={"13:00 PM - 15:00 PM"} />
      </Container>
      <Space direction="horizontal" size="small" extra={6} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 16,
  },
  description: {},
});
