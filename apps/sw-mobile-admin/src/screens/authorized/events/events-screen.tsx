import React, { useLayoutEffect, useState } from "react";
import { skipToken } from "@reduxjs/toolkit/dist/query";

import { Calendar, Screen, Text, Container, IconButton, QrModal, Space } from "../../../components";
import { AuthorizedScreenProps } from "../../../navigation";
import { useBusiness, useEvents, useShowGhostComponent } from "../../../store";
import { useGetServicesByBusinessQuery } from "../../../services";
import { convertStaticSelectorModalData } from "../../../utils/static-selector-modal-utils";
import { useIntl } from "react-intl";

export function EventsScreen({ navigation }: AuthorizedScreenProps<"events-screen">) {
  const [isQrVisible, setIsQrVisible] = useState(false);

  const currentBusiness = useBusiness();
  const currentsEvents = useEvents();
  const intl = useIntl();

  useGetServicesByBusinessQuery(currentBusiness._id ?? skipToken);
  useShowGhostComponent("floatingActionButton");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => {
        return (
          <Container direction="row" justifyContent="center">
            <Text preset="headerTitle" text={intl.formatMessage({ id: "Events_Screen.title" })} />
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
                    closeOnSelect: false,
                    searchable: true,
                    headerTitle: intl.formatMessage({ id: "Events_Screen.searchEvents.headerTitle" }),
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
  }, [currentBusiness.shortName, currentsEvents, intl, navigation]);

  return (
    <Screen preset="fixed" unsafe unsafeBottom backgroundColor="backgroundOverlay">
      <QrModal
        isVisible={isQrVisible}
        setIsVisible={setIsQrVisible}
        value={currentBusiness.web.baseUrl + "/booking"}
        title={intl.formatMessage({ id: "Events_Screen.qrCodeModal.title" })}
        description={
          <Text>
            {intl.formatMessage({ id: "Events_Screen.qrCodeModal.description" })}{" "}
            <Text style={{ fontWeight: "700" }}>{currentBusiness.shortName}</Text>
          </Text>
        }
        description2={intl.formatMessage({ id: "Events_Screen.qrCodeModal.description2" })}
      />
      <Calendar />
    </Screen>
  );
}
