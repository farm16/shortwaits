import Svg, { Circle, Path, SvgProps } from "react-native-svg";
export const Email = (props: SvgProps) => (
  <Svg viewBox="0 0 512 512" {...props}>
    <Circle
      style={{
        fill: "rgba(0,0,0,.2)",
      }}
      cx={256}
      cy={256}
      r={256}
    />
    <Path
      style={{
        fill: "#fff",
      }}
      d="M88.217 156.484v198.822l96.958-99.813zm335.566 0v198.822l-96.476-99.411zm-328.225-9.018h320.255L289.948 278.524a47.506 47.506 0 0 1-68.524 0z"
    />
    <Path
      style={{
        fill: "#fff",
      }}
      d="M297.209 285.496c-10.799 11.244-25.933 17.694-41.523 17.694-15.589 0-30.724-6.448-41.522-17.693l-21.349-22.23-97.257 101.267h320.255l-97.256-101.267z"
    />
  </Svg>
);
