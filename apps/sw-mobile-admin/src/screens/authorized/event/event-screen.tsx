import { skipToken } from "@reduxjs/toolkit/dist/query";
import { EventStatusName, eventStatusCodes, eventStatusNames } from "@shortwaits/shared-lib";
import { ActivityIndicator, BackButton, Container, EventStatusButtons, IconButton, Screen, Text, useShareUrlWithMessage } from "@shortwaits/shared-ui";
import { truncate } from "lodash";
import React, { useCallback, useEffect, useLayoutEffect } from "react";
import { Alert } from "react-native";
import { AuthorizedScreenProps } from "../../../navigation";
import { useGetBusinessEventPeopleQuery, useUpdateBusinessEventMutation } from "../../../services";
import { useEvent } from "../../../store";
import { EventScreenTabs } from "./event-tabs";

// TODO: test this with real device ios and android
// TODO: add config for android (missing)
export function EventScreen({ navigation, route }: AuthorizedScreenProps<"event-screen">) {
  const { eventId } = route.params;
  const event = useEvent(eventId);
  const { share, data: shareData, loading: shareLoading, error: shareError } = useShareUrlWithMessage();
  const [updateBusinessEvent, updateEventStatus] = useUpdateBusinessEventMutation();
  // const [updateBusinessEvent, updateEventStatus] = useUpdateBusinessEventStatusMutation();

  const {
    isLoading: isPeopleInEventQueryLoading,
    isError: isPeopleInEventQueryError,
    error: peopleInEventQueryError,
    refetch: refetchPeopleInEventQuery,
  } = useGetBusinessEventPeopleQuery(event?._id ? event._id : skipToken, {
    refetchOnMountOrArgChange: true,
  });

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

  const handleUpdateEvent = useCallback(
    (status: EventStatusName) => {
      updateBusinessEvent({
        body: {
          ...event,
          status: {
            statusName: eventStatusNames[status],
            statusCode: eventStatusCodes[status],
          },
        },
        businessId: event.businessId,
      });
    },
    [event, updateBusinessEvent]
  );

  useEffect(() => {
    if (isPeopleInEventQueryError) {
      console.log("peopleInEventQueryError >>>", peopleInEventQueryError);
      const defaultErrorMessage = "Failed to fetch people in event";
      const errorData = peopleInEventQueryError?.data;
      const message = errorData?.message ?? "";
      const errorMessage = errorData?.error ?? "";
      const statusCode = errorData?.statusCode ? `${errorData?.statusCode}` : "";
      const errorTitle = statusCode.startsWith("4") ? "Warning" : "Error";
      const alertErrorMessage = `${message}\n${errorMessage}` || defaultErrorMessage;
      Alert.alert(errorTitle, alertErrorMessage, [{ text: "Retry", onPress: refetchPeopleInEventQuery }, { text: "Ok" }]);
    }
  }, [isPeopleInEventQueryError, peopleInEventQueryError, refetchPeopleInEventQuery]);

  if (updateEventStatus.isLoading || isPeopleInEventQueryLoading) {
    return <ActivityIndicator />;
  }

  return (
    <Screen preset="fixed" unsafe unsafeBottom backgroundColor="background">
      <EventStatusButtons event={event} onPress={handleUpdateEvent} />
      <EventScreenTabs event={event} onPeopleRefresh={refetchPeopleInEventQuery} isPeopleLoading={isPeopleInEventQueryLoading} />
    </Screen>
  );
}
