"use client";
import React, { useState } from "react";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Calendar() {
  const [value, onChange] = useState(new Date());
  return (
    <div>
      <ReactCalendar
        onChange={date => {
          console.log(date);
          onChange(date as Date);
        }}
        value={value}
      />
    </div>
  );
}
