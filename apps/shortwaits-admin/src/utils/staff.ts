import { isEmpty } from "lodash";
import { BusinessType } from "@shortwaits/shared-types";

export const getStaffCount = (staff: BusinessType["staff"] | null) =>
  `count: ${isEmpty(staff) || !staff ? "none" : staff.length}`;
