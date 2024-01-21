import { Accordion, AccordionDataItemType, useTheme } from "@shortwaits/shared-ui";
import React from "react";
import { useIntl } from "react-intl"; // Import the useIntl hook

export const ShortwaitsCustomerSupport = () => {
  const { Colors } = useTheme();
  const intl = useIntl(); // Access the intl object

  const accordionData: AccordionDataItemType[] = [
    {
      title: intl.formatMessage({ id: "Settings_Screen.shortwaitsSupport.email" }),
      description: intl.formatMessage({ id: "Settings_Screen.shortwaitsSupport.emailDescription" }),
      iconName: "email",
      iconColor: Colors.brandPrimary,
    },
    {
      title: intl.formatMessage({ id: "Settings_Screen.shortwaitsSupport.phone" }),
      description: intl.formatMessage({ id: "Settings_Screen.shortwaitsSupport.phoneDescription" }),
      iconName: "phone",
      iconColor: Colors.brandPrimary,
    },
  ];

  return <Accordion accordionTitle={intl.formatMessage({ id: "Settings_Screen.shortwaitsSupport.title" })} accordionData={accordionData} />;
};
