import { getResponsiveHeight, useTheme } from "@shortwaits/shared-ui";
import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

export const EventImage = ({ eventImage }) => {
  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      }}
      style={styles.eventImageContainer}
      imageStyle={styles.eventImage}
    />
  );
};

export const TicketBreak = () => {
  const { Colors } = useTheme();
  return (
    <View style={styles.ticketBreakContainer}>
      <View
        style={[
          styles.ticketBreakBallLeft,
          {
            backgroundColor: Colors.lightBackground,
          },
        ]}
      />

      <View
        style={[
          styles.ticketBreakBallRight,
          {
            backgroundColor: Colors.lightBackground,
          },
        ]}
      />
      <Text ellipsizeMode="clip" numberOfLines={1} style={styles.ticketBreakBallText}>
        - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  eventImageContainer: {
    width: "100%",
    height: 200,
  },
  eventImage: {
    resizeMode: "cover",
    justifyContent: "center",
    borderRadius: getResponsiveHeight(10),
  },
  ticketBreakContainer: {
    width: "100%",
    justifyContent: "center",
    paddingVertical: 16,
  },
  ticketBreakBallRight: {
    height: 20,
    width: 20,
    borderRadius: 10,
    position: "absolute",
    left: -10 + -getResponsiveHeight(16),
  },
  ticketBreakBallLeft: {
    height: 20,
    width: 20,
    borderRadius: 10,
    position: "absolute",
    right: -10 + -getResponsiveHeight(16),
  },
  ticketBreakBallText: {
    color: "#ebe4e4",
    fontSize: 12,
    fontWeight: "bold",
  },
});
