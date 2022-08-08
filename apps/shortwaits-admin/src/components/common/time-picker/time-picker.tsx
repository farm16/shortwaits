import React from "react"
import DateTimePicker from "@react-native-community/datetimepicker"

export const TimePicker2 = (props: {
  onChange: (event: Event, date?: Date) => void
  date?: Date | undefined
  minuteInterval?: number
  showTimePicker?: boolean
  timePickerButton?: any
}) => {
  const {
    onChange,
    minuteInterval = 15,
    date = new Date(),
    timePickerButton = null
  } = props

  const [showTimePicker, setShowTimePicker] = React.useState(false)

  return (
    <>
      {React.cloneElement(timePickerButton, {
        onPress: setShowTimePicker(s => !s)
      })}
      {showTimePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="time"
          is24Hour={true}
          display="spinner"
          onChange={onChange}
          minuteInterval={minuteInterval}
        />
      )}
    </>
  )
}
