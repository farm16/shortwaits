import { useNavigation } from "@react-navigation/native";
import { Button, IconButton, NonIdealState, Space, Text, getResponsiveHeight, useTheme } from "@shortwaits/shared-ui";
import React from "react";
import { ImageBackground, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { AuthorizedScreenProps } from "../../../navigation";

type EventsTabProps = {
  data: {
    id: string;
    name: string;
    rating: {
      average: number;
      count: number;
    };
    links: {
      web: string;
      app: string;
    };
    description: string;
    image: string;
  }[];
};
export function EventsTab({ data }: EventsTabProps) {
  const { navigate } = useNavigation<AuthorizedScreenProps<"favorites-screen">["navigation"]>();
  const { Colors } = useTheme();
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
      renderItem={({ item }) => (
        <View
          style={{
            height: getResponsiveHeight(150),
            backgroundColor: "white",
            borderRadius: getResponsiveHeight(10),
            flexDirection: "row",
          }}
        >
          <IconButton
            onPress={() => {}}
            iconType="favorite"
            iconColor={"red3"}
            style={{
              position: "absolute",
              right: getResponsiveHeight(7),
              top: getResponsiveHeight(7),
            }}
          />
          <ImageBackground
            style={{ flex: 1 }}
            imageStyle={{
              borderTopLeftRadius: getResponsiveHeight(10),
              borderBottomLeftRadius: getResponsiveHeight(10),
              resizeMode: "cover",
              justifyContent: "center",
              opacity: 0.8,
            }}
            source={{
              uri: "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
          />
          <View style={{ flex: 1, padding: getResponsiveHeight(10) }}>
            <Text preset="title" text={item.name} />
            <Space size="tiny" />
            <Text preset="text" text={item.description} length={40} />
            <Button
              preset="primary2"
              text={"View Event"}
              style={{
                marginTop: "auto",
                flex: undefined,
                alignSelf: "flex-end",
                justifyContent: "center",
                alignItems: "center",
                height: getResponsiveHeight(30),
                paddingHorizontal: getResponsiveHeight(16),
              }}
              textStyle={{
                fontSize: getResponsiveHeight(12),
                color: "white",
              }}
              onPress={() => {
                navigate("authorized-stack", {
                  screen: "event-detail-screen",
                });
              }}
            />
          </View>
        </View>
      )}
    />
  );
}
