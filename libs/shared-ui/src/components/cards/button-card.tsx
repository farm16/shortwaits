import { StyleSheet } from "react-native";

import { getDimensions, useTheme } from "../../theme";
import { Card, CardProps, Space, Text } from "../common";

export interface ButtonCardProps extends Omit<CardProps, "mode"> {
  title: string;
  subTitle?: string;
  errors?: string | undefined;
  isTouched?: boolean;
  withTopBorder?: boolean;
  isVisible?: boolean;
}
export const ButtonCard = (props: ButtonCardProps) => {
  const { title, subTitle, rightIconName = "chevron-right", rightIconSize = "large", textStyle, errors, isTouched, withTopBorder, disabled, isVisible = true, ...rest } = props;
  const { Colors } = useTheme();
  const { width } = getDimensions();

  const withTopBorderStyle = withTopBorder ? { borderTopWidth: 1.5, borderTopColor: Colors.gray } : {};

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <Card {...rest} disabled={disabled} mode="button" rightIconSize={rightIconSize} rightIconName={rightIconName} style={withTopBorderStyle}>
        <Text preset="cardTitle" style={textStyle} text={title} />
        {subTitle && (
          <>
            <Space size="tiny" />
            <Text preset="cardSubtitle" text={subTitle} />
          </>
        )}
      </Card>
      {errors && isTouched ? (
        <Text
          preset="cardTitle"
          style={{
            ...styles.errorField,
            width: width * 0.87,
            color: Colors.red3,
          }}
          text={"* " + errors}
        />
      ) : null}
    </>
  );
};
const styles = StyleSheet.create({
  errorField: {
    alignSelf: "center",
    textAlign: "right",
  },
  cardTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 0,
  },
});
