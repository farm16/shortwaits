import { skipToken } from "@reduxjs/toolkit/dist/query";
import { Container, IconButton, Screen, Text, getResponsiveHeight } from "@shortwaits/shared-ui";
import React, { FC, Fragment, useCallback, useLayoutEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Alert } from "react-native";
import { ClientsTabs, FloatingGroupActionButton } from "../../../components";
import { useOsContacts } from "../../../hooks";
import { AuthorizedScreenProps } from "../../../navigation";
import { useCreateBusinessLocalClientsMutation, useGetAllBusinessClientsQuery } from "../../../services";
import { useBusiness, useLocalClients } from "../../../store";
import { LocalClientsTab } from "./clients-screen-tabs/local-clients-tab";
import { ShortwaitsClientsTab } from "./clients-screen-tabs/shortwaits-clients-tab";

export const ClientsScreen: FC<AuthorizedScreenProps<"clients-screen">> = ({ navigation }) => {
  const intl = useIntl();
  const business = useBusiness();
  const currentClients = useLocalClients();
  const [tabIndex, setTabIndex] = useState(0);
  const [isListSearchable, setIsListSearchable] = useState(false);

  const handleAddClient = useCallback(() => {
    navigation.navigate("modals", {
      screen: "add-client-modal-screen",
    });
  }, [navigation]);

  const handleAddLocalClient = useCallback(() => {
    navigation.navigate("modals", {
      screen: "add-client-modal-screen",
    });
  }, [navigation]);

  const { error: osContactsError, isLoading: isOsContactsLoading, getContacts: getOsContacts } = useOsContacts();
  const [createBusinessLocalClients, createBusinessLocalClientsResult] = useCreateBusinessLocalClientsMutation();
  const { isLoading: isAllClientsQueryLoading, refetch: refetchAllClientsQuery } = useGetAllBusinessClientsQuery(business?._id ?? skipToken, {
    refetchOnMountOrArgChange: true,
  });

  const isCreateClientsLoading = createBusinessLocalClientsResult.isLoading && !createBusinessLocalClientsResult.isSuccess;
  const isLoading = isCreateClientsLoading;

  const renderShortwaitsClientsTab = useCallback(() => {
    return <ShortwaitsClientsTab isLoading={isAllClientsQueryLoading} refresh={refetchAllClientsQuery} />;
  }, [isAllClientsQueryLoading, refetchAllClientsQuery]);

  const renderLocalClientsTab = useCallback(() => {
    return <LocalClientsTab isLoading={isAllClientsQueryLoading} refresh={refetchAllClientsQuery} />;
  }, [isAllClientsQueryLoading, refetchAllClientsQuery]);

  const handleSyncContacts = useCallback(
    async function () {
      const run = async () => {
        if (osContactsError) {
          Alert.alert("Error", osContactsError.message);
        }
        const contacts = await getOsContacts();
        const clientKeySet = new Set(currentClients.map(client => client.phoneNumbers?.[0]?.number));
        const filteredContacts = contacts.data.filter(contact => !clientKeySet.has(contact.phoneNumbers?.[0]?.number));

        console.log("filteredContacts >>>", JSON.stringify(filteredContacts, null, 2));

        createBusinessLocalClients({
          businessId: business._id,
          body: filteredContacts,
        });
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
    [business._id, createBusinessLocalClients, currentClients, getOsContacts, osContactsError]
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => {
        return (
          <Container direction="row" justifyContent="center" alignItems="center">
            <Text
              preset="headerTitle"
              style={{
                paddingLeft: getResponsiveHeight(16),
                marginRight: getResponsiveHeight(4),
              }}
              text={tabIndex === 0 ? "Shortwaits clients" : "Address book"}
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
            {tabIndex === 0 ? (
              <IconButton iconType="add" withMarginRight onPress={() => handleAddClient()} />
            ) : (
              <Fragment>
                <IconButton iconType="contactSync" withMarginRight onPress={() => handleSyncContacts()} />
                <IconButton iconType="add" withMarginRight onPress={() => handleAddLocalClient()} />
              </Fragment>
            )}
          </Container>
        );
      },
    });
  }, [handleAddClient, handleAddLocalClient, handleSyncContacts, intl, isListSearchable, isLoading, navigation, tabIndex]);

  return (
    <Screen preset="fixed" unsafe unsafeBottom>
      <ClientsTabs onTabChange={index => setTabIndex(index)} renderLocalClientsTab={renderLocalClientsTab} renderShortwaitsClientsTab={renderShortwaitsClientsTab} />
      <FloatingGroupActionButton />
    </Screen>
  );
};
