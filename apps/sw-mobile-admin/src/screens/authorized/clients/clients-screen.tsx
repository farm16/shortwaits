import React, { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
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
  IconButton,
  Container,
  List,
  NonIdealState,
  Screen,
  Text,
  useBottomSheet,
  FloatingActionButton,
  AnimatedSearchBar,
} from "../../../components";
import { useTheme } from "../../../theme";
import { useBusiness, useGhostComponent } from "../../../store";
import {
  useCreateBusinessClientsMutation,
  useGetBusinessClientsQuery,
} from "../../../services";
import { AuthorizedScreenProps } from "../../../navigation";
import { ActivityIndicator } from "react-native-paper";
import Contacts from "react-native-contacts";
import { UserDocType } from "@shortwaits/shared-lib";
import { getUsersFromOsContacts } from "../../../utils/getUsersFromOsContacts";
import { actions } from "../../../components/floating-action-button/fab-actions";
import { isEmpty } from "lodash";

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
  const [isListSearchable, setIsListSearchable] = useState(false);
  const [, setSearchText] = useState("");
  const [filteredClientsData, setFilteredClientsData] = useState([]);

  const { Colors } = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => {
        return (
          <Container direction="row" justifyContent="center">
            <Text preset="headerTitle" text={"Clients"} />
          </Container>
        );
      },
      headerLeft: () => {
        return (
          <Container direction="row" alignItems="center">
            <IconButton
              iconType="contactSync"
              withMarginLeft
              onPress={() => {
                handleBottomSheet.expand();
              }}
            />
          </Container>
        );
      },
      headerRight: () => {
        return (
          <Container direction="row" alignItems="center">
            <IconButton
              iconType={isListSearchable ? "search-close" : "search"}
              withMarginRight
              onPress={() => {
                setIsListSearchable(s => !s);
              }}
            />
            <IconButton
              iconType="add"
              withMarginRight
              onPress={() =>
                navigation.navigate("modals", {
                  screen: "form-modal-screen",
                  params: {
                    form: "addClient",
                    onSubmit: () => refetchBusinessClientsQuery(),
                  },
                })
              }
            />
          </Container>
        );
      },
    });
  }, [
    handleBottomSheet,
    isListSearchable,
    navigation,
    refetchBusinessClientsQuery,
  ]);

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
  useGhostComponent("floatingActionButton");

  useEffect(() => {
    if (!isLoading && isBusinessClientsQuerySuccess) {
      setFilteredClientsData(clientsData?.data);
    } else {
      return;
    }
  }, [clientsData?.data, isBusinessClientsQuerySuccess, isLoading]);

  return (
    <Screen preset="fixed" unsafe>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <AnimatedSearchBar
            onChangeText={text => {
              const trimmedText = text.trim();
              setSearchText(trimmedText);
              if (trimmedText !== "") {
                const filteredItems = clientsData?.data.filter(item => {
                  // Adjust the filtering logic based on your data structure
                  const phoneNumberMatch = item.phoneNumbers.some(phone =>
                    phone.number
                      .toLowerCase()
                      .includes(trimmedText.toLowerCase())
                  );
                  return (
                    item.givenName
                      ?.toLowerCase()
                      .includes(trimmedText.toLowerCase()) ||
                    item.email
                      ?.toLowerCase()
                      .includes(trimmedText.toLowerCase()) ||
                    phoneNumberMatch
                  );
                });
                setFilteredClientsData(filteredItems);
              } else {
                setFilteredClientsData(clientsData?.data);
              }
            }}
            isVisible={isListSearchable}
          />
          <List
            refreshControl={
              <RefreshControl
                refreshing={isBusinessClientsQueryLoading}
                onRefresh={refetchBusinessClientsQuery}
              />
            }
            ListEmptyComponent={
              <View
                style={{
                  marginTop: 16,
                  padding: 16,
                }}
              >
                {isEmpty(clientsData?.data) ? (
                  <NonIdealState
                    image={"noClients"}
                    buttons={[
                      <Button
                        text="Sync contacts"
                        onPress={() => handleSyncContacts()}
                      />,
                    ]}
                  />
                ) : null}
              </View>
            }
            // style={{ backgroundColor: "red" }}
            renderItem={_renderItem}
            data={filteredClientsData}
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
