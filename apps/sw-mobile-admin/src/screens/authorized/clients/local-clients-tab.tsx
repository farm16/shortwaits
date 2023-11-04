import { useNavigation } from "@react-navigation/native";
import { ClientUserDtoType } from "@shortwaits/shared-lib";
import { isEmpty } from "lodash";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Alert, ListRenderItem, View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { AnimatedSearchBar, Button, List, NonIdealState, SelectorListItem } from "../../../components";
import { useOsContacts } from "../../../hooks";
import { AuthorizedScreenProps } from "../../../navigation";
import { useCreateBusinessClientsMutation, useGetBusinessClientsQuery } from "../../../services";
import { useBusiness, useClients } from "../../../store";
import { getResponsiveHeight } from "../../../utils";

export function LocalClientsTab({ isListSearchable }) {
  const intl = useIntl();
  const currentClients = useClients();
  const business = useBusiness();
  const [, setSearchText] = useState("");
  const { navigate, setOptions } = useNavigation<AuthorizedScreenProps<"events-screen">["navigation"]>();
  const { isLoading: isBusinessClientsQueryLoading, isSuccess: isBusinessClientsQuerySuccess, refetch: refetchBusinessClientsQuery } = useGetBusinessClientsQuery(business._id, {});
  const [createClients, createClientsResult] = useCreateBusinessClientsMutation();

  const isClientsDataLoading = isBusinessClientsQueryLoading && !isBusinessClientsQuerySuccess;
  const isCreateClientsLoading = createClientsResult.isLoading && !createClientsResult.isSuccess;
  const [filteredClientsData, setFilteredClientsData] = useState([]);
  const { error: osContactsError, isLoading: isOsContactsLoading, getContacts: getOsContacts } = useOsContacts();

  const isLoading = isClientsDataLoading || isCreateClientsLoading;

  const handleSyncContacts = useCallback(
    async function () {
      const run = async () => {
        if (osContactsError) {
          Alert.alert("Error", osContactsError.message);
        }
        const contacts = await getOsContacts();
        const clientKeySet = new Set(currentClients.map(client => client.phoneNumbers?.[0]?.number));
        const filteredContacts = contacts.data.filter(contact => !clientKeySet.has(contact.phoneNumbers?.[0]?.number));

        console.log("contacts", JSON.stringify(contacts, null, 2));
        // createClients({
        //   businessId: business._id,
        //   body: filteredContacts,
        // });
      };
      Alert.alert("Do you want to sync your contacts?", "Contacts will be synced by phone numbers only.", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: run,
          style: "default",
        },
      ]);
    },
    [currentClients, getOsContacts, osContactsError]
  );

  const handleAddClient = useCallback(() => {
    navigate("modals", {
      screen: "add-client-modal-screen",
    });
  }, [navigate]);

  useEffect(() => {
    if (currentClients) {
      setFilteredClientsData(currentClients);
    } else {
      return;
    }
  }, [currentClients]);

  const _renderItem: ListRenderItem<ClientUserDtoType> = useCallback(
    ({ item }) => {
      const title = item.givenName || item.familyName || item.displayName || item.username;
      const subTitle = item.email || item.phoneNumbers?.[0]?.number;
      return (
        <SelectorListItem
          imageUrl={item.accountImageUrl}
          onPress={() => {
            navigate("authorized-stack", {
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
    [navigate]
  );
  const handleOnChangeText = (text: string) => {
    const trimmedText = text.trim();
    setSearchText(trimmedText);
    if (trimmedText !== "") {
      const filteredItems = currentClients.filter(item => {
        // Adjust the filtering logic based on your data structure
        const phoneNumberMatch = item.phoneNumbers.some(phone => phone.number.toLowerCase().includes(trimmedText.toLowerCase()));
        return item.givenName?.toLowerCase().includes(trimmedText.toLowerCase()) || item.email?.toLowerCase().includes(trimmedText.toLowerCase()) || phoneNumberMatch;
      });
      setFilteredClientsData(filteredItems);
    } else {
      setFilteredClientsData(currentClients);
    }
  };

  return (
    <Fragment>
      <View
        style={{
          paddingHorizontal: 16,
        }}
      >
        <AnimatedSearchBar onChangeText={handleOnChangeText} isVisible={isListSearchable} />
      </View>
      <List
        refreshing={isLoading}
        contentContainerStyle={{
          padding: getResponsiveHeight(16),
        }}
        refreshControl={<RefreshControl refreshing={isBusinessClientsQueryLoading} onRefresh={refetchBusinessClientsQuery} />}
        ListEmptyComponent={
          <View
            style={{
              marginTop: 16,
              padding: 16,
            }}
          >
            {isEmpty(currentClients) ? (
              <NonIdealState type={"noClients"} buttons={[<Button text={intl.formatMessage({ id: "Common.addClient" })} onPress={() => handleAddClient()} />]} />
            ) : null}
          </View>
        }
        renderItem={_renderItem}
        data={filteredClientsData}
      />
    </Fragment>
  );
}
