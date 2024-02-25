import { Avatar, Button, IconButton, NonIdealState, Screen, Space, TabBar, Text, getResponsiveFontSize, getResponsiveHeight, useTheme } from "@shortwaits/shared-ui";
import React, { useCallback, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Card } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthenticatedScreenProps } from "../../../navigation";
import { useUser } from "../../../store";

export function HomeScreen({ navigation, route }: AuthenticatedScreenProps<"home-screen">) {
  const user = useUser();
  const { Colors } = useTheme();

  const handleScanQrCode = useCallback(() => {
    navigation.navigate("", {
      screen: "",
    });
  }, [navigation]);

  // console.log('user', JSON.stringify(user, null, 2));
  const [screenBottomPadding, setScreenBottomPadding] = useState(0);

  const renderEventTitle = useCallback(() => {
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
  }, [Colors.brandSecondary]);

  const renderTopCards = useCallback(() => {
    return (
      <View style={styles.squareContainer}>
        <TouchableOpacity
          style={[
            styles.square,
            {
              backgroundColor: Colors.gray,
            },
          ]}
        >
          <Text
            preset="none"
            style={{
              color: Colors.black5,
              fontSize: getResponsiveFontSize(14),
              fontWeight: "500",
            }}
            text="Events"
          />
          <Text
            preset="none"
            style={{
              color: Colors.black,
              fontSize: getResponsiveFontSize(18),
              fontWeight: "700",
            }}
            text="History"
          />
          <View style={styles.squareIcon}>{<IconButton iconType="arrow-top-right" />}</View>
        </TouchableOpacity>
        <Space size="small" direction="vertical" />
        <TouchableOpacity
          style={[
            styles.square,
            {
              backgroundColor: Colors.gray,
            },
          ]}
        >
          <Text
            preset="none"
            style={{
              color: Colors.black5,
              fontSize: getResponsiveFontSize(14),
              fontWeight: "500",
            }}
            text="Favorite"
          />
          <Text
            preset="none"
            style={{
              color: Colors.black,
              fontSize: getResponsiveFontSize(18),
              fontWeight: "700",
            }}
            text="Places"
          />
          <View style={styles.squareIcon}>
            <IconButton iconType="arrow-top-right" />
          </View>
        </TouchableOpacity>
      </View>
    );
  }, [Colors.brandSecondary, Colors.brandSecondary5, Colors.gray]);

  return (
    <Screen backgroundColor="lightBackground" unsafeBottom>
      <Space size="large" />
      <View style={styles.greetingContainer}>
        <Text
          text="Good Morning"
          style={[
            styles.greetingText,
            {
              color: Colors.brandSecondary,
            },
          ]}
        />
        <Avatar size="small" url={user?.accountImageUrl} onPress={() => {}} />
      </View>
      <Space size="large" />
      {renderTopCards()}
      <Space size="small" />
      <View
        style={[
          styles.bottomContainer,
          {
            paddingBottom: screenBottomPadding,
            backgroundColor: Colors.brandPrimary1,
          },
        ]}
      >
        <View style={styles.eventContainer}>
          <View
            style={{
              paddingHorizontal: 16,
            }}
          >
            {renderEventTitle()}
          </View>
          <Space />
          <FlatList
            contentContainerStyle={{
              paddingHorizontal: 16,
            }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => {
              return <NonIdealState type="noEvents" />;
            }}
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            ItemSeparatorComponent={() => {
              return <Space size="tiny" />;
            }}
            ListFooterComponent={() => {
              return <Space size="large" />;
            }}
            renderItem={({ item }) => {
              return (
                <Card
                  onPress={() => {
                    console.log("d");
                  }}
                >
                  <Card.Title title="Card Title" left={props => <Icon name="check" {...props} />} />
                  <Card.Content>
                    <Text>Card title</Text>
                    <Text>Card content</Text>
                  </Card.Content>
                </Card>
              );
            }}
          />
          <Space size="large" />
          {/* <QRScanner /> */}
          <View
            style={{
              paddingHorizontal: 16,
            }}
          >
            <Button
              preset="primary"
              style={{
                backgroundColor: Colors.brandSecondary,
              }}
              text="Scan QR Code"
              onPress={() => handleScanQrCode()}
            />
          </View>
        </View>
        <TabBar
          navigation={navigation}
          route={route}
          onLayout={event => {
            console.log("event.nativeEvent.layout.height", event.nativeEvent.layout.height);
            setScreenBottomPadding(event.nativeEvent.layout.height);
          }}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  eventTitleContainer: {
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
