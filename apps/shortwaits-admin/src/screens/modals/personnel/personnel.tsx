import React, { useLayoutEffect } from "react";
import { StatusBar, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import { RootStackParamList } from "@shortwaits/admin/navigation";
import {
  Screen,
  Card,
  Text,
  FloatingScreenButton,
} from "@shortwaits/admin/components";
import { useTheme } from "@shortwaits/admin/theme";

export const PersonnelModal = ({
  navigation,
}: StackScreenProps<RootStackParamList, "modals">) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "personnel",
    });
  }, [navigation]);
  const { Colors } = useTheme();
  return (
    <Screen
      preset="scroll"
      style={{ alignItems: "center", flex: 1, backgroundColor: Colors.white }}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.darkBackground}
      />
      <FloatingScreenButton
        iconSize="regular"
        onPress={() =>
          navigation.navigate("modals", {
            screen: "add-personnel-modal-screen",
            params: { mode: "add" },
          })
        }
        iconName="account-plus-outline"
      />
      {employees.map((elem, index) => {
        return (
          <Card key={index} disabled>
            <View>
              <Text preset="cardTitle" text={elem.fullName} />
              <Text preset="cardSubtitle" text={elem.email} />
            </View>
          </Card>
        );
      })}
    </Screen>
  );
};

const employees = [
  {
    id: "AQHJKjlkJUHUI1AL23JKNKJ234SHIUlkaskicm",
    fullName: "Amaira Pelaez",
    firstName: "amaira",
    lastName: "Pelaez",
    email: "amaira.fajardo@gmail.com",
  },
  {
    id: "AQHJKjlkJUHasdasdassdas4358h763dfFQAQW",
    fullName: "Christopher Fajardo",
    firstName: "Christopher",
    lastName: "Fajardo",
    email: "christopher.fajardo@gmail.com",
  },
];
