import { BackButton, Container, EventStatusButtons, IconButton, Screen, Space, Text, useShareUrlWithMessage } from "@shortwaits/shared-ui";
import { truncate } from "lodash";
import React, { useLayoutEffect } from "react";
import { AuthorizedScreenProps } from "../../../navigation";
import { useEvent } from "../../../store";
import { EventScreenTabs } from "./event-tabs";

// TODO: test this with real device ios and android
// TODO: add config for android (missing)
export function EventScreen({ navigation, route }: AuthorizedScreenProps<"event-screen">) {
  const { eventId } = route.params;
  const event = useEvent(eventId);
  const { share, data: shareData, loading: shareLoading, error: shareError } = useShareUrlWithMessage();

  useLayoutEffect(() => {
    const handleShare = async () => {
      await share({
        message: `Check out ${event.name}`,
        url: `https://shortwaits.com/event/${event._id}`,
        title: event.name,
      });
    };
    navigation.setOptions({
      headerTitleAlign: "center",
      headerTitle: () => {
        return (
          <Container direction="row" justifyContent="center">
            <Text preset="headerTitle" text={truncate(event.name, { length: 16 })} />
          </Container>
        );
      },
      headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
      headerRight: () => {
        return (
          <Container direction="row" alignItems="center">
            <IconButton onPress={() => handleShare()} withMarginRight iconType="share" />
            <IconButton
              onPress={() => {
                navigation.navigate("modals", {
                  screen: "update-event-modal-screen",
                  params: {
                    initialValues: event,
                  },
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
  }, [event, navigation, share]);

  return (
    <Screen preset="fixed" unsafe unsafeBottom backgroundColor="lightBackground">
      <Space size="tiny" />
      <EventStatusButtons event={event} />
      <Space size="small" />
      <EventScreenTabs event={event} />
    </Screen>
  );
}
