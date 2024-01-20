import React, { useEffect, useMemo } from "react";
import { Dimensions, View } from "react-native";
import {
  VictoryArea,
  VictoryAxis,
  VictoryChart,
  VictoryScatter,
} from "victory-native";
import { Defs, LinearGradient, Stop } from "react-native-svg";

import { useTheme } from "../../theme";
import {
  getGraphCoordinates,
  GraphPropTypes,
  isGraphEmpty,
} from "./graph-utils";
import { ex } from "./ex";

const ComponentGraph = (props: GraphPropTypes) => {
  const {
    data: graphData = ex,
    interpolation = "linear",
    timeIdentifier,
  } = props;
  const { Colors } = useTheme();
  const [isEmpty, setIsEmpty] = React.useState<boolean>(false);
  const coordinates = useMemo(
    () => getGraphCoordinates(graphData, timeIdentifier),
    [graphData, timeIdentifier]
  );
  const sharedAxisStyles = {
    tickLabels: {
      fontSize: 13,
    },
    axisLabel: {
      padding: 39,
      fontSize: 13,
      fontStyle: "italic",
    },
  };
  useEffect(() => {
    if (isGraphEmpty(graphData[timeIdentifier])) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [graphData, isEmpty, timeIdentifier]);

  if (isEmpty) {
    return null;
  }

  return (
    <View>
      <VictoryChart
        height={Dimensions.get("screen").height * 0.3}
        padding={{ bottom: 40, left: 50, right: 30, top: 5 }}
        domainPadding={{ x: 0, y: 30 }}
        // scale={{ x: "time" }}
      >
        <Defs>
          <LinearGradient id="gradientStroke" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor={Colors.brandAccent1} />
            <Stop offset="100%" stopColor="white" />
          </LinearGradient>
        </Defs>
        <VictoryArea
          interpolation={interpolation}
          data={coordinates}
          style={{
            parent: { backgroundColor: "green" },
            data: {
              fill: "url(#gradientStroke)",
              stroke: Colors.brandAccent8,
            },
          }}
        />
        <VictoryScatter
          data={coordinates}
          size={3.8}
          style={{ data: { fill: Colors.brandAccent8 } }}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={tick =>
            Math.round(tick) === 0 ? "" : `$${Math.round(tick)}`
          }
          style={sharedAxisStyles}
        />

        <VictoryAxis
          tickValues={coordinates.map(coordinate => coordinate.x)}
          tickFormat={(coordinate, index) => {
            // outputs 12am and 11pm
            if (timeIdentifier === "Yesterday") {
              if (index === 0 || index === 23) {
                return coordinate;
              } else {
                return "";
              }
            }
            if (timeIdentifier === "Month") {
              if ([0, 6, 12, 18, 24, 30].includes(index)) {
                return coordinate;
              } else {
                return "";
              }
            }
            return coordinate;
          }}
          style={sharedAxisStyles}
        />
      </VictoryChart>
    </View>
  );
};
export const Graph = React.memo(ComponentGraph);
