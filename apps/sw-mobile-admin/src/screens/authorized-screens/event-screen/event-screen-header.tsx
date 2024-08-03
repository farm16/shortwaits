import { BusinessLabelsType, EventDtoType } from "@shortwaits/shared-lib";
import {
  Container,
  Emoji,
  Space,
  Text,
  getPrettyDateFromISO,
  getPrettyStringDurationFromStartAndEndTime,
  getPrettyStringFromPriceWithSymbol,
  getPrettyTimesFromISO,
  isSameDate,
  isSameDateAndTime,
  statusDisplayMessages,
  statusDisplayMessagesBackgroundColor,
  statusDisplayMessagesColor,
  truncated,
  useTheme,
} from "@shortwaits/shared-ui";
import { isEmpty } from "lodash";
import React from "react";
import { useIntl } from "react-intl";
import { Pressable, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useService } from "../../../store";

const iconNames = {
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
  value: string | BusinessLabelsType | JSX.Element;
  iconName: keyof typeof iconNames;
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
      <Container
        direction="row"
        style={{
          alignItems: "center",
          marginBottom: 4,
        }}
      >
        <Icon name={iconNames[iconName]} color={Colors.disabledText} size={20} />
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
                  paddingVertical: 2,
                  borderRadius: 5,
                  alignSelf: "flex-start",
                }
              : {}
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
  console.log("currentService", currentService);
  const intl = useIntl();
  const hasSameEndDate = isSameDate(event.startTime, event.expectedEndTime);
  const hasDifferentEndDate = !hasSameEndDate;
  const hasSameDateAndTime = isSameDateAndTime(event.startTime, event.expectedEndTime);
  const showEndTime = !hasDifferentEndDate && !hasSameDateAndTime;
  return (
    <View style={styles.root}>
      <Container direction="row">
        <InfoItem
          title={intl.formatMessage({
            id: "Event_Screen.eventScreenHeader.status",
          })}
          iconName="status"
          value={
            intl
              .formatMessage({
                id: `Common.eventStatus.${event?.status?.statusName ? event.status.statusName.toLowerCase() : "unknown"}`,
              })
              .toUpperCase() ?? ""
          }
        />
        <InfoItem
          title={intl.formatMessage({
            id: "Event_Screen.eventScreenHeader.service",
          })}
          iconName="service"
          value={currentService?.name ?? "N/A"}
        />
      </Container>
      <Space direction="horizontal" size="tiny" />
      <Container direction="row">
        <InfoItem
          title={intl.formatMessage({
            id: showEndTime ? "Event_Screen.eventScreenHeader.date" : "Event_Screen.eventScreenHeader.endDate",
          })}
          iconName="date"
          value={getPrettyDateFromISO(event?.startTime, intl.locale)}
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
          title={
            showEndTime
              ? `${intl.formatMessage({
                  id: "Event_Screen.eventScreenHeader.time",
                })} (${getPrettyStringDurationFromStartAndEndTime(event?.startTime, event?.expectedEndTime)})`
              : intl.formatMessage({
                  id: "Event_Screen.eventScreenHeader.startTime",
                })
          }
          iconName="time"
          value={
            <Text
              style={{
                fontWeight: "500",
                fontSize: 14,
              }}
            >
              {getPrettyTimesFromISO(event?.startTime, event?.expectedEndTime, intl.locale)[0]}
              {showEndTime ? <Icon name={"arrow-right"} color={"grey"} size={14} /> : null}
              {showEndTime ? getPrettyTimesFromISO(event?.startTime, event?.expectedEndTime, intl.locale)[1] : null}
            </Text>
          }
        />
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
      {hasDifferentEndDate ? <Space direction="horizontal" size="tiny" /> : null}
      {hasDifferentEndDate ? (
        <Container direction="row">
          <InfoItem
            title={intl.formatMessage({
              id: "Event_Screen.eventScreenHeader.endDate",
            })}
            iconName="date"
            value={getPrettyDateFromISO(event?.expectedEndTime, intl.locale)}
          />
          <InfoItem
            title={intl.formatMessage({
              id: "Event_Screen.eventScreenHeader.endTime",
            })}
            iconName="time"
            value={
              <Text
                style={{
                  fontWeight: "500",
                  fontSize: 14,
                }}
              >
                {getPrettyTimesFromISO(event?.startTime, event?.expectedEndTime, intl.locale)[1]}
              </Text>
            }
          />
        </Container>
      ) : null}
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
