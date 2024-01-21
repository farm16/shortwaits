import React from "react";
import { Button, Text } from "../common";

type TermsAndConditionsProps = {
  onPress?(): null;
};
export const TermsAndConditions: React.FC<TermsAndConditionsProps> = props => {
  const { onPress } = props;

  const navigateToTermsAndConditions = () => {
    if (onPress) onPress();
  };

  return (
    <Button preset="link" onPress={() => navigateToTermsAndConditions()}>
      <Text text="T&C" preset="link" />
    </Button>
  );
};
