import { isEmpty } from "lodash";

export const getStaffCount = (staff: string[] | null) =>
  `count: ${isEmpty(staff) || !staff ? "none" : staff.length}`;
