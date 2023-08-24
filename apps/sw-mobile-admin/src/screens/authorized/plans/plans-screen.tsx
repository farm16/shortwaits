import React, { useLayoutEffect, useState } from "react";
import { Text, BackButton, Button, FormContainer, Container, Space } from "../../../components";
import { AuthorizedScreenProps } from "../../../navigation";
import { useTheme } from "../../../theme";
import { SubscriptionPlans } from "@shortwaits/shared-lib";
import PlanCard from "./planCard";
import { Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getResponsiveFontSize } from "../../../utils";

export function PlansScreen({ navigation }: AuthorizedScreenProps<"plans-screen">) {
  const { Colors } = useTheme();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [Colors.staticLightBackground, navigation]);

  const defaultPlanId = "plan_H1J2X2Z2Y2";
  const plansData: SubscriptionPlans = [
    {
      title: "1 Month",
      planColor: "#ebabda",
      tags: [],
      hasOffer: false,
      offerDescription: "",
      offerCode: "",
      finalPrice: 1.5,
      price: 1.5,
      priceDescription: "per month",
      planDescription: "Billed every month\n14-day money back guarantee",
      planId: "plan_H1J2X2Z2Y1",
    },
    {
      title: "12 Month",
      planColor: "#f1cd6a",
      tags: ["popular"],
      hasOffer: true,
      offerDescription: "Save 20%",
      offerCode: "SAVE20", // saves 3.6
      finalPrice: 14.4, // ~ 1.2 * 12,
      price: 18, // ~ 1.5 * 12,
      priceDescription: "per one time",
      planDescription: "Billed every 12 month\n14-day money back guarantee",
      planId: "plan_H1J2X2Z2Y2",
    },
    {
      title: "6 Month",
      planColor: "#a98ffc",
      tags: [],
      hasOffer: true,
      offerDescription: "One month free",
      offerCode: "1MONTHFREE", // saves 1.5
      finalPrice: 7.5,
      price: 9, // ~ 1.5 * 6,
      priceDescription: "per one time",
      planDescription: "Billed every 6 month\n14-day money back guarantee",
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
          {"Choose your\nmembership plan"}
        </Text>
      </View>
      <FormContainer
        backgroundColor="staticLightBackground"
        footer={
          <Button
            // preset="none"
            rightIconName="chevron-right"
            rightIconSize={30}
            rightIconColor="white"
            style={{
              backgroundColor: "black",
              // borderRadius: 2,
              paddingVertical: 10,
              // paddingHorizontal: 16,
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
            text="Proceed to payment"
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
