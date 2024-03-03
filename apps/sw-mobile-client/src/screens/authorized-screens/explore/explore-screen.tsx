import { Screen, TabBar, Text } from "@shortwaits/shared-ui";
import React from "react";
import { AuthorizedScreenProps } from "../../../navigation";

export function ExploreScreen({ navigation, route }: AuthorizedScreenProps<"history-screen">) {
  return (
    <Screen>
      <Text>Explore Screen</Text>
      <TabBar navigation={navigation} route={route} />
    </Screen>
  );
}
