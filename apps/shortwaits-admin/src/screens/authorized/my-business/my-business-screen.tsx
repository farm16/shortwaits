import React, { useLayoutEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from "react-redux";

import {
  AddServiceForm,
  AuthorizedScreenHeader,
  BottomSheet,
  BottomSheetType,
  Button,
  ButtonCard,
  CircleIconButton,
  Screen,
  Text,
  useBottomSheet,
} from "../../../components";
import { useTheme } from "../../../theme";
import { DataTable } from "react-native-paper";
import { useBusiness } from "../../../redux";
import { useGetBusinessStaffQuery } from "../../../services";

const optionsPerPage = [2, 3, 4];

export const MyBusinessScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const business = useBusiness();

  const { Colors } = useTheme();
  const bottomSheetRef = useRef<BottomSheetType>(null);
  const handleBottomSheet = useBottomSheet(bottomSheetRef);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: business.shortName,
      headerRight: () => {
        return (
          <CircleIconButton
            iconType="add"
            marginRight
            onPress={() => {
              handleBottomSheet.expand();
            }}
          />
        );
      },
    });
  }, [business.shortName, handleBottomSheet, navigation]);

  return (
    <Screen
      preset="fixed"
      backgroundColor={Colors.white}
      statusBar="dark-content"
    >
      <BottomSheet
        snapPointsLevel={6}
        ref={bottomSheetRef}
        // onClose={() => setForm({ ...{ data: null, mode: null } })}
      >
        <AddServiceForm mode={"update"} initialValues={undefined} />
      </BottomSheet>
    </Screen>
  );
};

const styles = StyleSheet.create({
  dataTableCellRightButton: {
    justifyContent: "center",
    alignItems: "flex-end",
    width: 35,
    height: 35,
    alignSelf: "center",
    position: "absolute",
    right: 0,
  },
});
