import { skipToken } from "@reduxjs/toolkit/dist/query";
import { BottomSheetType, Container, IconButton, QrBottomSheet, Screen, Text, getUserGreeting, useTheme } from "@shortwaits/shared-ui";
import React, { useLayoutEffect, useRef } from "react";
import { useIntl } from "react-intl";
import { Calendar, FloatingGroupActionButton } from "../../../components";
import { AuthorizedScreenProps } from "../../../navigation";
import { useGetServicesQuery } from "../../../services";
import { useBusiness, useEvents } from "../../../store";

export function EventsScreen({ navigation }: AuthorizedScreenProps<"events-screen">) {
  const qrBottomSheetRef = useRef<BottomSheetType>(null);
  const currentBusiness = useBusiness();
  const currentsEvents = useEvents();
  const { Colors } = useTheme();
  const intl = useIntl();

  useGetServicesQuery(currentBusiness._id ?? skipToken);

  useLayoutEffect(() => {
    const userGreeting = getUserGreeting({
      morningMessage: intl.formatMessage({ id: "Common.greeting.morning" }),
      afternoonMessage: intl.formatMessage({ id: "Common.greeting.afternoon" }),
      eveningMessage: intl.formatMessage({ id: "Common.greeting.evening" }),
    });
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
              text={userGreeting}
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
                qrBottomSheetRef?.current?.expand();
              }}
            />
            <IconButton
              withMarginRight
              iconType="list"
              onPress={() =>
                navigation.navigate("modals", {
                  screen: "selector-modal-screen",
                  params: {
                    mode: "events",
                    headerTitle: intl.formatMessage({ id: "Events_Screen.allEvents.headerTitle" }),
                    data: currentsEvents,
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
      <QrBottomSheet
        ref={qrBottomSheetRef}
        value={currentBusiness.web.baseUrl + "/booking"}
        title={"Business Events"}
        description={<Text>{intl.formatMessage({ id: "Events_Screen.qrCodeModal.description" })}</Text>}
        warningMessage={intl.formatMessage({ id: "Events_Screen.qrCodeModal.warningMessage" })}
      />
      <Calendar />
      <FloatingGroupActionButton />
    </Screen>
  );
}
