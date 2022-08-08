import * as default_dark from "./default_dark";
import { Theme } from "@shortwaits/admin/theme/theme.type";

type Themes = { [key: string]: Partial<Theme> };

export default {
  default_dark,
} as Themes;
