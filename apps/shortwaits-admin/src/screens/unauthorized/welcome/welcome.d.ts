import { SvgProps } from "react-native-svg"
export interface Slide {
  key: string
  title?: string
  text?: string
  Image: React.FC<SvgProps>
}
export type Slides = [Slide, Slide, Slide]
