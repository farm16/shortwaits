import React from "react";
import {
  TextField,
  TextFieldProps,
  Card,
  Text,
  CardProps,
  Space,
} from "../common";

type TextFieldCard = {
  title: string;
  isTouched?: boolean;
  rightIconName?: string;
  disabled?: boolean;
} & TextFieldProps &
  Partial<CardProps>;

export function TextFieldCard(props: TextFieldCard) {
  const { placeholder, errors, isTouched, title, ...rest } = props;

  return (
    <>
      <Card mode="text-field">
        <Text preset="cardTitle" text={title} />
        <Space size="tiny" />
        <TextField preset="cardSubtitle" placeholder={placeholder} {...rest} />
      </Card>
      {errors && isTouched ? (
        <Text preset="error" text={"* " + errors} />
      ) : null}
    </>
  );
}
