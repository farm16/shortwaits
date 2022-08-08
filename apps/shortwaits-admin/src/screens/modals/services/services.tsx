import React, { FC, useLayoutEffect } from "react";

import {
  Button,
  Screen,
  Card,
  TextField,
  Space,
  TextHeaderButton,
  ButtonCard,
  ServiceColors,
  UploadProfileImage,
} from "@shortwaits/admin/components";
import { useTheme } from "@shortwaits/admin/theme";
import { ModalsScreenProps } from "@shortwaits/admin/navigation";

export const ServicesModal: FC<ModalsScreenProps<"schedule-modal-screen">> = ({
  navigation,
  route,
}) => {
  const { type } = route.params;
  const { Colors } = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerRight: () => null,
    });
  }, [navigation]);
  return (
    <Screen preset="scroll" style={{ alignItems: "center" }}>
      <UploadProfileImage preset="small" style={{ marginVertical: 20 }} />
      <Card disabled>
        <ServiceColors />
      </Card>
      <TextField name="service" placeholder="service's name" />
      <TextField name="business name" placeholder="full name" />
      <TextField name="business name" placeholder="full name" />
      <TextField name="business name" placeholder="full name" />
      <ButtonCard
        title="industry"
        subTitle="others"
        onPress={() =>
          navigation.navigate("modals", {
            screen: "selector-modal-screen",
            params: {
              type: "My-Business-Categories",
            },
          })
        }
      />
      <Space size="large" />
    </Screen>
  );
};
