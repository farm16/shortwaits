import {
  ActivityIndicator,
  BackButton,
  Button,
  Container,
  IconButton,
  NonIdealState,
  Screen,
  Space,
  Text,
  handleEmail,
  handlePhoneCall,
  handleSms,
  useTheme,
} from "@shortwaits/shared-ui";
import { isEmpty } from "lodash";
import React, { useCallback, useEffect, useLayoutEffect } from "react";
import { Alert, Image, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { AgendaItem } from "../../../components";
import { AuthorizedScreenProps } from "../../../navigation";
import { useDeleteBusinessUserMutation, useUpdateBusinessUserMutation } from "../../../services";
import { useBusiness, useBusinessUser, useEvents } from "../../../store";

export function BusinessUserProfileScreen({ navigation, route }: AuthorizedScreenProps<"business-user-profile-screen">) {
  const { staff: staffParam, onUserRemove } = route.params;
  const { Colors } = useTheme();
  const staff = useBusinessUser(staffParam._id);
  const events = useEvents();
  const business = useBusiness();
  const [updateBusinessUser, updateBusinessUserStatus] = useUpdateBusinessUserMutation();
  const [deleteBusinessUser, deleteBusinessUserStatus] = useDeleteBusinessUserMutation();

  const staffName = staff?.displayName || staff?.familyName || staff?.givenName || staff?.middleName || staff?.email || "";

  const phoneNumbers = staff?.phoneNumbers || [];
  const phoneNumber = isEmpty(phoneNumbers) ? "" : phoneNumbers[0].number;
  const phoneNumberLabel = isEmpty(phoneNumbers) ? "" : phoneNumbers[0].label;

  useEffect(() => {
    if (deleteBusinessUserStatus.isSuccess) {
      navigation.goBack();
    }
  }, [deleteBusinessUserStatus.isSuccess, navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "center",
      headerTitle: () => {
        return (
          <Container direction="row" justifyContent="center">
            <Text preset="headerTitle" text={`${staff?.userRoles?.isAdmin ? "Administrator" : "Staff"}`} />
          </Container>
        );
      },
      headerLeft: () => {
        return (
          <Container direction="row" alignItems="center">
            <BackButton onPress={() => navigation.goBack()} />
          </Container>
        );
      },
      headerRight: () => {
        return (
          <Container direction="row" alignItems="center">
            <IconButton
              withMarginRight
              iconType="edit"
              onPress={() => {
                navigation.push("modals", {
                  screen: "update-staff-modal-screen",
                  params: {
                    initialValues: staff,
                  },
                });
              }}
            />
          </Container>
        );
      },
      headerShadowVisible: false,
    });
  }, [navigation, staff, staff?.userRoles?.isAdmin]);

  const getEventsWithStaff = () => {
    return events.filter(event => {
      return event.staffIds.includes(staff?._id);
    });
  };

  console.log("events >>>", getEventsWithStaff());
  console.log("staff", JSON.stringify(staff, null, 2));
  const renderItem = useCallback(({ item }) => {
    return <AgendaItem item={item} />;
  }, []);

  const renderNonIdealState = useCallback(() => {
    return (
      <NonIdealState
        type={"noEvents"}
        buttons={
          <Button
            text="Add Event"
            preset="accent"
            onPress={() => {
              navigation.navigate("modals", {
                screen: "add-event-modal-screen",
              });
            }}
          />
        }
      />
    );
  }, [navigation]);

  if (!staff) {
    return (
      <Screen preset="fixed" unsafe unsafeBottom>
        <NonIdealState type="noStaff" />
      </Screen>
    );
  }

  if (updateBusinessUserStatus.isError) {
    Alert.alert("Error", "An error occurred while updating staff");
  }

  if (updateBusinessUserStatus.isLoading || deleteBusinessUserStatus.isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <Screen preset="fixed" unsafe unsafeBottom>
      <View style={styles.headerContainer}>
        <Space size="small" />
        <Container direction="row" style={styles.staffInfoContainer}>
          <Image source={{ uri: staff?.accountImageUrl ? staff?.accountImageUrl : "https://picsum.photos/200" }} style={styles.staffImage} />
          <View style={styles.staffDetails}>
            {staffName ? <Text style={[styles.staffName, { color: Colors.text }]} text={staffName} /> : null}
            {staff?.email ? <Text style={[styles.staffEmail, { color: Colors.subText }]} text={staff?.email} /> : null}
            {phoneNumber && phoneNumberLabel ? <Text style={[styles.phoneNumber, { color: Colors.subText }]} text={`${phoneNumberLabel}: ${phoneNumber}`} /> : null}
          </View>
        </Container>
        <Space />
        <View style={styles.headerActions}>
          <Button
            leftIconSize={25}
            leftIconColor={staff?.hours ? Colors.brandPrimary : Colors.disabledBackground}
            preset="icon2"
            disabled={!staff?.hours}
            leftIconName="calendar-clock"
            onPress={() => {
              navigation.push("modals", {
                screen: "schedule-modal-screen",
                params: {
                  headerTitle: "Staff hours",
                  hours: staff?.hours,
                  onSubmit: hours => {
                    const businessId = business._id;
                    const body = {
                      ...staff,
                      hours,
                    };
                    updateBusinessUser({
                      businessId,
                      body,
                    });
                  },
                },
              });
            }}
          />
          <Button
            leftIconSize={25}
            leftIconColor={staff?.email ? Colors.brandPrimary : Colors.disabledBackground}
            preset="icon2"
            disabled={!staff?.email}
            leftIconName="email-outline"
            onPress={() => {
              handleEmail(staff?.email);
            }}
          />
          <Button
            leftIconSize={25}
            leftIconColor={phoneNumber ? Colors.brandPrimary : Colors.disabledBackground}
            preset="icon2"
            disabled={!phoneNumber}
            leftIconName={"phone-outline"}
            onPress={() => {
              handlePhoneCall(phoneNumber);
            }}
          />
          <Button
            leftIconSize={25}
            leftIconColor={phoneNumber ? Colors.brandPrimary : Colors.disabledBackground}
            preset="icon2"
            disabled={!phoneNumber}
            leftIconName={"message-outline"}
            onPress={() => {
              handleSms(phoneNumber);
            }}
          />
          <Button
            leftIconSize={25}
            leftIconColor={Colors.brandPrimary}
            preset={"icon2"}
            disabled={false}
            leftIconName={"share-variant"}
            onPress={() => {
              console.log("share");
            }}
          />
          <Button
            leftIconSize={25}
            leftIconColor={Colors.failed}
            style={{
              backgroundColor: Colors.failedBackground,
            }}
            preset={"icon2"}
            leftIconName={"delete"}
            onPress={() => {
              Alert.alert("Delete Staff", "Are you sure you want to delete this staff?", [
                {
                  text: "Cancel",
                  style: "cancel",
                },
                {
                  text: "Delete",
                  style: "destructive",
                  onPress: () => {
                    const businessId = business._id;
                    const body = {
                      ...staff,
                      deleted: true,
                    };
                    deleteBusinessUser({
                      businessId,
                      body,
                    });
                  },
                },
              ]);
            }}
          />
        </View>
        <Space />
      </View>
      <View style={styles.eventBox}>
        <Space size="small" />
        <Container direction="row" style={[styles.eventBoxHeader]}>
          <Text preset="none" style={[styles.eventBoxHeaderTitle, { color: Colors.text }]}>
            {`Event (${getEventsWithStaff().length})`}
          </Text>
          <IconButton
            iconType="add"
            onPress={() => {
              navigation.navigate("modals", {
                screen: "add-event-modal-screen",
              });
            }}
          />
        </Container>
        <FlatList
          data={getEventsWithStaff()}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          ListEmptyComponent={renderNonIdealState}
          ItemSeparatorComponent={() => <Space size="tiny" direction="horizontal" />}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  eventBox: {
    paddingHorizontal: 16,
    flex: 1,
  },
  eventBoxHeader: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  eventBoxHeaderTitle: {
    paddingTop: 24,
    paddingBottom: 16,
    fontSize: 14,
    fontWeight: "500",
    textTransform: "uppercase",
  },
  headerContainer: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: 16,
    paddingBottom: 4,
  },
  staffInfoContainer: {
    minHeight: 75,
  },
  staffImage: {
    width: 75,
    height: "100%",
    resizeMode: "cover",
    borderBottomLeftRadius: 37.5,
    borderBottomRightRadius: 37.5,
    borderTopLeftRadius: 37.5,
    borderTopRightRadius: 0,
    marginRight: 16,
  },
  staffDetails: {
    flex: 1,
    alignSelf: "stretch",
  },
  staffName: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  staffEmail: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },
  phoneNumber: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },
  headerActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
