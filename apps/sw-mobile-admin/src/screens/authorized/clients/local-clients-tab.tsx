import { useNavigation } from "@react-navigation/native";
import { ClientUserDtoType } from "@shortwaits/shared-lib";
import { isEmpty } from "lodash";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { ListRenderItem, View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { AnimatedSearchBar, Button, List, NonIdealState, SelectorListItem } from "../../../components";
import { AuthorizedScreenProps } from "../../../navigation";
import { useLocalClients } from "../../../store";
import { getResponsiveHeight } from "../../../utils";

export function LocalClientsTab({ isLoading, refresh }: { isLoading: boolean; refresh: () => void }) {
  const intl = useIntl();
  const [, setSearchText] = useState("");
  const currentLocalClients = useLocalClients();
  const [filteredLocalClientsData, setFilteredLocalClientsData] = useState([]);
  const { navigate } = useNavigation<AuthorizedScreenProps<"events-screen">["navigation"]>();

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
        ListEmptyComponent={
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
        }
        renderItem={_renderItem}
        data={filteredLocalClientsData}
      />
    </Fragment>
  );
}
