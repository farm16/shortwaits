import { EventDtoType } from "@shortwaits/shared-lib";
import { IconButton, Text, getResponsiveFontSize, getResponsiveHeight, useTheme } from "@shortwaits/shared-ui";
import React from "react";
import { ListRenderItemInfo, StyleSheet, TouchableOpacity, View } from "react-native";

export const TopTile = ({ title, subTitle, onPress }) => {
  const { Colors } = useTheme();
  return (
    <TouchableOpacity
      style={[
        styles.square,
        {
          backgroundColor: Colors.lightBackground,
        },
      ]}
      onPress={onPress}
    >
      <Text
        preset="none"
        style={{
          color: Colors.black5,
          fontSize: getResponsiveFontSize(14),
          fontWeight: "500",
        }}
        text={title}
      />
      <Text
        preset="none"
        style={{
          color: Colors.black,
          fontSize: getResponsiveFontSize(18),
          fontWeight: "700",
        }}
        text={subTitle}
      />
      <View style={styles.squareIcon}>
        <IconButton iconType="arrow-top-right" />
      </View>
    </TouchableOpacity>
  );
};

export const EventsTitle = () => {
  const { Colors } = useTheme();
  return (
    <View style={styles.eventTitleContainer}>
      <Text
        preset="none"
        style={[
          styles.eventTitle,
          {
            color: Colors.brandSecondary,
          },
        ]}
        text="Today's "
      />
      <Text
        preset="none"
        style={[
          styles.eventTitle,
          {
            color: Colors.brandSecondary,
          },
        ]}
        text="Events"
      />
    </View>
  );
};

export const EventItem = (props: ListRenderItemInfo<EventDtoType>) => {
  // console.log("EventItem props >>>", props);
  const date = new Date(props.item.startTime);
  // get the month name
  const month = date.toLocaleString("default", { month: "short" });
  // get the day
  const day = date.getDate();

  console.log("date >>>", date);
  console.log("month >>>", month);
  console.log("day >>>", day);
  return (
    <View>
      <IconButton iconType="qr" />
    </View>
  );
};

const styles = StyleSheet.create({
  eventTitleContainer: {
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "flex-end",
    alignSelf: "stretch",
  },
  eventTitle: {
    fontSize: getResponsiveFontSize(21),
    fontWeight: "700",
    textTransform: "uppercase",
  },
  bottomContainer: {
    flex: 1,
    paddingTop: getResponsiveHeight(41),
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  eventContainer: {
    // paddingHorizontal: 16,
    flex: 1,
  },
  greetingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    alignItems: "center",
  },
  greetingText: {
    fontSize: getResponsiveHeight(21),
    fontWeight: "700",
  },
  squareContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
  },
  square: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 16,
    backgroundColor: "blue",
    height: getResponsiveHeight(100),
    borderRadius: 15,
  },
  squareIcon: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "white",
    borderRadius: getResponsiveHeight(30) / 2,
    height: getResponsiveHeight(30),
    width: getResponsiveHeight(30),
    justifyContent: "center",
    alignItems: "center",
  },
});
