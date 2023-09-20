import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { BusinessLabelsType, EventDtoType } from "@shortwaits/shared-lib";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { isEmpty, truncate } from "lodash";

import { Container, Emoji, Space, Text } from "../../../components";
import { useTheme } from "../../../theme";
import {
  statusDisplayMessages,
  statusDisplayMessagesBackgroundColor,
  statusDisplayMessagesColor,
} from "../../../utils/status-color";
import {
  getPrettyStringFromPriceWithSymbol,
  getPrettyDateFromISO,
  getPrettyTimeRangeFromISO,
  truncated,
} from "../../../utils";
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
  onPress?: () => void;
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
            fontSize: 14,
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
            : (value as BusinessLabelsType).map(label => (
                <Emoji key={label.emojiShortName} size={14} name={label.emojiShortName} />
              ))}
        </Container>
      ) : (
        <View
          style={
            title === "Status"
              ? {
                  backgroundColor: statusDisplayMessagesBackgroundColor[value as string],
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 5,
                  alignSelf: "flex-start",
                }
              : undefined
          }
        >
          <Text
            preset="text"
            style={[
              {
                fontWeight: "500",
                fontSize: 14,
                textTransform: title === "Status" ? "capitalize" : undefined,
                color: title === "Status" ? statusDisplayMessagesColor[value as string] : Colors.text,
              },
            ]}
          >
            {title === "Status" ? statusDisplayMessages[value as string] : truncated(value as string, 20)}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

export function EventScreenHeader({ event }: { event: EventDtoType }) {
  const currentService = useService(event?.serviceId);
  return (
    <View style={styles.root}>
      <Container direction="row">
        {currentService?.name ? (
          <InfoItem title="Service" iconName="service" value={currentService?.name ?? ""} />
        ) : null}
        {event?.description ? <InfoItem title="Description" iconName="description" value={event.description} /> : null}
      </Container>
      <Space direction="horizontal" size="tiny" extra={8} />
      <Container direction="row">
        <InfoItem title="Status" iconName="status" value={event.status.statusName ?? ""} />
        <InfoItem
          title="Cost"
          iconName="price"
          value={getPrettyStringFromPriceWithSymbol("USD", event?.priceExpected ?? 0)}
        />
      </Container>
      <Space direction="horizontal" size="tiny" />
      <Container direction="row">
        <InfoItem title="Date" iconName="date" value={getPrettyDateFromISO(event?.startTime)} />
        <InfoItem
          title="Time"
          iconName="time"
          value={getPrettyTimeRangeFromISO(event?.startTime, event?.expectedEndTime)}
        />
      </Container>
      {event?.notes && event?.labels && event?.labels.length > 0 ? <Space direction="horizontal" size="tiny" /> : null}
      <Container direction="row">
        {event?.notes ? (
          <InfoItem title="Notes" iconName="notes" value={truncate(event?.notes, { length: 30 })} />
        ) : null}
        {event?.labels && event?.labels.length > 0 ? (
          <InfoItem title="Labels" iconName="labels" value={event?.labels} />
        ) : null}
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
