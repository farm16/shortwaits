import React, { useLayoutEffect } from "react";
import { View, Image } from "react-native";
import { BackButton, Button, Container, IconButton, List, Screen, Space, Text } from "../../../components";
import { AuthorizedScreenProps } from "../../../navigation";
import { useTheme } from "../../../theme";
import { useEvents } from "../../../store";

export function BusinessClientScreen({ navigation, route }: AuthorizedScreenProps<"business-client-screen">) {
  const { client } = route.params;
  const { Colors } = useTheme();
  const events = useEvents();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "center",
      headerTitle: () => {
        return (
          <Container direction="row" justifyContent="center">
            <Text preset="headerTitle" text={"Profile"} />
          </Container>
        );
      },
      headerLeft: () => {
        return (
          <Container direction="row" alignItems="center">
            <BackButton onPress={() => navigation.goBack()} />
          </Container>
        );
      },
      headerRight: () => {
        return (
          <Container direction="row" alignItems="center">
            <IconButton
              withMarginRight
              iconType="share"
              onPress={() => {
                navigation.goBack();
              }}
            />
            {/* <IconButton withMarginRight iconType="calendar"  /> */}
          </Container>
        );
      },
      headerShadowVisible: false,
    });
  }, [navigation]);

  const getEventsWithClient = () => {
    return events.filter(event => {
      return event.clientsIds.includes(client._id);
    });
  };

  console.log("events >>>", getEventsWithClient().length);
  console.log("client", JSON.stringify(client, null, 2));

  return (
    <Screen preset="fixed" unsafe unsafeBottom backgroundColor="backgroundOverlay" withHorizontalPadding>
      <Space />
      <Container
        direction="row"
        style={{
          minHeight: 100,
          // backgroundColor: "red",
        }}
      >
        <Image
          // todo remove default image
          source={{ uri: client.accountImageUrl ? client.accountImageUrl : "https://picsum.photos/200" }}
          style={{
            width: 100,
            height: "100%",
            resizeMode: "cover",
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            borderTopLeftRadius: 50,
            borderTopRightRadius: 0,
            marginRight: 16,
          }}
        />
        <View>
          <Text
            text={client.displayName}
            style={{
              color: Colors.text,
              fontSize: 18,
              fontWeight: "700",
              marginBottom: 8,
            }}
          />
          <Text text={client.email} />
          <Text text={client.displayName} />
        </View>
      </Container>
      <Space />
      <Container direction="row">
        <Button preset="primary2" text={"message"} />
        <Space direction="vertical" size="small" />
        <Button preset="primary2" text={"call"} />
      </Container>
    </Screen>
  );
}
