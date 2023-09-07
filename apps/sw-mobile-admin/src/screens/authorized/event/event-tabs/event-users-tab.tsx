import React, { Fragment, useCallback, useMemo } from "react";
import { SectionListRenderItem, RefreshControl, View, SectionListData, SectionList } from "react-native";
import {
  Button,
  NonIdealState,
  Text,
  BusinessUserCard,
  ClientUserCard,
  Container,
  IconButton,
  Space,
} from "../../../../components";
import { useTheme } from "../../../../theme";
import { useGetPeopleInEventQuery, useUpdateEventMutation } from "../../../../services";
import {
  EventDtoType,
  BusinessUserDtoType,
  ClientUserDtoType,
  ClientUsersDtoType,
  BusinessUsersDtoType,
} from "@shortwaits/shared-lib";
import { isEmpty } from "lodash";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { ActivityIndicator } from "react-native-paper";
import { navigate } from "../../../../utils";
import { useBusiness } from "../../../../store";

type PeopleDtoType = BusinessUserDtoType | ClientUserDtoType;

export function EventUsersTab({ event }: { event: EventDtoType }) {
  const { Colors } = useTheme();
  const business = useBusiness();
  const [updateEvent, updateEventStatus] = useUpdateEventMutation();

  const {
    data: peopleInEventData,
    isLoading: isPeopleInEventQueryLoading,
    isSuccess: isPeopleInEventQuerySuccess,
    isError: isPeopleInEventQueryError,
    refetch: refetchPeopleInEventQuery,
  } = useGetPeopleInEventQuery(event._id ? event._id : skipToken, {
    refetchOnMountOrArgChange: true,
  });

  const _data = useMemo(
    () => [
      {
        title: "Staff",
        data: peopleInEventData?.data?.businessUsers ?? [],
      },
      {
        title: "Clients",
        data: peopleInEventData?.data?.clientUsers ?? [],
      },
    ],
    [peopleInEventData?.data]
  );

  const handleRefresh = useCallback(() => {
    refetchPeopleInEventQuery();
  }, [refetchPeopleInEventQuery]);

  const _renderItem: SectionListRenderItem<PeopleDtoType> = data => {
    if (data.section.title === "Staff") {
      return <BusinessUserCard user={data.item as BusinessUserDtoType} />;
    } else {
      return <ClientUserCard user={data.item as ClientUserDtoType} />;
    }
  };

  const nonIdealState = useCallback(section => {
    const { title } = section;
    return !isEmpty(section.data) ? null : title === "Clients" ? (
      <NonIdealState
        image={"noClientsInEvent"}
        buttons={[
          <Button
            style={{
              width: "auto",
              paddingHorizontal: 28,
            }}
            text="Add client"
            onPress={() => {
              navigate("modals", {
                screen: "selector-modal-screen",
                params: {
                  type: title === "Staff" ? "staff" : "clients",
                  onSelect: user => {
                    console.log("selected user:", user);
                  },
                },
              });
            }}
          />,
        ]}
      />
    ) : (
      <NonIdealState
        image={"noStaffInEvent"}
        buttons={[
          <Button
            style={{
              width: "auto",
              paddingHorizontal: 28,
            }}
            text="Add staff"
            onPress={() => {
              navigate("modals", {
                screen: "selector-modal-screen",
                params: {
                  type: title === "Staff" ? "staff" : "clients",
                  onSelect: user => {
                    console.log("selected user:", user);
                  },
                },
              });
            }}
          />,
        ]}
      />
    );
  }, []);

  const handleUpdateEvent = useCallback(
    (userType: "staff" | "clients", users: BusinessUsersDtoType & ClientUsersDtoType) => {
      if (userType === "staff") {
        const staffIds = event.staffIds;
        const newStaffIds = users.map(user => user._id);
        const uniqueIds = [...new Set([...staffIds, ...newStaffIds])];
        const isEqual = JSON.stringify(uniqueIds) === JSON.stringify(staffIds);
        if (isEqual) {
          return;
        } else {
          const updatedEvent = {
            ...event,
            staffIds: uniqueIds,
          };
          updateEvent({ body: updatedEvent, businessId: business._id });
        }
      } else if (userType === "clients") {
        const clientsIds = event.clientsIds;
        const newClientsIds = users.map(user => user._id);
        const uniqueIds = [...new Set([...clientsIds, ...newClientsIds])];
        const isEqual = JSON.stringify(uniqueIds) === JSON.stringify(clientsIds);
        if (isEqual) {
          return;
        } else {
          const updatedEvent = {
            ...event,
            clientsIds: uniqueIds,
          };
          updateEvent({ body: updatedEvent, businessId: business._id });
        }
      }
    },
    [business._id, event, updateEvent]
  );

  const _renderSectionHeader = useCallback(
    ({ section }) => {
      const { title } = section as SectionListData<PeopleDtoType>;
      console.log("section", section);
      return (
        <Fragment>
          <Container
            direction="row"
            style={{
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: Colors.backgroundOverlay,
            }}
          >
            <Text
              preset="none"
              style={{
                paddingTop: 24,
                paddingBottom: 16,
                fontSize: 14,
                fontWeight: "500",
                textTransform: "uppercase",
                color: Colors.text,
              }}
            >
              {`${title} (${_data.find(({ title: _title }) => _title === title).data.length})`}
            </Text>
            <IconButton
              iconType="add"
              onPress={() => {
                const userType = title === "Staff" ? "staff" : "clients";
                navigate("modals", {
                  screen: "selector-modal-screen",
                  params: {
                    type: userType,
                    multiple: true,

                    selectedData: event[`${userType}Ids`],
                    onSubmit: users => {
                      handleUpdateEvent(userType, users);
                    },
                  },
                });
              }}
            />
          </Container>
          {nonIdealState(section as SectionListData<PeopleDtoType>)}
        </Fragment>
      );
    },
    [Colors.backgroundOverlay, Colors.text, _data, event, handleUpdateEvent, nonIdealState]
  );

  const _renderListEmptyComponent = useCallback(() => {
    return (
      <View
        style={{
          marginTop: 16,
          padding: 16,
        }}
      >
        <NonIdealState image={"noClients"} buttons={[<Button text="Sync contacts" onPress={() => null} />]} />
      </View>
    );
  }, []);

  if (isPeopleInEventQueryLoading || updateEventStatus.isLoading)
    return <ActivityIndicator animating={true} color={Colors.brandPrimary} />;

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
        refreshControl={<RefreshControl refreshing={isPeopleInEventQueryLoading} onRefresh={handleRefresh} />}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item._id}
        style={{ width: "100%" }}
        ListEmptyComponent={_renderListEmptyComponent}
        renderSectionHeader={_renderSectionHeader}
        renderItem={_renderItem}
        sections={_data}
      />
      <Space />
    </View>
  );
}
