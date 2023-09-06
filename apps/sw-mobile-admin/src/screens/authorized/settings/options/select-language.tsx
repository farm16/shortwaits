import React from "react";
import { Accordion, AccordionDataItemType } from "../../../../components"; // Import the Accordion component
import { updatePreferredLanguage, useMobileAdmin } from "../../../../store";
import { useDispatch } from "react-redux";
import { useIntl } from "react-intl";

export const AppLanguage = () => {
  const intl = useIntl();

  const { suggestedLanguage, preferredLanguage } = useMobileAdmin();
  const dispatch = useDispatch();
  const selectedLanguage = preferredLanguage || suggestedLanguage;
  const accordionData: AccordionDataItemType[] = [
    {
      title: "🇺🇸 " + intl.formatMessage({ id: "Settings_Screen.App_Language.Option_1.Title" }),
      description: intl.formatMessage({ id: "Settings_Screen.App_Language.Option_1.Description" }),
      onPress: () => {
        dispatch(updatePreferredLanguage("en"));
      },
      iconName: selectedLanguage === "en" ? "check" : undefined,
    },
    {
      title: "🇪🇸 " + intl.formatMessage({ id: "Settings_Screen.App_Language.Option_2.Title" }),
      description: intl.formatMessage({ id: "Settings_Screen.App_Language.Option_2.Description" }),
      onPress: () => {
        dispatch(updatePreferredLanguage("es"));
      },
      iconName: selectedLanguage === "es" ? "check" : undefined,
    },
  ];

  return (
    <Accordion
      description={intl.formatMessage({ id: "Settings_Screen.App_Language.Description" })}
      accordionTitle={intl.formatMessage({ id: "Settings_Screen.App_Language.Title" })}
      accordionData={accordionData}
    />
  );
};
