import { Screen, Text } from "@shortwaits/shared-ui";
import React from "react";
import { AuthorizedScreenProps } from "../../../navigation";

export function EventScreen({ navigation, route }: AuthorizedScreenProps<"event-details-screen">) {
  return (
    <Screen preset="fixed" unsafe unsafeBottom backgroundColor="background">
      <Text>Event Screen</Text>
    </Screen>
  );
}
