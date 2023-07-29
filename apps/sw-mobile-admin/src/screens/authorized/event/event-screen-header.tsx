import React from "react";
import { View, StyleSheet } from "react-native";
import { Container, Emoji, Space, Text } from "../../../components";
import { BusinessLabelsType, EventDtoType } from "@shortwaits/shared-lib";
import { useTheme } from "../../../theme";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { statusDisplayMessages, statusDisplayMessagesColor } from "../../../utils/status-color";
import { getPrettyStringFromPriceWithSymbol, getPrettyDateFromISO, getPrettyTimeRangeFromISO } from "../../../utils";
import { truncate } from "lodash";

const IconNames = {
  date: "calendar-month-outline",
  time: "clock-outline",
  status: "alert-box-outline",
  price: "hand-coin-outline",
  notes: "notebook-outline",
  labels: "label-multiple-outline",
};

type InfoItemProps = {
  title: string;
  value: string | BusinessLabelsType;
  iconName: keyof typeof IconNames;
};

function InfoItem({ title, value, iconName }: InfoItemProps) {
  const { Colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Container direction="row" style={{ alignItems: "center", marginBottom: 4 }}>
        <Icon name={IconNames[iconName]} color={Colors.brandPrimary} size={23} />
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
          {(value as BusinessLabelsType).map(label => (
            <Emoji size={14} name={label.emojiShortName} />
          ))}
        </Container>
      ) : (
        <Text
          preset="text"
          style={[
            {
              fontWeight: title === "Status" ? "700" : "500",
              fontSize: 14,
              textTransform: title === "Status" ? "uppercase" : undefined,
              color: title === "Status" ? statusDisplayMessagesColor[value as string] : Colors.text,
            },
          ]}
        >
          {title === "Status" ? statusDisplayMessages[value as string] : value}
        </Text>
      )}
    </View>
  );
}

export function EventScreenHeader({ event }: { event: EventDtoType }) {
  console.log("event", JSON.stringify(event, null, 2));
  return (
    <View style={styles.root}>
      {event?.description ? (
        <Text
          preset="subText"
          style={{
            fontSize: 14,
            marginTop: 8,
            fontWeight: "500",
          }}
        >
          {event.description}
        </Text>
      ) : null}
      <Space direction="horizontal" size="tiny" extra={8} />
      <Container direction="row">
        <InfoItem title="Status" iconName="status" value={event.status.statusName} />
        <InfoItem
          title="Cost"
          iconName="price"
          value={getPrettyStringFromPriceWithSymbol("USD", event?.priceExpected)}
        />
      </Container>
      <Space direction="horizontal" size="small" />
      <Container direction="row">
        <InfoItem title="Date" iconName="date" value={getPrettyDateFromISO(event?.startTime)} />
        <InfoItem
          title="Time"
          iconName="time"
          value={getPrettyTimeRangeFromISO(event?.startTime, event?.expectedEndTime)}
        />
      </Container>
      <Space direction="horizontal" size="small" />
      <Container direction="row">
        <InfoItem title="Notes" iconName="notes" value={truncate(event?.notes, { length: 30 })} />
        <InfoItem title="Labels" iconName="labels" value={event?.labels} />
      </Container>
      <Space direction="horizontal" size="small" extra={6} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 16,
  },
  description: {},
});
