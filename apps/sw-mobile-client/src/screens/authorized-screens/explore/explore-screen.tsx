import { Screen, TabBar, Text } from "@shortwaits/shared-ui";
import React from "react";
import { AuthenticatedScreenProps } from "../../../navigation";

export function ExploreScreen({ navigation, route }: AuthenticatedScreenProps<"explore-screen">) {
  return (
    <Screen>
      <Text>Explore Screen</Text>
      <TabBar navigation={navigation} route={route} />
    </Screen>
  );
}
