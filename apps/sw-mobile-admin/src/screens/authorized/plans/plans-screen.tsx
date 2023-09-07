import React, { useLayoutEffect, useState } from "react";
import { Text, BackButton, Button, FormContainer, Container, Space } from "../../../components";
import { AuthorizedScreenProps } from "../../../navigation";
import { useTheme } from "../../../theme";
import { SubscriptionPlans } from "@shortwaits/shared-lib";
import PlanCard from "./planCard";
import { Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getResponsiveFontSize } from "../../../utils";
import { useIntl } from "react-intl"; // Import the useIntl hook

export function PlansScreen({ navigation }: AuthorizedScreenProps<"plans-screen">) {
  const { Colors } = useTheme();
  const intl = useIntl(); // Access the intl object

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [Colors.staticLightBackground, navigation]);

  const defaultPlanId = "plan_H1J2X2Z2Y2";
  const plansData: SubscriptionPlans = [
    {
      title: intl.formatMessage({ id: "PlansScreen.plan.1month.title" }),
      planColor: "#ebabda",
      tags: [],
      hasOffer: false,
      offerDescription: "",
      offerCode: "",
      finalPrice: 1.5,
      price: 1.5,
      priceDescription: intl.formatMessage({ id: "PlansScreen.plan.1month.priceDescription" }),
      planDescription: intl.formatMessage({ id: "PlansScreen.plan.1month.description" }),
      planId: "plan_H1J2X2Z2Y1",
    },
    {
      title: intl.formatMessage({ id: "PlansScreen.plan.12months.title" }),
      planColor: "#f1cd6a",
      tags: ["popular"],
      hasOffer: true,
      offerDescription: intl.formatMessage({ id: "PlansScreen.plan.12months.offerDescription" }),
      offerCode: "SAVE20", // saves 3.6
      finalPrice: 14.4, // ~ 1.2 * 12,
      price: 18, // ~ 1.5 * 12,
      priceDescription: intl.formatMessage({ id: "PlansScreen.plan.12months.priceDescription" }),
      planDescription: intl.formatMessage({ id: "PlansScreen.plan.12months.description" }),
      planId: "plan_H1J2X2Z2Y2",
    },
    {
      title: intl.formatMessage({ id: "PlansScreen.plan.6months.title" }),
      planColor: "#a98ffc",
      tags: [],
      hasOffer: true,
      offerDescription: intl.formatMessage({ id: "PlansScreen.plan.6months.offerDescription" }),
      offerCode: "1MONTHFREE", // saves 1.5
      finalPrice: 7.5,
      price: 9, // ~ 1.5 * 6,
      priceDescription: intl.formatMessage({ id: "PlansScreen.plan.6months.priceDescription" }),
      planDescription: intl.formatMessage({ id: "PlansScreen.plan.6months.description" }),
      planId: "plan_H1J2X2Z2Y3",
    },
  ];

  const [plans, setPlans] = useState(plansData);
  const [selectedPlan, setSelectedPlan] = useState(defaultPlanId);

  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.staticLightBackground,
        paddingTop: insets.top,
      }}
    >
      <View
        style={{
          justifyContent: "center",
          marginBottom: 8,
          flexDirection: "row",
          marginHorizontal: 0,
          paddingHorizontal: 0,
          marginTop: Platform.OS === "ios" ? 0 : 8,
        }}
      >
        <BackButton
          style={{
            position: "absolute",
            alignSelf: "center",
            left: 5,
          }}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{
            fontWeight: "700",
            fontSize: getResponsiveFontSize(26),
            fontStyle: "normal",
            textAlign: "center",
            fontFamily: "Helvetica Neue",
          }}
        >
          {intl.formatMessage({ id: "PlansScreen.choosePlan" })}
        </Text>
      </View>
      <FormContainer
        backgroundColor="staticLightBackground"
        footer={
          <Button
            rightIconName="chevron-right"
            rightIconSize={30}
            rightIconColor="white"
            style={{
              backgroundColor: "black",
              paddingVertical: 10,
              marginRight: 20,
              borderRightColor: Colors.brandSecondary,
              borderBottomColor: Colors.brandSecondary,
              borderBottomWidth: 3,
              borderRightWidth: 3,
            }}
            textStyle={{
              color: "white",
            }}
            onPress={() => navigation.goBack()}
            text={intl.formatMessage({ id: "PlansScreen.proceedToPayment" })}
          />
        }
      >
        {plans.map(plan => {
          const isSelected = plan.planId === selectedPlan;
          return (
            <PlanCard
              onPress={planId => {
                setSelectedPlan(planId);
              }}
              isSelected={isSelected}
              key={plan.planId}
              planData={plan}
            />
          );
        })}
      </FormContainer>
    </View>
  );
}
