import React, { useMemo } from "react";
import { SectionListRenderItem, RefreshControl, SectionList, View } from "react-native";
import { Button, NonIdealState, Text, BusinessUserCard, ClientUserCard } from "../../../../components";
import { useTheme } from "../../../../theme";
import { useBusiness } from "../../../../store";
import { useGetBusinessClientsQuery, useGetBusinessStaffQuery } from "../../../../services";
import { EventDtoType, BusinessUserDtoType, ClientUserDtoType } from "@shortwaits/shared-lib";
import { isEmpty } from "lodash";
import { skipToken } from "@reduxjs/toolkit/dist/query";

type PeopleDtoType = BusinessUserDtoType | ClientUserDtoType;

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
    () =>
      [
        {
          title: "Staff",
          data: staffData?.data ?? [],
        },
        {
          title: "Clients",
          data: clientsData?.data ?? [],
        },
      ] as const,
    [clientsData?.data, staffData?.data]
  );

  const handleRefresh = () => {
    refetchBusinessClientsQuery();
    refetchBusinessStaffQuery();
  };

  const _renderItem: SectionListRenderItem<PeopleDtoType> = data => {
    if (data.section.title === "Staff") {
      return <BusinessUserCard user={data.item as BusinessUserDtoType} />;
    } else {
      return <ClientUserCard user={data.item as ClientUserDtoType} />;
    }
  };

  const isStaffDataLoading = isBusinessStaffQueryLoading && !isBusinessStaffQuerySuccess;

  const isClientsDataLoading = isBusinessClientsQueryLoading && !isBusinessClientsQuerySuccess;

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
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />}
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
              <NonIdealState image={"noClients"} buttons={[<Button text="Sync contacts" onPress={() => null} />]} />
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
            {`${title} (${_data.find(({ title: _title }) => _title === title).data.length})`}
          </Text>
        )}
        renderItem={_renderItem}
        sections={_data}
      />
    </View>
  );
}
