import React, { FC, memo, useLayoutEffect, useRef } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import {
  VictoryArea,
  VictoryAxis,
  VictoryChart,
  VictoryScatter,
  VictoryTheme,
} from "victory-native";
import { Defs, LinearGradient, Stop } from "react-native-svg";

import { useTheme } from "../../theme";

export const Graph = (props) => {
  const { data, displayOptions, interpolation = "natural" } = props;
  const { Colors } = useTheme();
  console.log(data.length);
  const count = data.length;
  return (
    <View>
      <VictoryChart
        height={Dimensions.get("screen").height * 0.3}
        padding={{ bottom: 40, left: 50, right: 30, top: 5 }}
        domainPadding={{ x: 0, y: 30 }}
        scale={{ x: "time" }}
      >
        <Defs>
          <LinearGradient id="gradientStroke" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor={Colors.brandAccent1} />
            <Stop offset="100%" stopColor="white" />
          </LinearGradient>
        </Defs>
        <VictoryArea
          interpolation={interpolation}
          data={data}
          style={{
            parent: { backgroundColor: "green" },
            data: {
              fill: "url(#gradientStroke)",
              stroke: Colors.brandAccent8,
            },
          }}
        />
        <VictoryScatter
          data={data}
          size={3.8}
          style={{ data: { fill: Colors.brandAccent8 } }}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(tick) => `$${Math.round(tick)}`}
          style={sharedAxisStyles}
        />

        <VictoryAxis
          tickValues={data.map((d) => d.x)}
          tickFormat={(_data, index) => {
            console.log(
              "graphData >>> ",
              _data.toLocaleString("default", displayOptions)
            );
            console.log("index >>> ", index);

            if (
              data.length > 20 &&
              (index === data.length - 1 || index === 0)
            ) {
              return (_data as Date).toLocaleString("default", displayOptions);
            }
            if (data.length > 20) {
              return "";
            }
            return (_data as Date).toLocaleString("default", displayOptions);
          }}
          style={sharedAxisStyles}
        />
      </VictoryChart>
    </View>
  );
};

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
