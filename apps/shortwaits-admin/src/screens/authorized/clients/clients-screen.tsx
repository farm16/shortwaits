import React, { FC, useLayoutEffect, useRef } from "react";
import { PermissionsAndroid, Platform, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import {
  AddClientsForm,
  BottomSheet,
  BottomSheetType,
  Button,
  CircleIconButton,
  List,
  NonIdealState,
  Screen,
  useBottomSheet,
} from "../../../components";
import { useTheme } from "../../../theme";
import { useBusiness } from "../../../redux";
import { useGetBusinessClientsQuery } from "../../../services";
import { AuthorizedScreenProps } from "../../../navigation";
import { ActivityIndicator } from "react-native-paper";
import Contacts from "react-native-contacts";
import { UserType } from "@shortwaits/shared-types";

export const ClientsScreen: FC<AuthorizedScreenProps<"events-screen">> = ({
  navigation,
}) => {
  // const dispatch = useDispatch();
  const business = useBusiness();
  const {
    data: clientsData,
    isLoading: isClientsLoading,
    isSuccess: isClientsSuccess,
  } = useGetBusinessClientsQuery(business._id);

  const bottomSheetRef = useRef<BottomSheetType>(null);
  const handleBottomSheet = useBottomSheet(bottomSheetRef);
  console.log("useGetBusinessClientsQuery >>>", clientsData);

  const { Colors } = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Clients",
      headerRight: () => {
        return (
          <CircleIconButton
            iconType="add"
            marginRight
            onPress={() => {
              handleBottomSheet.expand();
            }}
          />
        );
      },
    });
  }, [handleBottomSheet, navigation]);

  const loadContacts = () => {
    Contacts.getAll()
      .then((contacts) => {
        const userPayload = contacts.map((contact) => {
          return getUserFromContact(contact);
        });
        console.log(JSON.stringify(userPayload, null, 2));
      })
      .catch((e) => {
        console.log(e);
      });

    Contacts.getCount().then((count) => {
      console.log(count);
    });

    Contacts.checkPermission();
  };

  const handleSyncContacts = () => {
    if (Platform.OS === "android") {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: "Contacts",
        message: "This app would like to view your contacts.",
        buttonPositive: "",
      }).then(() => {
        loadContacts();
      });
    } else {
      loadContacts();
    }
  };

  return (
    <Screen
      preset="fixed"
      backgroundColor={Colors.white}
      statusBar="dark-content"
    >
      {isClientsLoading && !isClientsSuccess ? (
        <ActivityIndicator />
      ) : clientsData.data.length === 0 ? (
        <NonIdealState
          image={"noClients"}
          buttons={[
            <Button
              text="Sync contacts"
              onPress={() => handleSyncContacts()}
            />,
          ]}
        />
      ) : (
        <List />
      )}
      <BottomSheet
        snapPointsLevel={6}
        ref={bottomSheetRef}
        // onClose={() => setForm({ ...{ data: null, mode: null } })}
      >
        <AddClientsForm />
      </BottomSheet>
    </Screen>
  );
};

const styles = StyleSheet.create({
  dataTableCellRightButton: {
    justifyContent: "center",
    alignItems: "flex-end",
    width: 35,
    height: 35,
    alignSelf: "center",
    position: "absolute",
    right: 0,
  },
});
const getUserFromContact = ({
  givenName,
  familyName,
  middleName,
  displayName,
  phoneNumbers,
  postalAddresses,
  imAddresses,
}: Contacts.Contact): Partial<UserType> => {
  return {
    givenName,
    familyName,
    middleName,
    displayName,
    phoneNumbers,
    imAddresses,
    addresses: postalAddresses.map((postalAddress) => {
      return {
        label: postalAddress.label,
        address1: postalAddress.formattedAddress,
        address2: null,
        city: postalAddress.city,
        region: postalAddress.region,
        state: postalAddress.state,
        postCode: Number(postalAddress.postCode),
        country: postalAddress.country,
      };
    }),
  };
};
