import React, { ComponentType, useEffect, useState } from "react";
import { getTime } from "../app/utils";

const Clock: ComponentType = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div>Сейчас {getTime(date)}</div>;
};

export default Clock;
