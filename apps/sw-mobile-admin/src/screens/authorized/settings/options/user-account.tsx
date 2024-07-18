import { useNavigation } from "@react-navigation/native";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { Accordion, AccordionDataItemType, Text, useTheme } from "@shortwaits/shared-ui";
import React from "react";
import { AuthorizedScreenProps } from "../../../../navigation";
import { useGetBusinessUsersQuery } from "../../../../services";
import { useBusiness, useBusinessUsers } from "../../../../store";

type ManageAdminUsersProps = {
  isDisabled?: boolean;
};
export const ManageAdminUsers = ({ isDisabled }: ManageAdminUsersProps) => {
  const { Colors } = useTheme();
  const currentBusiness = useBusiness();
  const { navigate } = useNavigation<AuthorizedScreenProps<"settings-screen">["navigation"]>();
  const { isLoading, isError } = useGetBusinessUsersQuery(currentBusiness?._id ?? skipToken);
  const staff = useBusinessUsers();

  let accordionData: AccordionDataItemType[] = staff.map(admin => {
    const isAdmin = admin?.userRoles?.isAdmin || admin?.userRoles?.isSuperAdmin || admin?.userRoles?.isBackgroundAdmin;
    if (isAdmin) {
      return {
        title: `${admin.givenName || admin.displayName || admin.familyName || admin.username || ""}${admin?.userRoles?.isSuperAdmin ? " (Super admin)" : ""}`,
        description: admin?.email || "",
        iconName: admin?.userRoles?.isSuperAdmin ? "shield-account" : "account",
        iconColor: admin?.userRoles?.isSuperAdmin ? Colors.orange4 : Colors.text,
        onPress: () => {
          navigate("authorized-stack", {
            screen: "business-user-profile-screen",
            params: {
              staff: admin,
            },
          });
        },
      };
    } else return null;
  });

  if (isLoading) {
    return <Text text="Loading..." />;
  }

  if (isError) {
    return null;
  }

  accordionData = accordionData.filter(Boolean) as AccordionDataItemType[];
  return <Accordion accordionTitle="Administrators" accordionData={accordionData} />;
};
