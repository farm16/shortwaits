import React, { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { Defs, LinearGradient, Stop } from "react-native-svg";
import { VictoryArea, VictoryAxis, VictoryChart, VictoryScatter } from "victory-native";
import { useTheme } from "../../theme";
import { GraphPropTypes, getGraphCoordinates, isGraphEmpty } from "./helpers";

const ComponentGraph = (props: GraphPropTypes) => {
  const { data: graphData, interpolation = "linear", timeIdentifier, countType = "revenueCount" } = props;
  const { Colors } = useTheme();
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const revenueCount = useMemo(() => getGraphCoordinates(graphData, timeIdentifier, countType), [countType, graphData, timeIdentifier]);

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
        // style={{ parent: { backgroundColor: "blue", padding: 0 } }}
        // height={Dimensions.get("screen").height * 0.3}
        padding={{
          bottom: 40,
          left: 40,
          right: 30,
          top: 0,
        }}
        domainPadding={{ x: 0, y: 30 }}
        // scale={{ y: "time" }}
      >
        <Defs>
          <LinearGradient id="gradientStroke" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor={Colors.brandAccent3} />
            <Stop offset="100%" stopColor="white" />
          </LinearGradient>
        </Defs>
        <VictoryArea
          interpolation={interpolation}
          data={revenueCount}
          style={{
            data: {
              fill: "url(#gradientStroke)",
              stroke: Colors.brandSecondary,
            },
          }}
        />
        <VictoryScatter data={revenueCount} size={2.6} style={{ data: { fill: Colors.brandSecondary } }} />
        <VictoryAxis
          dependentAxis
          tickFormat={tick => {
            // convert tick to $40 whole number
            let tickString;
            if (countType === "revenueCount") {
              tickString = `$${tick / 100}`;
            }
            if (countType === "eventCount") {
              tickString = tick;
            }
            // if tick is a whole number, return it, otherwise return an empty string
            return tick % 1 === 0 ? tickString : "";
          }}
          style={sharedAxisStyles}
        />
        <VictoryAxis
          tickValues={revenueCount.map(coordinate => coordinate.x)}
          tickFormat={(coordinate, index) => {
            // outputs 12am and 11pm
            if (timeIdentifier === "Today") {
              if (index === 0 || index === 23) {
                return coordinate;
              } else {
                return "";
              }
            }
            if (timeIdentifier === "Yesterday") {
              if (index === 0 || index === 23) {
                return coordinate;
              } else {
                return "";
              }
            }
            if (timeIdentifier === "Month") {
              if ([1, 6, 12, 18, 24].includes(index)) {
                return coordinate;
              }
              // output last day of the month
              if (index === revenueCount.length - 1) {
                return coordinate;
              }

              return "";
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
