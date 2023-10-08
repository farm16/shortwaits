import React, { FC, useLayoutEffect, useRef } from "react";
import { truncate } from "lodash";

import {
  Screen,
  Text,
  Container,
  IconButton,
  BackButton,
  useBottomSheet,
  BottomSheetType,
  EventStatusButtons,
  Space,
} from "../../../components";
import { AuthorizedScreenProps } from "../../../navigation";
import { EventScreenTabs } from "./event-tabs";
import { useEvent } from "../../../store";
import { ShareEvent } from "./share-event";

// TODO: test this with real device ios and android
// TODO: add config for android (missing)
export function EventScreen({ navigation, route }: AuthorizedScreenProps<"event-screen">) {
  const { eventId } = route.params;

  const event = useEvent(eventId);
  const bottomSheetRef = useRef<BottomSheetType>(null);
  const handleBottomSheet = useBottomSheet(bottomSheetRef);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
      headerTitleAlign: "center",
      headerTitle: () => {
        return (
          <Container direction="row" justifyContent="center">
            <Text preset="headerTitle" text={truncate(event.name, { length: 16 })} />
          </Container>
        );
      },
      headerRight: () => {
        return (
          <Container direction="row" alignItems="center">
            <IconButton onPress={() => handleBottomSheet.expand()} withMarginRight iconType="share" />
            <IconButton
              onPress={() => {
                navigation.navigate("modals", {
                  screen: "update-event-modal-screen",
                });
              }}
              withMarginRight
              iconType="edit"
            />
          </Container>
        );
      },
      headerShadowVisible: false,
    });
  }, [event, handleBottomSheet, navigation]);

  return (
    <Screen preset="fixed" unsafe unsafeBottom backgroundColor="backgroundOverlay">
      <Space size="tiny" />
      <EventStatusButtons event={event} />
      <Space size="small" />
      <EventScreenTabs event={event} />
      <ShareEvent event={event} ref={bottomSheetRef} />
    </Screen>
  );
}
