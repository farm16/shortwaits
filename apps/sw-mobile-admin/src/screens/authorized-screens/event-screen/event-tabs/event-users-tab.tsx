import { useNavigation } from "@react-navigation/native";
import { BusinessUserDtoType, ClientDtoType, CombinedClientType, EventDtoType, LocalClientDtoType } from "@shortwaits/shared-lib";
import {
  ActivityIndicator,
  BusinessUserCard,
  Button,
  CombinedClientCard,
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
import React, { Fragment, useCallback, useEffect, useMemo } from "react";
import { useIntl } from "react-intl";
import { Alert, RefreshControl, SectionList, SectionListData, SectionListRenderItem, StyleSheet, View } from "react-native";
import { SelectedClients } from "../../..";
import { AuthorizedScreenProps } from "../../../../navigation";
import { useUpdateBusinessEventMutation, useUpdateClientsInBusinessEventMutation } from "../../../../services";
import { useBusiness, useBusinessUsers, useClients, useLocalClients } from "../../../../store";

type Section = {
  title: "Staff" | "Clients";
  data: any[];
};
type PeopleSectionListRenderItem = SectionListRenderItem<any, Section>;
type PeopleSectionListData = SectionListData<any, Section>[];
type EventUsersTabProps = {
  event: EventDtoType;
  onSectionListRefresh?(): void;
  isSectionListLoading?: boolean;
};

export function EventUsersTab(props: EventUsersTabProps) {
  const { event, onSectionListRefresh, isSectionListLoading = false } = props;
  const { Colors } = useTheme();
  const business = useBusiness();
  const clients = useClients();
  const localClients = useLocalClients();
  const staff = useBusinessUsers();
  const intl = useIntl();
  const { navigate } = useNavigation<AuthorizedScreenProps<"event-screen">["navigation"]>();
  const [updateBusinessEvent, updateEventStatus] = useUpdateBusinessEventMutation();
  const [updateClientsInBusinessEvent, registerMultipleToBusinessEventStatus] = useUpdateClientsInBusinessEventMutation();

  const statusName = event?.status?.statusName ?? "";
  const isEventDisabled = statusName ? nextEventStatuses[statusName].length === 0 : true;

  const eventStaff = event.staffIds?.map(staffId => staff?.find(staff => staff._id === staffId)).filter(Boolean) ?? [];
  const eventClients = event.clientsIds?.map(clientId => clients?.find(client => client._id === clientId)).filter(Boolean) ?? [];
  const eventLocalClients = event.localClientsIds?.map(localClientId => localClients?.find(localClient => localClient._id === localClientId)).filter(Boolean) ?? [];
  const combinedClients = getCombinedClientTypes(eventClients ?? [], eventLocalClients ?? []);

  const data = useMemo(
    () => [
      {
        title: "Staff",
        data: eventStaff ?? [],
      },
      {
        title: "Clients",
        data: combinedClients ?? [],
      },
    ],
    [combinedClients, eventStaff]
  );

  const handleRefresh = useCallback(() => {
    if (onSectionListRefresh) {
      onSectionListRefresh();
    }
  }, [onSectionListRefresh]);

  const renderBusinessUserCard = useCallback(
    (item: BusinessUserDtoType) => {
      const handleOnPress = () => {
        navigate("authorized-stack", {
          screen: "business-user-profile-screen",
          params: {
            staff: item,
            onUserRemove: staff => {
              console.log("staff >>>", staff);
            },
          },
        });
      };
      const handleOnRemove = (user: BusinessUserDtoType) => {
        console.log("user >>>", user);
      };
      return <BusinessUserCard user={item} onPress={handleOnPress} onRemove={handleOnRemove} />;
    },
    [navigate]
  );

  useEffect(() => {
    if (registerMultipleToBusinessEventStatus.isError) {
      console.log("registerMultipleToBusinessEventStatus.error >>>", registerMultipleToBusinessEventStatus?.error);
      const defaultErrorMessage = "Failed to register clients to event";
      const errorData = registerMultipleToBusinessEventStatus?.error?.data;
      const message = errorData?.message ?? "";
      const errorMessage = errorData?.error ?? "";
      const statusCode = errorData?.statusCode ? `${errorData?.statusCode}` : "";
      const errorTitle = statusCode.startsWith("4") ? "Warning" : "Error";
      const alertErrorMessage = `${message}\n${errorMessage}` || defaultErrorMessage;
      Alert.alert(errorTitle, alertErrorMessage);
    }
    if (updateEventStatus.isError) {
      const defaultErrorMessage = `Failed to update event`;
      const errorData = updateEventStatus.error?.data;
      const message = errorData?.message ?? "";
      const errorMessage = errorData?.error ?? "";
      const statusCode = errorData?.statusCode ? `${errorData?.statusCode}` : "";
      const errorTitle = statusCode.startsWith("4") ? "Warning" : "Error";
      const alertErrorMessage = `${message}\n${errorMessage}` || defaultErrorMessage;
      Alert.alert(errorTitle, alertErrorMessage);
    }
  }, [registerMultipleToBusinessEventStatus?.error, registerMultipleToBusinessEventStatus?.isError, updateEventStatus?.error, updateEventStatus?.isError]);

  const renderCombinedClientUserCard = useCallback(
    (item: CombinedClientType) => {
      if (!item?.clientType) {
        return null;
      }
      const isLocalClient = item.clientType === "local";

      const navigateToClientScreen = () => {
        navigate("authorized-stack", {
          screen: "business-client-profile-screen",
          params: {
            client: item as unknown as ClientDtoType,
            eventId: event._id,
          },
        });
      };

      const navigateToLocalClientScreen = () => {
        navigate("authorized-stack", {
          screen: "business-local-client-profile-screen",
          params: {
            localClient: item as unknown as LocalClientDtoType,
            eventId: event._id,
          },
        });
      };
      const handleOnPress = isLocalClient ? navigateToLocalClientScreen : navigateToClientScreen;

      const handleOnRemove = (user: CombinedClientType) => {
        console.log("user >>>", user);
      };

      return <CombinedClientCard onPress={handleOnPress} user={item} onRemove={handleOnRemove} />;
    },
    [event._id, navigate]
  );

  const renderItem: PeopleSectionListRenderItem = data => {
    const isStaff = data.section.title === "Staff";

    return isStaff ? renderBusinessUserCard(data.item as BusinessUserDtoType) : renderCombinedClientUserCard(data.item as CombinedClientType);
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
      // todo prevent duplicate clients and local clients from being added to the event

      updateClientsInBusinessEvent({
        eventId: event._id,
        clientIds: uniqueClientIds,
        localClientIds: uniqueLocalClientIds,
      });
    },
    [event._id, event.clientsIds, event.localClientsIds, updateClientsInBusinessEvent]
  );

  const selectedClients = useMemo(() => {
    return getSelectedClients(eventClients ?? [], eventLocalClients ?? []);
  }, [eventClients, eventLocalClients]);

  const handleStaffUpdateEvent = useCallback(
    (staffIds: string[]) => {
      const currentStaffIds = event.staffIds ?? [];
      const uniqueIds = [...new Set(staffIds)];
      const isEqual = JSON.stringify(uniqueIds) === JSON.stringify(currentStaffIds);
      if (isEqual) {
        return;
      }
      const updatedEvent = {
        ...event,
        staffIds: uniqueIds,
      };

      updateBusinessEvent({ body: updatedEvent, businessId: business._id });
    },
    [business._id, event, updateBusinessEvent]
  );

  const renderNonIdealStateSection = useCallback(
    section => {
      const { title } = section;
      const hasData = !isEmpty(section.data);
      const isClient = title === "Clients";

      if (hasData) {
        return null;
      }

      const navigateToStaffSelectorModalScreen = () => {
        navigate("modals", {
          screen: "selector-modal-screen",
          params: {
            mode: "staff",
            selectedData: event.staffIds ?? [],
            onSubmit: selectedClientIds => {
              console.log("selected selector-modal-screen >>>", selectedClientIds);
              handleStaffUpdateEvent(selectedClientIds as string[]);
            },
          },
        });
      };

      const navigateToClientsSelectorModalScreen = () => {
        navigate("modals", {
          screen: "business-clients-modal-screen",
          params: {
            mode: "client-selector",
            selectedData: selectedClients,
            onSubmit: selectedUsers => {
              console.log("selectedUsers >>>", selectedUsers);
              handleClientsUpdateEvent(selectedUsers);
            },
          },
        });
      };

      const handleOnPress = isClient ? navigateToClientsSelectorModalScreen : navigateToStaffSelectorModalScreen;
      const text = intl.formatMessage({ id: isClient ? "Common.addClients" : "Common.addStaff" });
      const nonIdealStateType = isClient ? "noClientsInEvent" : "noStaffInEvent";

      return <NonIdealState type={nonIdealStateType} buttons={[<Button style={styles.nonIdealStateSection} disabled={isEventDisabled} text={text} onPress={handleOnPress} />]} />;
    },
    [event.staffIds, handleClientsUpdateEvent, handleStaffUpdateEvent, intl, isEventDisabled, navigate, selectedClients]
  );

  const renderSectionHeader = useCallback(
    ({ section }: { section: Section }) => {
      const { title } = section;
      const isStaff = title === "Staff";

      const navigateToStaffSelectorModalScreen = () => {
        navigate("modals", {
          screen: "selector-modal-screen",
          params: {
            mode: "staff",
            selectedData: event.staffIds ?? [],
            onSubmit: selectedClientIds => {
              console.log("selected selector-modal-screen >>>", selectedClientIds);
              handleStaffUpdateEvent(selectedClientIds as string[]);
            },
          },
        });
      };

      const navigateToClientsAndLocalClientsSelectorModalScreen = () => {
        navigate("modals", {
          screen: "business-clients-modal-screen",
          params: {
            mode: "client-selector",
            selectedData: selectedClients,
            onSubmit: selectedUsers => {
              console.log("selected clients >>>", selectedUsers);
              handleClientsUpdateEvent(selectedUsers);
            },
          },
        });
      };

      const handleOnPress = isStaff ? navigateToStaffSelectorModalScreen : navigateToClientsAndLocalClientsSelectorModalScreen;

      return (
        <Fragment>
          <Container
            direction="row"
            style={[
              styles.sectionHeader,
              {
                backgroundColor: Colors.background,
              },
            ]}
          >
            <Text
              preset="none"
              style={[styles.sectionHeaderTitle, { color: Colors.text }]}
              text={`${intl.formatMessage({ id: `Common.${(title as string).toLowerCase()}` })} (${data.find(({ title: _title }) => _title === title).data.length})`}
            />
            <IconButton iconType="add" disabled={isEventDisabled} disabledAlertMessage="The event is no longer active" onPress={handleOnPress} />
          </Container>
          {renderNonIdealStateSection(section)}
        </Fragment>
      );
    },
    [
      Colors.background,
      Colors.text,
      data,
      event.staffIds,
      handleClientsUpdateEvent,
      handleStaffUpdateEvent,
      intl,
      isEventDisabled,
      navigate,
      renderNonIdealStateSection,
      selectedClients,
    ]
  );

  const renderListEmptyComponent = useCallback(() => {
    return (
      <View style={{ marginTop: 16, padding: 16 }}>
        <NonIdealState type={"noClients"} customMessage="Oops, no clients have been added to this event yet." />
      </View>
    );
  }, []);

  const renderListFooterComponent = useCallback(() => {
    return <Space size="large" />;
  }, []);

  if (updateEventStatus.isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <SectionList
      refreshControl={<RefreshControl refreshing={isSectionListLoading} onRefresh={handleRefresh} />}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => `${item._id}-${index}`}
      style={styles.sectionList}
      ListEmptyComponent={renderListEmptyComponent}
      renderSectionHeader={renderSectionHeader}
      ListFooterComponent={renderListFooterComponent}
      renderItem={renderItem}
      sections={data as PeopleSectionListData}
    />
  );
}

const styles = StyleSheet.create({
  sectionList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 0,
  },
  sectionHeaderTitle: {
    paddingTop: 24,
    paddingBottom: 16,
    fontSize: 14,
    fontWeight: "500",
    textTransform: "uppercase",
  },
  nonIdealStateSection: {
    width: "auto",
    paddingHorizontal: 28,
  },
});
