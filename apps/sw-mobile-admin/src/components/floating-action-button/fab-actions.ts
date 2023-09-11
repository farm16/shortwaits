import { navigate } from "../../navigation";
import { FloatingActions } from "..";
import { brandColors } from "../../theme/Colors";

export const actions: FloatingActions = [
  {
    label: "EVENT",
    onPress: () =>
      navigate("modals", {
        screen: "form-modal-screen",
        params: {
          form: "addEvent",
        },
      }),
    icon: "calendar-clock",
    color: "#ffffff",
    labelTextColor: "#ffffff",
    style: {
      backgroundColor: brandColors.secondary.brandSecondary5,
    },
    labelStyle: {
      backgroundColor: brandColors.secondary.brandSecondary5,
      borderRadius: 20,
    },
  },
  {
    label: "CLIENT",
    onPress: () =>
      navigate("modals", {
        screen: "form-modal-screen",
        params: {
          form: "addClient",
        },
      }),
    icon: "account-group",
    color: "#ffffff",
    labelTextColor: "#ffffff",
    style: {
      backgroundColor: brandColors.secondary.brandSecondary5,
    },
    labelStyle: {
      backgroundColor: brandColors.secondary.brandSecondary5,
      borderRadius: 20,
    },
  },
  {
    label: "STAFF",
    color: "#ffffff",
    labelTextColor: "#ffffff",
    onPress: () =>
      navigate("modals", {
        screen: "form-modal-screen",
        params: {
          form: "addStaff",
        },
      }),
    icon: "account-tie",
    style: {
      backgroundColor: brandColors.secondary.brandSecondary5,
    },
    labelStyle: {
      backgroundColor: brandColors.secondary.brandSecondary5,
      borderRadius: 20,
    },
  },
  // ,
  // {
  //   label: "MORE",
  //   onPress: () => null,
  //   icon: "dots-horizontal",
  //   color: "#ffffff",
  //   labelTextColor: "#ffffff",
  //   style: {
  //     backgroundColor: brandColors.secondary.brandSecondary5,
  //   },
  //   labelStyle: {
  //     backgroundColor: brandColors.secondary.brandSecondary5,
  //     borderRadius: 20,
  //   },
  // },
];
