import React from "react";

function HoursCalculator() {
  const mockAttendanceData = [
    // Employee 101
    {
      userId: "101",
      timestamp: new Date("2024-07-28T08:00:00"),
      type: "check-in",
    },
    {
      userId: "101",
      timestamp: new Date("2024-07-28T12:00:00"),
      type: "check-out",
    }, // Lunch break start
    {
      userId: "101",
      timestamp: new Date("2024-07-28T13:00:00"),
      type: "check-in",
    }, // Lunch break end
    {
      userId: "101",
      timestamp: new Date("2024-07-28T17:00:00"),
      type: "check-out",
    },

    // Employee 102
    {
      userId: "102",
      timestamp: new Date("2024-07-28T08:30:00"),
      type: "check-in",
    },
    {
      userId: "102",
      timestamp: new Date("2024-07-28T17:30:00"),
      type: "check-out",
    },

    // Employee 101 - Next day
    {
      userId: "101",
      timestamp: new Date("2024-07-29T09:00:00"),
      type: "check-in",
    },
    {
      userId: "101",
      timestamp: new Date("2024-07-29T18:00:00"),
      type: "check-out",
    },

    // Employee 103 - Incomplete punch (missing check-out)
    {
      userId: "103",
      timestamp: new Date("2024-07-29T07:45:00"),
      type: "check-in",
    },

    // Employee 104 - Overnight shift (check-in on one day, check-out on next)
    {
      userId: "104",
      timestamp: new Date("2024-07-29T22:00:00"),
      type: "check-in",
    },
    {
      userId: "104",
      timestamp: new Date("2024-07-30T06:00:00"),
      type: "check-out",
    },
  ];

  

  mockAttendanceData.forEach((record) =>
    console.log(record.timestamp.toISOString().split("T")[0])
  );

  return <div></div>;
}

export default HoursCalculator;
