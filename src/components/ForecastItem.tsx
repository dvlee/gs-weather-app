import React, { ComponentType } from "react";
import { convertTempKtoC, getDayOfWeek, getTime, isToday } from "../app/utils";
import { ForecastListItemProps } from "../types";

interface ForecastItemProps {
  data: ForecastListItemProps;
}

const ForecastItem: ComponentType<ForecastItemProps> = ({ data }) => {
  const day = !isToday(data.dt_txt) ? getDayOfWeek(data.dt_txt) : "";
  const time = getTime(data.dt_txt);
  const dayTime = [day, time].join(" ");

  return (
    <div className="forecastItem">
      {time === "00:00" && <hr />}
      <div className="forecastItem__time">{dayTime}</div>
      <img
        src={`/icons/${data.weather[0].icon}.png`}
        alt=""
        className="forecastItem__icon"
      />
      <div className="forecastItem__temp">
        +{convertTempKtoC(data.main.temp)}°
      </div>
    </div>
  );
};

export default ForecastItem;
