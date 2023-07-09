import React, { FC, useLayoutEffect } from "react";
import { truncate } from "lodash";

import {
  Screen,
  Text,
  Container,
  CircleIconButton,
  BackButton,
} from "../../../components";
import { AuthorizedScreenProps } from "../../../navigation";
import { EventScreenTabs } from "./event-tabs";

export const EventScreen: FC<AuthorizedScreenProps<"event-screen">> = ({
  navigation,
  route,
}) => {
  const { event } = route.params;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
      headerTitle: () => {
        return (
          <Container direction="row" justifyContent="center">
            <Text
              preset="headerTitle"
              text={truncate(event.name, { length: 16 })}
            />
          </Container>
        );
      },
      headerRight: () => {
        return (
          <Container direction="row" alignItems="center">
            <CircleIconButton withMarginRight iconType="edit" />
            <CircleIconButton withMarginRight iconType="share" />
          </Container>
        );
      },
      headerShadowVisible: false,
    });
  }, [event.name, navigation]);
  return (
    <Screen
      preset="fixed"
      unsafe
      unsafeBottom
      backgroundColor="backgroundOverlay"
    >
      <EventScreenTabs event={event} />
    </Screen>
  );
};
