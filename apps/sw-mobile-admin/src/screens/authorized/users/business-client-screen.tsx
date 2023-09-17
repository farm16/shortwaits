import React, { useCallback, useLayoutEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import {
  AgendaItem,
  BackButton,
  Button,
  Container,
  IconButton,
  NonIdealState,
  Screen,
  Space,
  Text,
} from "../../../components";
import { AuthorizedScreenProps } from "../../../navigation";
import { useTheme } from "../../../theme";
import { useEvents } from "../../../store";
import { handleEmail, handlePhoneCall, handleSms } from "../../../utils";
import { FlatList } from "react-native-gesture-handler";

export function BusinessClientScreen({ navigation, route }: AuthorizedScreenProps<"business-client-screen">) {
  const { client } = route.params;
  const { Colors } = useTheme();
  const events = useEvents();

  const clientName = client.displayName || client.familyName || client.givenName || client.middleName || client.email;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "center",
      headerTitle: () => {
        return (
          <Container direction="row" justifyContent="center">
            <Text preset="headerTitle" text={"Client Profile"} />
          </Container>
        );
      },
      headerLeft: () => {
        return (
          <Container direction="row" alignItems="center">
            <BackButton onPress={() => navigation.goBack()} />
          </Container>
        );
      },
      headerRight: () => {
        return (
          <Container direction="row" alignItems="center">
            <IconButton
              withMarginRight
              iconType="delete"
              onPress={() => {
                navigation.goBack();
              }}
            />
            {/* <IconButton withMarginRight iconType="calendar"  /> */}
          </Container>
        );
      },
      headerShadowVisible: false,
    });
  }, [navigation]);

  const getEventsWithClient = () => {
    return events.filter(event => {
      return event.clientsIds.includes(client._id);
    });
  };

  console.log("events >>>", getEventsWithClient());
  console.log("client", JSON.stringify(client, null, 2));
  const renderItem = useCallback(({ item }) => {
    return <AgendaItem item={item} />;
  }, []);

  const renderNonIdealState = useCallback(() => {
    return (
      <NonIdealState
        image={"noEvents"}
        buttons={
          <Button
            text="Add Event"
            preset="accent"
            onPress={() => {
              navigation.navigate("modals", {
                screen: "form-modal-screen",
                params: {
                  form: "addEvent",
                  onDone: () => {
                    // if (!isEventsLoading) {
                    //   refetchEvents();
                    // }
                  },
                },
              });
            }}
          />
        }
      />
    );
  }, [navigation]);

  return (
    <Screen preset="fixed" unsafe unsafeBottom backgroundColor="backgroundOverlay">
      <View
        style={[
          styles.headerContainer,
          {
            backgroundColor: Colors.backgroundOverlay,
          },
        ]}
      >
        <Space size="small" />
        <Container direction="row" style={styles.clientInfoContainer}>
          <Image
            source={{ uri: client.accountImageUrl ? client.accountImageUrl : "https://picsum.photos/200" }}
            style={styles.clientImage}
          />
          <View style={styles.clientDetails}>
            {clientName ? (
              <Text
                style={[
                  styles.clientName,
                  {
                    color: Colors.text,
                  },
                ]}
                text={clientName}
              />
            ) : null}
            {client.email ? (
              <Text
                style={[
                  styles.clientEmail,
                  {
                    color: Colors.subText,
                  },
                ]}
                text={client.email}
              />
            ) : null}
            {client.phoneNumbers[0].label && client.phoneNumbers[0].number ? (
              <Text
                style={[
                  styles.phoneNumber,
                  {
                    color: Colors.subText,
                  },
                ]}
                text={`${client.phoneNumbers[0].label}: ${client.phoneNumbers[0].number}`}
              />
            ) : null}
          </View>
        </Container>
        <Space />
        <View style={styles.headerActions}>
          <Button
            leftIconColor={Colors.darkGray}
            preset="icon2"
            leftIconName="email-outline"
            leftIconSize={25}
            onPress={() => {
              handleEmail(client.email);
            }}
          />
          <Button
            leftIconSize={25}
            leftIconColor={Colors.darkGray}
            preset={client.phoneNumbers[0].number ? "icon2" : "icon2-disabled"}
            disabled={!client.phoneNumbers[0].number}
            leftIconName={"whatsapp"}
            onPress={() => {
              handlePhoneCall(client.phoneNumbers[0].number);
            }}
          />
          <Button
            leftIconSize={25}
            leftIconColor={Colors.darkGray}
            preset={client.phoneNumbers[0].number ? "icon2" : "icon2-disabled"}
            disabled={!client.phoneNumbers[0].number}
            leftIconName={"phone-outline"}
            onPress={() => {
              handlePhoneCall(client.phoneNumbers[0].number);
            }}
          />
          <Button
            leftIconSize={25}
            leftIconColor={Colors.darkGray}
            preset={client.phoneNumbers[0].number ? "icon2" : "icon2-disabled"}
            disabled={!client.phoneNumbers[0].number}
            leftIconName={"message-outline"}
            onPress={() => {
              handleSms(client.phoneNumbers[0].number);
            }}
          />
          <Button
            leftIconSize={25}
            leftIconColor={Colors.darkGray}
            preset={"icon2"}
            disabled={false}
            leftIconName={"share-variant"}
            onPress={() => {}}
          />
        </View>
        <Space />
      </View>
      <View style={styles.eventBox}>
        <Space size="small" />
        <Container direction="row" style={[styles.eventBoxHeader]}>
          <Text preset="none" style={[styles.eventBoxHeaderTitle, { color: Colors.text }]}>
            {`Events (${getEventsWithClient().length})`}
          </Text>
          <IconButton
            iconType="add"
            onPress={() => {
              navigation.navigate("modals", {
                screen: "form-modal-screen",
                params: {
                  form: "addEvent",
                },
              });
            }}
          />
        </Container>
        <FlatList
          data={getEventsWithClient()}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          ListEmptyComponent={renderNonIdealState}
          ItemSeparatorComponent={() => <Space size="tiny" direction="horizontal" />}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  eventBox: {
    paddingHorizontal: 16,
    flex: 1,
  },
  eventBoxHeader: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  eventBoxHeaderTitle: {
    paddingTop: 24,
    paddingBottom: 16,
    fontSize: 14,
    fontWeight: "500",
    textTransform: "uppercase",
  },
  headerContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingHorizontal: 16,
    paddingBottom: 4,
  },
  clientInfoContainer: {
    minHeight: 75,
  },
  clientImage: {
    width: 75,
    height: "100%",
    resizeMode: "cover",
    borderBottomLeftRadius: 37.5,
    borderBottomRightRadius: 37.5,
    borderTopLeftRadius: 37.5,
    borderTopRightRadius: 0,
    marginRight: 16,
  },
  clientDetails: {
    flex: 1,
    alignSelf: "stretch",
  },
  clientName: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  clientEmail: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },
  phoneNumber: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },
  headerActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
