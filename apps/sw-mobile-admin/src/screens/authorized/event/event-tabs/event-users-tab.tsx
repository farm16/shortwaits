import { useNavigation } from "@react-navigation/native";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { BusinessUserDtoType, ClientDtoType, EventDtoType } from "@shortwaits/shared-lib";
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
import { Alert, RefreshControl, SectionList, SectionListData, SectionListRenderItem, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { SelectedClients } from "../../..";
import { AuthorizedScreenProps } from "../../../../navigation";
import { useGetPeopleInEventQuery, useUpdateEventMutation } from "../../../../services";
import { useBusiness, useClients, useLocalClients, useStaff } from "../../../../store";

type PeopleDtoType = BusinessUserDtoType | ClientDtoType;

export function EventUsersTab({ event }: { event: EventDtoType }) {
  const { Colors } = useTheme();
  const business = useBusiness();
  const clients = useClients();
  const localClients = useLocalClients();
  const staff = useStaff();
  const intl = useIntl();
  const { navigate } = useNavigation<AuthorizedScreenProps<"event-screen">["navigation"]>();
  const [updateEvent, updateEventStatus] = useUpdateEventMutation();
  const isEventDisabled = nextEventStatuses[event.status.statusName].length === 0;

  const {
    isLoading: isPeopleInEventQueryLoading,
    isError: isPeopleInEventQueryError,
    refetch: refetchPeopleInEventQuery,
  } = useGetPeopleInEventQuery(event._id ? event._id : skipToken, {
    refetchOnMountOrArgChange: true,
  });

  const eventClients = event.clientsIds.map(clientId => clients?.find(client => client._id === clientId)).filter(Boolean);
  const eventLocalClients = event.localClientsIds.map(localClientId => localClients?.find(localClient => localClient._id === localClientId)).filter(Boolean);
  const allClients = getCombinedClientTypes(eventClients ?? [], eventLocalClients ?? []);
  const eventStaff = event.staffIds.map(staffId => staff?.find(staff => staff._id === staffId)).filter(Boolean);

  const _data = useMemo(
    () => [
      {
        title: "Staff",
        data: eventStaff ?? [],
      },
      {
        title: "Clients",
        data: allClients ?? [],
      },
    ],
    [allClients, eventStaff]
  );

  const handleRefresh = useCallback(() => {
    refetchPeopleInEventQuery();
  }, [refetchPeopleInEventQuery]);

  const _renderItem: SectionListRenderItem<PeopleDtoType> = data => {
    if (data.section.title === "Staff") {
      return (
        <BusinessUserCard
          user={data.item as BusinessUserDtoType}
          onPress={() => {
            navigate("authorized-stack", {
              screen: "business-staff-screen",
              params: {
                staff: data.item as BusinessUserDtoType,
                onUserRemove: staff => {
                  console.log("staff >>>", staff);
                },
              },
            });
          }}
        />
      );
    } else {
      return (
        <ClientUserCard
          onPress={() => {
            navigate("authorized-stack", {
              screen: "business-client-screen",
              params: {
                client: data.item as ClientDtoType,
                onUserRemove: client => {
                  console.log("client >>>", client);
                },
              },
            });
          }}
          user={data.item as ClientDtoType}
        />
      );
    }
  };

  const handleClientsUpdateEvent = useCallback(
    (selectedClientIds: SelectedClients) => {
      const newClientUserIds = selectedClientIds.clients;
      const newLocalClientIds = selectedClientIds.localClients;

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

  const selectedClients = useMemo(() => {
    return getSelectedClients(eventClients ?? [], eventLocalClients ?? []);
  }, [eventClients, eventLocalClients]);

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
                    screen: "clients-selector-modal-screen",
                    params: {
                      mode: "clientsAndLocalClients",
                      selectedData: selectedClients,
                      onSubmit: selectedUsers => {
                        console.log("selectedUsers >>>", selectedUsers);
                        handleClientsUpdateEvent(selectedUsers);
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
                    mode: "staff",
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
    [handleClientsUpdateEvent, intl, isEventDisabled, navigate, selectedClients]
  );

  const handleStaffUpdateEvent = useCallback(
    (staffIds: string[]) => {
      const currentStaffIds = event.staffIds;
      const uniqueIds = [...new Set(staffIds)];
      const isEqual = JSON.stringify(uniqueIds) === JSON.stringify(currentStaffIds);
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
                      selectedData: event.staffIds,
                      onSubmit: (selectedClientIds: string[]) => {
                        handleStaffUpdateEvent(selectedClientIds);
                      },
                    },
                  });
                } else {
                  navigate("modals", {
                    screen: "clients-selector-modal-screen",
                    params: {
                      mode: "clientsAndLocalClients",
                      selectedData: selectedClients,
                      onSubmit: selectedUsers => {
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
    [Colors.lightBackground, Colors.text, _data, event.staffIds, handleClientsUpdateEvent, handleStaffUpdateEvent, intl, isEventDisabled, navigate, nonIdealState, selectedClients]
  );

  const _renderListEmptyComponent = useCallback(() => {
    return (
      <View style={{ marginTop: 16, padding: 16 }}>
        <NonIdealState type={"noClients"} buttons={[<Button text="Sync contacts" onPress={() => null} />]} />
      </View>
    );
  }, []);

  const _renderListFooterComponent = useCallback(() => {
    return <Space size="large" />;
  }, []);

  if (isPeopleInEventQueryError) {
    Alert.alert("Error", "An error occurred while fetching people in event");
  }

  if (isPeopleInEventQueryLoading || updateEventStatus.isLoading) {
    return <ActivityIndicator animating={true} color={Colors.brandPrimary} />;
  }

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
      sections={_data as SectionListData<PeopleDtoType>[]}
    />
  );
}
