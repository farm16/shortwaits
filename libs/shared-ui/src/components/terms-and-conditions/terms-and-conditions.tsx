import React from "react";
import { useModalScreensNavigation } from "../../navigation";
import { Button, Text } from "../common";

export const TermsAndConditions: React.FC = () => {
  const navigation = useModalScreensNavigation<"webview-modal-screen">();

  const navigateToTermsAndConditions = () => {
    navigation.navigate("modals", {
      screen: "webview-modal-screen",
      params: {
        uri: "https://www.shortwaits.com/v1/shortwaits/privacy-policy",
        header: "Terms and Conditions",
      },
    });
  };

  return (
    <Button preset="link" onPress={() => navigateToTermsAndConditions()}>
      <Text text="T&C" preset="link" />
    </Button>
  );
};
