import React, { useLayoutEffect, useState } from "react";
import { View, Platform, ViewStyle } from "react-native";
import {
  Screen,
  Text,
  Container,
  IconButton,
  BackButton,
  useBottomSheet,
  BottomSheetType,
  BottomSheet,
  ButtonCard,
  Space,
  Button,
  FormContainer,
} from "../../../components";
import { AuthorizedScreenProps } from "../../../navigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../../theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export function PlansScreen({ navigation }: AuthorizedScreenProps<"plans-screen">) {
  const { Colors } = useTheme();
  const insets = useSafeAreaInsets();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
      headerTitle: "",
      headerStyle: {
        backgroundColor: Colors.staticLightBackground,
      },
      headerShadowVisible: false,
    });
  }, [Colors.staticLightBackground, navigation]);

  const plansData = [
    {
      title: "1 Month",
      backgroundColor: "#ebabda",
      price: 1,
      description: "per month",
      description2: "Billed every month\n14-day money back guarantee",
      planId: "plan_H1J2X2Z2Y1",
    },
    {
      title: "12 Month",
      backgroundColor: "#f1cd6a",
      price: 10,
      description: "per month",
      description2: "Billed every month\n14-day money back guarantee",
      planId: "plan_H1J2X2Z2Y2",
    },
    {
      title: "6 Month",
      backgroundColor: "#a98ffc",
      price: 5,
      description: "per month",
      description2: "Billed every month\n14-day money back guarantee",
      planId: "plan_H1J2X2Z2Y3",
    },
  ];

  const [plans, setPlans] = useState(plansData);
  const [selectedPlan, setSelectedPlan] = useState("plan_H1J2X2Z2Y1");

  const PlanCard = ({ title, backgroundColor, planId, price, description, description2, isSelected, onPress }) => {
    const selectedCardStyle = isSelected
      ? ({
          borderLeftWidth: 2,
          borderTopWidth: 2,
          borderRightWidth: 9,
          borderBottomWidth: 9,
          borderColor: "black",
        } as ViewStyle)
      : {};

    return (
      <TouchableOpacity
        onPress={() => onPress(planId)}
        style={[
          {
            backgroundColor: Colors.white,
            borderWidth: 3,
            width: "85%",
            borderRadius: 10,
            maxWidth: 700,
            borderColor: backgroundColor,
            marginBottom: 28,
            alignSelf: "center",
          },
          selectedCardStyle,
        ]}
      >
        {isSelected ? (
          <View
            style={{
              position: "absolute",
              top: -15,
              right: -15,
              width: 50,
              height: 50,
              zIndex: 10,
              backgroundColor: "black",
              borderRadius: 25,
              borderColor: Colors.brandSecondary,
              borderWidth: 3,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon name="check" color={"white"} size={40} />
          </View>
        ) : null}
        <View
          style={{
            backgroundColor,
            padding: 20,
          }}
        >
          <Text
            preset="none"
            style={{
              fontWeight: "600",
              fontSize: 18,
            }}
            text={title}
          />
        </View>
        <View
          style={{
            padding: 20,
          }}
        >
          <Text
            preset="none"
            style={{
              fontWeight: "600",
              fontSize: 42,
            }}
          >
            <Text
              preset="none"
              style={{
                fontWeight: "600",
                fontSize: 22,
              }}
              text="$"
            />
            {price}
          </Text>
          <Text
            style={{
              fontWeight: "400",
              fontSize: 14,
              paddingTop: 10,
              paddingBottom: 16,
            }}
            text={description}
          />
          <Text
            style={{
              fontWeight: "400",
              fontSize: 16,
            }}
          >
            {description2}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
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
      <Text
        style={{
          fontWeight: "700",
          fontSize: 26,
          marginBottom: 20,
          fontStyle: "normal",
          alignSelf: "center",
          textAlign: "center",
          fontFamily: "Helvetica Neue",
        }}
      >
        {"Choose your\nmembership plan"}
      </Text>
      {plans.map(plan => {
        const isSelected = plan.planId === selectedPlan;
        return (
          <PlanCard
            onPress={planId => {
              setSelectedPlan(planId);
            }}
            isSelected={isSelected}
            key={plan.planId}
            title={plan.title}
            backgroundColor={plan.backgroundColor}
            price={plan.price}
            description={plan.description}
            description2={plan.description2}
            planId={plan.planId}
          />
        );
      })}
    </FormContainer>
  );
}
