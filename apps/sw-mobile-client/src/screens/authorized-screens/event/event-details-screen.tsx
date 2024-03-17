import { BackButton, Screen, Text } from "@shortwaits/shared-ui";
import React, { useLayoutEffect } from "react";
import { useIntl } from "react-intl";
import { AuthorizedScreenProps } from "../../../navigation";

export function EventDetailsScreen({ navigation, route }: AuthorizedScreenProps<"event-detail-screen">) {
  const intl = useIntl();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
      headerTitle: () => <Text preset="headerTitle" text={intl.formatMessage({ id: "Common.updateClient" })} />,
    });
  }, [intl, navigation]);

  return (
    <Screen preset="fixed" unsafe unsafeBottom backgroundColor="background">
      <Text>Event Screen</Text>
    </Screen>
  );
}
