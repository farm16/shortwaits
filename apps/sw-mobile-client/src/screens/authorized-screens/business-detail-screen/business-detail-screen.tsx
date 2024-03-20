import { BackButton, Screen, Text } from "@shortwaits/shared-ui";
import React, { useLayoutEffect } from "react";
import { useIntl } from "react-intl";
import { AuthorizedScreenProps } from "../../../navigation";

export function BusinessDetailsScreen({ navigation, route }: AuthorizedScreenProps<"event-details-screen">) {
  const intl = useIntl();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
      headerTitle: () => <Text preset="headerTitle" text={intl.formatMessage({ id: "Common.updateClient" })} />,
    });
  }, [intl, navigation]);

  return (
    <Screen preset="fixed" unsafe unsafeBottom backgroundColor="background">
      <Text>Business Details Screen</Text>
    </Screen>
  );
}
