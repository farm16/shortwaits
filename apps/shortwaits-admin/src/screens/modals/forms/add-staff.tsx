import React, { FC, useLayoutEffect } from "react";
import { View } from "react-native";

import { useTheme } from "../../../theme";
import { Button, Screen, Text, TextHeaderButton } from "../../../components";
import { AuthorizedScreenProps } from "../../../navigation";

export const AddStaffModal: FC<AuthorizedScreenProps<"form-modal-screen">> = ({
  navigation,
}) => {
  const { Colors } = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TextHeaderButton
          onPress={() => {
            // onChange({ businessIndustryTypes: data })
            navigation.goBack();
          }}
          text={"AddStaffModal"}
        />
      ),
    });
  }, [navigation]);

  return (
    <Screen preset="fixed" style={{ alignItems: "center" }} unsafe>
      <Text text="here" />
    </Screen>
  );
};
