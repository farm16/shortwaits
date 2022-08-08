export const get12hrTimeFromDecimal = (decimal: number): string => {
  const timeArr = getTimeArrFromDecimal(decimal)
  if (timeArr.length === 0) {
    return "--:--"
  }
  const meridiem = timeArr[0] >= 12 ? "pm" : "am"
  timeArr[0] = timeArr[0] % 12 || 12
  return `${timeArr[0]}:${
    timeArr[1] < 10 ? "0" + timeArr[1] : timeArr[1]
  } ${meridiem}`
}
export const get24hrTimeFromDecimal = (decimal: number): string => {
  const timeArr = getTimeArrFromDecimal(decimal)
  if (timeArr.length === 0) {
    return "--:--"
  }
  return `${timeArr[0]}:${timeArr[1] < 10 ? "0" + timeArr[1] : timeArr[1]}`
}
export const getTimeArrFromDecimal = (
  decimal: number
): [number, number] | [] => {
  if (decimal < 0 || decimal > 1440) {
    return []
  }
  const hours = Math.floor(decimal / 60)
  const minutes = decimal % 60
  return [hours, minutes]
}
export const getTimeDurationsFromMins: string = (mins: number) => {
  return ""
}
