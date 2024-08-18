import { useIsFocused } from "@react-navigation/native";
import {
  ActivityIndicator,
  ButtonCard,
  Container,
  IconButton,
  Messages,
  Screen,
  Text,
  getIsBusinessOpenToday,
  getPrettyStringFromPrice,
  updateAllBusinessDays,
  updateCurrentBusinessDay,
  useShareUrlWithMessage,
  useTheme,
} from "@shortwaits/shared-ui";
import { truncate } from "lodash";
import React, { FC, useCallback, useLayoutEffect } from "react";
import { useIntl } from "react-intl";
import { Alert, StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";
import { useDispatch } from "react-redux";
import { BusinessIncomeInfo } from "../../../components";
import { AuthorizedScreenProps, GenericModalData } from "../../../navigation";
import { useGetBusinessEventTransactionsQuery, useUpdateBusinessMutation } from "../../../services";
import { hidePremiumMembershipBanner, showPremiumMembershipBanner, useBusiness } from "../../../store";

export const MyBusinessScreen: FC<AuthorizedScreenProps<"my-business-screen">> = ({ navigation }) => {
  const business = useBusiness();
  const { Colors } = useTheme();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const intl = useIntl();
  const [updateBusiness, updateBusinessStatus] = useUpdateBusinessMutation();
  const { data: eventTransactions } = useGetBusinessEventTransactionsQuery(business?._id, {
    refetchOnMountOrArgChange: true,
  }); // todo hold this in redux or not
  const isBusinessOpenToday = getIsBusinessOpenToday(business);

  console.log(eventTransactions);
  const transactions: GenericModalData[] = eventTransactions?.data
    ? eventTransactions.data.map(item => ({
        _id: `${item.short_id}`,
        subTitle: `${getPrettyStringFromPrice("USD", item.transaction_amount)} - ${item.withdraw_from_event ? "Withdraw" : item.transaction_status}`,
        title: `ID: ${item.id}`,
      }))
    : [];

  const isLoading = updateBusinessStatus.isLoading;

  const handleUpdateBusinessHours = useCallback(
    hours => {
      updateBusiness({
        businessId: business?._id,
        body: { ...business, hours },
      });
    },
    [business, updateBusiness]
  );

  const checkAccountType = accountType => ["free", "basic", "student"].some(type => type === accountType);
  const { share, data: shareData, loading: shareLoading, error: shareError } = useShareUrlWithMessage();

  useLayoutEffect(() => {
    if (checkAccountType(business?.accountType) && isFocused) {
      dispatch(showPremiumMembershipBanner());
    } else {
      dispatch(hidePremiumMembershipBanner());
    }
    return () => {
      dispatch(hidePremiumMembershipBanner());
    };
  }, [business?.accountType, dispatch, isFocused]);

  useLayoutEffect(() => {
    const handleCloseAndOpenBusiness = () => {
      const newHours = updateCurrentBusinessDay(business?.hours, !isBusinessOpenToday);
      Alert.alert(
        `${isBusinessOpenToday ? "Close" : "Open"} Business`,
        `Are you sure you want to ${isBusinessOpenToday ? "close" : "open"} the business?`,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => {
              updateBusiness({
                businessId: business?._id,
                body: { ...business, hours: newHours },
              });
            },
          },
        ],
        { cancelable: false }
      );
    };
    const handleShare = async () => {
      await share({
        message: `Check out ${business?.shortName || business?.longName}`,
        url: `https://shortwaits.com/business/${business?._id}`,
        title: business?.shortName || business?.longName,
      });
    };
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => {
        return (
          <Container direction="row" justifyContent="center" alignItems="center">
            {business?.web.logoImageUrl ? (
              <FastImage
                source={{
                  uri: business?.web.logoImageUrl,
                }}
                resizeMode={FastImage.resizeMode.cover}
                style={styles.logoImageUrl}
              />
            ) : null}
            <Text
              preset="headerTitle"
              style={{
                fontWeight: "700",
              }}
              text={truncate(business?.shortName, { length: 16 })}
            />
            <View
              style={[
                styles.businessStatus,
                {
                  backgroundColor: isBusinessOpenToday ? Colors.success : Colors.failed,
                  shadowColor: isBusinessOpenToday ? Colors.success : Colors.failed,
                },
              ]}
            />
          </Container>
        );
      },
      headerRight: () => {
        console.log(business?.isDisabled);
        return (
          <Container direction="row" alignItems="center">
            <IconButton disabled={business?.isDisabled} withMarginRight iconType={isBusinessOpenToday ? "closed-business" : "open-business"} onPress={handleCloseAndOpenBusiness} />
            <IconButton withMarginRight iconType="share" onPress={() => handleShare()} />
            <IconButton
              withMarginRight
              iconType="edit"
              onPress={() => {
                navigation.navigate("modals", {
                  screen: "update-business-profile-screen",
                });
              }}
            />
          </Container>
        );
      },
    });
  }, [Colors.failed, Colors.success, business, isBusinessOpenToday, navigation, share, updateBusiness]);

  const handleBusinessDisable = useCallback(() => {
    const isAllDaysClosed = business?.isDisabled;
    const newHours = updateAllBusinessDays(business?.hours, isAllDaysClosed);
    const disabledTitle = intl.formatMessage({ id: "Settings_Screen.disable_store_alert_title" });
    const enabledTitle = intl.formatMessage({ id: "Settings_Screen.enable_store_alert_title" });
    const disabledMessage = intl.formatMessage({ id: "Settings_Screen.disable_store_alert_description" });
    const enabledMessage = intl.formatMessage({ id: "Settings_Screen.enable_store_alert_description" });

    Alert.alert(business?.isDisabled ? enabledTitle : disabledTitle, business?.isDisabled ? enabledMessage : disabledMessage, [
      {
        text: intl.formatMessage({ id: "Common.cancel" }),
        style: "cancel",
      },
      {
        text: business?.isDisabled ? intl.formatMessage({ id: "Common.ok" }) : intl.formatMessage({ id: "Common.disable" }),
        onPress: () => {
          updateBusiness({
            businessId: business?._id,
            body: {
              ...business,
              isDisabled: !business?.isDisabled,
              hours: newHours,
            },
          });
        },
      },
    ]);
  }, [business, intl, updateBusiness]);

  if (isLoading) return <ActivityIndicator />;

  return (
    <>
      {business?.isDisabled ? (
        <View style={{ margin: 16, marginBottom: 0 }}>
          <Messages
            type="warning"
            message={intl.formatMessage({ id: "MyBusiness_screen.businessDisabled" })}
            actionMessage="Enable business"
            onActionPress={handleBusinessDisable}
          />
        </View>
      ) : null}
      <BusinessIncomeInfo />
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
                hours: business?.hours,
                onSubmit: hours => {
                  handleUpdateBusinessHours(hours);
                },
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
          onPress={() =>
            navigation.navigate("modals", {
              screen: "business-clients-modal-screen",
              params: {
                mode: "clients-list",
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
          leftIconName="puzzle"
          leftIconColor={Colors.text}
          title={intl.formatMessage({ id: "MyBusiness_screen.integrations" })}
          onPress={() =>
            navigation.navigate("authorized-stack", {
              screen: "integrations-screen",
            })
          }
        />
        <ButtonCard
          leftIconName="message-star"
          leftIconColor={Colors.text}
          title={intl.formatMessage({ id: "MyBusiness_screen.myReviews" })}
          onPress={() =>
            navigation.navigate("authorized-stack", {
              screen: "review-screen",
            })
          }
        />
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  logoImageUrl: {
    width: 32,
    height: 32,
    borderRadius: 50,
    marginLeft: 8,
    marginRight: 4,
  },
  businessStatus: {
    width: 8,
    height: 8,
    borderRadius: 5,
    marginLeft: 8,
    marginRight: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 6,
  },
});
