import React from "react";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from "react-redux";

import {
  AuthorizedScreenHeader,
  Button,
  ButtonCard,
  Screen,
  Text,
} from "../../../components";
import { useTheme } from "../../../theme";
import { DataTable } from "react-native-paper";
import { useBusiness } from "../../../redux";
import { useGetBusinessStaffQuery } from "../../../services";

const optionsPerPage = [2, 3, 4];

export const MyBusinessScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const business = useBusiness();
  const {
    data: staff,
    isLoading: isStaffLoading,
    isSuccess: isStaffSuccess,
  } = useGetBusinessStaffQuery(business._id);

  console.log("useGetBusinessStaffQuery >>>", staff);

  const { Colors } = useTheme();
  const [page, setPage] = React.useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

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

  return (
    <Screen
      preset="fixed"
      backgroundColor={Colors.white}
      statusBar="dark-content"
    >
      <AuthorizedScreenHeader
        title={"Staff"}
        iconName2="magnify"
        iconName1="plus-thick"
      />
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Last Name</DataTable.Title>
          <DataTable.Title>First Name</DataTable.Title>
          <DataTable.Title>Username</DataTable.Title>
          <DataTable.Title>Role</DataTable.Title>
        </DataTable.Header>
        {isStaffSuccess ? (
          staff?.data.map((elem) => (
            <Button preset="none" key={String(elem._id)}>
              <DataTable.Row>
                <DataTable.Cell>{elem.lastName ?? "-"}</DataTable.Cell>
                <DataTable.Cell>{elem.firstName ?? "-"}</DataTable.Cell>
                <DataTable.Cell>{elem.username ?? elem.email}</DataTable.Cell>
                <DataTable.Cell>
                  {business.admins.includes(elem._id)
                    ? roles.admin.text
                    : roles.staff.text}
                </DataTable.Cell>
                <Button preset="none" style={styles.dataTableCellRightButton}>
                  <Icon name="dots-vertical" size={25} />
                </Button>
              </DataTable.Row>
            </Button>
          ))
        ) : (
          <Text text="loading ..." />
        )}

        {/* <DataTable.Pagination
          page={page}
          numberOfPages={3}
          onPageChange={() => null}
          label="1-2 of 6"
          optionsPerPage={optionsPerPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          showFastPagination
          optionsLabel={"Rows per page"}
        /> */}
      </DataTable>
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
