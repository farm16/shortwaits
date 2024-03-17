import { Avatar, BackButton, Container, IconButton, QrModal, Screen, Space, Switch, Text, getResponsiveFontSize, useTheme } from "@shortwaits/shared-ui";
import React, { useLayoutEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Divider, List } from "react-native-paper";
import { AuthorizedScreenProps } from "../../../navigation";
import { Section } from "./helpers";

export function UserProfile({ navigation, route }: AuthorizedScreenProps<"user-profile-screen">) {
  const { Colors } = useTheme();
  const [isQrVisible, setIsQrVisible] = useState(false);

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
              onPress={() => {
                setIsQrVisible(true);
              }}
              iconColor={"brandSecondary"}
              withMarginRight
              iconType="qr"
            />
            <IconButton
              onPress={() => {
                navigation.navigate("modals", {
                  screen: "update-client-modal-screen",
                });
              }}
              iconColor={"brandSecondary"}
              withMarginRight
              iconType="edit"
            />
          </Container>
        );
      },
      headerShadowVisible: false,
    });
  }, [navigation]);
  return (
    <Screen preset="scroll" unsafe unsafeBottom backgroundColor="lightBackground">
      <Section
        containerStyle={{
          alignItems: "center",
        }}
      >
        <Space size="large" />

        <Avatar mode={"static"} size="medium" />
        <Space />

        <Text
          preset="headerTitle"
          style={{
            color: Colors.brandSecondary,
          }}
          text={"John Doe"}
        />
        <Space size="tiny" />
        <Text preset="cardSubtitle" text={"JohnDoe@gmail.com"} />
        <Space size="large" />
      </Section>
      <Section title="Overview">
        <List.Item titleStyle={styles.itemText} title="Account ID" description="1234567890" />
        <Divider />
        <List.Item titleStyle={styles.itemText} title="Location" description="United States" />
        <Divider />
        <List.Item titleStyle={styles.itemText} title="Currency" description="USD" />
      </Section>
      <Section title="Account">
        <List.Item titleStyle={styles.itemText} title="Payment Methods" right={props => <List.Icon {...props} icon="chevron-right" />} />
        <Divider />
        <List.Item titleStyle={styles.itemText} title="Activity Log" right={props => <List.Icon {...props} icon="chevron-right" />} />
        <Divider />
        <List.Item titleStyle={styles.itemText} title="Dark theme" right={props => <Switch />} />
      </Section>
      <QrModal
        isVisible={isQrVisible}
        setIsVisible={setIsQrVisible}
        value={"/booking"}
        title={"QR Code"}
        description={
          <Text>
            {"Add"} <Text style={{ fontWeight: "700" }}>{"John Doe"}</Text>
          </Text>
        }
        description2={"Scan the code to add John Doe"}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  item: {},
  itemText: {
    fontSize: getResponsiveFontSize(14),
  },
});
