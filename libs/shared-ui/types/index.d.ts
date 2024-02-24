declare module "*.svg" {
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}
declare module "react-native-slider";
declare module "*.jpg" {
  const content: string;
  export default content;
}
declare module "*.png" {
  const content: string;
  export default content;
}
declare module "*.json" {
  const content: string;
  export default content;
}

interface BrandColorsType {
  primary: string;
  secondary: string;
  accent: string;
}

declare global {
  let BrandColors: BrandColorsType;
}
