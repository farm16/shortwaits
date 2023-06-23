import React, { FC, useLayoutEffect } from "react";
import { truncate } from "lodash";

import {
  BusinessIncomeInfo,
  ButtonCard,
  CircleIconButton,
  Container,
  FloatingActionButton,
  Screen,
  ScrollView,
  Space,
  Text,
} from "../../../components";
import { useTheme } from "../../../theme";
import {
  showPremiumMembershipBanner,
  useBusiness,
  hidePremiumMembershipBanner,
} from "../../../redux";
import { AuthorizedScreenProps } from "../../../navigation";
import { useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { ex } from "../../../components/graph/ex";
import { useGetEventsSummaryByBusinessQuery } from "../../../services";
import { skipToken } from "@reduxjs/toolkit/dist/query";

export const MyBusinessScreen: FC<
  AuthorizedScreenProps<"my-business-screen">
> = ({ navigation }) => {
  const business = useBusiness();
  const { Colors } = useTheme();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { data: eventSummary, isLoading: isEventSummaryLoading } =
    useGetEventsSummaryByBusinessQuery(business?._id ?? skipToken);

  console.log(">>>", eventSummary);
  const checkAccountType = accountType =>
    ["free", "basic", "student"].some(type => type === accountType);

  useLayoutEffect(() => {
    if (checkAccountType(business.accountType) && isFocused) {
      dispatch(showPremiumMembershipBanner());
    } else {
      dispatch(hidePremiumMembershipBanner());
    }
    return () => {
      dispatch(hidePremiumMembershipBanner());
    };
  }, [business.accountType, dispatch, isFocused]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => {
        return (
          <Container direction="row" justifyContent="center">
            <Text
              preset="headerTitle"
              text={truncate(business.shortName, { length: 16 })}
            />
          </Container>
        );
      },
      headerRight: () => {
        return (
          <Container direction="row" alignItems="center">
            <CircleIconButton withMarginRight iconType="edit" />
            <CircleIconButton withMarginRight iconType="share" />
          </Container>
        );
      },
    });
  }, [business.shortName, navigation]);

  return (
    <Screen preset="fixed" unsafe>
      <BusinessIncomeInfo data={ex} />
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <Space size="small" />
        <ButtonCard
          withTopBorder
          leftIconName="account-tie"
          leftIconColor={Colors.brandSecondary6}
          title={"Staff"}
          onPress={() =>
            navigation.navigate("modals", {
              screen: "selector-modal-screen",
              params: {
                type: "staff",
              },
            })
          }
        />
        <ButtonCard
          leftIconName="layers-triple"
          leftIconColor={Colors.brandSecondary6}
          title={"Services"}
          onPress={() =>
            navigation.navigate("modals", {
              screen: "selector-modal-screen",
              params: {
                type: "services",
              },
            })
          }
        />
        <ButtonCard
          leftIconName="cash-fast"
          leftIconColor={Colors.brandSecondary6}
          title={"Payments"}
        />
        <ButtonCard
          leftIconName="puzzle"
          leftIconColor={Colors.brandSecondary6}
          title={"Integrations"}
        />
        <ButtonCard
          leftIconName="message-star"
          leftIconColor={Colors.brandSecondary6}
          title={"Reviews"}
        />
      </ScrollView>
      <FloatingActionButton />
    </Screen>
  );
};
