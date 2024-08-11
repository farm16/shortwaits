import { skipToken } from "@reduxjs/toolkit/dist/query";
import { BackButton, Container, IconButton, NonIdealState, Screen, Space, getResponsiveFontSize, getResponsiveHeight } from "@shortwaits/shared-ui";
import React, { FC, useCallback, useLayoutEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { ClientsTabs } from "../../../../components";
import { ModalsScreenProps } from "../../../../navigation";
import { useGetAllBusinessClientsQuery } from "../../../../services";
import { useBusiness, useClients, useLocalClients } from "../../../../store";
import { ClientsListItem } from "./clients-list-item";

export const ClientsListModal: FC<ModalsScreenProps<"business-clients-modal-screen">> = ({ navigation, route }) => {
  const { searchable = false, headerTitle = "Clients", onGoBack } = route.params;

  const business = useBusiness();
  const localClients = useLocalClients();
  const clients = useClients();
  const [isListSearchable, setIsListSearchable] = useState<boolean>(false);

  useGetAllBusinessClientsQuery(business._id ?? skipToken); // initial query

  const handleAddClientPress = useCallback(() => {
    navigation.navigate("modals", { screen: "add-client-modal-screen" });
  }, [navigation]);

  useLayoutEffect(() => {
    const handleOnGoBack = () => {
      navigation.goBack();
    };

    navigation.setOptions({
      headerTitle: headerTitle,
      headerLeft: () => (
        <Container direction="row" alignItems="center">
          <BackButton onPress={() => handleOnGoBack()} />
        </Container>
      ),
      headerRight: () => (
        <Container direction="row" alignItems="center">
          {searchable ? (
            <IconButton
              withMarginRight
              iconType={isListSearchable ? "search-close" : "search"}
              onPress={() => {
                setIsListSearchable(s => !s);
              }}
            />
          ) : null}
          <IconButton onPress={() => handleAddClientPress()} withMarginRight iconType="add-client" />
        </Container>
      ),
    });
  }, [handleAddClientPress, headerTitle, isListSearchable, navigation, onGoBack, searchable]);

  // shortwaits clients
  const renderClient = useCallback(() => {
    const handleClientOnSelect = item => {
      navigation.navigate("authorized-stack", {
        screen: "business-client-profile-screen",
        params: {
          client: item,
        },
      });
    };
    const renderClientItem = ({ item }) => {
      return (
        <ClientsListItem
          item={item}
          onSelect={() => {
            handleClientOnSelect(item);
          }}
        />
      );
    };
    return (
      <FlatList
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
        data={clients}
        renderItem={renderClientItem}
        ListEmptyComponent={<NonIdealState type="noClients" />}
        ListFooterComponent={<Space size="large" />}
      />
    );
  }, [clients, navigation]);

  // local clients
  const renderLocalClient = useCallback(() => {
    const handleLocalClientOnSelect = item => {
      navigation.navigate("authorized-stack", {
        screen: "business-local-client-profile-screen",
        params: {
          localClient: item,
        },
      });
    };
    const renderLocalClientItem = ({ item }) => {
      return (
        <ClientsListItem
          item={item}
          onSelect={() => {
            handleLocalClientOnSelect(item);
          }}
        />
      );
    };
    return (
      <FlatList
        style={styles.container}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
        data={localClients}
        renderItem={renderLocalClientItem}
        ListEmptyComponent={<NonIdealState type="noClients" />}
        ListFooterComponent={<Space size="large" />}
      />
    );
  }, [localClients, navigation]);

  return (
    <Screen preset="fixed" unsafe backgroundColor="background">
      <ClientsTabs renderLocalClientsTab={renderLocalClient} renderShortwaitsClientsTab={renderClient} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: getResponsiveHeight(16),
  },
  submitButton: {
    paddingTop: getResponsiveHeight(16),
    paddingHorizontal: getResponsiveHeight(16),
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E5E5E5",
    paddingBottom: getResponsiveHeight(16),
  },
  searchBar: {},
  flatList: {},
  tabBar: {
    flexDirection: "row",
  },
  tabContainer: {
    flex: 1,
  },
  tabView: {
    justifyContent: "center",
    alignItems: "center",
    height: getResponsiveHeight(50),
    borderBottomWidth: getResponsiveHeight(4),
  },
  tabText: {
    fontSize: getResponsiveFontSize(16),
  },
});
