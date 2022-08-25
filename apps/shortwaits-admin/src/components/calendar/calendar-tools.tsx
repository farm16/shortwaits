import { isEmpty } from "lodash";

export function getFutureDates(numberOfDays: number) {
  const array: string[] = [];
  for (let index = 1; index <= numberOfDays; index++) {
    const date = new Date(Date.now() + 864e5 * index); // 864e5 == 86400000 == 24*60*60*1000
    const dateString = date.toISOString().split("T")[0];
    array.push(dateString);
  }
  return array;
}

export function getPastDate(numberOfDays: number) {
  return new Date(Date.now() - 864e5 * numberOfDays)
    .toISOString()
    .split("T")[0];
}

export function getMarkedDates(items: any[]) {
  const marked: MarkedDates = {};
  const vacation = {
    key: "vacation",
    color: "red",
    selectedDotColor: "blue",
  };
  const massage = {
    key: "massage",
    color: "blue",
    selectedDotColor: "blue",
  };
  const workout = {
    key: "workout",
    color: "green",
  };

  items.forEach((item) => {
    // NOTE: only mark dates with data
    if (item.data && item.data.length > 0 && !isEmpty(item.data[0])) {
      marked[item.title] = {
        dots: [vacation, massage, workout],
        selected: false,
        selectedColor: "orange",
      };
    } else {
      marked[item.title] = { disabled: true };
    }
  });

  return marked;
}

export const today = new Date().toISOString().split("T")[0];
export const fastDate = getPastDate(3);
export const futureDates = getFutureDates(9);
export const dates = [fastDate, today].concat(futureDates);

type MarkedDates = {
  [key: string]: object;
};
