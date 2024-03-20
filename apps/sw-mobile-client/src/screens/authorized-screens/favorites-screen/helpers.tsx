import { Button, IconButton, Space, Text, getResponsiveHeight, useTheme } from "@shortwaits/shared-ui";
import { ImageBackground, StyleSheet, View } from "react-native";

type EventItemProps = {
  item: any;
  onFavoritePress: (item: any) => void;
  onViewEventPress: (item: any) => void;
};
export const EventItem = (props: EventItemProps) => {
  const { item, onFavoritePress, onViewEventPress } = props;
  const { Colors } = useTheme();

  const handleFavoritePress = () => {
    onFavoritePress(item);
  };

  const handleViewEventPress = () => {
    onViewEventPress(item);
  };

  return (
    <View style={styles.itemContainer}>
      <ImageBackground
        style={{ flex: 1 }}
        imageStyle={styles.itemImage}
        source={{
          uri: "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }}
      />
      <View style={styles.itemDescription}>
        <View style={styles.itemTitle}>
          <Text preset="title" text={item.name} length={20} />
          <IconButton onPress={handleFavoritePress} iconType="favorite" iconColor={"red3"} />
        </View>
        <Space size="tiny" />
        <Text preset="text" text={item.description} length={40} />
        <Button preset="primary2" text={"View event"} style={styles.itemButton} textStyle={styles.itemButtonText} onPress={handleViewEventPress} />
      </View>
    </View>
  );
};

type BusinessItemProps = {
  item: any;
  onFavoritePress: (item: any) => void;
  onViewEventPress: (item: any) => void;
};
export const BusinessItem = (props: BusinessItemProps) => {
  const { item, onFavoritePress, onViewEventPress } = props;
  const { Colors } = useTheme();

  const handleFavoritePress = () => {
    onFavoritePress(item);
  };

  const handleViewEventPress = () => {
    onViewEventPress(item);
  };

  return (
    <View style={styles.itemContainer}>
      <ImageBackground
        style={{ flex: 1 }}
        imageStyle={styles.itemImage}
        source={{
          uri: "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }}
      />
      <View style={styles.itemDescription}>
        <View style={styles.itemTitle}>
          <Text preset="title" text={item.name} length={20} />
          <IconButton onPress={handleFavoritePress} iconType="favorite" iconColor={"red3"} />
        </View>
        <Space size="tiny" />
        <Text preset="text" text={item.description} length={40} />
        <Button preset="primary2" text={"Go to Business"} style={styles.itemButton} textStyle={styles.itemButtonText} onPress={handleViewEventPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    height: getResponsiveHeight(150),
    backgroundColor: "white",
    borderRadius: getResponsiveHeight(10),
    flexDirection: "row",
  },
  itemImage: {
    borderTopLeftRadius: getResponsiveHeight(10),
    borderBottomLeftRadius: getResponsiveHeight(10),
    resizeMode: "cover",
    justifyContent: "center",
    opacity: 0.8,
  },
  itemDescription: {
    flex: 1,
    padding: getResponsiveHeight(10),
  },
  itemTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemButton: {
    marginTop: "auto",
    flex: undefined,
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center",
    height: getResponsiveHeight(30),
    paddingHorizontal: getResponsiveHeight(16),
  },
  itemButtonText: {
    fontSize: getResponsiveHeight(12),
    color: "white",
  },
});
