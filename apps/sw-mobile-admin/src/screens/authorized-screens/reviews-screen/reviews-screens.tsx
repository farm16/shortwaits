import { Screen, Text } from "@shortwaits/shared-ui";
import React, { FC } from "react";
import { AuthorizedScreenProps } from "../../../navigation";

export const ReviewsScreen: FC<AuthorizedScreenProps<"review-screen">> = props => {
  return (
    <Screen>
      <Text>Reviews Screen</Text>
    </Screen>
  );
};
