import React, { FC, useEffect, useLayoutEffect, useMemo } from "react";
import { skipToken } from "@reduxjs/toolkit/dist/query/react";
import { ActivityIndicator } from "react-native-paper";
import { truncate } from "lodash";

import {
  Calendar,
  FloatingActionButton,
  Screen,
  getCalendarData,
  Text,
  Container,
} from "../../../components";
import { Colors } from "../../../theme";
import {
  useGetAllBusinessEventsQuery,
  useGetServicesByBusinessQuery,
} from "../../../services";
import { AuthorizedScreenProps } from "../../../navigation";
import { useBusiness, useComponentVisibility } from "../../../redux";
import { actions } from "./fab-actions";

export const EventsScreen: FC<AuthorizedScreenProps<"events-screen">> = ({
  navigation,
}) => {
  const business = useBusiness();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => {
        return (
          <Container direction="row" justifyContent="center">
            <Text
              preset="headerTitle"
              text={truncate(business.shortName, { length: 16 })}
            />
          </Container>
        );
      },
      headerShadowVisible: false,
    });
  }, [business.shortName, navigation]);

  const { isVisible } = useComponentVisibility("floatingActionButton", true);

  const { isSuccess: isBusinessServicesSuccess } =
    useGetServicesByBusinessQuery(business ? business._id : skipToken);
  const {
    data: eventsData,
    isLoading: isEventsLoading,
    isSuccess: isEventSuccess,
  } = useGetAllBusinessEventsQuery(
    business && isBusinessServicesSuccess ? business._id : skipToken
  );
  const events = useMemo(
    () => getCalendarData(eventsData?.data.events),
    [eventsData]
  );
  console.log(events);

  const isLoading = isEventsLoading && !isEventSuccess;

  return (
    <Screen
      preset="fixed"
      unsafe
      backgroundColor={Colors.white}
      statusBar="dark-content"
    >
      {isLoading ? <ActivityIndicator /> : <Calendar events={events} />}
      <FloatingActionButton
        isVisible={isVisible}
        actions={actions}
        icon={"plus"}
        pressedIcon={"close"}
      />
    </Screen>
  );
};
