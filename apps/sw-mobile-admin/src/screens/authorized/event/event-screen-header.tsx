import {
  Container,
  Emoji,
  Space,
  Text,
  getPrettyDateFromISO,
  getPrettyStringFromPriceWithSymbol,
  getPrettyTimeRangeFromISO,
  statusDisplayMessages,
  statusDisplayMessagesBackgroundColor,
  statusDisplayMessagesColor,
  truncated,
  useTheme,
} from "@shortwaits/shared-ui";
import { BusinessLabelsType, EventDtoType } from "@shortwaits/shared-utils";
import { isEmpty, truncate } from "lodash";
import React from "react";
import { useIntl } from "react-intl";
import { Pressable, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
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
          {isEmpty(value) ? null : (value as BusinessLabelsType).map(label => <Emoji key={label.emojiShortName} size={14} name={label.emojiShortName} />)}
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
  const intl = useIntl();
  return (
    <View style={styles.root}>
      <Container direction="row">
        {currentService?.name ? (
          <InfoItem
            title={intl.formatMessage({
              id: "Event_Screen.eventScreenHeader.service",
            })}
            iconName="service"
            value={currentService?.name ?? ""}
          />
        ) : null}
        {event?.description ? (
          <InfoItem
            title={intl.formatMessage({
              id: "Event_Screen.eventScreenHeader.description",
            })}
            iconName="description"
            value={event.description}
          />
        ) : null}
      </Container>
      <Space direction="horizontal" size="tiny" extra={8} />
      <Container direction="row">
        <InfoItem
          title={intl.formatMessage({
            id: "Event_Screen.eventScreenHeader.status",
          })}
          iconName="status"
          value={
            intl
              .formatMessage({
                id: `Common.eventStatus.${event.status.statusName.toLowerCase()}`,
              })
              .toUpperCase() ?? ""
          }
        />
        <InfoItem
          title={intl.formatMessage({
            id: "Event_Screen.eventScreenHeader.cost",
          })}
          iconName="price"
          value={getPrettyStringFromPriceWithSymbol("USD", event?.priceExpected ?? 0, intl.locale)}
        />
      </Container>
      <Space direction="horizontal" size="tiny" />
      <Container direction="row">
        <InfoItem
          title={intl.formatMessage({
            id: "Event_Screen.eventScreenHeader.date",
          })}
          iconName="date"
          value={getPrettyDateFromISO(event?.startTime, intl.locale)}
        />
        <InfoItem
          title={intl.formatMessage({
            id: "Event_Screen.eventScreenHeader.time",
          })}
          iconName="time"
          value={
            <Text
              style={{
                fontWeight: "500",
                fontSize: 14,
              }}
            >
              {getPrettyTimeRangeFromISO(event?.startTime, event?.expectedEndTime, intl.locale)[0]}
              {getPrettyTimeRangeFromISO(event?.startTime, event?.expectedEndTime, intl.locale)[1] ? <Icon name={"arrow-right"} color={"grey"} size={14} /> : null}
              {getPrettyTimeRangeFromISO(event?.startTime, event?.expectedEndTime, intl.locale)[1]}
            </Text>
          }
        />
      </Container>
      {event?.notes && event?.labels && event?.labels.length > 0 ? <Space direction="horizontal" size="tiny" /> : null}
      <Container direction="row">
        {event?.notes ? (
          <InfoItem
            title={intl.formatMessage({
              id: "Event_Screen.eventScreenHeader.notes",
            })}
            iconName="notes"
            value={truncate(event?.notes, { length: 30 })}
          />
        ) : null}
        {event?.labels && event?.labels.length > 0 ? (
          <InfoItem
            title={intl.formatMessage({
              id: "Event_Screen.eventScreenHeader.labels",
            })}
            iconName="labels"
            value={event?.labels}
          />
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
