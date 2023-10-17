import { navigate } from "../../navigation";
import { useIntl } from "react-intl";
import { useMemo } from "react";
import { useTheme } from "../../theme";

export const useActions = () => {
  const intl = useIntl();
  const { Colors } = useTheme();

  const actions = useMemo(() => {
    const styles = {
      color: Colors.white,
      labelTextColor: Colors.brandAccent8,
      style: {
        backgroundColor: Colors.brandAccent,
      },
      labelStyle: {
        // backgroundColor: brandColors.secondary.brandSecondary5,
        // borderRadius: 20,
      },
    };
    return [
      {
        label: intl.formatMessage({ id: "Common.events" }),
        onPress: () =>
          navigate("modals", {
            screen: "add-event-modal-screen",
          }),
        icon: "calendar-clock",
        ...styles,
      },
      {
        label: intl.formatMessage({ id: "Common.clients" }),
        onPress: () =>
          navigate("modals", {
            screen: "add-client-modal-screen",
          }),
        icon: "account-group",
        ...styles,
      },
      {
        label: intl.formatMessage({ id: "Common.staff" }),
        onPress: () =>
          navigate("modals", {
            screen: "add-staff-modal-screen",
          }),
        icon: "account-tie",
        ...styles,
      },
      // ,
      // {
      //   label: "MORE",
      //   onPress: () => null,
      //   icon: "dots-horizontal",s
      // },
    ];
  }, [intl]);

  return actions;
};
