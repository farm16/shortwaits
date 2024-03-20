import { useNavigation } from "@react-navigation/native";
import { NonIdealState, Space, getResponsiveHeight, useTheme } from "@shortwaits/shared-ui";
import React, { useCallback } from "react";
import { Alert } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { AuthorizedScreenProps } from "../../../navigation";
import { BusinessItem } from "./helpers";

export function BusinessTab({ data }) {
  const { navigate } = useNavigation<AuthorizedScreenProps<"favorites-screen">["navigation"]>();
  const { Colors } = useTheme();

  const renderItem = useCallback(
    ({ item }) => {
      const handleFavoritePress = _item => {
        Alert.alert(
          `Are you sure you want to remove ${_item?.name} from your favorites?`,
          `You will no longer receive updates about this event.\nYou can always add it back later.`,
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "OK",
              onPress: () => {
                console.log("Favorite Pressed", `You pressed the favorite button for ${_item.name}`);
              },
            },
          ]
        );
      };

      const handleViewEventPress = _item => {
        navigate("authorized-stack", {
          screen: "business-details-screen",
        });
      };

      return <BusinessItem item={item} onFavoritePress={handleFavoritePress} onViewEventPress={handleViewEventPress} />;
    },
    [navigate]
  );

  if (data.length === 0) {
    return null;
  }

  return (
    <FlatList
      data={data}
      ItemSeparatorComponent={() => <Space />}
      keyExtractor={item => item.id}
      ListEmptyComponent={() => <NonIdealState type="noFavorites" />}
      contentContainerStyle={{
        padding: getResponsiveHeight(10),
        backgroundColor: Colors.lightBackground,
      }}
      renderItem={renderItem}
    />
  );
}
