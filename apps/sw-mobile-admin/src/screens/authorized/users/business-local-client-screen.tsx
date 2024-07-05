import {
  ActivityIndicator,
  BackButton,
  Button,
  Container,
  IconButton,
  NonIdealState,
  Screen,
  Space,
  Text,
  handleEmail,
  handlePhoneCall,
  handleSms,
  useTheme,
} from "@shortwaits/shared-ui";
import React, { useCallback, useEffect, useLayoutEffect, useMemo } from "react";
import { Alert, Image, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { AgendaItem } from "../../../components";
import { AuthorizedScreenProps } from "../../../navigation";
import { useDeleteBusinessLocalClientsMutation } from "../../../services";
import { useBusiness, useEvents, useLocalClient } from "../../../store";

export function BusinessLocalClientScreen({ navigation, route }: AuthorizedScreenProps<"business-local-client-screen">) {
  const { localClient: localClientParam, onUserRemove } = route.params;

  const { Colors } = useTheme();
  const business = useBusiness();
  const events = useEvents();
  const localClient = useLocalClient(localClientParam._id);
  const [deleteLocalClients, deleteLocalClientsStatus] = useDeleteBusinessLocalClientsMutation();

  const clientName = localClient.displayName || localClient.familyName || localClient.givenName || localClient.middleName || localClient.email || "";
  const hasPhoneNumbers = localClient.phoneNumbers && localClient.phoneNumbers.length > 0 && localClient.phoneNumbers.some(phone => phone.number);
  const phoneNumber = hasPhoneNumbers ? localClient.phoneNumbers[0]?.number : "";
  const hasEmail = localClient.email && localClient.email.length > 0;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "center",
      headerTitle: () => {
        return (
          <Container direction="row" alignItems="center" justifyContent="center">
            <Text preset="headerTitle" text={"Client Details"} />
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
                navigation.navigate("modals", {
                  screen: "update-local-client-modal-screen",
                  params: {
                    initialValues: localClient,
                  },
                });
              }}
            />
          </Container>
        );
      },
      headerShadowVisible: false,
    });
  }, [localClient, navigation]);

  const { localClientData, hasLocalClients } = useMemo(() => {
    const _clientData = events.filter(event => {
      return event.localClientsIds.includes(localClient._id);
    });
    return {
      hasLocalClients: _clientData.length > 0,
      localClientData: _clientData,
    };
  }, [events, localClient]);

  console.log("events >>>", localClientData);
  console.log("localClient", JSON.stringify(localClient, null, 2));

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

  const handleRemoveUser = () => {
    Alert.alert("Delete Client", "Are you sure you want to delete this client?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          deleteLocalClients({
            businessId: business._id,
            body: [localClient],
          });
        },
      },
    ]);
    if (onUserRemove) {
      onUserRemove(localClient);
    }
  };

  useEffect(() => {
    if (deleteLocalClientsStatus.isSuccess) {
      navigation.goBack();
    }
  }, [deleteLocalClientsStatus.isSuccess, navigation]);

  if (deleteLocalClientsStatus.isError) {
    Alert.alert("Error", "Failed to delete local client");
  }

  if (deleteLocalClientsStatus.isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <Screen preset="fixed" unsafe unsafeBottom>
      <View style={styles.headerContainer}>
        <Space size="small" />
        <Container direction="row" style={styles.clientInfoContainer}>
          <Image source={{ uri: localClient.accountImageUrl ? localClient.accountImageUrl : "https://picsum.photos/200" }} style={styles.clientImage} />
          <View style={styles.clientDetails}>
            {clientName ? <Text style={[styles.clientName, { color: Colors.text }]} text={clientName} /> : null}
            {hasEmail ? <Text style={[styles.clientEmail, { color: Colors.subText }]} text={localClient.email} /> : null}
            {hasPhoneNumbers ? (
              <Text style={[styles.phoneNumber, { color: Colors.subText }]} text={`${localClient.phoneNumbers[0].label}: ${localClient.phoneNumbers[0].number}`} />
            ) : null}
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
              handleEmail(localClient.email);
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
          <Button
            leftIconSize={25}
            leftIconColor={Colors.failed}
            style={{
              backgroundColor: Colors.failedBackground,
            }}
            preset={"icon2"}
            leftIconName={"delete"}
            onPress={() => {
              handleRemoveUser();
            }}
          />
        </View>
        <Space />
      </View>
      <View style={styles.eventBox}>
        <Space size="small" />
        <Container direction="row" style={[styles.eventBoxHeader]}>
          {hasLocalClients ? (
            <Container direction="row" style={[styles.eventBoxHeader]}>
              <Text preset="none" style={[styles.eventBoxHeaderTitle, { color: Colors.text }]}>
                {`Events (${localClientData.length})`}
              </Text>
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
          ) : null}
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
          data={localClientData}
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
