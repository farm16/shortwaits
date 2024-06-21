import { useNavigation } from "@react-navigation/native";
import { useMemo } from "react";
import { FABGroupProps } from "react-native-paper";
import { AuthorizedScreenProps } from "../../navigation";

export const useActions = () => {
  const { navigate } = useNavigation<AuthorizedScreenProps<"events-screen">["navigation"]>();

  const actions = useMemo<FABGroupProps["actions"]>(() => {
    return [
      {
        label: "Add event",
        icon: "calendar-clock",
        onPress: () => {
          navigate("modals", {
            screen: "add-event-modal-screen",
          });
        },
      },
      {
        label: "Add service",
        icon: "briefcase-outline",
        onPress: () => {
          navigate("modals", {
            screen: "add-service-modal-screen",
          });
        },
      },
      {
        label: "Add client",
        icon: "account-outline",
        onPress: () => {
          navigate("modals", {
            screen: "add-client-modal-screen",
          });
        },
      },
      {
        label: "Add staff",
        icon: "account-tie-outline",
        onPress: () => {
          navigate("modals", {
            screen: "add-staff-modal-screen",
          });
        },
      },
    ];
  }, [navigate]);
  return actions;
};
