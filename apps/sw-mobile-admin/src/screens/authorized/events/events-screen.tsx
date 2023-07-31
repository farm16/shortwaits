import React, { FC, useLayoutEffect } from "react";
import { truncate } from "lodash";

import { Calendar, FloatingActionButton, Screen, Text, Container, IconButton } from "../../../components";
import { AuthorizedScreenProps } from "../../../navigation";
import { useBusiness, useShowGhostComponent } from "../../../store";
import { useGetServicesByBusinessQuery } from "../../../services";
import { skipToken } from "@reduxjs/toolkit/dist/query";

export const EventsScreen: FC<AuthorizedScreenProps<"events-screen">> = ({ navigation }) => {
  const business = useBusiness();
  useGetServicesByBusinessQuery(business._id ?? skipToken);

  useShowGhostComponent("floatingActionButton");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => {
        return (
          <Container direction="row" justifyContent="center">
            <Text preset="headerTitle" text={truncate(business.shortName, { length: 16 })} />
          </Container>
        );
      },
      headerRight: () => {
        return (
          <Container direction="row" alignItems="center">
            <IconButton withMarginRight iconType="magnify" />
            <IconButton withMarginRight iconType="calendar" />
          </Container>
        );
      },
      headerShadowVisible: false,
    });
  }, [business.shortName, navigation]);

  return (
    <Screen preset="fixed" unsafe unsafeBottom backgroundColor="backgroundOverlay">
      <Calendar />
    </Screen>
  );
};
