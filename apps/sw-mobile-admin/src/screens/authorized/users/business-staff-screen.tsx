import React, { useLayoutEffect } from "react";
import { View } from "react-native";
import { BackButton, Container, IconButton, Screen, Text } from "../../../components";
import { AuthorizedScreenProps } from "../../../navigation";

export function BusinessStaffScreen({ navigation }: AuthorizedScreenProps<"business-staff-screen">) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => {
        return (
          <Container direction="row" justifyContent="center">
            <Text preset="headerTitle" text={"Client"} />
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

  return (
    <Screen preset="fixed" unsafe unsafeBottom backgroundColor="backgroundOverlay">
      <Text>BusinessStaff</Text>
    </Screen>
  );
}
