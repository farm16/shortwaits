import React, { FC, useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Alert, ListRenderItem, RefreshControl, View } from "react-native";
import { isEmpty } from "lodash";
import { ActivityIndicator } from "react-native-paper";
import { ClientUserDtoType } from "@shortwaits/shared-lib";
import {
  Button,
  IconButton,
  Container,
  List,
  NonIdealState,
  Screen,
  Text,
  AnimatedSearchBar,
  SelectorListItem,
} from "../../../components";
import { useBusiness, useClients, useShowGhostComponent } from "../../../store";
import { useCreateBusinessClientsMutation, useGetBusinessClientsQuery } from "../../../services";
import { AuthorizedScreenProps } from "../../../navigation";
import { useOsContacts } from "../../../hooks";

export const ClientsScreen: FC<AuthorizedScreenProps<"events-screen">> = ({ navigation }) => {
  useShowGhostComponent("floatingActionButton");
  const currentClients = useClients();
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
      const run = async () => {
        if (osContactsError) {
          Alert.alert("Error", osContactsError.message);
        }
        const contacts = await getOsContacts();
        const clientKeySet = new Set(
          currentClients.map(client => `${client.middleName}-${client.familyName}-${client.givenName}`)
        );
        const filteredContacts = contacts.data.filter(
          contact => !clientKeySet.has(`${contact.middleName}-${contact.familyName}-${contact.givenName}`)
        );

        createClients({
          businessId: business._id,
          body: filteredContacts,
        });
      };
      Alert.alert("Sync Contacts", "Are you sure you want to sync your contacts?", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: run,
        },
      ]);
    },
    [business._id, createClients, currentClients, getOsContacts, osContactsError]
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShadowVisible: !isListSearchable,
      headerTitle: () => {
        return (
          <Container direction="row" justifyContent="center">
            <Text
              preset="headerTitle"
              text={currentClients?.length === 0 ? "Clients" : `Clients (${currentClients.length})`}
            />
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
            <IconButton iconType="add-staff" withMarginRight onPress={() => handleAddClient()} />
          </Container>
        );
      },
    });
  }, [handleAddClient, handleSyncContacts, isListSearchable, isLoading, navigation, currentClients]);

  const _renderItem: ListRenderItem<ClientUserDtoType> = useCallback(
    ({ item }) => {
      const title = item.givenName || item.familyName || item.displayName || item.username;
      const subTitle = item.email || item.phoneNumbers?.[0]?.number;
      return (
        <SelectorListItem
          imageUrl={item.accountImageUrl}
          onPress={() => {
            navigation.navigate("authorized-stack", {
              screen: "business-client-screen",
              params: {
                client: item,
              },
            });
          }}
          rightIconName={"chevron-right"}
          title={title}
          subTitle={subTitle}
        />
      );
    },
    [navigation]
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
    <Screen preset="fixed" unsafe withHorizontalPadding backgroundColor="backgroundOverlay">
      <AnimatedSearchBar onChangeText={handleOnChangeText} isVisible={isListSearchable} />
      <List
        refreshing={isLoading}
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
        renderItem={_renderItem}
        data={filteredClientsData}
      />
    </Screen>
  );
};
