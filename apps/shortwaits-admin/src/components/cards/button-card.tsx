import React from "react";

import { Card, CardProps, Space, Text } from "../common";

export interface ButtonCardProps extends Omit<CardProps, "mode"> {
  title: string;
  subTitle?: string;
}
export const ButtonCard = (props: ButtonCardProps) => {
  const {
    title,
    subTitle,
    rightIconName = "chevron-right",
    rightIconSize = "large",
    textStyle,
    ...rest
  } = props;

  return (
    <Card
      {...rest}
      mode="button"
      rightIconSize={rightIconSize}
      rightIconName={rightIconName}
    >
      <Text preset="cardTitle" style={textStyle} text={title} />
      {subTitle && (
        <>
          <Space size="tiny" />
          <Text preset="cardSubtitle" text={subTitle} />
        </>
      )}
    </Card>
  );
};
