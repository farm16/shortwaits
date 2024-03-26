import { Button, Container, Screen, Space, Text, useTheme } from "@shortwaits/shared-ui";
import React from "react";
import { Divider, List } from "react-native-paper";
import { AuthorizedScreenProps } from "../../../navigation";
import { useLocalSignOutMutation } from "../../../services";
//https://dribbble.com/shots/21094373-Mobile-Settings-IOS-App
export function SettingsScreen({ navigation, route }: AuthorizedScreenProps<"settings-screen">) {
  const [signOut] = useLocalSignOutMutation();
  const { Colors } = useTheme();

  return (
    <Screen preset="scroll" unsafeBottom>
      <Container withHorizontalPadding>
        <Space size="large" />
        <Text preset="title" text="Settings" />
        <Space size="large" />
      </Container>
      <Container withHorizontalPadding>
        <Space size="large" />
        <Text preset="titleSmall" text="General" />
        <Space size="large" />
      </Container>
      <List.Item left={props => <List.Icon {...props} icon="account" />} right={props => <List.Icon {...props} icon="chevron-right" />} title="Profile" onPress={() => {}} />
      <Divider />
      <List.Item
        left={props => <List.Icon {...props} icon="theme-light-dark" />}
        right={props => <List.Icon {...props} icon="chevron-right" />}
        title="Appearance"
        onPress={() => {}}
      />
      <Divider />
      <List.Item left={props => <List.Icon {...props} icon="bell" />} right={props => <List.Icon {...props} icon="chevron-right" />} title="Notifications" onPress={() => {}} />
      <Divider />
      <List.Item left={props => <List.Icon {...props} icon="lock" />} right={props => <List.Icon {...props} icon="chevron-right" />} title="Security" onPress={() => {}} />
      <Divider />
      <Container withHorizontalPadding>
        <Space size="xLarge" />
        <Text preset="titleSmall" text="Support" />
        <Space size="large" />
      </Container>
      <List.Item
        left={props => <List.Icon {...props} icon="alert-circle-outline" />}
        right={props => <List.Icon {...props} icon="chevron-right" />}
        title="Report an issue"
        onPress={() => {}}
      />
      <Divider />
      <List.Item
        left={props => <List.Icon {...props} icon="help-circle-outline" />}
        right={props => <List.Icon {...props} icon="chevron-right" />}
        title="FAQ"
        onPress={() => {}}
      />
      <Divider />
      <List.Item
        left={props => <List.Icon {...props} icon="shield-check" />}
        right={props => <List.Icon {...props} icon="chevron-right" />}
        title="Privacy Policy"
        onPress={() => {}}
      />
      <Divider />
      <List.Item
        left={props => <List.Icon {...props} icon="shield-lock" />}
        right={props => <List.Icon {...props} icon="chevron-right" />}
        title="Terms of Service"
        onPress={() => {}}
      />
      <Divider />
      <Space size="large" />
      <Container withHorizontalPadding>
        <Button
          style={{
            alignSelf: "stretch",
          }}
          text="Sign Out"
          preset="outline-secondary"
          onPress={() => {
            signOut(undefined);
          }}
        />
      </Container>
    </Screen>
  );
}
