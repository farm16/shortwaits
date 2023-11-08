import { useIsFocused } from "@react-navigation/native";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { truncate } from "lodash";
import React, { FC, useCallback, useLayoutEffect } from "react";
import { useIntl } from "react-intl";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";

import FastImage from "react-native-fast-image";
import { ActivityIndicator } from "react-native-paper";
import { BusinessIncomeInfo, ButtonCard, Container, IconButton, Screen, Text } from "../../../components";
import { AuthorizedScreenProps } from "../../../navigation";
import { useGetEventsSummaryByBusinessQuery, useUpdateBusinessMutation } from "../../../services";
import { hidePremiumMembershipBanner, showPremiumMembershipBanner, useBusiness, useShowGhostComponent } from "../../../store";
import { useTheme } from "../../../theme";

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
        businessId: business._id,
        body: { ...business, hours },
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

  // console.log("eventSummary", eventSummary?.data?.listData);

  if (isLoading) return <ActivityIndicator />;

  return (
    <>
      <BusinessIncomeInfo data={eventSummary?.data?.graphData} isLoading={isEventSummaryLoading} error={errorEventSummary} />
      <Screen preset="scroll" unsafe withHorizontalPadding>
        <ButtonCard
          leftIconName="calendar-month"
          leftIconColor={Colors.text}
          title={intl.formatMessage({ id: "MyBusiness_screen.schedule" })}
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
          leftIconColor={Colors.text}
          title={intl.formatMessage({ id: "MyBusiness_screen.transactions" })}
          onPress={() =>
            navigation.navigate("modals", {
              screen: "selector-modal-screen",
              params: {
                type: "static",
                onSelect: item => {
                  console.log(item);
                },
                headerTitle: intl.formatMessage({ id: "MyBusiness_screen.transactions" }),
                data: [],
              },
            })
          }
        />
        <ButtonCard
          leftIconName="layers-triple"
          leftIconColor={Colors.text}
          title={intl.formatMessage({ id: "MyBusiness_screen.services" })}
          onPress={() =>
            navigation.navigate("modals", {
              screen: "service-modal-screen",
            })
          }
        />
        <ButtonCard
          leftIconName="account-tie"
          leftIconColor={Colors.text}
          title={intl.formatMessage({ id: "MyBusiness_screen.staff" })}
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
          leftIconColor={Colors.text}
          title={intl.formatMessage({ id: "MyBusiness_screen.clients" })}
          onPress={() => navigation.navigate("clients-screen")}
        />
        <ButtonCard leftIconName="puzzle" leftIconColor={Colors.text} title={intl.formatMessage({ id: "MyBusiness_screen.integrations" })} />
        <ButtonCard leftIconName="message-star" leftIconColor={Colors.text} title={intl.formatMessage({ id: "MyBusiness_screen.myReviews" })} />
      </Screen>
    </>
  );
};
