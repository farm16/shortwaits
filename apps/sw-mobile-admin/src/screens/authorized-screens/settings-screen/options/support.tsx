import { Accordion, AccordionDataItemType, useTheme } from "@shortwaits/shared-ui";
import React from "react";
import { useIntl } from "react-intl"; // Import the useIntl hook
import { Linking } from "react-native";

export const ShortwaitsCustomerSupport = () => {
  const { Colors } = useTheme();
  const intl = useIntl(); // Access the intl object

  // todo will move this to admin mobile info later
  const accordionData: AccordionDataItemType[] = [
    {
      title: intl.formatMessage({ id: "Settings_Screen.shortwaitsSupport.email" }),
      description: intl.formatMessage({ id: "Settings_Screen.shortwaitsSupport.emailDescription" }),
      iconName: "email",
      iconColor: Colors.brandPrimary,
      onPress: () => {
        Linking.openURL(`mailto:${intl.formatMessage({ id: "Settings_Screen.shortwaitsSupport.email" })}`);
      },
    },
    {
      title: intl.formatMessage({ id: "Settings_Screen.shortwaitsSupport.phone" }),
      description: intl.formatMessage({ id: "Settings_Screen.shortwaitsSupport.phoneDescription" }),
      iconName: "phone",
      iconColor: Colors.brandPrimary,
      onPress: () => {
        Linking.openURL(`tel:${intl.formatMessage({ id: "Settings_Screen.shortwaitsSupport.phone" })}`);
      },
    },
  ];

  return <Accordion accordionTitle={intl.formatMessage({ id: "Settings_Screen.shortwaitsSupport.title" })} accordionData={accordionData} />;
};
