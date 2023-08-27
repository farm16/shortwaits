import React, { FC, useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Alert, ListRenderItem, RefreshControl, View } from "react-native";
import {
  Button,
  ButtonCard,
  IconButton,
  Container,
  List,
  NonIdealState,
  Screen,
  Text,
  AnimatedSearchBar,
} from "../../../components";
import { useTheme } from "../../../theme";
import { useBusiness, useClients, useShowGhostComponent } from "../../../store";
import { useCreateBusinessClientsMutation, useGetBusinessClientsQuery } from "../../../services";
import { AuthorizedScreenProps } from "../../../navigation";
import { ActivityIndicator } from "react-native-paper";
import { ClientUserDtoType } from "@shortwaits/shared-lib";
import { isEmpty } from "lodash";
import { useOsContacts } from "../../../hooks";

export const ClientsScreen: FC<AuthorizedScreenProps<"events-screen">> = ({ navigation }) => {
  useShowGhostComponent("floatingActionButton");
  const { Colors } = useTheme();
  const currentClients = useClients();
  console.log("currentClients", currentClients.length);
  const { error: osContactsError, isLoading: isOsContactsLoading, getContacts: getOsContacts } = useOsContacts();
  const business = useBusiness();
  const {
    isLoading: isBusinessClientsQueryLoading,
    isSuccess: isBusinessClientsQuerySuccess,
    refetch: refetchBusinessClientsQuery,
  } = useGetBusinessClientsQuery(business._id, {});
  const [createClients, createClientsResult] = useCreateBusinessClientsMutation();
  const [isListSearchable, setIsListSearchable] = useState(false);
  const [, setSearchText] = useState("");
  const [filteredClientsData, setFilteredClientsData] = useState([]);

  const isClientsDataLoading = isBusinessClientsQueryLoading && !isBusinessClientsQuerySuccess;
  const isCreateClientsLoading = createClientsResult.isLoading && !createClientsResult.isSuccess;

  const isLoading = isClientsDataLoading || isCreateClientsLoading || isOsContactsLoading;

  const handleAddClient = useCallback(() => {
    navigation.navigate("modals", {
      screen: "form-modal-screen",
      params: {
        form: "addClient",
      },
    });
  }, [navigation]);

  const handleSyncContacts = useCallback(
    async function () {
      if (osContactsError) {
        Alert.alert("Error", osContactsError.message);
      }
      const contacts = await getOsContacts();
      createClients({
        businessId: business._id,
        body: contacts.data,
      });
    },
    [business._id, createClients, getOsContacts, osContactsError]
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShadowVisible: !isListSearchable,
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
                handleSyncContacts();
              }}
            />
          </Container>
        );
      },
      headerRight: () => {
        return (
          <Container direction="row" alignItems="center">
            <IconButton
              disabled={isLoading}
              iconType={isListSearchable ? "search-close" : "search"}
              withMarginRight
              onPress={() => {
                setIsListSearchable(s => !s);
              }}
            />
            <IconButton iconType="add" withMarginRight onPress={() => handleAddClient()} />
          </Container>
        );
      },
    });
  }, [handleAddClient, handleSyncContacts, isListSearchable, isLoading, navigation]);

  const _renderItem: ListRenderItem<ClientUserDtoType> = ({ item }) => (
    <ButtonCard title={item[item.alias ?? "displayName"]} subTitle={item.email} />
  );

  useEffect(() => {
    if (currentClients) {
      setFilteredClientsData(currentClients);
    } else {
      return;
    }
  }, [currentClients]);

  const handleOnChangeText = (text: string) => {
    const trimmedText = text.trim();
    setSearchText(trimmedText);
    if (trimmedText !== "") {
      const filteredItems = currentClients.filter(item => {
        // Adjust the filtering logic based on your data structure
        const phoneNumberMatch = item.phoneNumbers.some(phone =>
          phone.number.toLowerCase().includes(trimmedText.toLowerCase())
        );
        return (
          item.givenName?.toLowerCase().includes(trimmedText.toLowerCase()) ||
          item.email?.toLowerCase().includes(trimmedText.toLowerCase()) ||
          phoneNumberMatch
        );
      });
      setFilteredClientsData(filteredItems);
    } else {
      setFilteredClientsData(currentClients);
    }
  };

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <>
      <AnimatedSearchBar onChangeText={handleOnChangeText} isVisible={isListSearchable} />
      <Screen preset="fixed" unsafe withHorizontalPadding>
        <List
          refreshControl={
            <RefreshControl refreshing={isBusinessClientsQueryLoading} onRefresh={refetchBusinessClientsQuery} />
          }
          ListEmptyComponent={
            <View
              style={{
                marginTop: 16,
                padding: 16,
              }}
            >
              {isEmpty(currentClients) ? (
                <NonIdealState
                  image={"noClients"}
                  buttons={[<Button text="Add Client" onPress={() => handleAddClient()} />]}
                />
              ) : null}
            </View>
          }
          // style={{ backgroundColor: "red" }}
          renderItem={_renderItem}
          data={filteredClientsData}
        />
      </Screen>
    </>
  );
};
