import { Avatar, BackButton, Button, Container, IconButton, Screen, Space, Text, getResponsiveFontSize, useTheme } from "@shortwaits/shared-ui";
import React, { useLayoutEffect } from "react";
import { StyleSheet } from "react-native";
import { Divider, List } from "react-native-paper";
import { AuthorizedScreenProps } from "../../../navigation";
import { Section } from "./helpers";

export function UserProfile({ navigation, route }: AuthorizedScreenProps<"user-profile-screen">) {
  const { Colors } = useTheme();

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
      headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
      headerRight: () => {
        return (
          <Container direction="row" alignItems="center">
            <IconButton
              // onPress={() => {
              //   navigation.navigate("modals", {
              //     screen: "update-event-modal-screen",
              //     params: {
              //       initialValues: event,
              //     },
              //   });
              // }}
              iconColor={"brandSecondary"}
              withMarginRight
              iconType="qr"
            />
          </Container>
        );
      },
      headerShadowVisible: false,
    });
  }, [navigation]);
  return (
    <Screen preset="scroll" unsafe unsafeBottom backgroundColor="background">
      <Section
        containerStyle={{
          alignItems: "center",
        }}
      >
        <Avatar mode={"static"} size="medium" />
        <Space size="large" />
        <Text
          preset="headerTitle"
          style={{
            color: Colors.brandSecondary,
          }}
          text={"John Doe"}
        />
        <Space size="large" />
        <Text preset="cardSubtitle" text={"JohnDoe@gmail.com"} />
        <Space size="large" />
        <Button
          text="Edit Profile"
          preset="secondary2"
          rightIconName="pencil"
          rightIconColor={Colors.white}
          style={{
            paddingHorizontal: 20,
          }}
          textStyle={{
            paddingRight: 10,
          }}
        />
        <Space size="large" />
      </Section>
      <Section title="Overview">
        <List.Item titleStyle={styles.itemText} title="Account" right={props => <List.Icon {...props} icon="folder" />} />
        <Divider />
        <List.Item titleStyle={styles.itemText} title="Currency" right={props => <List.Icon {...props} icon="folder" />} />
        <Divider />
        <List.Item titleStyle={styles.itemText} title="First Item" right={props => <List.Icon {...props} icon="folder" />} />
      </Section>
      <Section title="Account">
        <List.Item titleStyle={styles.itemText} title="Payment Methods" right={props => <List.Icon {...props} icon="folder" />} />
        <Divider />
        <List.Item titleStyle={styles.itemText} title="Activity Log" right={props => <List.Icon {...props} icon="folder" />} />
        <Divider />
        <List.Item titleStyle={styles.itemText} title="Theme" right={props => <List.Icon {...props} icon="folder" />} />
      </Section>
    </Screen>
  );
}

const styles = StyleSheet.create({
  item: {},
  itemText: {
    fontSize: getResponsiveFontSize(14),
  },
});
