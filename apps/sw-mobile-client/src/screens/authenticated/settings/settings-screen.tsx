import { Button, Screen, TabBar, Text } from "@shortwaits/shared-ui";
import React from "react";
import { AuthenticatedScreenProps } from "../../../navigation";
import { useLocalSignOutMutation } from "../../../services";

export function SettingsScreen({ navigation, route }: AuthenticatedScreenProps<"settings-screen">) {
  const [signOut] = useLocalSignOutMutation();
  return (
    <Screen>
      <Text>Settings Screen</Text>
      <Button
        text="Sign Out"
        onPress={() => {
          signOut(undefined);
        }}
      />
      <TabBar navigation={navigation} route={route} />
    </Screen>
  );
}