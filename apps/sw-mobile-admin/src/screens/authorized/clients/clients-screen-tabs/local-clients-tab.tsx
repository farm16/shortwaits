import { useNavigation } from "@react-navigation/native";
import { LocalClientDtoType } from "@shortwaits/shared-lib";
import { AnimatedSearchBar, Button, List, NonIdealState, SelectorListItem, getFriendlyShortId, getResponsiveHeight } from "@shortwaits/shared-ui";
import { isEmpty } from "lodash";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { ListRenderItem, View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { AuthorizedScreenProps } from "../../../../navigation";
import { useLocalClients } from "../../../../store";

export function LocalClientsTab({ isLoading, refresh }: { isLoading: boolean; refresh: () => void }) {
  const intl = useIntl();
  const [, setSearchText] = useState("");
  const currentLocalClients = useLocalClients();
  const [filteredLocalClientsData, setFilteredLocalClientsData] = useState([]);
  const { navigate, push } = useNavigation<AuthorizedScreenProps<"events-screen">["navigation"]>();

  const handleAddClient = useCallback(() => {
    navigate("modals", {
      screen: "add-client-modal-screen",
    });
  }, [navigate]);

  useEffect(() => {
    if (currentLocalClients) {
      setFilteredLocalClientsData(currentLocalClients);
    } else {
      return;
    }
  }, [currentLocalClients]);

  const _renderItem: ListRenderItem<LocalClientDtoType> = useCallback(
    ({ item }) => {
      const title = item.givenName || item.displayName || item.familyName || item.displayName || item.username;

      const subTitle = `ID: ${getFriendlyShortId(item.shortId)}`;

      return (
        <SelectorListItem
          imageUrl={item.accountImageUrl}
          onPress={() => {
            push("authorized-stack", {
              screen: "business-local-client-screen",
              params: {
                localClient: item,
              },
            });
          }}
          subTextStyle={{
            fontSize: getResponsiveHeight(14),
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
      const filteredItems = currentLocalClients.filter(item => {
        // Adjust the filtering logic based on your data structure
        const phoneNumberMatch = item.phoneNumbers.some(phone => phone.number.toLowerCase().includes(trimmedText.toLowerCase()));
        return item.givenName?.toLowerCase().includes(trimmedText.toLowerCase()) || item.email?.toLowerCase().includes(trimmedText.toLowerCase()) || phoneNumberMatch;
      });
      setFilteredLocalClientsData(filteredItems);
    } else {
      setFilteredLocalClientsData(currentLocalClients);
    }
  };

  const _renderListEmptyComponent = useCallback(() => {
    return (
      <View
        style={{
          marginTop: getResponsiveHeight(16),
          marginHorizontal: getResponsiveHeight(16),
        }}
      >
        {isEmpty(currentLocalClients) ? (
          <NonIdealState type={"noClients"} buttons={[<Button text={intl.formatMessage({ id: "Common.addClient" })} onPress={() => handleAddClient()} />]} />
        ) : null}
      </View>
    );
  }, [currentLocalClients, handleAddClient, intl]);

  return (
    <Fragment>
      <View
        style={{
          paddingHorizontal: 16,
        }}
      >
        <AnimatedSearchBar onChangeText={handleOnChangeText} isVisible={false} />
      </View>
      <List
        refreshing={isLoading}
        contentContainerStyle={{
          padding: getResponsiveHeight(16),
        }}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refresh} />}
        ListEmptyComponent={_renderListEmptyComponent}
        renderItem={_renderItem}
        data={filteredLocalClientsData}
      />
    </Fragment>
  );
}
