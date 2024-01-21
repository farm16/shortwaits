import { skipToken } from "@reduxjs/toolkit/dist/query";
import { Container, IconButton, QrModal, Screen, Text, convertStaticSelectorModalData, useTheme } from "@shortwaits/shared-ui";
import React, { useLayoutEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Calendar } from "../../../components";
import { AuthorizedScreenProps } from "../../../navigation";
import { useGetServicesQuery } from "../../../services";
import { useBusiness, useEvents, useShowGhostComponent } from "../../../store";

export function EventsScreen({ navigation }: AuthorizedScreenProps<"events-screen">) {
  const [isQrVisible, setIsQrVisible] = useState(false);

  const currentBusiness = useBusiness();
  const currentsEvents = useEvents();
  const { Colors } = useTheme();
  const intl = useIntl();

  useGetServicesQuery(currentBusiness._id ?? skipToken);
  useShowGhostComponent("floatingActionButton");

  useLayoutEffect(() => {
    const getGreeting = () => {
      const currentHour = new Date().getHours();
      console.log("currentHour >>>", currentHour);
      if (currentHour > 3 && currentHour < 12) {
        return intl.formatMessage({ id: "Common.greeting.morning" });
      }
      if (currentHour > 12 && currentHour < 18) {
        return intl.formatMessage({ id: "Common.greeting.afternoon" });
      }
      return intl.formatMessage({ id: "Common.greeting.evening" });
    };

    navigation.setOptions({
      headerTitle: "",
      headerStyle: {
        backgroundColor: Colors.white,
      },
      headerLeft: () => {
        return (
          <Container direction="row" alignItems="center">
            <Text
              preset="headerTitle"
              style={{
                fontWeight: "700",
                paddingLeft: 16,
              }}
              text={getGreeting()}
            />
          </Container>
        );
      },
      headerRight: () => {
        return (
          <Container direction="row" alignItems="center">
            <IconButton
              withMarginRight
              iconType="qr"
              onPress={() => {
                setIsQrVisible(true);
              }}
            />
            <IconButton
              withMarginRight
              iconType="list"
              onPress={() =>
                navigation.navigate("modals", {
                  screen: "selector-modal-screen",
                  params: {
                    type: "events",
                    closeOnSelect: false,
                    headerTitle: intl.formatMessage({ id: "Events_Screen.allEvents.headerTitle" }),
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
  }, [Colors.white, currentBusiness.shortName, currentsEvents, intl, navigation]);

  return (
    <Screen preset="fixed" unsafe unsafeBottom backgroundColor="white">
      <QrModal
        isVisible={isQrVisible}
        setIsVisible={setIsQrVisible}
        value={currentBusiness.web.baseUrl + "/booking"}
        title={intl.formatMessage({ id: "Events_Screen.qrCodeModal.title" })}
        description={
          <Text>
            {intl.formatMessage({ id: "Events_Screen.qrCodeModal.description" })} <Text style={{ fontWeight: "700" }}>{currentBusiness.shortName}</Text>
          </Text>
        }
        description2={intl.formatMessage({ id: "Events_Screen.qrCodeModal.description2" })}
      />
      <Calendar />
    </Screen>
  );
}
