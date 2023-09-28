import React, { useState, ReactNode, Fragment } from "react";
import { Button, AnimatedHiddenView } from "../../components";
import { useTheme } from "../../theme";
import { useIntl } from "react-intl";

interface ExpandableSectionProps {
  children: ReactNode;
}

export const ExpandableSection: React.FC<ExpandableSectionProps> = ({ children }) => {
  const [isWithMoreInfo, setIsWithMoreInfo] = useState<boolean>(false);
  const { Colors } = useTheme();
  const intl = useIntl();
  const buttonText = isWithMoreInfo
    ? intl.formatMessage({ id: "Common.showLessFields" })
    : intl.formatMessage({ id: "Common.showMoreFields" });

  return (
    <Fragment>
      <Button
        preset="link"
        leftIconName={isWithMoreInfo ? "chevron-up" : "chevron-down"}
        leftIconColor={Colors.brandSecondary}
        leftIconSize={24}
        textStyle={{
          color: Colors.brandSecondary,
          padding: 0,
          marginBottom: 0,
          fontSize: 16,
        }}
        style={{
          marginTop: 8,
          marginBottom: 16,
          height: undefined,
          width: "100%",
        }}
        text={buttonText}
        onPress={() => {
          setIsWithMoreInfo(prevState => !prevState);
        }}
      />
      <AnimatedHiddenView isVisible={isWithMoreInfo}>{children}</AnimatedHiddenView>
    </Fragment>
  );
};
