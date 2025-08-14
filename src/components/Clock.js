import React, { useEffect, useState } from "react";

const Clock = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(
        new Date().toLocaleString("en-PH", {
          hour12: false,
        })
      );
    }, 1000);

    return () => clearInterval(timer); // cleanup on unmount
  }, []); // only set interval once

  return <div>{currentDate}</div>;
};

export default Clock;
