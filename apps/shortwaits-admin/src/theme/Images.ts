import { ThemeImages, ThemeVariables } from "@/theme/theme.type";

/**
 *
 * @param Theme can be spread like {Colors, NavigationColors, Gutters, Layout, Common, ...args}
 * @return {*}
 */
export default function ({}: ThemeVariables): ThemeImages {
    return {
        logo: null
        // logo: require("@/Assets/Images/TOM.png")
    };
}
