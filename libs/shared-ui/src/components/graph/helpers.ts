import { Graph, GraphData, GraphIdentifier } from "@shortwaits/shared-lib";
import { format } from "date-fns";

export type GraphPropTypes = {
  countType: "eventCount" | "revenueCount";
  isLoading: boolean;
  timeIdentifier: GraphIdentifier;
  data: GraphData;
  interpolation?:
    | "basis"
    | "basisClosed"
    | "basisOpen"
    | "bundle"
    | "cardinal"
    | "cardinalClosed"
    | "cardinalOpen"
    | "catmullRom"
    | "catmullRomClosed"
    | "catmullRomOpen"
    | "linear"
    | "linearClosed"
    | "monotoneX"
    | "monotoneY"
    | "natural"
    | "radial"
    | "step"
    | "stepAfter"
    | "stepBefore";
};

export function isGraphEmpty(obj: Record<string, Graph>, countType: "eventCount" | "revenueCount" = "eventCount") {
  let sum = 0;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const element = obj[key];
      sum += element[countType];
    }
  }
  return sum === 0;
}

const formats = {
  Today: {
    format: "h a",
  },
  Yesterday: {
    format: "h a",
  },
  Week: {
    format: "eeeeee",
  },
  Month: {
    format: "d",
  },
  Year: {
    format: "MMM",
  },
};

export const getGraphCoordinates = (graphData: GraphData, timeIdentifier: GraphIdentifier, countType: "eventCount" | "revenueCount" = "eventCount") => {
  if (!graphData[timeIdentifier]) {
    return [];
  }
  return Object.keys(graphData[timeIdentifier]).map(key => {
    let isoDate = key;
    if (timeIdentifier === "Today" || timeIdentifier === "Yesterday") {
      isoDate = graphData[timeIdentifier][key]?.date ?? "";
    }
    const date = new Date(isoDate);

    // get day of the week sum mon tue wed thu fri sat using date-fns
    const dateString = format(date, formats[timeIdentifier].format);
    return { x: dateString, y: graphData[timeIdentifier][key][countType] };
  });
};
