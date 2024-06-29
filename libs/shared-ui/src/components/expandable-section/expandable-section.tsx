import React, { Fragment, ReactNode, useState } from "react";
import { useIntl } from "react-intl";
import { StyleSheet } from "react-native";
import { AnimatedHiddenView, Button } from "..";
import { useTheme } from "../../theme";

interface ExpandableSectionProps {
  children: ReactNode;
}

export const ExpandableSection: React.FC<ExpandableSectionProps> = ({ children }) => {
  const [isWithMoreInfo, setIsWithMoreInfo] = useState<boolean>(false);
  const { Colors } = useTheme();
  const intl = useIntl();
  const buttonText = isWithMoreInfo ? intl.formatMessage({ id: "Common.showLessFields" }) : intl.formatMessage({ id: "Common.showMoreFields" });

  return (
    <Fragment>
      <Button
        preset="link"
        textStyle={{
          color: Colors.text,
          //textDecorationLine: "underline",
          fontWeight: "500",
        }}
        leftIconName={isWithMoreInfo ? "chevron-up" : "chevron-down"}
        leftIconColor={Colors.brandPrimary}
        leftIconSize={24}
        style={styles.container}
        text={buttonText}
        onPress={() => {
          setIsWithMoreInfo(prevState => !prevState);
        }}
      />
      <AnimatedHiddenView isVisible={isWithMoreInfo}>{children}</AnimatedHiddenView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
