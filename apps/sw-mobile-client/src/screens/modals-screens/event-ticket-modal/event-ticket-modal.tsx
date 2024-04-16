import { Button, FormContainer, IconButton, Section, Space, Text, getResponsiveHeight } from "@shortwaits/shared-ui";
import React, { useLayoutEffect } from "react";
import { useIntl } from "react-intl";
import { View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { AuthorizedScreenProps } from "../../../navigation";
import { EventImage, TicketBreak } from "./helpers";

//https://dribbble.com/shots/19828369-Toket-com-Event-Mobile-Apps

export function EventTicketModal({ navigation, route }: AuthorizedScreenProps<"event-ticket-modal-screen">) {
  const intl = useIntl();
  const event = route?.params?.event;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: "transparent",
        elevation: 0,
        shadowColor: "transparent",
      },
      headerLeft: () => null,
      headerRight: () => <IconButton iconColor="brandSecondary" iconType="close" withMarginRight onPress={() => navigation.goBack()} />,
      headerTitle: () => <Text preset="headerTitle" text={intl.formatMessage({ id: "Common.event" })} />,
    });
  }, [intl, navigation]);
  const renderSubmitButton = (
    <Button preset="secondary" text={"Download Ticket"} onPress={() => {}} leftIconName="download-outline" leftIconColor="white" textStyle={{ paddingLeft: 10 }} />
  );
  return (
    <FormContainer footer={renderSubmitButton}>
      <Section>
        <EventImage eventImage={""} />
        <Space />
        <Text preset="title" text={event.name} />
        {/* <Space size="tiny" /> */}
        <Text preset="subTitle" text={event.description} />
        <TicketBreak />
        <Text preset="subTitle" text="Location" />
        <Text preset="bold" text={"Brooklyn, NY"} />
        <Space />
        <Text preset="subTitle" text="Location" />
        <Text preset="bold" text={"Brooklyn, NY"} />
        <Space />
        <Text preset="subTitle" text="Location" />
        <Text preset="bold" text={"Brooklyn, NY"} />
        <Space />
        <TicketBreak />
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <QRCode value={"sample event"} size={getResponsiveHeight(120)} />
        </View>
        <Space />
      </Section>
      <Space size="xLarge" />
    </FormContainer>
  );
}
