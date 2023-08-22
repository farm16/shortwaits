import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Container, Emoji, Space, Text } from "../../../components";
import { BusinessLabelsType, EventDtoType } from "@shortwaits/shared-lib";
import { useTheme } from "../../../theme";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { statusDisplayMessages, statusDisplayMessagesColor } from "../../../utils/status-color";
import {
  getPrettyStringFromPriceWithSymbol,
  getPrettyDateFromISO,
  getPrettyTimeRangeFromISO,
  truncated,
  navigate,
} from "../../../utils";
import { isEmpty, truncate } from "lodash";
import { useService } from "../../../store";

const IconNames = {
  date: "calendar-month-outline",
  time: "clock-outline",
  status: "list-status",
  price: "currency-usd",
  notes: "notebook-outline",
  labels: "label-multiple-outline",
  description: "text",
  service: "hand-extended-outline",
};

type InfoItemProps = {
  title: string;
  value: string | BusinessLabelsType;
  iconName: keyof typeof IconNames;
  onPress: () => void;
};

function InfoItem({ title, value, onPress, iconName }: InfoItemProps) {
  const { Colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={{
        flex: 1,
      }}
    >
      <Container direction="row" style={{ alignItems: "center", marginBottom: 4 }}>
        <Icon name={IconNames[iconName]} color={Colors.disabledText} size={20} />
        <Text
          style={{
            color: Colors.disabledText,
            fontWeight: "500",
            fontSize: 16,
            marginLeft: 6,
          }}
        >
          {title}
        </Text>
      </Container>

      {title === "Labels" ? (
        <Container direction="row">
          {isEmpty(value)
            ? null
            : (value as BusinessLabelsType).map(label => <Emoji size={14} name={label.emojiShortName} />)}
        </Container>
      ) : (
        <Text
          preset="text"
          style={[
            {
              fontWeight: title === "Status" ? "700" : "500",
              fontSize: 16,
              textTransform: title === "Status" ? "uppercase" : undefined,
              color: title === "Status" ? statusDisplayMessagesColor[value as string] : Colors.text,
            },
          ]}
        >
          {title === "Status" ? statusDisplayMessages[value as string] : truncated(value as string, 20)}
        </Text>
      )}
    </Pressable>
  );
}

export function EventScreenHeader({ event }: { event: EventDtoType }) {
  // console.log("event", JSON.stringify(event, null, 2));
  const { name: serviceName } = useService(event?.serviceId);

  const handlePress = () => {
    navigate("modals", {
      screen: "form-modal-screen",
      params: {
        form: "updateEvent",
        initialValues: event,
      },
    });
  };
  return (
    <View style={styles.root}>
      {event?.description ? (
        <Container direction="row">
          <InfoItem onPress={handlePress} title="Description" iconName="description" value={event.description} />
          <InfoItem onPress={handlePress} title="Service" iconName="service" value={serviceName} />
        </Container>
      ) : null}
      <Space direction="horizontal" size="tiny" extra={8} />
      <Container direction="row">
        <InfoItem onPress={handlePress} title="Status" iconName="status" value={event.status.statusName} />
        <InfoItem
          onPress={handlePress}
          title="Cost"
          iconName="price"
          value={getPrettyStringFromPriceWithSymbol("USD", event?.priceExpected)}
        />
      </Container>
      <Space direction="horizontal" size="small" />
      <Container direction="row">
        <InfoItem onPress={handlePress} title="Date" iconName="date" value={getPrettyDateFromISO(event?.startTime)} />
        <InfoItem
          onPress={handlePress}
          title="Time"
          iconName="time"
          value={getPrettyTimeRangeFromISO(event?.startTime, event?.expectedEndTime)}
        />
      </Container>
      <Space direction="horizontal" size="small" />
      <Container direction="row">
        <InfoItem onPress={handlePress} title="Notes" iconName="notes" value={truncate(event?.notes, { length: 30 })} />
        <InfoItem onPress={handlePress} title="Labels" iconName="labels" value={event?.labels} />
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  description: {},
});
