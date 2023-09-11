import React, { FC, useLayoutEffect } from "react";
import { Alert, Image } from "react-native";
import { truncate } from "lodash";
import { useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { skipToken } from "@reduxjs/toolkit/dist/query";

import { BusinessIncomeInfo, ButtonCard, IconButton, Container, Screen, Text } from "../../../components";
import { useTheme } from "../../../theme";
import {
  showPremiumMembershipBanner,
  useBusiness,
  hidePremiumMembershipBanner,
  useShowGhostComponent,
} from "../../../store";
import { AuthorizedScreenProps } from "../../../navigation";
import { useGetEventsSummaryByBusinessQuery } from "../../../services";
import FastImage from "react-native-fast-image";

export const MyBusinessScreen: FC<AuthorizedScreenProps<"my-business-screen">> = ({ navigation }) => {
  useShowGhostComponent("floatingActionButton");
  const business = useBusiness();
  const { Colors } = useTheme();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const {
    data: eventSummary,
    isLoading: isEventSummaryLoading,
    error: errorEventSummary,
  } = useGetEventsSummaryByBusinessQuery(business?._id ?? skipToken);

  const checkAccountType = accountType => ["free", "basic", "student"].some(type => type === accountType);

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

  const handleCloseAndOpenBusiness = () => {
    Alert.alert(
      "Close Business",
      "Are you sure you want to close your business?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            // dispatch(closeBusiness());
            // navigation.navigate("businesses-screen");
          },
        },
      ],
      { cancelable: false }
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => {
        return (
          <Container direction="row" justifyContent="center" alignItems="center">
            <Text preset="headerTitle" text={truncate(business.shortName, { length: 16 })} />
            {business.web.logoImageUrl ? (
              <FastImage
                source={{
                  uri: business.web.logoImageUrl,
                }}
                resizeMode={FastImage.resizeMode.cover}
                style={{
                  width: 32,
                  height: 32,
                  marginLeft: 4,
                  borderRadius: 50,
                }}
              />
            ) : null}
          </Container>
        );
      },
      headerLeft: () => {
        return (
          <Container direction="row" alignItems="center">
            <IconButton withMarginLeft iconType="closed-business" onPress={handleCloseAndOpenBusiness} />
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
  }, [business.shortName, business.web.logoImageUrl, navigation]);

  return (
    <>
      <BusinessIncomeInfo data={eventSummary?.data} isLoading={isEventSummaryLoading} error={errorEventSummary} />
      <Screen preset="scroll" unsafe withHorizontalPadding>
        <ButtonCard
          leftIconName="calendar-month"
          leftIconColor={Colors.brandSecondary}
          title={"Schedule"}
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
          leftIconName="layers-triple"
          leftIconColor={Colors.brandSecondary}
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
          leftIconName="account-tie"
          leftIconColor={Colors.brandSecondary}
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
          leftIconName="account-multiple"
          leftIconColor={Colors.brandSecondary}
          title={"Clients"}
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
        <ButtonCard leftIconName="cash-fast" leftIconColor={Colors.brandSecondary} title={"Payments"} />
        <ButtonCard leftIconName="puzzle" leftIconColor={Colors.brandSecondary} title={"Integrations"} />
        <ButtonCard leftIconName="message-star" leftIconColor={Colors.brandSecondary} title={"My Reviews"} />
      </Screen>
    </>
  );
};
