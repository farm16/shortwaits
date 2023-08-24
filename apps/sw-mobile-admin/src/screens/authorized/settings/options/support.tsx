import React from "react";
import { useTheme } from "../../../../theme";
import { Accordion, AccordionDataItemType } from "../../../../components"; // Import the Accordion component

export const ShortwaitsCustomerSupport = () => {
  const { Colors } = useTheme();

  const accordionData: AccordionDataItemType[] = [
    {
      title: "Email",
      description: "support@shortwaits.com",
      iconName: "email",
      iconColor: Colors.brandSecondary,
    },
    {
      title: "Phone",
      description: "123-456-7890",
      iconName: "phone",
      iconColor: Colors.brandSecondary,
    },
  ];

  return <Accordion accordionTitle="Shortwaits Customer Support" accordionData={accordionData} />;
};
