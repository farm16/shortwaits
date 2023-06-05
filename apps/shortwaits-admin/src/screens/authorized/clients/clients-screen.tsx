import React, { FC, useLayoutEffect, useRef } from "react";
import {
  ListRenderItem,
  PermissionsAndroid,
  Platform,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import {
  BottomSheet,
  BottomSheetType,
  Button,
  ButtonCard,
  CircleIconButton,
  Container,
  List,
  NonIdealState,
  Screen,
  Text,
  SearchBar,
  useBottomSheet,
} from "../../../components";
import { useTheme } from "../../../theme";
import { useBusiness } from "../../../redux";
import {
  useCreateBusinessClientsMutation,
  useGetBusinessClientsQuery,
} from "../../../services";
import { AuthorizedScreenProps } from "../../../navigation";
import { ActivityIndicator } from "react-native-paper";
import Contacts from "react-native-contacts";
import { UserDocType } from "@shortwaits/shared-types";
import { getUsersFromOsContacts } from "../../../utils/getUsersFromOsContacts";

export const ClientsScreen: FC<AuthorizedScreenProps<"events-screen">> = ({
  navigation,
}) => {
  const business = useBusiness();
  const {
    data: clientsData,
    isLoading: isBusinessClientsQueryLoading,
    isSuccess: isBusinessClientsQuerySuccess,
    refetch: refetchBusinessClientsQuery,
  } = useGetBusinessClientsQuery(business._id, {});
  const [createClients, createClientsResult] =
    useCreateBusinessClientsMutation();
  const bottomSheetRef = useRef<BottomSheetType>(null);
  const handleBottomSheet = useBottomSheet(bottomSheetRef);

  const { Colors } = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => {
        return (
          <Container>
            <Text text={"Clients"} />
          </Container>
        );
      },
      headerRight: () => {
        return (
          <Container direction="row">
            <CircleIconButton
              iconType="add"
              withMarginRight
              onPress={() =>
                navigation.navigate("modals", {
                  screen: "form-modal-screen",
                  params: {
                    form: "addClient",
                    onSaved: () => refetchBusinessClientsQuery(),
                  },
                })
              }
            />
            <CircleIconButton
              iconType="contactSync"
              withMarginRight
              onPress={() => {
                handleBottomSheet.expand();
              }}
            />
          </Container>
        );
      },
    });
  }, [handleBottomSheet, navigation, refetchBusinessClientsQuery]);

  const loadContacts = async () => {
    try {
      const contacts = await Contacts.getAll();
      const payload = getUsersFromOsContacts(contacts);
      const clientsResults = await createClients({
        businessId: business._id,
        businessClients: payload,
      }).unwrap();
      if (clientsResults) {
        console.log("clientsResults >>>", clientsResults);
        refetchBusinessClientsQuery();
      }
      // console.log(JSON.stringify(userPayload[0], null, 2));
      // this is because the server at one point might need to know how many we will
      // be uploading
      const contactsCount = await Contacts.getCount();
      const permission = await Contacts.checkPermission();

      // console.log("contactsCount >>>", contactsCount);
      // console.log("permission >>>", permission);
      // console.log("contacts >>>", contacts);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSyncContacts = () => {
    if (Platform.OS === "android") {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: "Contacts",
        message: "This app would like to access your contacts.",
        buttonPositive: "",
      }).then(() => {
        loadContacts();
      });
    } else {
      loadContacts();
    }
  };

  const _renderItem: ListRenderItem<UserDocType> = ({ item }) => (
    <ButtonCard
      title={item[item.alias ?? "displayName"]}
      subTitle={item.email}
    />
  );

  const isClientsDataLoading =
    isBusinessClientsQueryLoading && !isBusinessClientsQuerySuccess;
  const isCreateClientsLoading =
    createClientsResult.isLoading && !createClientsResult.isSuccess;

  const isLoading = isClientsDataLoading || isCreateClientsLoading;

  return (
    <Screen
      preset="fixed"
      backgroundColor={Colors.white}
      statusBar="dark-content"
      style={styles.root}
      unsafe
    >
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <SearchBar value={""} style={{ marginTop: 15 }} />
          <List
            refreshControl={
              <RefreshControl
                refreshing={isBusinessClientsQueryLoading}
                onRefresh={refetchBusinessClientsQuery}
              />
            }
            ListEmptyComponent={
              <View>
                <NonIdealState
                  image={"noClients"}
                  buttons={[
                    <Button
                      text="Sync contacts"
                      onPress={() => handleSyncContacts()}
                    />,
                  ]}
                />
              </View>
            }
            // style={{ backgroundColor: "red" }}
            renderItem={_renderItem}
            data={clientsData?.data}
          />
        </>
      )}
      <BottomSheet snapPointsLevel={6} ref={bottomSheetRef}></BottomSheet>
    </Screen>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    alignSelf: "stretch",
  },
});
