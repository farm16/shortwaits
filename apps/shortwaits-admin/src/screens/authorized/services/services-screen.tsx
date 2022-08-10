import React, { useRef, useState } from "react";
import { StatusBar, StyleSheet, Animated, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Divider, Menu } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from "react-redux";

import {
  AuthorizedScreenHeader,
  BottomSheet,
  BottomSheetType,
  Button,
  FloatingScreenButton,
  Screen,
  SearchBar,
  ServiceCard,
  SimpleServiceForm,
  Space,
  Text,
  useBottomSheet,
} from "../../../components";
import { useBusiness } from "../../../hooks/useBusiness";
import { useGetServicesByBusinessQuery } from "../../../services/shortwaits-api";
import { useTheme } from "../../../theme";

export const ServicesScreen = () => {
  const { Colors } = useTheme();
  const bottomSheetRef = useRef<BottomSheetType>(null);
  const handleBottomSheet = useBottomSheet(bottomSheetRef);

  const business = useBusiness();
  const { isFetching, data: services } = useGetServicesByBusinessQuery(
    String(business?._id)
  );
  console.log("data payload >>>", services);

  const dispatch = useDispatch();

  const ItemSeparatorComponent = () => (
    <View
      style={[
        styles.listSeparator,
        { borderTopColor: Colors.backgroundOverlay },
      ]}
    />
  );
  const [visible, setVisible] = React.useState(false);
  const [isSearchBarVisible, setIsSearchBarVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <Screen
      preset="fixed"
      backgroundColor={Colors.white}
      statusBar="dark-content"
    >
      <AuthorizedScreenHeader
        title={"Services"}
        iconName2="magnify"
        iconName1="plus-thick"
      />

      {isSearchBarVisible && <SearchBar />}
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: Colors.white,
        }}
        contentContainerStyle={{
          marginTop: 25,
          alignItems: "center",
        }}
        ItemSeparatorComponent={() => <Space size="tiny" />}
        data={services}
        renderItem={({ item }) => {
          //const {data} = use
          return <ServiceCard service={item} onPress={() => null} />;
        }}
        keyExtractor={(item) => item?._id}
      />
      {/* <FloatingScreenButton iconName={"plus"} /> */}
    </Screen>
  );
};
const styles = StyleSheet.create({
  container: {
    // alignItems: "stretch"
  },
  bottomSheetHeader: {
    alignItems: "center",
  },
  contentContainer: {},
  listSeparator: {
    borderTopWidth: 1,
    marginVertical: 5,
  },
});

{
  /* <BottomSheet snapPoints={["77%"]} ref={bottomSheetRef}>
        <SimpleServiceForm
          mode="update"
          initialValues={
            mobileAdmin?.sampleBusinessData.services[sampleServicesIndex]
          }
          onSubmit={formData => {
            dispatch(
              setSampleBusinessServicesByIndex({
                data: formData,
                index: sampleServicesIndex
              })
            )
            handleBottomSheet.close()
          }}
        />
      </BottomSheet> */
}
