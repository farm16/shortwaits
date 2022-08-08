import React from "react"
import DatePicker from "react-native-datepicker"

interface TimePickerProps {
  minuteInterval: number
  onChange(any): void
}
export function TimePicker({ minuteInterval = 10, onChange }: TimePickerProps) {
  return (
    <DatePicker
      hideText={false}
      showIcon={false}
      style={{ width: 200 }}
      date={"20:00"}
      mode="time"
      format="HH:mm"
      confirmBtnText="Confirm"
      cancelBtnText="Cancel"
      minuteInterval={15}
      onDateChange={(time: any) => {
        onChange(time)
      }}
    />
  )
}
