import React, { FC, useLayoutEffect } from "react";
import { truncate } from "lodash";

import {
  BusinessIncomeInfo,
  ButtonCard,
  IconButton,
  Container,
  Screen,
  ScrollView,
  Text,
} from "../../../components";
import { useTheme } from "../../../theme";
import {
  showPremiumMembershipBanner,
  useBusiness,
  hidePremiumMembershipBanner,
  useGhostComponent,
} from "../../../store";
import { AuthorizedScreenProps } from "../../../navigation";
import { useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { useGetEventsSummaryByBusinessQuery } from "../../../services";
import { skipToken } from "@reduxjs/toolkit/dist/query";

export const MyBusinessScreen: FC<
  AuthorizedScreenProps<"my-business-screen">
> = ({ navigation }) => {
  useGhostComponent("floatingActionButton");
  const business = useBusiness();
  const { Colors } = useTheme();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const {
    data: eventSummary,
    isLoading: isEventSummaryLoading,
    error: errorEventSummary,
  } = useGetEventsSummaryByBusinessQuery(business?._id ?? skipToken);

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
            <IconButton withMarginRight iconType="edit" />
            <IconButton withMarginRight iconType="share" />
          </Container>
        );
      },
    });
  }, [business.shortName, navigation]);

  return (
    <Screen preset="fixed" unsafe>
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <BusinessIncomeInfo
          data={eventSummary?.data}
          isLoading={isEventSummaryLoading}
          error={errorEventSummary}
        />
        <ButtonCard
          leftIconName="account-tie"
          leftIconColor={Colors.brandSecondary6}
          title={"Staff"}
          onPress={() =>
            navigation.navigate("modals", {
              screen: "selector-modal-screen",
              params: {
                type: "staff",
                onSelect: staff => {
                  console.log(">>>", staff);
                },
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
                onSelect: services => {
                  console.log(">>>", services);
                },
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
    </Screen>
  );
};
