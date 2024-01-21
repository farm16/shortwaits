import { Accordion, AccordionDataItemType, useTheme } from "@shortwaits/shared-ui";
import { BusinessUserDtoType, BusinessUsersDtoType } from "@shortwaits/shared-utils";
import React from "react";

type ManageAdminUsersProps = {
  admins?: BusinessUsersDtoType;
};
export const ManageAdminUsers = ({ admins = [] }: ManageAdminUsersProps) => {
  const { Colors } = useTheme();

  const accordionData: AccordionDataItemType[] = [
    ...admins.map(
      (
        admin: BusinessUserDtoType & {
          isSuperAdmin: boolean;
        }
      ) => ({
        title: `${admin.givenName || admin.displayName || admin.familyName || admin.username || ""}${admin.isSuperAdmin ? " (Super admin)" : ""}`,
        description: admin.email,
        iconName: admin.isSuperAdmin ? "shield-account" : "account",
        iconColor: admin.isSuperAdmin ? Colors.orange4 : Colors.text,
      })
    ),
  ];
  return <Accordion accordionTitle="Administrators" accordionData={accordionData} />;
};
