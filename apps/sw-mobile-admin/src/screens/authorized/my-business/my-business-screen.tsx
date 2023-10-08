import React, { FC, useCallback, useLayoutEffect } from "react";
import { Alert } from "react-native";
import { truncate } from "lodash";
import { useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useIntl } from "react-intl";

import { BusinessIncomeInfo, ButtonCard, IconButton, Container, Screen, Text } from "../../../components";
import { useTheme } from "../../../theme";
import {
  showPremiumMembershipBanner,
  useBusiness,
  hidePremiumMembershipBanner,
  useShowGhostComponent,
} from "../../../store";
import { AuthorizedScreenProps } from "../../../navigation";
import { useGetEventsSummaryByBusinessQuery, useUpdateBusinessMutation } from "../../../services";
import FastImage from "react-native-fast-image";
import { ActivityIndicator } from "react-native-paper";

export const MyBusinessScreen: FC<AuthorizedScreenProps<"my-business-screen">> = ({ navigation }) => {
  useShowGhostComponent("floatingActionButton");
  const business = useBusiness();
  const { Colors } = useTheme();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const intl = useIntl();
  const [updateBusiness, updateBusinessStatus] = useUpdateBusinessMutation();
  const {
    data: eventSummary,
    isLoading: isEventSummaryLoading,
    error: errorEventSummary,
  } = useGetEventsSummaryByBusinessQuery(business?._id ?? skipToken, {
    refetchOnMountOrArgChange: true,
  });

  const isLoading = updateBusinessStatus.isLoading || isEventSummaryLoading;

  const handleUpdateBusinessHours = useCallback(
    hours => {
      updateBusiness({
        ...business,
        hours,
      });
    },
    [business, updateBusiness]
  );

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
            <IconButton
              withMarginRight
              iconType="edit"
              onPress={() => {
                navigation.navigate("authorized-stack", {
                  screen: "business-profile-screen",
                });
              }}
            />
            <IconButton withMarginRight iconType="share" />
          </Container>
        );
      },
    });
  }, [business.shortName, business.web.logoImageUrl, navigation]);

  console.log("eventSummary", eventSummary?.data?.listData);

  if (isLoading) return <ActivityIndicator />;

  return (
    <>
      <BusinessIncomeInfo
        data={eventSummary?.data?.graphData}
        isLoading={isEventSummaryLoading}
        error={errorEventSummary}
      />
      <Screen preset="scroll" unsafe withHorizontalPadding>
        <ButtonCard
          leftIconName="calendar-month"
          leftIconColor={Colors.brandSecondary}
          title={"Schedule"}
          onPress={() =>
            navigation.navigate("modals", {
              screen: "schedule-modal-screen",
              params: {
                hours: business.hours,
                onSubmit: hours => {
                  handleUpdateBusinessHours(hours);
                },
              },
            })
          }
        />
        <ButtonCard
          leftIconName="cash-fast"
          leftIconColor={Colors.brandSecondary}
          title={"Transactions"}
          onPress={() =>
            navigation.navigate("modals", {
              screen: "selector-modal-screen",
              params: {
                type: "static",
                onSelect: item => {
                  console.log(item);
                },
                headerTitle: "Transactions",
                data: [],
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
              screen: "service-modal-screen",
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
                type: "clients",
              },
            })
          }
        />
        <ButtonCard leftIconName="puzzle" leftIconColor={Colors.brandSecondary} title={"Integrations"} />
        <ButtonCard leftIconName="message-star" leftIconColor={Colors.brandSecondary} title={"My Reviews"} />
      </Screen>
    </>
  );
};
