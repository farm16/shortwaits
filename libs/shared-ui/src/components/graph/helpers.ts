export const dateOptions = {
  Yesterday: {
    hour12: true,
    hour: "2-digit",
  },
  Week: {
    weekday: "short",
  },
  Month: {
    day: "numeric",
  },
  Year: {
    month: "short",
  },
} as Record<GraphIdentifier, Intl.DateTimeFormatOptions>;

export type WeekDay = "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";

export type GraphIdentifier = keyof GraphData;

export type GraphData = {
  Yesterday: Record<string, number>;
  Week: Record<WeekDay, number>;
  Month: Record<string, number>;
  Year: Record<string, number>;
};

export type GraphPropTypes = {
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

export function isGraphEmpty(obj: { [key: string]: number }): boolean {
  let sum = 0;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      sum += obj[key];
    }
  }
  return sum === 0;
}

export const getGraphCoordinates = (graphData: GraphData, timeIdentifier: GraphIdentifier) => {
  if (!graphData[timeIdentifier]) {
    return [];
  }

  return Object.keys(graphData[timeIdentifier]).map(key => ({
    x: key,
    y: graphData[timeIdentifier][key],
  }));
};
