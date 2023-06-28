import React, { FC, useLayoutEffect } from "react";
import { truncate } from "lodash";

import {
  Calendar,
  FloatingActionButton,
  Screen,
  Text,
  Container,
  CircleIconButton,
} from "../../../components";
import { Colors } from "../../../theme";
import { AuthorizedScreenProps } from "../../../navigation";
import { useBusiness } from "../../../redux";
import { useGetServicesByBusinessQuery } from "../../../services";
import { skipToken } from "@reduxjs/toolkit/dist/query";

export const EventsScreen: FC<AuthorizedScreenProps<"events-screen">> = ({
  navigation,
}) => {
  const business = useBusiness();
  useGetServicesByBusinessQuery(business._id ?? skipToken);

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
      headerRight: () => {
        return (
          <Container direction="row" alignItems="center">
            <CircleIconButton withMarginRight iconType="magnify" />
            <CircleIconButton withMarginRight iconType="calendar" />
          </Container>
        );
      },
      headerShadowVisible: false,
    });
  }, [business.shortName, navigation]);

  return (
    <Screen
      preset="fixed"
      unsafe
      backgroundColor={Colors.white}
      statusBar="dark-content"
    >
      <Calendar />
      <FloatingActionButton />
    </Screen>
  );
};
