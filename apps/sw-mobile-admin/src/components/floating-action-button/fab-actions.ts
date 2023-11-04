import { useMemo } from "react";
import { useIntl } from "react-intl";
import { navigate } from "../../navigation";
import { useTheme } from "../../theme";

export const useActions = () => {
  const intl = useIntl();
  const { Colors } = useTheme();

  const actions = useMemo(() => {
    const styles = {
      color: Colors.white,
      // labelTextColor: Colors.white,
      labelTextColor: Colors.brandSecondary7,

      style: {
        backgroundColor: Colors.brandSecondary,
      },
      labelStyle: {
        fontWeight: "600",
        // backgroundColor: Colors.brandSecondary,
        // paddingHorizontal: 15,
        // paddingVertical: 5,
        // borderRadius: 10,
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
