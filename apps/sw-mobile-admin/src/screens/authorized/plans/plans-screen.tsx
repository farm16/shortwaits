import React, { useLayoutEffect } from "react";
import { View, Platform } from "react-native";
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
} from "../../../components";
import { AuthorizedScreenProps } from "../../../navigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../../theme";

export function PlansScreen({ navigation }: AuthorizedScreenProps<"plans-screen">) {
  const { Colors } = useTheme();
  const insets = useSafeAreaInsets();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
      //   headerTitle: "Choose your plan",

      headerShown: false,
    });
  }, [navigation]);

  const plansAttributes = [
    {
      title: "1 Month",
      backgroundColor: "#ebabda",
      price: 1,
      description: "per month",
      description2: "Billed every month\n14-day money back guarantee",
    },
    {
      title: "12 Month",
      backgroundColor: "#f1cd6a",
      price: 10,
      description: "per month",
      description2: "Billed every month\n14-day money back guarantee",
    },
    {
      title: "6 Month",
      backgroundColor: "#a98ffc",
      price: 5,
      description: "per month",
      description2: "Billed every month\n14-day money back guarantee",
    },
  ];

  const PlanCard = ({ title, backgroundColor, price, description, description2 }) => {
    return (
      <View
        style={{
          backgroundColor: Colors.white,
          borderWidth: 3,
          width: "85%",
          borderRadius: 10,
          maxWidth: 700,
          borderColor: backgroundColor,
          marginBottom: 28,
          alignSelf: "center",
        }}
      >
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
          <Text text="per month" />
          <Text>{"Billed every month\n14-day money back guarantee"}</Text>
        </View>
      </View>
    );
  };

  return (
    <Screen preset="scroll" backgroundColor="staticLightBackground">
      <Container direction="row" alignItems="center" justifyContent="space-between">
        <BackButton onPress={() => navigation.goBack()} />
        <Button
          preset="none"
          style={{
            backgroundColor: "black",
            borderRadius: 10,
            paddingVertical: 8,
            paddingHorizontal: 20,
            marginRight: 20,
          }}
          textStyle={{
            color: "white",
          }}
          onPress={() => navigation.goBack()}
          text="Proceed to Payment"
        />
      </Container>
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
      {plansAttributes.map(plan => {
        return (
          <PlanCard
            title={plan.title}
            backgroundColor={plan.backgroundColor}
            price={plan.price}
            description={plan.description}
            description2={plan.description2}
          />
        );
      })}
    </Screen>
  );
}
