import { BusinessIncomeInfoProps } from "../../../components";

function getPreviousMonday(date = new Date()) {
  const previousMonday = new Date();
  previousMonday.setDate(date.getDate() - ((date.getDay() + 6) % 7));

  return previousMonday;
}

export const getSampleGraphData = () => {
  const now = new Date();
  return {
    day: {
      displayOptions: {
        hour12: true,
        hour: "2-digit",
      },
      data: [...new Array(24)].map((_, index) => {
        return {
          x: new Date(
            new Date(2022, now.getMonth(), now.getDate()).getTime() +
              index * 60000 * 60
          ),
          y: Math.floor(Math.random() * 10),
        };
      }),
    },
    week: {
      displayOptions: {
        weekday: "short",
      },
      data: [...new Array(7)].map((_, index) => {
        return {
          x: new Date(now.setDate(getPreviousMonday(now).getDate() + index)),
          y: Math.floor(Math.random() * 200),
        };
      }),
    },
    month: {
      displayOptions: {
        day: "2-digit",
      },
      data: [...new Array(new Date(2022, now.getMonth(), 0).getDate())].map(
        (_, index) => {
          return {
            x: new Date(2022, now.getMonth(), index + 1),
            y: Math.floor(Math.random() * 200),
          };
        }
      ),
    },
    year: {
      displayOptions: {
        month: "short",
      },
      data: [...new Array(12)].map((_, index) => {
        return {
          x: new Date(now.getFullYear(), index),
          y: Math.floor(Math.random() * 2000),
        };
      }),
    },
  } as BusinessIncomeInfoProps["data"];
};
