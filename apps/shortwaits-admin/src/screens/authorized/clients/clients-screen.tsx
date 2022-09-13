import React, { FC, useLayoutEffect } from "react";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from "react-redux";

import { Button, CircleIconButton, Screen, Text } from "../../../components";
import { useTheme } from "../../../theme";
import { DataTable } from "react-native-paper";
import { useBusiness } from "../../../redux";
import { useGetBusinessStaffQuery } from "../../../services";
import { AuthorizedScreenProps } from "../../../navigation";

const optionsPerPage = [2, 3, 4];

export const ClientsScreen: FC<AuthorizedScreenProps<"events-screen">> = ({
  navigation,
}) => {
  const dispatch = useDispatch();
  const business = useBusiness();
  const {
    data: staff,
    isLoading: isStaffLoading,
    isSuccess: isStaffSuccess,
  } = useGetBusinessStaffQuery(business._id);

  console.log("useGetBusinessStaffQuery >>>", staff);

  const { Colors } = useTheme();

  const roles = {
    staff: {
      text: "staff",
      icon: "",
    },
    admin: {
      text: "admin",
      icon: "",
    },
    superAdmin: {
      text: "admin",
      icon: "",
    },
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Staff",
      headerRight: () => {
        return <CircleIconButton iconType="add" marginRight />;
      },
    });
  }, [navigation]);
  return (
    <Screen
      preset="fixed"
      backgroundColor={Colors.white}
      statusBar="dark-content"
    ></Screen>
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
