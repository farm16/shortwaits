import { BusinessVideoConferencesType } from "@shortwaits/shared-lib";
import { BackButton, Button, FormContainer, Switch, Text, useTheme } from "@shortwaits/shared-ui";
import React, { FC, useLayoutEffect, useState } from "react";
import { useIntl } from "react-intl";
import { View } from "react-native";
import { AuthorizedScreenProps } from "../../../navigation";
import { useBusiness } from "../../../store";

const integrationReducer = (state: BusinessVideoConferencesType, action) => {
  switch (action.type) {
    case "UPDATE":
      return { ...state, ...action.payload };

    case "ADD_INTEGRATION":
      return { ...state, integrations: [...state.integrations, action.payload] };

    default:
      return state;
  }
};

export const IntegrationsScreen: FC<AuthorizedScreenProps<"integrations-screen">> = props => {
  const { navigation } = props;

  const intl = useIntl(); // Access the intl object
  const business = useBusiness();
  const { Colors } = useTheme();
  const [isZoomEnabled, setIsZoomEnabled] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
      headerTitle: () => <Text preset="headerTitle" text={"App Information"} />,
    });
  }, [intl, navigation]);

  console.log(JSON.stringify(business, null, 2));

  const renderSubmitButton = (
    <Button
      preset="secondary"
      text={intl.formatMessage({ id: "Common.submit" })}
      onPress={() => {
        // handleSubmit();
      }}
    />
  );

  return (
    <FormContainer footer={renderSubmitButton}>
      <Text text="Integration FormContainer" />
      <Switch
        disabled
        trackColor={{ false: Colors.red1, true: Colors.lightBackground }}
        thumbColor={isZoomEnabled ? Colors.brandSecondary2 : Colors.gray}
        ios_backgroundColor={Colors.lightBackground}
        onChange={() => setIsZoomEnabled(!isZoomEnabled)}
        value={isZoomEnabled}
      />
    </FormContainer>
  );
};

const SwitchRow: FC<{ title: string; value: boolean; onChange: () => void }> = ({ title, value, onChange }) => {
  const { Colors } = useTheme();
  return (
    <View>
      <Text text={title} />
      <Switch
        trackColor={{ false: Colors.red1, true: Colors.lightBackground }}
        thumbColor={value ? Colors.brandSecondary2 : Colors.gray}
        ios_backgroundColor={Colors.lightBackground}
        onChange={onChange}
        value={value}
      />
    </View>
  );
};
