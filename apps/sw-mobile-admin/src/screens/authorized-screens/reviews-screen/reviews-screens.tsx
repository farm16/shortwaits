import { BackButton, NonIdealState, Text } from "@shortwaits/shared-ui";
import React, { FC, useLayoutEffect } from "react";
import { AuthorizedScreenProps } from "../../../navigation";

export const ReviewsScreen: FC<AuthorizedScreenProps<"review-screen">> = props => {
  const { navigation } = props;

  // return <Screen unsafe={true}></Screen>;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
      headerTitle: () => <Text preset="headerTitle" text={"My Reviews"} />,
    });
  }, [navigation]);

  return <NonIdealState type="noReviews" />;
};
