import React from "react"

import { Card, CardProps, Text } from "../common"
import { useTheme } from "@/theme"

export interface ButtonCardProps extends Omit<CardProps, "mode"> {
  title: string
  subTitle?: string
}
export const ButtonCard = (props: ButtonCardProps) => {
  const { Colors } = useTheme()
  const {
    title,
    subTitle,
    rightIconName = "chevron-right",
    rightIconSize = "large",
    ...rest
  } = props

  return (
    <Card
      {...rest}
      mode="button"
      rightIconSize={rightIconSize}
      rightIconName={rightIconName}
    >
      <Text preset="cardTitle" text={title} />
      {subTitle && (
        <Text
          preset="cardSubtitle"
          style={{ color: Colors.text }}
          text={subTitle}
        />
      )}
    </Card>
  )
}
