import { skipToken } from "@reduxjs/toolkit/dist/query";
import { BusinessUserDtoType, BusinessUsersDtoType, ClientDtoType, EventDtoType } from "@shortwaits/shared-lib";
import {
  BusinessUserCard,
  Button,
  ClientUserCard,
  Container,
  IconButton,
  NonIdealState,
  Space,
  Text,
  getCombinedClientTypes,
  getSelectedClients,
  nextEventStatuses,
  useTheme,
} from "@shortwaits/shared-ui";
import { isEmpty } from "lodash";
import React, { Fragment, useCallback, useMemo } from "react";
import { useIntl } from "react-intl";
import { RefreshControl, SectionList, SectionListData, SectionListRenderItem, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { SelectedClients } from "../../..";
import { navigate } from "../../../../navigation";
import { useGetPeopleInEventQuery, useUpdateEventMutation } from "../../../../services";
import { useBusiness } from "../../../../store";

type PeopleDtoType = BusinessUserDtoType | ClientDtoType;

export function EventUsersTab({ event }: { event: EventDtoType }) {
  const { Colors } = useTheme();
  const business = useBusiness();
  const intl = useIntl();
  const [updateEvent, updateEventStatus] = useUpdateEventMutation();
  const isEventDisabled = nextEventStatuses[event.status.statusName].length === 0;
  console.log("isEventDisabled >>>", isEventDisabled);

  const {
    data: peopleInEventData,
    isLoading: isPeopleInEventQueryLoading,
    isSuccess: isPeopleInEventQuerySuccess,
    isError: isPeopleInEventQueryError,
    refetch: refetchPeopleInEventQuery,
  } = useGetPeopleInEventQuery(event._id ? event._id : skipToken, {
    refetchOnMountOrArgChange: true,
  });

  const allClients = getCombinedClientTypes(peopleInEventData?.data?.clientUsers ?? [], peopleInEventData?.data?.localClients ?? []);

  const _data = useMemo(
    () => [
      {
        title: "Staff",
        data: peopleInEventData?.data?.businessUsers ?? [],
      },
      {
        title: "Clients",
        data: allClients,
      },
    ],
    [allClients, peopleInEventData?.data?.businessUsers]
  );

  console.log("peopleInEventData >>>", JSON.stringify(peopleInEventData, null, 2));

  const handleRefresh = useCallback(() => {
    refetchPeopleInEventQuery();
  }, [refetchPeopleInEventQuery]);

  const _renderItem: SectionListRenderItem<PeopleDtoType> = data => {
    if (data.section.title === "Staff") {
      return <BusinessUserCard user={data.item as BusinessUserDtoType} />;
    } else {
      return <ClientUserCard user={data.item as ClientDtoType} />;
    }
  };

  const nonIdealState = useCallback(
    section => {
      const { title } = section;
      return !isEmpty(section.data) ? null : title === "Clients" ? (
        <NonIdealState
          type={"noClientsInEvent"}
          buttons={[
            !isEventDisabled ? (
              <Button
                style={{
                  width: "auto",
                  paddingHorizontal: 28,
                }}
                text={intl.formatMessage({ id: "Common.addClient" })}
                onPress={() => {
                  navigate("modals", {
                    screen: "selector-modal-screen",
                    params: {
                      mode: title === "Staff" ? "staff" : "clients",
                      onSelect: user => {
                        console.log("selected user:", user);
                      },
                    },
                  });
                }}
              />
            ) : null,
          ]}
        />
      ) : (
        <NonIdealState
          type={"noStaffInEvent"}
          buttons={[
            <Button
              disabled={isEventDisabled}
              style={{
                width: "auto",
                paddingHorizontal: 28,
              }}
              text={intl.formatMessage({ id: "Common.addStaff" })}
              onPress={() => {
                navigate("modals", {
                  screen: "selector-modal-screen",
                  params: {
                    mode: title === "Staff" ? "staff" : "clients",
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
    },
    [intl]
  );

  const handleClientsUpdateEvent = useCallback(
    (users: SelectedClients) => {
      const newClientUserIds = users.clients;
      const newLocalClientIds = users.localClients;

      const uniqueClientIds = [...new Set(newClientUserIds)];
      const uniqueLocalClientIds = [...new Set(newLocalClientIds)];

      const isClientEqual = JSON.stringify(uniqueClientIds) === JSON.stringify(event.clientsIds);
      const isLocalClientEqual = JSON.stringify(uniqueLocalClientIds) === JSON.stringify(event.localClientsIds);

      if (isClientEqual && isLocalClientEqual) {
        console.log("no changes");
        return;
      }

      const updatedEvent = {
        ...event,
        clientsIds: uniqueClientIds,
        localClientsIds: uniqueLocalClientIds,
      };

      updateEvent({ body: updatedEvent, businessId: business._id });
    },
    [business._id, event, updateEvent]
  );

  const handleStaffUpdateEvent = useCallback(
    (staff: BusinessUsersDtoType) => {
      const staffIds = event.staffIds;
      const newStaffIds = staff.map(user => user._id);
      const uniqueIds = [...new Set(newStaffIds)];
      const isEqual = JSON.stringify(uniqueIds) === JSON.stringify(staffIds);
      if (isEqual) {
        return;
      }
      const updatedEvent = {
        ...event,
        staffIds: uniqueIds,
      };

      updateEvent({ body: updatedEvent, businessId: business._id });
    },
    [business._id, event, updateEvent]
  );

  const _renderSectionHeader = useCallback(
    ({ section }) => {
      const { title } = section as SectionListData<PeopleDtoType>;
      return (
        <Fragment>
          <Container
            direction="row"
            style={{
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: Colors.lightBackground,
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
              {`${intl.formatMessage({ id: `Common.${(title as string).toLowerCase()}` })} (${_data.find(({ title: _title }) => _title === title).data.length})`}
            </Text>
            <IconButton
              iconType="add"
              disabled={isEventDisabled}
              disabledAlertMessage="The event is no longer active"
              onPress={() => {
                const isStaff = title === "Staff";
                if (isStaff) {
                  navigate("modals", {
                    screen: "selector-modal-screen",
                    params: {
                      mode: "staff",
                      multiple: true,
                      selectedData: event.staffIds,
                      onGoBack: users => {
                        handleStaffUpdateEvent(users as BusinessUsersDtoType);
                      },
                    },
                  });
                } else {
                  navigate("modals", {
                    screen: "clients-selector-modal-screen",
                    params: {
                      mode: "clientsAndLocalClients",
                      selectedData: getSelectedClients(peopleInEventData?.data?.clientUsers ?? [], peopleInEventData?.data?.localClients ?? []),
                      onGoBack: selectedUsers => {
                        console.log("selectedUsers >>>", selectedUsers);
                        handleClientsUpdateEvent(selectedUsers);
                      },
                    },
                  });
                }
              }}
            />
          </Container>
          {nonIdealState(section as SectionListData<PeopleDtoType>)}
        </Fragment>
      );
    },
    [
      Colors.lightBackground,
      Colors.text,
      _data,
      event.staffIds,
      handleClientsUpdateEvent,
      handleStaffUpdateEvent,
      intl,
      isEventDisabled,
      nonIdealState,
      peopleInEventData?.data?.clientUsers,
      peopleInEventData?.data?.localClients,
    ]
  );

  const _renderListEmptyComponent = useCallback(() => {
    return (
      <View
        style={{
          marginTop: 16,
          padding: 16,
        }}
      >
        <NonIdealState type={"noClients"} buttons={[<Button text="Sync contacts" onPress={() => null} />]} />
      </View>
    );
  }, []);

  const _renderListFooterComponent = useCallback(() => {
    return <Space size="large" />;
  }, []);

  if (isPeopleInEventQueryLoading || updateEventStatus.isLoading) return <ActivityIndicator animating={true} color={Colors.brandPrimary} />;

  return (
    <SectionList
      refreshControl={<RefreshControl refreshing={isPeopleInEventQueryLoading} onRefresh={handleRefresh} />}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => item._id}
      style={{ flex: 1, paddingHorizontal: 16 }}
      ListEmptyComponent={_renderListEmptyComponent}
      renderSectionHeader={_renderSectionHeader}
      ListFooterComponent={_renderListFooterComponent}
      renderItem={_renderItem}
      sections={_data}
    />
  );
}
