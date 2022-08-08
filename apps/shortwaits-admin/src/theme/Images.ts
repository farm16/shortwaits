import {
  ThemeImages,
  ThemeVariables,
} from "@shortwaits/admin/theme/theme.type";

/**
 *
 * @param Theme can be spread like {Colors, NavigationColors, Gutters, Layout, Common, ...args}
 * @return {*}
 */
export default function ({}: ThemeVariables): ThemeImages {
  return {
    logo: null,
    // logo: require("@shortwaits/admin/Assets/Images/TOM.png")
  };
}
