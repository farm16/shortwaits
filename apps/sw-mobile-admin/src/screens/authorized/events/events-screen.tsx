import React, { useLayoutEffect, useState } from "react";
import { truncate } from "lodash";

import { Calendar, Screen, Text, Container, IconButton, QrModal } from "../../../components";
import { AuthorizedScreenProps } from "../../../navigation";
import { useBusiness, useEvents, useShowGhostComponent } from "../../../store";
import { useGetServicesByBusinessQuery } from "../../../services";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { convertStaticSelectorModalData } from "../../../utils/static-selector-modal-utils";

export function EventsScreen({ navigation }: AuthorizedScreenProps<"events-screen">) {
  const [isQrVisible, setIsQrVisible] = useState(false);

  const currentBusiness = useBusiness();
  const currentsEvents = useEvents();

  useGetServicesByBusinessQuery(currentBusiness._id ?? skipToken);
  useShowGhostComponent("floatingActionButton");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => {
        return (
          <Container direction="row" justifyContent="center">
            <Text preset="headerTitle" text={truncate(currentBusiness.shortName, { length: 16 })} />
          </Container>
        );
      },
      headerLeft: () => {
        return (
          <Container direction="row" alignItems="center">
            <IconButton
              withMarginLeft
              iconType="qr"
              onPress={() => {
                setIsQrVisible(true);
              }}
            />
          </Container>
        );
      },
      headerRight: () => {
        return (
          <Container direction="row" alignItems="center">
            <IconButton
              withMarginRight
              iconType="magnify"
              onPress={() =>
                navigation.navigate("modals", {
                  screen: "selector-modal-screen",
                  params: {
                    type: "static",
                    closeOnSubmit: false,
                    searchable: true,
                    headerTitle: "Search events",
                    itemRightIconColor: "brandSecondary",
                    itemRightIconName: "dots-vertical",
                    data: convertStaticSelectorModalData(currentsEvents ?? [], "events"),
                    onSelect: item => {
                      navigation.navigate("authorized-stack", {
                        screen: "event-screen",
                        params: { eventId: item.key },
                      });
                    },
                  },
                })
              }
            />
            {/* <IconButton withMarginRight iconType="calendar"  /> */}
          </Container>
        );
      },
      headerShadowVisible: false,
    });
  }, [currentBusiness.shortName, currentsEvents, navigation]);

  return (
    <Screen preset="fixed" unsafe unsafeBottom backgroundColor="backgroundOverlay">
      <QrModal
        isVisible={isQrVisible}
        setIsVisible={setIsQrVisible}
        value={"https://sample.com"}
        title="Book an appointment"
        description={`Scan this QR code to book an appointment with ${currentBusiness.shortName}`}
        description2={"Note: The client will see all available services."}
      />
      <Calendar />
    </Screen>
  );
}
