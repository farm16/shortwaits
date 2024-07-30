import { useNavigation } from "@react-navigation/native";
import { Accordion, AccordionDataItemType, useTheme } from "@shortwaits/shared-ui";
import React from "react";
import { AuthorizedScreenProps } from "../../../../navigation";
import { useBusinessUsers } from "../../../../store";

type BusinessUsersTileProps = {
  isDisabled?: boolean;
};
export const BusinessUsersTile = ({ isDisabled }: BusinessUsersTileProps) => {
  const { Colors } = useTheme();
  const { navigate } = useNavigation<AuthorizedScreenProps<"settings-screen">["navigation"]>();
  const businessUsers = useBusinessUsers();

  const accordionData: AccordionDataItemType[] =
    (businessUsers
      ?.map(businessUser => {
        const isAdmin = businessUser?.userRoles?.isAdmin || businessUser?.userRoles?.isSuperAdmin || businessUser?.userRoles?.isBackgroundAdmin;
        const title = `${businessUser?.givenName || businessUser?.displayName || businessUser?.familyName || businessUser?.username || ""}${
          businessUser?.userRoles?.isSuperAdmin ? " (Super admin)" : ""
        }`;

        if (isAdmin) {
          return {
            title: title,
            iconName: businessUser?.userRoles?.isSuperAdmin ? "shield-account" : "account",
            iconColor: businessUser?.userRoles?.isSuperAdmin ? Colors.orange4 : Colors.text,
            onPress: () => {
              navigate("authorized-stack", {
                screen: "business-user-profile-screen",
                params: {
                  staff: businessUser,
                },
              });
            },
          };
        } else return null;
      })
      .filter(Boolean) as AccordionDataItemType[]) ?? [];

  return <Accordion accordionTitle="Administrators" accordionData={accordionData} />;
};
