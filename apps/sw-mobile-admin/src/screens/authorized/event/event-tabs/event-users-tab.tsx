import React, {
  FC,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import {
  ListRenderItem,
  PermissionsAndroid,
  Platform,
  RefreshControl,
  SectionList,
  StyleSheet,
  View,
} from "react-native";
import {
  BottomSheet,
  BottomSheetType,
  Button,
  ButtonCard,
  IconButton,
  Container,
  List,
  NonIdealState,
  Screen,
  Text,
  useBottomSheet,
  FloatingActionButton,
  AnimatedSearchBar,
  PeopleCard,
} from "../../../../components";
import { useTheme } from "../../../../theme";
import { useBusiness, useGhostComponent } from "../../../../store";
import {
  useCreateBusinessClientsMutation,
  useGetBusinessClientsQuery,
  useGetBusinessStaffQuery,
} from "../../../../services";
import { AuthorizedScreenProps } from "../../../../navigation";
import { ActivityIndicator } from "react-native-paper";
import Contacts from "react-native-contacts";
import { EventDtoType, UserDtoType } from "@shortwaits/shared-lib";
import { getUsersFromOsContacts } from "../../../../utils/getUsersFromOsContacts";
import { actions } from "../../../../components/floating-action-button/fab-actions";
import { isEmpty } from "lodash";
import { skipToken } from "@reduxjs/toolkit/dist/query";

export function EventUsersTab({ event }: { event: EventDtoType }) {
  const { Colors } = useTheme();
  const business = useBusiness();
  const {
    data: clientsData,
    isLoading: isBusinessClientsQueryLoading,
    isSuccess: isBusinessClientsQuerySuccess,
    isError: isBusinessClientQueryError,
    refetch: refetchBusinessClientsQuery,
  } = useGetBusinessClientsQuery(business._id ? business._id : skipToken);

  const {
    data: staffData,
    isLoading: isBusinessStaffQueryLoading,
    isSuccess: isBusinessStaffQuerySuccess,
    isError: isBusinessStaffQueryError,
    refetch: refetchBusinessStaffQuery,
  } = useGetBusinessStaffQuery(business._id ? business._id : skipToken);

  const _data = useMemo(
    () => [
      {
        title: "Staff",
        data: staffData?.data ?? [],
      },
      {
        title: "Clients",
        data: clientsData?.data ?? [],
      },
    ],
    [clientsData?.data, staffData?.data]
  );

  const handleRefresh = () => {
    refetchBusinessClientsQuery();
    refetchBusinessStaffQuery();
  };

  const _renderItem: ListRenderItem<UserDtoType> = ({ item }) => (
    <PeopleCard user={item} />
  );

  const isStaffDataLoading =
    isBusinessStaffQueryLoading && !isBusinessStaffQuerySuccess;

  const isClientsDataLoading =
    isBusinessClientsQueryLoading && !isBusinessClientsQuerySuccess;

  const isLoading = isClientsDataLoading || isStaffDataLoading;

  return (
    <View
      style={{
        flex: 1,
        // backgroundColor: Colors.backgroundOverlay,
        // backgroundColor: "red",
        paddingHorizontal: 16,
        alignItems: "center",
      }}
    >
      <SectionList
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
        }
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item._id}
        style={{
          width: "100%",
        }}
        ListEmptyComponent={
          <View
            style={{
              marginTop: 16,
              padding: 16,
            }}
          >
            {isEmpty(clientsData?.data) ? (
              <NonIdealState
                image={"noClients"}
                buttons={[<Button text="Sync contacts" onPress={() => null} />]}
              />
            ) : null}
          </View>
        }
        renderSectionHeader={({ section: { title } }) => (
          <Text
            preset="none"
            style={{
              paddingTop: 24,
              paddingBottom: 16,
              fontSize: 14,
              fontWeight: "500",
              textTransform: "uppercase",
              backgroundColor: Colors.backgroundOverlay,
            }}
          >
            {`${title} (${
              _data.find(({ title: _title }) => _title === title).data.length
            })`}
          </Text>
        )}
        renderItem={_renderItem}
        sections={_data}
      />
    </View>
  );
}
