import React from "react";
import { StyleSheet } from "react-native";

import { getDimensions, useTheme } from "../../theme";
import { Card, CardProps, Space, Text } from "../common";

export interface ButtonCardProps extends Omit<CardProps, "mode"> {
  title: string;
  subTitle?: string;
  errors?: string | undefined;
  isTouched?: boolean;
  withTopBorder?: boolean;
}
export const ButtonCard = (props: ButtonCardProps) => {
  const {
    title,
    subTitle,
    rightIconName = "chevron-right",
    rightIconSize = "large",
    textStyle,
    errors,
    isTouched,
    withTopBorder,
    ...rest
  } = props;
  const { Colors } = useTheme();
  const { width } = getDimensions();

  return (
    <>
      <Card
        {...rest}
        mode="button"
        rightIconSize={rightIconSize}
        rightIconName={rightIconName}
        style={
          withTopBorder
            ? {
                borderTopWidth: 1.5,
                borderTopColor: Colors.inputBackground,
              }
            : undefined
        }
      >
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
