import { useIsFocused } from "@react-navigation/native";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import {
  ActivityIndicator,
  BusinessIncomeInfo,
  ButtonCard,
  Container,
  IconButton,
  Screen,
  Text,
  getIsBusinessOpenToday,
  getPrettyStringFromPrice,
  useShareUrlWithMessage,
  useTheme,
} from "@shortwaits/shared-ui";
import { truncate } from "lodash";
import React, { FC, useCallback, useLayoutEffect } from "react";
import { useIntl } from "react-intl";
import { Alert, View } from "react-native";
import FastImage from "react-native-fast-image";
import { useDispatch } from "react-redux";
import { AuthorizedScreenProps, GenericModalData } from "../../../navigation";
import { useGetBusinessEventSummaryQuery, useGetBusinessEventTransactionsQuery, useUpdateBusinessMutation } from "../../../services";
import { hidePremiumMembershipBanner, showPremiumMembershipBanner, useBusiness } from "../../../store";

export const MyBusinessScreen: FC<AuthorizedScreenProps<"my-business-screen">> = ({ navigation }) => {
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
  } = useGetBusinessEventSummaryQuery(business?._id ?? skipToken, {
    refetchOnMountOrArgChange: true,
  });
  const { data: eventTransactions } = useGetBusinessEventTransactionsQuery(business?._id, {
    refetchOnMountOrArgChange: true,
  }); // todo hold this in redux or not

  console.log(eventTransactions);
  const transactions: GenericModalData[] = eventTransactions?.data
    ? eventTransactions.data.map(item => ({
        _id: `${item.short_id}`,
        subTitle: `${getPrettyStringFromPrice("USD", item.transaction_amount)} - ${item.withdraw_from_event ? "Withdraw" : item.transaction_status}`,
        title: `ID: ${item.id}`,
      }))
    : [];

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
  const { share, data: shareData, loading: shareLoading, error: shareError } = useShareUrlWithMessage();

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
    const handleShare = async () => {
      await share({
        message: `Check out ${business.shortName || business.longName}`,
        url: `https://shortwaits.com/business/${business._id}`,
        title: business.shortName || business.longName,
      });
    };
    const isBusinessOpenToday = getIsBusinessOpenToday(business);
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => {
        return (
          <Container direction="row" justifyContent="center" alignItems="center">
            {business.web.logoImageUrl ? (
              <FastImage
                source={{
                  uri: business.web.logoImageUrl,
                }}
                resizeMode={FastImage.resizeMode.cover}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 50,
                  marginLeft: 8,
                  marginRight: 4,
                }}
              />
            ) : null}
            <Text
              preset="headerTitle"
              style={{
                fontWeight: "700",
              }}
              text={truncate(business.shortName, { length: 16 })}
            />
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 5,
                backgroundColor: isBusinessOpenToday ? Colors.success : Colors.failed,
                marginLeft: 4,
                marginRight: 4,
                //green shadow
                shadowColor: isBusinessOpenToday ? Colors.success : Colors.failed,
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.5,
                shadowRadius: 6,
                elevation: 6,
              }}
            />
          </Container>
        );
      },
      headerRight: () => {
        return (
          <Container direction="row" alignItems="center">
            <IconButton withMarginRight iconType="closed-business" onPress={handleCloseAndOpenBusiness} />
            <IconButton withMarginRight iconType="share" onPress={() => handleShare()} />
            <IconButton
              withMarginRight
              iconType="edit"
              onPress={() => {
                navigation.navigate("authorized-stack", {
                  screen: "business-profile-screen",
                });
              }}
            />
          </Container>
        );
      },
    });
  }, [Colors.failed, Colors.success, business, navigation, share]);

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
                headerTitle: intl.formatMessage({ id: "MyBusiness_screen.scheduleTitle" }),
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
                mode: "static",
                headerTitle: intl.formatMessage({ id: "MyBusiness_screen.transactions" }),
                data: transactions,
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
                mode: "staff",
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
        <ButtonCard
          leftIconName="puzzle"
          leftIconColor={Colors.text}
          title={intl.formatMessage({ id: "MyBusiness_screen.integrations" })}
          onPress={() =>
            navigation.navigate("authorized-stack", {
              screen: "integrations-screen",
            })
          }
        />
        <ButtonCard leftIconName="message-star" leftIconColor={Colors.text} title={intl.formatMessage({ id: "MyBusiness_screen.myReviews" })} />
      </Screen>
    </>
  );
};
