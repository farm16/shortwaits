import { useNavigation } from "@react-navigation/native";
import { Text } from "@shortwaits/shared-ui";
import React from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

export function BusinessTab({ data }) {
  const navigation = useNavigation();

  if (data.length === 0) {
    return null;
  }

  return (
    <View>
      <FlatList
        data={data}
        renderItem={() => (
          <View>
            <Text>Business Favorites</Text>
          </View>
        )}
      />
    </View>
  );
}
