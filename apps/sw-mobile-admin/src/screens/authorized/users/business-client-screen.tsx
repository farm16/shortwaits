import { BackButton, Button, Container, IconButton, NonIdealState, Screen, Space, Text, handleEmail, handlePhoneCall, handleSms, useTheme } from "@shortwaits/shared-ui";
import React, { useCallback, useLayoutEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { AgendaItem } from "../../../components";
import { AuthorizedScreenProps } from "../../../navigation";
import { useEvents } from "../../../store";

export function BusinessClientScreen({ navigation, route }: AuthorizedScreenProps<"business-client-screen">) {
  const { client, onUserRemove } = route.params;
  const { Colors } = useTheme();
  const events = useEvents();

  console.log("client >>>", JSON.stringify(client, null, 2));

  const clientName = client.displayName || client.familyName || client.givenName || client.middleName || client.email || "";
  const hasPhoneNumbers = client.phoneNumbers && client.phoneNumbers.length > 0;
  const phoneNumber = hasPhoneNumbers ? client.phoneNumbers[0]?.number : "";
  const hasEmail = client.email && client.email.length > 0;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "center",
      headerTitle: () => {
        return (
          <Container direction="row" alignItems="center" justifyContent="center">
            {/* <Text preset="headerTitle" text={"Client Profile"} /> */}
          </Container>
        );
      },
      headerLeft: () => {
        return (
          <Container direction="row" alignItems="center" justifyContent="center">
            <BackButton onPress={() => navigation.goBack()} />
          </Container>
        );
      },
      headerRight: () => {
        return (
          <Container direction="row" alignItems="center" justifyContent="center">
            <IconButton
              withMarginRight
              iconType="edit"
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
        type={"noHistory"}
        buttons={
          <Button
            text="Add Event"
            preset="accent"
            onPress={() => {
              navigation.navigate("modals", {
                screen: "add-event-modal-screen",
              });
            }}
          />
        }
      />
    );
  }, [navigation]);

  return (
    <Screen preset="fixed" unsafe unsafeBottom>
      <View style={styles.headerContainer}>
        <Space size="small" />
        <Container direction="row" style={styles.clientInfoContainer}>
          <Image source={{ uri: client.accountImageUrl ? client.accountImageUrl : "https://picsum.photos/200" }} style={styles.clientImage} />
          <View style={styles.clientDetails}>
            {clientName ? <Text style={[styles.clientName, { color: Colors.text }]} text={clientName} /> : null}
            {hasEmail ? <Text style={[styles.clientEmail, { color: Colors.subText }]} text={client.email} /> : null}
            {hasPhoneNumbers ? <Text style={[styles.phoneNumber, { color: Colors.subText }]} text={`${client.phoneNumbers[0].label}: ${client.phoneNumbers[0].number}`} /> : null}
          </View>
        </Container>
        <Space />
        <View style={styles.headerActions}>
          <Button
            leftIconSize={25}
            leftIconColor={hasEmail ? Colors.brandPrimary : Colors.disabledBackground}
            preset={"icon2"}
            disabled={!hasEmail}
            leftIconName="email-outline"
            onPress={() => {
              handleEmail(client.email);
            }}
          />
          <Button
            leftIconSize={25}
            leftIconColor={hasPhoneNumbers ? Colors.brandPrimary : Colors.disabledBackground}
            preset={"icon2"}
            disabled={!hasPhoneNumbers}
            leftIconName={"phone-outline"}
            onPress={() => {
              if (hasPhoneNumbers) {
                handlePhoneCall(phoneNumber);
              }
            }}
          />
          <Button
            leftIconSize={25}
            leftIconColor={hasPhoneNumbers ? Colors.brandPrimary : Colors.disabledBackground}
            preset={"icon2"}
            disabled={!hasPhoneNumbers}
            leftIconName={"message-outline"}
            onPress={() => {
              if (hasPhoneNumbers) {
                handleSms(phoneNumber);
              }
            }}
          />
          <Button
            leftIconSize={25}
            leftIconColor={Colors.brandPrimary}
            preset={"icon2"}
            disabled={false}
            leftIconName={"share-variant"}
            onPress={() => {
              console.log("share");
            }}
          />
          {onUserRemove ? (
            <Button
              leftIconSize={25}
              leftIconColor={Colors.failed}
              style={{
                backgroundColor: Colors.failedBackground,
              }}
              preset={"icon2"}
              leftIconName={"delete"}
              onPress={() => {
                if (onUserRemove) {
                  onUserRemove(client);
                }
              }}
            />
          ) : null}
        </View>
        <Space />
      </View>
      <View style={styles.eventBox}>
        <Space size="small" />
        <Container direction="row" style={[styles.eventBoxHeader]}>
          {/* <Text preset="none" style={[styles.eventBoxHeaderTitle, { color: Colors.text }]}>
            {`History`}
          </Text>
          <IconButton
            iconType="add"
            onPress={() => {
              navigation.navigate("modals", {
                screen: "add-event-modal-screen",
              });
            }}
          /> */}
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
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
