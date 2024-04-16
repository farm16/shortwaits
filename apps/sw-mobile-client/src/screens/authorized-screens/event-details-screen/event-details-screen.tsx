import {
  BackButton,
  Button,
  Container,
  Screen,
  Space,
  Text,
  getPrettyDateFromISO,
  getPrettyStringFromPrice,
  getPrettyTimesFromISO,
  getResponsiveHeight,
  useTheme,
} from "@shortwaits/shared-ui";
import { isEmpty } from "lodash";
import React, { useLayoutEffect } from "react";
import { useIntl } from "react-intl";
import { ImageBackground, ImageStyle, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthorizedScreenProps } from "../../../navigation";
import { useRegisterEventByIdForClientMutation } from "../../../services";

const iconNames = {
  date: "calendar-month-outline",
  time: "clock-outline",
  status: "list-status",
  price: "currency-usd",
  notes: "notebook-outline",
  labels: "label-multiple-outline",
  description: "text",
  service: "hand-extended-outline",
  location: "map-marker",
};
const imageHeight = getResponsiveHeight(400);
export function EventDetailsScreen({ navigation, route }: AuthorizedScreenProps<"event-details-screen">) {
  const intl = useIntl();
  const { Colors } = useTheme();
  // const eventId = route.params?.eventId;
  const event = route.params?.event;
  const isEventFree = event?.priceExpected === 0;
  const price = getPrettyStringFromPrice("USD", event?.priceExpected);
  const times = getPrettyTimesFromISO(event?.startTime, event.endTime);

  const [createEventById, createEventByIdStatus] = useRegisterEventByIdForClientMutation();

  console.log("Event Details Screen >>>", event);
  useLayoutEffect(() => {
    navigation.setOptions({
      // headerShown: false,
      // headerMode: "float",
      headerTransparent: true,
      headerTitle: "",
      headerLeft: () => (
        <BackButton
          style={{
            backgroundColor: "rgba(225,225,225,0.4)",
            borderRadius: getResponsiveHeight(20),
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: Colors.white,
          }}
          iconColor={Colors.white}
          onPress={() => navigation.goBack()}
        />
      ),
    });
  }, [Colors.white, navigation]);

  const imageUrl = {
    uri: event?.eventImage
      ? event.eventImage
      : "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };

  return (
    <Screen withHorizontalPadding statusBarStyle="light-content" preset="fixed" backgroundColor="background" style={styles.container}>
      <ImageBackground source={imageUrl} resizeMode="cover" style={styles.background} imageStyle={styles.imageBackground as ImageStyle}>
        <View style={styles.opacityBackground} />
      </ImageBackground>
      <View style={[{ backgroundColor: Colors.white, shadowColor: Colors.black }, styles.eventDetails]}>
        <Container direction="row" justifyContent="space-between">
          <Text preset="titleLarge" text={event?.name} />
          <View
            style={{
              backgroundColor: isEventFree ? Colors.success : Colors.warning,
              paddingVertical: getResponsiveHeight(4),
              paddingHorizontal: getResponsiveHeight(8),
              borderRadius: getResponsiveHeight(20),
            }}
          >
            <Text preset="priceTag" text={isEventFree ? "Free" : price} />
          </View>
        </Container>
        <Space />
        <Container direction="row" alignItems="center" justifyContent="space-between">
          <Container direction="row" alignItems="center">
            <Icon name={iconNames.date} color={Colors.text} size={20} />
            <Space size="tiny" direction="vertical" />
            <Text preset="bold" text={getPrettyDateFromISO(event?.startTime, intl.locale)} />
          </Container>
          <Container direction="row" alignItems="center">
            <Icon name={iconNames.time} color={Colors.text} size={20} />
            <Space size="tiny" direction="vertical" />
            <Text preset="bold" text={times[0]} />
          </Container>
        </Container>
        <Space />
        <Container direction="row" alignItems="center">
          <Icon name={iconNames.location} color={Colors.text} size={20} />
          <Space size="tiny" direction="vertical" />
          <Text preset="bold" text={`${event?.location.city ?? "USA"} ${event?.location.state ? "," + event?.location.state : ""}`} />
        </Container>
        <Space />
        <Container direction="row" alignItems="center">
          <Icon name="account-group" color={Colors.text} size={20} />
          <Space size="tiny" direction="vertical" />
          <Text preset="bold" text={isEmpty(event?.participantsIds) ? "0" : event?.participantsIds.length.toString()} />
        </Container>
      </View>
      <Space size="xLarge" />
      <Text preset="headerTitle" text={"Description"} />
      <Space size="tiny" />
      <Text preset="text" text={event?.description} />
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Button
            preset="icon"
            style={{
              borderWidth: 1,
              borderColor: Colors.gray,
              borderRadius: getResponsiveHeight(25),
            }}
          >
            <Icon color={Colors.brandPrimary} name={"heart-outline"} size={20} />
          </Button>
          <Space direction="vertical" size="small" />
          <Button
            preset="primary"
            style={{
              flex: 1,
            }}
            text={"Register"}
            onPress={() => {
              createEventById({ eventId: event?._id });
            }}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
  },
  eventDetails: {
    marginTop: 0.65 * imageHeight,
    padding: getResponsiveHeight(16),
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: getResponsiveHeight(20),
  },
  background: {
    height: imageHeight,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  imageBackground: {
    borderEndStartRadius: getResponsiveHeight(40),
    borderEndEndRadius: getResponsiveHeight(40),
  },
  opacityBackground: {
    flex: 1,
    borderEndStartRadius: getResponsiveHeight(40),
    borderEndEndRadius: getResponsiveHeight(40),
    backgroundColor: "rgba(0,0,0,0.25)",
  },
});
