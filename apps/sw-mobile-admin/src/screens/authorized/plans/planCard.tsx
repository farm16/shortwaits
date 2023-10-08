import React, { useCallback } from "react";
import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useTheme } from "../../../theme";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SubscriptionPlan } from "@shortwaits/shared-lib";
import { Container, Text } from "../../../components";
import { getFontSize } from "../../../utils";

interface PlanCardProps {
  planData: SubscriptionPlan;
  isSelected: boolean;
  onPress: (planId: string) => void;
}
const windowWidth = Dimensions.get("window").width;
const cardWidth = windowWidth * 0.8;

const PlanCard: React.FC<PlanCardProps> = ({ planData, isSelected, onPress }) => {
  const { Colors } = useTheme();

  const selectedCardStyle = isSelected
    ? styles.selectedCard
    : {
        borderColor: planData.planColor,
      };
  const selectedColorBarStyle = isSelected ? styles.selectedColorBar : null;

  const pricePlan = useCallback(() => {
    return (
      <Container direction="row" alignItems="center">
        <Text style={styles.price}>
          <Text style={styles.dollarSign}>$</Text>
          {planData.finalPrice.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
        </Text>
        {planData.hasOffer ? (
          <Text
            style={[
              styles.dollarSign,
              {
                marginLeft: 10,
                color: Colors.gray,
              },
            ]}
          >
            $
            <Text
              style={[
                styles.price,
                {
                  color: Colors.gray,
                  textDecorationLine: "line-through",
                  fontSize: getFontSize(30, cardWidth),
                },
              ]}
            >
              {planData.price.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
            </Text>
          </Text>
        ) : null}
      </Container>
    );
  }, [Colors.gray, planData.finalPrice, planData.hasOffer, planData.price]);

  return (
    <TouchableOpacity
      onPress={() => onPress(planData.planId)}
      style={[
        styles.container,
        selectedCardStyle,
        {
          backgroundColor: Colors.white,
        },
      ]}
    >
      {isSelected ? (
        <View style={[styles.iconContainer, { borderColor: Colors.brandSecondary }]}>
          <Icon name="check" color={"white"} size={40} />
        </View>
      ) : null}
      <View style={[styles.colorBar, selectedColorBarStyle, { backgroundColor: planData.planColor }]}>
        <Text style={styles.title}>{planData.title}</Text>
        {planData.tags.map((tag, index) => (
          <View key={index} style={styles.tagContainer}>
            {tag === "popular" ? <Icon name="medal" color={"white"} size={20} /> : null}
            <Text style={styles.tag}>{tag}</Text>
          </View>
        ))}
      </View>
      <View style={styles.planInfo}>
        {pricePlan()}
        <Text style={styles.priceDescription}>{planData.priceDescription}</Text>
        <Text style={styles.planDescription}>{planData.planDescription}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    borderRadius: 12,
    maxWidth: 700,
    alignSelf: "center",
    marginBottom: 28,
    borderWidth: 1,
    // borderWidth: StyleSheet.hairlineWidth,
  },
  selectedCard: {
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderRightWidth: 9,
    borderBottomWidth: 9,
    borderColor: "black",
  },
  iconContainer: {
    position: "absolute",
    top: 45,
    right: -25,
    width: 50,
    height: 50,
    zIndex: 10,
    backgroundColor: "black",
    borderRadius: 25,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  tagContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 10,
    position: "absolute",
    right: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  tag: {
    fontWeight: "600",
    fontSize: 12,
    marginLeft: 5,
    color: "white",
    textTransform: "uppercase",
  },
  colorBar: {
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectedColorBar: {
    borderTopLeftRadius: 7,
    borderTopRightRadius: 0,
  },
  title: {
    fontWeight: "600",
    fontSize: 18,
  },
  planInfo: {
    padding: 20,
  },
  price: {
    fontWeight: "800",
    fontSize: getFontSize(42, cardWidth),
  },
  dollarSign: {
    fontWeight: "800",
    fontSize: getFontSize(22, cardWidth),
  },
  priceDescription: {
    fontWeight: "400",
    fontSize: 14,
    paddingTop: 10,
    paddingBottom: 16,
  },
  planDescription: {
    fontWeight: "400",
    fontSize: 16,
  },
});

export default PlanCard;
